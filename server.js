var express = require('express');
var app = express();
var rp = require('request-promise');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});


app.get('/wikipedia/:deathYear', function (req, res) {
  var deathYear = req.params.deathYear;

  var data = { people: [], iterationCount: 0 };

  doWork();

  function doWork(birthYear) {
    deathYear = birthYear || deathYear;
    console.log('person', data);

    var url = 'https://en.wikipedia.org/w/api.php?&action=query&cmtitle=category:' + deathYear + '%20deaths&list=categorymembers&cmlimit=max&format=json';
    rp(url, {json: true}).then(function(response){
      var randomPerson = response.query.categorymembers[Math.floor(Math.random() * (499))];
      var pageId = randomPerson.pageid;
      var name = randomPerson.title;

      data.people.push({
        pageId: pageId,
        name: name,
        birthYear: null,
        deathYear: null,
        imageUrl: null,
        bio: null
      });

    }).then(function() {
      var person = data.people[data.iterationCount];
      var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=categories&titles=' + person.name;

      rp(url, {json: true}).then(function(response) {
        var birthYear = (response.query.pages[person.pageId].categories[0].title.match(/\d{1,4}/)[0]) - 1;
        var deathYear = (response.query.pages[person.pageId].categories[1].title.match(/\d{1,4}/)[0]) - 1;
        person.birthYear = birthYear ? Number(birthYear) : 1750;
        person.deathYear = deathYear ? Number(deathYear) : 1850;
      })

    }).then(function() {
      var person = data.people[data.iterationCount];
      var url = 'https://en.wikipedia.org/w/api.php?&action=query&titles=' + person.name + '&prop=pageimages&format=json';

      rp(url, {json: true}).then(function(response) {
        var image = response.query.pages[person.pageId].thumbnail ? response.query.pages[person.pageId].thumbnail.source.replace(/\d+px/, '129px') : null;
        person.imageUrl = image;

        //if (data.iterationCount < 6) return doWork( person.birthYear );
      })

    }).then(function () {
      var person = data.people[data.iterationCount];
      var url = 'https://en.wikipedia.org/w/api.php?&action=query&titles=' + person.name + '&prop=extracts&exintro=&format=json';

      rp(url, {json: true}).then(function(response){
        var bio = response.query.pages[person.pageId].extract;
        person.bio = bio;
        if (data.iterationCount !== 5) return doWork( person.birthYear );

      })

    }).then(function(){
      if (data.iterationCount === 4) res.json(data);
      data.iterationCount = data.iterationCount+1;
    });

  }

  });






app.listen(3000, function () {
  console.log('Reincarnation App is running on localhost:3000!');
});
