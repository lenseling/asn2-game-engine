function Jellyfish(context, x, y, sz, numTentacles) {
  // Jellyfish properties
  this.size = sz || 0.5;
  this.tentacleSwaySpeed = 0.05;
  this.posX = x || 300;
  this.posY = y || 200;
  this.tentacleSwayAngle = 0;
  this.context = context;
  this.numTentacles = numTentacles || 4;
  this.velocityX = Math.random() * 2 - 1;
  this.velocityY = Math.random() * 2 - 1;
  this.heading = Math.atan2(this.velocityX, -this.velocityY);
  const colors = ["#FFB347", "#FF69B4", "#DDA0DD"];
  this.color = colors[Math.floor(Math.random() * colors.length)];
}

// Draw a tentacle with a motion
Jellyfish.prototype.drawTentacle = function (tentacleIndex) {
  const sway = Math.sin(this.tentacleSwayAngle + tentacleIndex) * 10; // Sway side to side using sine wave
  const tentacleLength = 80;

  this.context.strokeStyle = this.color;
  this.context.lineWidth = 2;

  // Draw the swaying tentacle
  this.context.beginPath();
  this.context.moveTo(0, -40); // Positioning
  this.context.bezierCurveTo(
    sway,
    tentacleLength / 3,
    sway * 1.5,
    (tentacleLength * 2) / 3,
    sway,
    tentacleLength
  );
  this.context.stroke();
};

// Draw the jellyfish body (semi-circle head)
Jellyfish.prototype.drawBody = function () {
  this.context.beginPath();
  this.context.arc(0, 0, 45, Math.PI, false);
  this.context.fillStyle = this.color;
  this.context.fill();
  this.context.closePath();
};

Jellyfish.prototype.drawFace = function () {
  this.context.fillStyle = "black";

  this.context.beginPath();
  this.context.arc(-15, -15, 5, 0, Math.PI * 2, true);
  this.context.fill();

  this.context.beginPath();
  this.context.arc(15, -15, 5, 0, Math.PI * 2, true);
  this.context.fill();

  this.context.strokeStyle = "black";
  this.context.lineWidth = 2;

  this.context.beginPath();
  this.context.moveTo(-5, -10);
  this.context.quadraticCurveTo(0, -5, 5, -10);
  this.context.stroke();
};

Jellyfish.prototype.draw = function () {
  this.context.save();
  this.context.translate(this.posX, this.posY);
  this.context.rotate(this.heading);
  this.context.scale(this.size, this.size);
  this.drawBody();
  this.drawFace();

  for (let i = 0; i < this.numTentacles; ++i) {
    this.context.save();
    // (y = 40 is the radius of the semi-circle)
    this.context.translate(
      (80 / this.numTentacles) * i - 30, // space tentacles around the bottom edge
      40
    );
    this.drawTentacle(i);
    this.context.restore();
  }

  this.context.restore();
};

Jellyfish.prototype.update = function () {
  this.tentacleSwayAngle += this.tentacleSwaySpeed;
  this.posX += this.velocityX;
  this.posY += this.velocityY;

  // Canvas edges
  if (this.posX < 0) {
    this.posX = 0;
    this.velocityX *= -1;
  }
  if (this.posX > this.context.canvas.clientWidth) {
    this.posX = this.context.canvas.clientWidth;
    this.velocityX *= -1;
  }
  if (this.posY < 0) {
    this.posY = 0;
    this.velocityY *= -1;
  }
  if (this.posY > this.context.canvas.clientHeight) {
    this.posY = this.context.canvas.clientHeight;
    this.velocityY *= -1;
  }

  this.heading = Math.atan2(this.velocityX, -this.velocityY);
};
