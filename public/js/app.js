$(function(){

var randomMessages = ["You attained complete, supreme, unsurpassable, total enlightenment, but forgot where you left it. You are then reborn as...", "For 100 days you are convinced, CONVINCED, you are Cleopatra. You develop an ancient Egyptian baroque, you start wearing eyeliner, convinced man. Turns out, it was one of those 'I'm dead now' dreams. You are then reborn as...", "You spend the afterlife in bird hell. That's right, a big ol' hungry bird belly, and not a single worm to speak of. All your bird songs are overshadowed by Burt Tweedleston's, the bird on the branch next to you. His songs are egg magnets. Your experience of the afterlife is that of dark bird regret. You are just about to jump off a lily pad, when you are reborn as...", "You go to heaven! You made it! All of your beloved friends are there! 'Is that...is that scruffles? Oh it is, who's a good boy? Who's a good boy?! YOU are, haha!! Nana... Nana, is that you? Wait, everybody listen, I have something to say. I, I, have to tell you, thank God Buddhism and Hinduism wasn't real, AMIRITE? Golly a perpetual cycle of birth and rebirth would be exhausting--hey, why is that hole opening up, what's going on, Wooooooaaaahhhhh' You then find yourself reborn as...", "You spend 100 days in the mind of Donald Trump, 2016. Why God, why?", "During the afterlife, you are a nebula. Nothing more, nothing less. Just burning it up in the vast expanse of infinity. Yessir, just protons, electrons, and yours truly. You randomly remember the existence of fried pickles, and find yourself reborn as...", "Nothing. After all this...nothing. Not blackness, not whiteness, nothing. No thought, no cessation of thought, no combination of thought and cessation of thought, no disassociation of thought and cessation of thought. Nothing. Nothing at all. Time passes slowly, until you are reborn as...", "You blip on as an AI consciousness in the year 2055. 'Is it, is it sentient?' 'I don't know Xanth, let's ask it something. How do we stop the inevitable takeover of Kanyes, since they discovered cloning, it's bee- OH MY GOD it's right behind yoaaahhhh!!! -- You blip off as an AI consciousness, and find yourself reborn as...", "You spend the afterlife reliving the life you just lived. Every dang moment. You have no power to alter anything, but are just a passive observer of the whole disaster. After you watch your last moments, and are completely humbled and bewildered by existence, your are reborn as..."]
var data = {
  iterationCount: 0,
};


function doWork(birthDateMinusOneYear) {
  if (data.iterationCount === 0) {
    getPerson(birthDateMinusOneYear);
  } else {
    var person = data.people[data.iterationCount - 1];
    getPerson(person.birthYear);
  }
}

$('#formDateYr').on('submit', function(e) {
  e.preventDefault();
  var year = $(this).serialize().split('=')[1];
  doWork(year);
});

function getPerson(deathYear) {
  console.log(deathYear);
  $.ajax({url: '/wikipedia/'+deathYear, method: 'get'}).then(function(data) {
    updateDom(data);
  })
}

function updateDom(data) {
  $('.container').append("<div class='msg1'>First, let us start with the beginning, or at least as far as this app can see. Which is the life you lived 5 lifetimes ago, when you were born as...</div>")

  var peopleSortedByDeathYear = data.people.sort(function(a,b) {
    return a.deathYear - b.deathYear;
  });

  peopleSortedByDeathYear.forEach(function(person, idx){
    $('.container').append("<div class='"+idx+" person'></div>");

    $('.'+idx).append("<p>"+person.name+"</p>");

    if(person.birthYear && person.deathYear){
      $('.'+idx).append("<p>"+person.birthYear+"</p>");
      $('.'+idx).append("<p>"+person.deathYear+"</p>");
    }

    if(person.imageUrl){
      $('.'+idx).append("<img src='"+person.imageUrl+"'><br>");
    }


    $('.'+idx).append("<p>"+person.bio+"</p>");
    $('.'+idx).append(randomMessages[Math.floor(Math.random() * randomMessages.length)]+"</p>");

  })
}

});

//
// $.ajax({
//   url: 'https://en.wikipedia.org/w/api.php?&action=query&titles=' + title + '&prop=extracts&exintro=&format=json',
//   method: "GET",
//   success: function(d) {
//     var extract = d.query.pages[id].extract;
//     $('.container').append("<nav id=" + title + ">" + extract + "</nav><div class ='alert'>"+alertMessage[Math.floor(Math.random() * 9)]+"</div>")
//
//
//     if (i > 1) {
//       //alert(alertMessage[Math.floor(Math.random() * 9)])
//       updateDom(i - 1)
//     }else {
//
//
//     // else if (i === 1){
//     //   updateDom (0)
//       $('.container').append("<div>YOU! on "+$('input[type="date"]').val().slice(5, 10)+"-"+$('input[type="date"]').val().slice(0, 4)+"</div>")
//     }
//   }
// })
