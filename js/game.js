window.onload = function () {
  var c = document.getElementById("game");
  var ctx = c.getContext("2d");
  // var img = document.getElementById("img/bb_board.png");
  var img = new Image();
  img.src = "img/bb_board.png";
  img.onload = function () {
    ctx.drawImage(img, 2, 2);
    console.log("the image is drawn");
  };

  ctx.drawImage(img, 1, 1, 1000, 1000);
};
