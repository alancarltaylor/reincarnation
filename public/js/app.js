$(function(){

  var randomMessages = ["In the afterlife, you attain complete, supreme, unsurpassable, total enlightenment, but forgot where you left it. You are then reborn as...", "In the afterlife, for 100 days you are convinced, CONVINCED, you are Cleopatra. You develop an ancient Egyptian baroque, you start wearing eyeliner, convinced man. Turns out, it was one of those 'I'm dead now' dreams. You are then reborn as...", "You spend the afterlife in bird hell. That's right, a big ol' hungry bird belly, and not a single worm to speak of. All your bird songs are overshadowed by Burt Tweedleston's, the bird on the branch next to you. His songs are egg magnets. Your experience of the afterlife is that of dark bird regret. You are just about to jump off a lily pad, when you are reborn as...", "In the afterlife, you go to heaven! You made it! All of your beloved friends are there! 'Is that...is that scruffles? Oh it is, who's a good boy? Who's a good boy?! YOU are, haha!! Nana... Nana, is that you? Wait, everybody listen, I have something to say. I, I, have to tell you, thank God Buddhism and Hinduism wasn't real, AMIRITE? Golly, a perpetual cycle of birth and rebirth would be exhausting--hey, why is that hole opening up, what's going on, Wooooooaaaahhhhh' You then find yourself reborn as...", "In the afterlife, you spend 100 days in the mind of Donald Trump. Why God, why? You are then reborn as...", "During the afterlife, you are a nebula. Nothing more, nothing less. Just burning it up in the vast expanse of infinity. Yessir, just protons, electrons, and yours truly. You randomly remember the existence of fried pickles, and find yourself reborn as...", "In the afterlife, there is nothing. After all this...nothing. Not blackness, not whiteness, nothing. No thought, no cessation of thought, no combination of thought and cessation of thought, no disassociation of thought and cessation of thought. Nothing. Nothing at all. Time passes slowly, until you are reborn as...", "In the afterlife, you blip on as an AI consciousness in the year 2055. 'Is it, is it sentient?' 'I don't know Xanth, let's ask it something. How do we stop the inevitable takeover of Kanyes, since they discovered cloning, it's bee- OH MY GOD it's right behind yoaaahhhh!!! -- You blip off as an AI consciousness, and find yourself reborn as...", "You spend the afterlife reliving the life you just lived. Every dang moment. You have no power to alter anything, but are just a passive observer of the whole disaster. After you watch your last moments, and are completely humbled and bewildered by existence, your are reborn as...", "In the afterlife, in your local heaven precinct, you randomly win the drawing for 'be God Almighty for the day'. Even with limitless sentience, you still end up being intrigued by the dilemma of if there is a fart so large that God himself couldn't light it. You are immediately reborn as...", "In the afterlife, you're a rock for a little bit. Good stuff. You're then reborn as...", "In the afterlife, you keep reliving the Howard Dean scream, like, over and over. Universe is weird dude.", "In the afterlife, you spend a brief period as a corporate entity. This is weird, and you're not sure how it all happened, but, you were the disembodied consciousness of Goldman Sachs during the first fiscal quarter of 2008. You are then reborn as...", "In the afterlife, you find your consciousness briefly inhabiting the body of a very drunken man from a people that existed before recorded human history. You use this opportunity to tell Blorfling, the finest dang person you've ever seen this side of Glangledorf, exactly how you've always felt. You are then immediately reborn as...", "For this afterlife, you are the gleam in a George Clooney's eye, everytime he smiles. While feeling a little used, you are also happy to have helped out humanity, even for just a little bit. That wears off quick, and you are reborn as..", "In the afterlife, you're a cloud for a little bit! Good stuff! Then you find yourself screaming from the gestational stress of being pushed out of another human and open your eyes as...", "You spend the entire afterlife as an argument, being passed and returned from function after function. You are then reborn as...", "In the afterlife, you are in heaven...again... kinda boring. One morning you wake up and decide to become a fervent, evangelical, fire and brimstone preacher among your fellow angels. You are immediately reincarnated as...", "In the afterlife, you're Kenny in an episode of South Park for, what seems like, 22 minutes. Then you are reborn as...",
  "In the afterlife, you are the singing worm in a runaway Vaudeville act from the late 1800's for a minute. Then you are reborn as...", "In the afterlife, your last life has escaped you entirely, yet it's memory still brings you joy. St. Peter often finds you watching old VHS tapes of your past life. 'Everything ok?', St Peter asks. 'Oh, sure, y'know, just catching up on the old days. Dont know what I would ever do without these precious, precious memories.' You are immediately reborn as...", "In the afterlife, you exist as the song Claire de Lune for a while. You are then reborn as..."]
  data = {people: [], counter: 0};

    $('button').on('click', function(){
      $('form').slideUp(5000);
      var birthDateMinusOneYear = ($('input[type="date"]').val().slice(0, 4)) - 1;
      var birthDateWithoutMinusOneYear = $('input[type="date"]').val().slice(0, 4)
      localStorage.setItem('bYear', birthDateWithoutMinusOneYear)
      if (birthDateMinusOneYear > 999){
      data = {people: [], counter: 0};
      $('.container').empty();
      getPerson(birthDateMinusOneYear);
      } else {alert ('Please type in your real birthday')}

  });

  function getPerson(deathYear) {
    console.log(deathYear);

    $.ajax({url: '/wikipedia/'+deathYear, method: 'get'}).then(function(response) {
      data.people.push(response);
      if(data.counter < 4) {
        data.counter += 1;
        return getPerson(response.birthYear);
      } else {
        updateDom();
      }
    })
  }

  function updateDom() {
    $('.container').append("<div class='msg1' id='top'>First, let us start with the beginning, or at least as far back as this app can see. This is the life you lived 5 lifetimes ago, when you were born as, believe it or not...</div>")

    var peopleSortedByDeathYear = data.people.sort(function(a,b) {
      return a.deathYear - b.deathYear;
    });

    peopleSortedByDeathYear.forEach(function(person, idx){
      $('.container').append("<div class='"+idx+" person'></div>");

      $('.'+idx).append("<p>"+person.name+"</p>");

      if(person.birthYear && person.deathYear){
        $('.'+idx).append("<p class='dates'>"+(person.birthYear*1+1)+" - "+(person.deathYear*1+1)+"</p>");
      }

      if(person.imageUrl){
        $('.'+idx).append("<img src='"+person.imageUrl+"'><br>");
      }


      $('.'+idx).append("<p>"+person.bio+"</p>");
      $('.container').append("<div class='msg2'><p class="+idx+">"+randomMessages[Math.floor(Math.random() * randomMessages.length)]+"</div>");

    })
    $('p.4').append("<p>You! At least as you were on <br>"+$('input[type="date"]').val().slice(5, 7)+"·"+$('input[type="date"]').val().slice(8, 10)+"·"+localStorage.getItem('bYear')+"</p>");
    $('.container').append("<footer>Alan Taylor · <a href='https://github.com/alancarltaylor'>Github</a></footer>")

  }

});
