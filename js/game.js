var jet = document.getElementById("jet");
var board = document.getElementById("board");
board.style.height = window.innerHeight - 250 + "px";

var boardheight = parseInt(window.getComputedStyle(board).getPropertyValue("height"));
var boardwidth = parseInt(window.getComputedStyle(board).getPropertyValue("width"));
var jetheight = parseInt(window.getComputedStyle(jet).getPropertyValue("height"));
var jetwidth = parseInt(window.getComputedStyle(jet).getPropertyValue("width"));
var isGameOver = false;

function incrementScore() {
  // scoreboard
  var score_elem = document.getElementById("points");
  if (isGameOver) {
    score_elem.innerHTML = "Final Score: " + parseInt(score_elem.innerHTML);
  } else {
    score_elem.innerHTML = (parseInt(score_elem.innerHTML) ? 1 + parseInt(score_elem.innerHTML) : 1);
  }
}

function moveLeft() {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (left > 0) {
    jet.style.left = left - 10 + "px";
    jet.style.transform = "rotate(45deg)";
  }
}

function moveRight() {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (left <= (boardwidth - jetwidth)) {
    jet.style.left = left + 10 + "px";
    jet.style.transform = "rotate(-45deg)";
  }
}

function shoot() {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (isGameOver) {
    return;
  }
  var bullet = document.createElement("div");
  bullet.classList.add("bullets");
  board.appendChild(bullet);

  var movebullet = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");

    for (var i = 0; i < rocks.length; i++) {
      var rock = rocks[i];
      if (rock != undefined) {
        var rockbound = rock.getBoundingClientRect();
        var bulletbound = bullet.getBoundingClientRect();

        //Condition to check whether the rock/alien and the bullet are at the same position..!
        //If so,then we have to destroy that rock

        if (
          bulletbound.left >= rockbound.left &&
          bulletbound.right <= rockbound.right &&
          bulletbound.top <= rockbound.top &&
          bulletbound.bottom <= rockbound.bottom
        ) {
          rock.parentElement.removeChild(rock); //Just removing that particular rock;
          incrementScore();
        }
      }
    }
    var bulletbottom = parseInt(
      window.getComputedStyle(bullet).getPropertyValue("bottom")
    );

    //Stops the bullet from moving outside the gamebox
    if (bulletbottom >= boardheight) {
      clearInterval(movebullet);
    }

    bullet.style.left = left + "px"; //bullet should always be placed at the top of my jet..!
    bullet.style.bottom = bulletbottom + 3 + "px";
  });
}

// add arrow keypress listeners
window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft") {
    moveLeft();
  }
  else if (e.key == "ArrowRight") {
    moveRight();
  }
  if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.keyCode == 32) {
    //32 is for space key
    shoot();
  }
});

// add swipe listeners
document.addEventListener('swiped-left', function (e) {
  moveLeft();
});
document.addEventListener('swiped-right', function (e) {
  moveRight();
});
document.addEventListener('swiped-up', function (e) {
  shoot();
});
document.addEventListener('swiped-down', function (e) {
  shoot();
});

var generaterocks = setInterval(() => {
  var rock = document.createElement("div");
  var rockwidth = window.getComputedStyle(rock).getPropertyValue("width");
  rock.classList.add("rocks");
  //Just getting the left of the rock to place it in random position...
  var rockleft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //generate value between 0 to 450 where 450 => board width - rock width
  rock.style.left = Math.floor(Math.random() * (boardwidth - rockwidth)) + "px";

  board.appendChild(rock);
}, 1200);

var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      var rock = rocks[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      var rockheight = parseInt(
        window.getComputedStyle(rock).getPropertyValue("height")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= (boardheight - rockheight + 25) && !isGameOver) {
        // alert("Game Over");
        isGameOver = true;
        incrementScore();
        clearInterval(moverocks);
        // setTimeout(() => { window.location.reload(); }, 5000);
      }
      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 900);

// function debug() {
//   var boardheight = window.getComputedStyle(board).getPropertyValue("height");
//   var boardwidth = window.getComputedStyle(board).getPropertyValue("width");
//   var jetheight = window.getComputedStyle(jet).getPropertyValue("height");
//   var jetwidth = window.getComputedStyle(jet).getPropertyValue("width");
//   var pos = {
//     board: [boardheight, boardwidth],
//     jet: [jetheight, jetwidth],
//     jet_pos: [window.getComputedStyle(jet).getPropertyValue("left"), window.getComputedStyle(jet).getPropertyValue("top")]
//   };
//   console.table(pos);
// }
