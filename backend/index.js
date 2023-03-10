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

const NASA_API_KEY = "SGHeOOlwlk4UXftzmjcomj9Zf1hmK2cobZhZJTtH";

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// code about local url for different functions
app.use(cors({ origin: '*' }));
// 前端跨域的问题， cross origin resource sharing


AWS.config.update({
  region: AWS_REGION,
});
const dynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });


console.log('process.cwd(): ', process.cwd());

console.log('__dirname: ', __dirname);

app.get('/events', (req, res) => {
  const startDate = req.query.start_date
  const endDate = req.query.end_date
  console.log(startDate)
  const params = {
    TableName: 'astronomy-events',
    KeyConditionExpression: 'ID = :partitionKeyValue and (DateStart BETWEEN :startDateSortKeyValue AND :endDateSortKeyValue)',
    ExpressionAttributeValues: {
      ':partitionKeyValue': { S: 'event' },
      ':startDateSortKeyValue': { N: startDate },
      ':endDateSortKeyValue': { N: endDate }
    }
  }
  dynamoDB.query(params, (error, data) => {
    if (error) {
      console.log(error)
      res.json({
        isSuccess: false,
        data: null,
        error: error,
      })
    }
    else {
      // console.log(JSON.stringify(data))
      // res.status(200).send(JSON.stringify(data))
      res.json({
        isSuccess: true,
        data: data.Items.map(x => (
          {
            "summary": x.Summary.S,
            "description": x.Description.S,
            "date_start": x.DateStart.N,
            "date_end": x.DateEnd.N,
          }
        )),
        error: null,
      })
    }
  });

});


app.get('/images', async (req, res) => {
  // get images from nasa api
  // everyday update one image fron nasa apod-api
  // https://api.nasa.gov/planetary/apod?api_key=SGHeOOlwlk4UXftzmjcomj9Zf1hmK2cobZhZJTtH
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    const data = response.data
    console.log('data: ', data)
    let hdurl = response.data.hdurl
    // console.log('hdurl: ', hdurl)
    res.json({
      isSuccess: true,
      data: {
        "image_url": hdurl,
      },
      error: null,
    })
  } catch (error) {
    console.error(error)
    res.json({
      isSuccess: false,
      data: null,
      error: error,
    })
  }
});

app.get('/news', (req, res) => {
  const keyword = req.query.keyword
  console.log(`received request to /news with keyword=${keyword}`)

  let titleHit = null, summaryHit = null, err = null
  Promise.all([
    fetch(`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(res => { titleHit = res })
      .catch(e => (err = e)),
    fetch(`https://api.spaceflightnewsapi.net/v3/articles?summary_contains=${encodeURIComponent(keyword)}`)
      .then(res => res.json())
      .then(res => (summaryHit = res))
      .catch(e => (err = e))
  ]).then(() => {
    if (err !== null) {
      console.error(err)
      res.json({
        isSuccess: false,
        data: null,
        error: err,
      })
    } else {
      // console.log(titleHit)
      // console.log(summaryHit)

      // Combine two results
      let newsMap = new Map()
      let hits = [titleHit, summaryHit]
      hits.forEach(hit => {
        hit.forEach(elem => {
          if (!newsMap.has(elem.id)) {
            newsMap.set(elem.id, elem)
          }
        })
      })
      res.json({
        isSuccess: true,
        data: [...newsMap.values()],
        error: null,
      })
    }
  })
})

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("This server has just started at 8080!");
})
