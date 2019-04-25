'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/device-online', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    for (var i = 0; i < response.data.data.length; i++) {
      var lineID = response.data.data[i].id
      var lineESP = response.data.data[i].esp
      const echo = {
        "type": "text",
        "text": lineESP + " online"
      }
      client.pushMessage(lineID, echo)
    }
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

app.post('/falling', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    for (var i = 0; i < response.data.data.length; i++) {
      var lineID = response.data.data[i].id
      var lineName = response.data.data[i].name
      var linePhone = response.data.data[i].phone

      if (response.data.data[i].esp == null) {
        lineESP = response.data.data[i].esp
      }
      const echo = {
        "type": "template",
        "altText": "คุณ " + lineName,
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://i.imgur.com/h3ujqrZ.jpg",
            "imageAspectRatio": "square",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "หมายเลขอุปกรณ์ : " + esp,
            "text": "คุณ " + lineName,
            "defaultAction": {
                "type": "message",
                "label": "ตอบรับ",
                "text": "Acknowledge:" + esp
            },
            "actions": [
                {
                  "type": "message",
                  "label": "ตอบรับ",
                  "text": "Acknowledge:" + esp
                },
                {
                  "type": "uri",
                  "label": "โทร",
                  "uri": "tel:" + linePhone
                }
            ]
        }
      }
      client.pushMessage(lineID, echo)
    }
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

app.post('/help', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "template",
      "altText": "คุณ " + response.data.data.name,
      "template": {
          "type": "buttons",
          "thumbnailImageUrl": "https://i.imgur.com/oWiGMzD.jpg",
          "imageAspectRatio": "square",
          "imageSize": "cover",
          "imageBackgroundColor": "#FFFFFF",
          "title": "หมายเลขอุปกรณ์ : " + esp,
          "text": "คุณ " + response.data.data.name,
          "defaultAction": {
              "type": "message",
              "label": "ตอบรับ",
              "text": "Acknowledge:" + esp
          },
          "actions": [
              {
                "type": "message",
                "label": "ตอบรับ",
                "text": "Acknowledge:" + esp
              },
              {
                "type": "uri",
                "label": "โทร",
                "uri": "tel:" + response.data.data.phone
              }
          ]
      }
    }
    client.pushMessage(lineID, echo)
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

app.post('/help-pre-ack', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "text",
      "text": "การตอบรับได้ถึงอุปกรณ์ของคุณ " + response.data.data.name + " แล้ว"
    }
    client.pushMessage(lineID, echo)
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

app.post('/help-ack', (req, res) => {
  var esp = req.body.data.esp
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "text",
      "text": "มีผู้กดปุ่มกดอุปกรณ์ ของคุณ " + response.data.data.name + " เพื่อให้ความช่วยเหลือแล้ว"
    }
    client.pushMessage(lineID, echo)
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

app.post('/health-info', (req, res) => {
  var esp = req.body.data.esp
  var hbp = req.body.data.hbp
  var lbp = req.body.data.lbp
  var hr = req.body.data.hr
  axios({
    method: 'post',
    url: 'https://bhcd-api.herokuapp.com/user-line-device-info/check/esp',
    headers: {
      'Content-Type' : 'application/json'
    },
    data: {
        "data" : {
          "esp" : esp
        }
    }
  }).then((response) => {
    var lineID = response.data.data.id
    const echo = {
      "type": "text",
      "text": "ข้อมูลสุขภาพของคุณ " + response.data.data.name + " ได้รับการบันทึกแล้ว\n" + 
        "ความดันโลหิต : " + hbp.toString() + "/" + lbp.toString() + "\n" +
        "อัตรการเต้นของหัวใจ : " + hr.toString()
    }
    client.pushMessage(lineID, echo)
    res.status(200)
    res.send('Push message completed')
  }).catch((error) => {
    console.log(error.message)
    res.status(400)
    res.send('Push message error')
  })
})

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
