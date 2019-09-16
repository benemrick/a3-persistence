// init project
const express = require('express');
const mime = require('mime');
const fs = require('fs');
const app = express();
const port = 3000;

// lowddb
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

//middleware
const bodyParser = require('body-parser')
const shortid = require('shortid')
// const session = require('express-session')
// const passport = require('passport')
// const Local = require('passport-local').Strategy


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(bodyParser.json())

db.defaults({
  users: [{
    "username": "ben",
    "password": "password"
  }]
}).write();

db.defaults({
    items: [],
  })
  .write()

let yeezy = {
  'id': shortid.generate(),
  'name': 'Yeezy 350 Boost',
  'category': 'Fashion',
  'rating': 5,
  'usd': 200,
  'eur': 182,
  'link': "https://stockx.com/adidas-yeezy-boost-350-v2-cream-white?currencyCode=USD&size=8.5&gclid=CjwKCAjwzdLrBRBiEiwAEHrAYr6Goiw3RGnCl12vXPPsgVqOjI-F36X_4AfNaeBDvt6D-mjEkhmVBBoCRBEQAvD_BwE"
};
let mac = {
  'id': shortid.generate(),
  'name': 'Macbook Pro',
  'category': 'Tech',
  'rating': 3,
  'usd': 1299,
  'eur': 1178.31,
  'link': "https://www.apple.com/shop/buy-mac/macbook-pro/13-inch-space-gray-1.4ghz-quad-core-processor-with-turbo-boost-up-to-3.9ghz-128gb?afid=p238%7Csbepnohbm-dc_mtid_1870765e38482_pcrid_246386726307_pgrid_14874568330_&cid=aos-us-kwgo-pla-mac--slid-----product-MUHN2LL/A"
}
let basketball = {
  'id': shortid.generate(),
  'name': 'Wilson Basketball',
  'category': 'Sports',
  'rating': 2,
  'usd': 20,
  'eur': 18.14,
  'link': "https://www.wilson.com/en-us/basketball/balls/evolution/evolution-game-basketball?gclid=CjwKCAjwzdLrBRBiEiwAEHrAYsO1rcrobWjAgngQhHvN_RTM9DJZj_zVaqj5c4KJ7Vw5_S4yYuE4QxoCYssQAvD_BwE&source=googleshopping&ef_id=CjwKCAjwzdLrBRBiEiwAEHrAYsO1rcrobWjAgngQhHvN_RTM9DJZj_zVaqj5c4KJ7Vw5_S4yYuE4QxoCYssQAvD_BwE:G:s&s_kwcid=AL!8492!3!179840140943!!!g!430754648574!&CMPID=Google-wilson-basketball_g_shopping_usa---c-179840140943-"
};

let items = db.get('items');

if (items.value().length === 0) {
  items.push(yeezy).write();
  items.push(mac).write();
  items.push(basketball).write();
}

// const sendFile = function (response, filename) {
//   const type = mime.getType(filename)

//   fs.readFile(filename, function (err, content) {

//     // if the error = null, then we've loaded the file successfully
//     if (err === null) {

//       // status code: https://httpstatuses.com
//       response.writeHeader(200, {
//         'Content-Type': type
//       })
//       response.end(content)

//     } else {

//       // file not found, error code 404
//       response.writeHeader(404)
//       response.end('404 Error: File Not Found')

//     }
//   })
// }

function calcEuroPrice(usd) {
  return (usd * 0.91).toFixed(2);
}

function sortData() {
  // sort the data to ensure favorite are always first 3 elements
  //console.log("IN SORT")
  let sorted = db.get('items').sortBy("rating").value();

  //console.log(sorted)
  //appdata.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating === b.rating) ? ((a.usd > b.usd) ? 1 : -1) : -1);
}

// ROUTING
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/index', function (req, res) {
  console.log("sending index page");
  res.s(__dirname + '/views/index.html');
});

app.get('/items', function (req, res) {
  sortData();
  const items = db.get('items').value(); // get all items

  res.send(items)
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/', function (req, res) {
  let data = req.body
  const newItemObj = {
    'id': shortid.generate(),
    'name': data.name,
    'category': data.category,
    'rating': parseInt(data.rating),
    'usd': parseFloat(data.usd),
    'eur': calcEuroPrice(parseFloat(data.usd)),
    'link': data.link,
  }

  db.get('items').push(newItemObj).write();

  sortData();

  res.writeHead(200, "OK", {
    'Content-Type': 'text/plain'
  })
  res.send()
})

app.put('/', function (request, response) {
  let data = request.body;

  // name
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      name: data.name
    })
    .write()

  // category
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      category: data.category,
    })
    .write()

  // rating
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      rating: parseInt(data.rating),
    })
    .write()

  // price - usd
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      usd: parseFloat(data.usd),
    })
    .write()

  // price - euro
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      eur: calcEuroPrice(parseFloat(data.usd)),
    })
    .write()

  // link
  db.get('items')
    .find({
      id: data.id
    })
    .assign({
      link: data.link,
    })
    .write()

  response.writeHead(200, "OK", {
    'Content-Type': 'text/plain'
  });
  response.end();
})


app.delete('/', function (request, response) {
  let data = request.body;

  db.get('items')
    .remove({
      id: data.id
    })
    .write()

  sortData();

  response.writeHead(200, "OK", {
    'Content-Type': 'text/plain'
  })
  response.end()

})

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});