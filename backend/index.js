// to run: go to `~/.aws/credentials` and put in the credentials commented out here

const express = require("express");
const app = express();

const AWS = require('aws-sdk');
const AWS_REGION = 'us-west-2';

AWS.config.update({
  region: AWS_REGION,
});
const dynamoDB = new AWS.DynamoDB({ apiVersion: "2012-08-10" });


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

app.listen(3007, () => {
  console.log('Example app listening on port 3007!');
});

