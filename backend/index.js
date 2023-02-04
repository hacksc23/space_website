// to run: go to `~/.aws/credentials` and put in the credentials commented out here

const express = require("express");
const path = require("path"); 
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
const axios = require("axios")
const http = require("http"); 
const fs = require("fs"); 


const app = express();

const AWS = require('aws-sdk');
const AWS_REGION = 'us-west-2';
const API_KEY = "SGHeOOlwlk4UXftzmjcomj9Zf1hmK2cobZhZJTtH"; 


AWS.config.update({
  region: AWS_REGION,
});
const dynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });


console.log('process.cwd(): ', process.cwd());

console.log('__dirname: ', __dirname);

app.get('/events', (req, res) => {
  const params = {
    TableName: 'astronomy-events',
    KeyConditionExpression: 'ID = :partitionKeyValue and DateStart = :sortKeyValue',
    ExpressionAttributeValues: {
      ':partitionKeyValue': { S: 'event' },
      ':sortKeyValue': { N: '20250809' }
    }
  }
  dynamoDB.query(params, (error, data) => {
    if(error){
      console.log('error');
      console.log(error);
      res.send(error);
    }
    else{
      console.log(JSON.stringify(data))
      res.send(JSON.stringify(data));
    }
  });

});


app.get('/images', async (req, res) => {
  // get images from nasa api 
  // everyday update one image fron nasa apod-api 
   // https://api.nasa.gov/planetary/apod?api_key=SGHeOOlwlk4UXftzmjcomj9Zf1hmK2cobZhZJTtH
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    const data = response.data;
    console.log('data: ', data);
    let hdurl = response.data.hdurl; 
    console.log('hdurl: ', hdurl);
    // res.send(data);
    res.send(hdurl); 
  } catch (error) {
    console.error(error);
    res.send('Error fetching data from NASA API');
  }
});

// app.listen(3007, () => {
//   console.log('Example app listening on port 3007!');
// });


const port = process.env.PORT || 8080; 
app.listen(port, function () {
    console.log("This server has just started at 8080!"); 
})


