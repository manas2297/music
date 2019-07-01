$(document).ready(function(){
    $('.title').click(function(){
      $('.container').addClass('open');
    });
    
    
    $('.close').click(function(){
      $('.container').removeClass('open');
    });
  });
  
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var particles = [];
  var num_particles = 200;
  
  //Randomize particles colors
  function GetRandomColor() {
      var r = 0, g = 0, b = 0;
      while (r < 100 && g < 100 && b < 100)
      {
          r = Math.floor(Math.random() * 256);
          g = 0;
          b = 0;
      }
   
      return "rgb(" + r + "," + g + ","  + b + ")";
  }
  
  //Create Particles
  var Particle = function () {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = 4 * Math.random() - 2;
    this.vy = 4 * Math.random() - 2;
    this.Color = GetRandomColor();
    this.randomBaseLen = Math.floor(Math.random() * 22) + 5;
  }
  
  //Add draw function to particle prototype
  Particle.prototype.Draw = function (ctx) {
      var radians = 45;
      var posX = this.x;
      var posY = this.y;
      var baseLen = this.randomBaseLen;
  
      ctx.save();
  
      // this moves origin 0,0 to our desired location
      ctx.translate(posX, posY);
  
      // optional: use context.rotate(0) to visualize
      // how we're drawing the heart using a square
      // and two half-circles
      ctx.rotate(3.95);
  
      // puts the 2d drawing context into drawing mode
      ctx.beginPath();
      ctx.moveTo(-baseLen, 0);
      ctx.arc(0, 0, baseLen, 0, Math.PI, false);
      ctx.lineTo(baseLen, 0);
      ctx.arc(baseLen, -baseLen, baseLen, Math.PI * 90 / 180, Math.PI * 270 / 180, true);
      ctx.lineTo(baseLen, -baseLen * 2);
      ctx.lineTo(-baseLen, -baseLen * 2);
      ctx.lineTo(-baseLen, 0);
  
      // Fill the heart
      ctx.fillStyle = this.Color;  
      ctx.fill();
  
      // tells 2d drawing context we're done drawing
      ctx.closePath();
  
      // restores canvas state (e.g. origin and other settings)
      ctx.restore();
      
  }
  
  //Add Update function to particle prototype
  Particle.prototype.Update = function () {
      this.x += this.vx / 2;
      this.y += this.vy / 2;
   
      if (this.x<0 || this.x > canvas.width)
          this.vx = -this.vx;
   
      if (this.y < 0 || this.y > canvas.height)
          this.vy = -this.vy;
  }
  
  //Add the main loop
  function loop(state) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   
      for (var i = 0; i < num_particles; i++) {
          particles[i].Update();
          particles[i].Draw(ctx);
      }
      
      requestAnimationFrame(loop);
  }
  
  //Create particles and start the loop
  for (var i = 0; i < num_particles; i++){
      particles.push(new Particle());
  }
  
  loop();
  
  