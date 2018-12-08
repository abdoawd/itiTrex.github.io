var controller, TRex, loop, gameStarted = false;
var div1 = $("#trex-image");
var div2 = $("#trees-image");
var startBtn = $("#playBtn");
var replayBtn = $("#replayBtn");
var road = document.getElementById("line");
var controller, TRex, loop;
var TRexImgs = ["trex1.png", "trex2.png"];
var isMOving =true;
//var bird =$("#bird");
var audio;
var socreCounter = 0;
TRex = {
  height: 32,
  width: 32,
  jumping: true,
  x: 144,
  x_velocity: 0,
  y: 0,
  y_velocity: 0

};

//load page 
$(function () {
  animate(startBtn);
  div2.css({ display: 'none' });
  replayBtn.css({ top: '200px' });
  replayBtn.css({ display: 'none' });
  $("#bird").css({ display: 'none' });
  stopTrex();

});


//to control trex
controller = {
  left: false,
  right: false,
  up: false,

  // KEYS CONTROL
  keyListener: function (event) {

    var key_state = (event.type == "keydown") ? true : false;

    switch (event.keyCode) {
      // case 37:
      //   controller.left = key_state;
      //   break;
      case 38:
        controller.up = key_state;
        break;
      // case 39:
      //   controller.right = key_state;
      //   break;
    }

  }
};

i = 0;
//Trex image
function newInterval() {
  if (i < TRexImgs.length) {
    document.getElementById("tRexImg").src = TRexImgs[i++];
  } else {
    i = 0;
  }
}

// imagesInterval = setInterval(newInterval, 90);

function stopTrex() {
  clearInterval(imagesInterval);
}

//LOOP
loop = function () {
  if(isMOving){
    if (controller.up && TRex.jumping == false) {

      TRex.y_velocity -= 18;
      TRex.jumping = true;
    }
  
    TRex.y_velocity += 1.2;// gravity
  
    TRex.x += TRex.x_velocity;
    TRex.y += TRex.y_velocity;
  
    // if rectangle is falling below line
    if (TRex.y > 180 - 16 - 32) {
  
      TRex.jumping = false;
      TRex.y = 180 - 16 - 32;
      TRex.y_velocity = 0;
  
    }
  
    $("#trex-image").css({ "top": TRex.y - 15 })
    window.requestAnimationFrame(loop);
  }

  
}

//ADD EVENT LISTENERS (UP & DOWN)
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
 window.requestAnimationFrame(loop);


//start Button
function startGame() {
  isMOving=true;
  window.requestAnimationFrame(loop);
  audio = new Audio('game-audio.mp3');
  imagesInterval = setInterval(newInterval, 90);

  audio.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
  audio.play();
  obstecle1 = document.getElementById("trees-image");
  obstecle1.style.display = "inline";
  score = document.getElementById("score");
  socreCounter = 0;
  counter();
  
  birdTimeout = setTimeout(moveBird,getRandom());
  obstecleMove(obstecle1);
  repeat();
  startBtn.css({ "display": "none" });
  road.style.animation = "move 3s linear infinite";
}

//replay game button
function replay() {
  isMOving = true;
  startGame();
  replayBtn.fadeOut();

}
function getRandom ()
{
  var number = Math.random*10 +5000;
  return number;
}
function counter() {

  scoreInterval = setInterval(function () {
    socreCounter++;
    score.innerHTML = socreCounter;

  }, 100);
  
}

//phase two bird show
function moveBird() {
  $("#bird").css({ display: 'inline' });

  $("#bird").css({ left: '800px' });

  $("#bird").animate({
    left: -100
  }, {
    //to conutrol bird speed
      duration: 1500,
      step: function (now, fx) {
        $("#bird").css("left", now);
        if ($("#bird").position().top == 0)
          $("#bird").css({ top: "-=10px" });
        else
          $("#bird").css({ top: "0px" });
        if (collision(div1, $("#bird"))) {
          $("#bird").css({display:'inline'});

          $("#bird").stop();
          $("#trees-image").stop();
          clearTimeout(birdTimeout);

          stop();
        }
      },
      complete: function () {
        moveBird($("#bird"));
      }
    });
}




function repeat() {
  anim_id = window.requestAnimationFrame(repeat);
}

//start and replay button animation
var moveCounter = 0;
function animate($id) {
  if (this.moveCounter < 300) {

    $id.css({ "top": "+=1px" });
    moveCounter++;
    setTimeout(function () {
      animate($id);
    }, 5);
  }
  else {
    moveCounter = 0;
  }

}
//trees movement
function obstecleMove(obstecle) {
  var obstecleImage = document.getElementById("tree");
  var myPix = new Array("4.png", "2.png", "5.png");
  var randomNum = Math.floor((Math.random() * myPix.length));
  var randomPos = Math.floor((Math.random() * (1000 - 416) + 416));

  obstecleImage.src = myPix[randomNum];
  var pos = randomPos;
  obstecle.style.left = pos + 'px';
  var dure;
   //to conutrol trees speed
  if (socreCounter >= 100) {

    dure = 1500;
  }
  else {
    dure = 2500;
  }
  $("#trees-image").animate({
    left: -100
  }, {
      duration: dure,
      step: function (now, fx) {
        $("#trees-image").css("left", now);
        if (collision(div1, div2)) {
          stop();
          $("#trees-image").stop();
          $("#bird").stop();
          clearTimeout(birdTimeout);

        }
      },
      complete: function () {
        obstecle.src = myPix[randomNum];
        obstecleMove(obstecle);
      }
    });
}

//detect collision
function collision($div1, $div2) {
  var x1 = $div1.offset().left - 20;
  var y1 = $div1.offset().top - 20;
  var h1 = $div1.outerHeight(true) - 20;
  var w1 = $div1.outerWidth(true) - 20;
  var b1 = y1 + h1;
  var r1 = x1 + w1;
  var x2 = $div2.offset().left - 20;
  var y2 = $div2.offset().top - 20;
  var h2 = $div2.outerHeight(true) - 20;
  var w2 = $div2.outerWidth(true) - 20;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}


//stop game
function stop() {
 // $("#bird").css({ display: 'none' });
  audio.pause();
  replayBtn.fadeIn();
  clearInterval(scoreInterval);
  road.style.animation = "move 0s linear infinite";
  isMOving=false ;
  stopTrex();
 
}

// Increase Speed
var speed = 10;
function increaseSpeed() {
  speed -= 5;
  road.style.animation = "move " + speed + "s linear infinite";
}