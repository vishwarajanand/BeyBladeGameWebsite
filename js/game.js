var resource = {};
var game_configs = {};
var ctx; // = $("#game").getContext("2d");
var $ = function (q) {
  return document.querySelector(q);
};

function load(key, url, callback) {
  if (resource[key]) {
    callback(resource[key]);
    return;
  } else {
    var img = new Image();
    img.onload = function () {
      resource[key] = img;
      callback(resource[key]);
    };
    resource[key] = false;
    img.src = url;
  }
}

function draw_board() {
  // console.log(img.width, img.height);
  ctx.mozImageSmoothingEnabled = false;
  ctx.webkitImageSmoothingEnabled = false;
  ctx.msImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  //draw game board
  ctx.beginPath();
  game_configs["width"] = $("#game").width;
  game_configs["height"] = $("#game").height;
  game_configs["center_x"] = Math.min($("#game").width, $("#game").height) / 2;
  game_configs["center_y"] = Math.min($("#game").width, $("#game").height) / 2;
  game_configs["radius_big"] = ($("#game").width + $("#game").height - 10) / 4;
  game_configs["radius_mid"] =
    (($("#game").width + $("#game").height - 10) * 0.6) / 4;
  game_configs["radius_small"] =
    (($("#game").width + $("#game").height - 10) * 0.2) / 4;
  ctx.strokeStyle = "#FF0000";
  ctx.arc(
    game_configs["center_x"],
    game_configs["center_y"],
    game_configs["radius_big"],
    0,
    2 * Math.PI
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(
    game_configs["center_x"],
    game_configs["center_y"],
    game_configs["radius_mid"],
    0,
    2 * Math.PI
  );
  ctx.strokeStyle = "#00FF00";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(
    game_configs["center_x"],
    game_configs["center_y"],
    game_configs["radius_small"],
    0,
    2 * Math.PI
  );
  ctx.strokeStyle = "#0000FF";
  ctx.stroke();
  // ctx.drawImage(
  //   img,
  //   0,
  //   0,
  //   img.width,
  //   img.height,
  //   0,
  //   0,
  //   $("#game").width,
  //   $("#game").height
  // );

  console.log($("#game").height, $("#game").width);
}

window.onload = function () {
  ctx = $("#game").getContext("2d");
  draw_board();

  load("img_beyblade1", "img/beyblade1.png", function (img) {
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      10,
      game_configs["center_y"],
      10,
      10
    );
    console.log($("#game").height, $("#game").width);
  });
};
