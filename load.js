$(window).bind("load", function () {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var jellies = [];

  jellies.push(new Jellyfish(context));
  jellies.push(new Jellyfish(context));
  jellies.push(new Jellyfish(context, 50, 100, 0.7, 6));
  jellies.push(new Jellyfish(context, 570, 90, 0.3, 3));
  jellies.push(new Jellyfish(context, 570, 90, 0.3, 5));

  requestAnimationFrame(mainLoop);

  //Game Loop
  function mainLoop() {
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }

  function update() {
    jellies.forEach(function (c) {
      c.update();
    });
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    jellies.forEach(function (c) {
      c.draw();
    });
    context.restore();
  }
});
