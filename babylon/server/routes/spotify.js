const router = module.exports = require('express').Router();
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

Promise.promisifyAll(request);

const spotify = process.env.NODE_ENV === "development"
  ? require('../../../config')
  : {client_id: process.env.CLIENT_ID, client_secret: process.env.CLIENT_SECRET }

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(spotify.client_id + ':' + spotify.client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.get('/:name', (req, res, next) => {
  const artist = req.params.name;
  console.log('spotify router', artist);
  request.post(authOptions, (error, response, body) => {

    if (!error && response.statusCode === 200) {
      console.log('spotify if');
      const token = body.access_token; // use the access token to access the spotify web API
      const options = {
        url: `https://api.spotify.com/v1/search?q=${artist}&type=artist`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        json: true
      };

      request.getAsync(options)
      .then((response) => {
        console.log('spotify request', response);
        const artistData = response.body.artists.items[0];
        res.send(artistData);
      })
      .catch(next)
    }

  })
});
