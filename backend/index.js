require('dotenv').config();

const express = require('express')
const cors = require('cors')

const axios = require('axios');

const app = express();
const querystring = require('querystring');

console.log(process.env.CLIENT_ID)

app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Authorization', 'Basic' + (new Buffer(client_id + ':' + client_secret).toString('base64')))
  res.setHeader('Content-Type', 'application/x-www-form-urlencoded')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});






app.get('/posts', (req, res) => {

  res.set('Access-Control-Allow-Origin', '*')

  const posts = [
    {
      caption: 'golden gate bridge',
      location: 'san-francisco'
    },
    {
      caption: 'golden gate bridge',
      location: 'san-francisco'
    }
  ]
  res.send(posts)
})

// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//       result += characters.charAt(Math.floor(Math.random() *
//  charactersLength));
//    }
//    return result;
// }

app.get('/login', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')

 res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`)

});

app.get('/callback', function (req, res) {
  // res.set('Access-Control-Allow-Origin', '*')


  // console.log('this is res', res)
  // console.log('this is req', req)
  const code = req.query.code || null;
  const state = req.query.state || null;
  console.log('query in api', req.query)
  console.log('state', state)
  console.log('code', code)


});

  // if (state === null) {
  //   res.redirect('/#' +
  //     querystring.stringify({
  //       error: 'state_mismatch'
  //     }));
  // } else {
  //   const authOptions = {
  //     url: 'https://accounts.spotify.com/api/token',
  //     form: {
  //       code: code,
  //       redirect_uri: redirect_uri,
  //       grant_type: 'authorization_code'
  //     },
  //     headers: {
  //       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  //     },
  //     json: true
  //   };
  // }
// });

app.listen(3000)
