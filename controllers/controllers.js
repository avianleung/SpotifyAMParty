const querystring = require("querystring");
const request = require("request");

//let redirect_uri = process.env.REDIRECT_URI || "http://localhost:8080/callback";
var client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
var redirect_uri = process.env.REDIRECT_URI; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = "spotify_auth_state";

exports.logIn = (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state, { httpOnly: true });

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

exports.callback = (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/login?" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        res.cookie("token", body.access_token, { httpOnly: true });
        res.cookie("asdf", "asdf");
        res.send(req.cookies.token);
      } else {
        res.redirect(
          "/login?" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    });
  }
};

exports.getTrack = (req, res) => {
  var access_token = req.cookies.token;
  var options = {
    url: "https://api.spotify.com/v1/tracks/1vrd6UOGamcKNGnSHJQlSt",
    headers: { Authorization: "Bearer " + access_token },
    json: true,
  };

  // use the access token to access the Spotify Web API
  request.get(options, function (error, response, body) {
    res.send(body);
  });
};
