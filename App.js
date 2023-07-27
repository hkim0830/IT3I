/*
Node + Express Example code for CS160 Summer 2022
Prepared by Shm Garanganao Almeda 

Code referenced from: 
https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module"
https://expressjs.com/en/starter/hello-world.html
https://codeforgeek.com/render-html-file-expressjs/
https://stackoverflow.com/questions/32257736/app-use-express-serve-multiple-html

Photo Credits:
Bunny by Satyabratasm on Unsplash <https://unsplash.com/photos/u_kMWN-BWyU>
*/

//Node modules to *require*
//if these cause errors, be sure you've installed them, ex: 'npm install express'

const { getStorage, ref, uploadString, getDownloadURL } = require('firebase/storage');
const  { initializeApp } = require('firebase/app');
const firebaseConfig = {
  apiKey: "AIzaSyAwPFPdZk674g7Bf_SEKSsPiCvw1sOS4Q0",
  authDomain: "it3i-4bae8.firebaseapp.com",
  projectId: "it3i-4bae8",
  storageBucket: "it3i-4bae8.appspot.com",
  messagingSenderId: "702142588007",
  appId: "1:702142588007:web:335777b7bbca521a4ee0c2",
  storageBucket: "it3i-4bae8.appspot.com"
};


const db = initializeApp(firebaseConfig);
const storage = getStorage(db);

/*const serviceAccount = require('./it3i-394100-e431fabfb3d8.json');*/


const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

const imageToText = require('./replicateITT');
const textToImage = require('./replicateTTI');
//specify that we want to run our website on 'http://localhost:8000/'
const host = 'localhost';
const port = 8000;

var publicPath = path.join(__dirname, 'public'); //get the path to use our "public" folder where we stored our html, css, images, etc
app.use(express.static(publicPath));  //tell express to use that folder

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit:'50mb', extended: true }));

//here's where we specify what to send to users that connect to our web server...
//if there's no url extension, it will show "index.html"
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});

//depending on what url extension the user navigates to, send them the respective html file. 
app.get('/a', function (req, res) {
    res.sendFile(publicPath + '/a.html');
});
app.get('/b', function (req, res) {
    res.sendFile(publicPath + '/b.html');
});
app.get('/c', function (req, res) {
    res.sendFile(publicPath + '/c.html');
});

app.post('/imagegenrequest', (req, res) =>{
    var prompt = JSON.stringify(req.body);
    console.log('Our SERVER just received from user: ' + prompt + '. loading response...\n');
    textToImage(prompt).then(function(response)
    {
        console.log('Success! SERVER received the following image from replicate, and is sending to user: ' + response + '\n');
        res.status(200).send(response);
    })
});

app.post('/tokengenrequest', (req, res) =>{
    console.log("huzzah!!");
    var imageBase64 = req.body.image;
    console.log('Our SERVER just received from user: ' + imageBase64 + '. loading response...\n');
    imageToText(imageBase64).then(function(response)
    {
        console.log('Success! SERVER received the following tokens from replicate, and is sending to user: ' + response + '\n');
        res.status(200).send(response);
    })
});


// Firestore handlers 
app.post('/imageUpload', async (req,res)=>{
    var fileName = req.body.name;
    var imageRef = ref(storage, fileName);
    var imageStringRaw = req.body.image;

    //from Nicolo on Stack Overflow, ty https://stackoverflow.com/questions/38633061/how-can-i-strip-the-dataimage-part-from-a-base64-string-of-any-image-type-in-ja
    var imageString = imageStringRaw.replace(/^data:image\/[a-z]+;base64,/, "");

    //console.log(imageString);
    uploadString(imageRef, imageString, 'base64').then((snapshot) => {
      console.log('Uploaded a base64 string!');
        getDownloadURL(imageRef).then((url) =>{
            imageToText(url).then(function(response){
                console.log('Success! SERVER received the following tokens from replicate, and is sending to user: ' + response + '\n');
                res.status(200).send(response);
            });

        });
    });


})


//run this server by entering "node App.js" using your command line. 
   app.listen(port, () => {
     console.log(`Server is running on http://${host}:${port}`);
   });



