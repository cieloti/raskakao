var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// use firebase cloud messaging
var FCM = require('fcm-node');
var serverKey = 'firebase server key'

// papago id setting
var client_id = 'naver api id';
var client_secret = 'naver api secret';
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/keyboard', function(req, res){
  const menu = {
      "type": 'buttons',
      "buttons": ["start"]
  };

  res.set({
      'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

// kakaotalk message
app.post('/message',function (req, res) {
    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    console.log(_obj.content)

    var options = {
       url: api_url,
       form: {'source':'ko', 'target':'en', 'text':req.body.content},
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };

     request.post(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // send firebase cloud message
        var fcm = new FCM(serverKey);
        var message = {
              to: 'firebase app token',
              collapse_key: 'your_collapse_key',
              data: {
                  message: req.body.content
              }
          };

        fcm.send(message, function(err, response){
              if (err) {
                  console.log("Something has gone wrong!");
              } else {
                  console.log("Successfully sent with response: ", response);
              }
          });

        // send kakaotalk message
        var objBody = JSON.parse(response.body);
        console.log(objBody.message.result.translatedText);

        let massage = {
            "message": {
                "text": objBody.message.result.translatedText
            },
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));

      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);

        let massage = {
            "message": {
                "text": response.statusCode
            },
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));

      }
    });
});

app.listen(process.env.PORT || 5000, function() {
});
