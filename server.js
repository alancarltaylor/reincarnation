var express = require('express');
var app = express();
var rp = require('request-promise');
var q = require('bluebird');

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});


app.get('/wikipedia/:deathYear', function(req, res) {
  getPerson();
  function getPerson(){
    var deathYear = req.params.deathYear;
    var url = 'https://en.wikipedia.org/w/api.php?&action=query&cmtitle=category:' + deathYear + '%20deaths&list=categorymembers&cmlimit=max&format=json';

    return rp(url, {
      json: true
    }).then(function(response) {
      var arrLen = response.query.categorymembers.length;
      var randomPerson = response.query.categorymembers[Math.floor(Math.random() * (arrLen-1))];
      console.log(randomPerson);
      var pageId = randomPerson.pageid;
      var name = randomPerson.title;

      return person = {
        pageId: pageId,
        name: name,
        birthYear: null,
        deathYear: null,
        imageUrl: null,
        bio: null
      };

    }).then(function(person) {
      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=categories&titles=' + person.name;

      return rp(url, {json: true}).then(function(response) {
        var birthYear = (response.query.pages[person.pageId].categories[0].title.match(/\d{1,4}/)[0]) - 1;
        var deathYear = (response.query.pages[person.pageId].categories[1].title.match(/\d{1,4}/)[0]) - 1;
        console.log(birthYear, deathYear);
        person.birthYear = birthYear ? Number(birthYear) : 1750;
        person.deathYear = deathYear ? Number(deathYear) : 1850;
        return person;
      });
    }).then(function(person) {
      var url = 'https://en.wikipedia.org/w/api.php?&action=query&titles=' + person.name + '&prop=pageimages&format=json';

      return rp(url, {
        json: true
      }).then(function(response) {
        var image = response.query.pages[person.pageId].thumbnail ? response.query.pages[person.pageId].thumbnail.source.replace(/\d+px/, '129px') : null;
        person.imageUrl = image;
        return person;
      });
    }).then(function(person) {
      var url = 'https://en.wikipedia.org/w/api.php?&action=query&titles=' + person.name + '&prop=extracts&exintro=&format=json';

      return rp(url, {
        json: true
      }).then(function(response) {
        var bio = response.query.pages[person.pageId].extract;
        person.bio = bio;
        return person;
      });
    }).then(function(person) {
      res.json(person);
    }).catch(function(e) {
      console.log('=========================', 'FUCK YOU ERROR', '=========================');
      getPerson();
    });
  }
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Reincarnation App is running on localhost:3000!');
});
