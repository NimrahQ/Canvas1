window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //canvas settings
  ctx.fillStyle = "green";
  // ctx.fillRect(50,50,100,100);


  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;

  //effect settings
  let size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
    let maxLevel = 8;
    let branches = 2;

  //contols
  let sides = 10;
  let spread = -0.2;
  let scale = 0.85;
  let color = "hsl(" + Math.random() * 360 + ",100%,50%)";
  let lineWidth = 30;
  const randomizeButton = document.getElementById('randomizeButton');
  const resetButton = document.getElementById('resetButton');

  const slider_spread =  document.getElementById("spread");
  const label_spread = document.querySelector('[for="spread"]');
  slider_spread.addEventListener('change', function(e){
    spread = e.target.value;
    updateSlider()
    drawFractal();
  });
  slider_lineWidth = document.getElementById("lineWidth");
  label_lineWidth = document.querySelector('[for="width"]')
  slider_lineWidth.addEventListener('change',function(e){
    lineWidth = e.target.value;
    updateSlider()
    drawFractal();
  })
slider_sides = document.getElementById("sides");
label_sides = document.querySelector('[for="slides"]');
slider_sides.addEventListener('change', function(e){
  sides = e.target.value;
  updateSlider()
  drawFractal();
})
  // ctx.translate(100,100);
  // ctx.rotate(0.4);
  // ctx.fillRect(0,0,canvas.width , canvas.height);
  let pointX =0;
  let pointY = size;
  function drawbranch(level) {
    if (level > maxLevel) return;
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.bezierCurveTo(0,size*spread*-3,200,-200,30,30) ;
    ctx.stroke();
    for (let i = 0; i < branches; i++) {
      
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(scale, scale);
      ctx.save();
      
      ctx.rotate(spread);
      drawbranch(level + 1);
      ctx.restore();

      // ctx.save();
      // ctx.translate(size - (size / branches) * i, 0);
      // ctx.rotate(-spread);
      // drawbranch(level + 1);
      // ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
      ctx.arc(0,size,size * 0.1,0, Math.PI * 2);
      ctx.fill();
  }
  function drawFractal() {
    ctx.clearRect(0,0,canvas.width , canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawbranch(0);

      
    }
    ctx.restore();
    randomizeButton.style.backgroundColor = color;
  }
  drawFractal();

  function randomizefractal() {
 sides =Math.floor( Math.random() * 18 + 2);
 
 spread = Math.random() * 0.6 + 0.3;
 
 scale = Math.random() * 0.4 + 0.4;
 color = "hsl(" + Math.random() * 360 + ",100%,50%)";
 lineWidth = Math.floor(Math.random()*30 + 20);

  }
  randomizeButton.addEventListener('click', function(){
    updateSlider()
    randomizefractal();
    drawFractal();
  });
  function resetFractal(){
    sides =15;
 
 spread =0.85;
 
 scale = 0.2;
 color = "hsl( 290 ,100%,50%)";
 lineWidth =30;
  }
  resetButton.addEventListener('click', function(){
    resetFractal();
    updateSlider();
    drawFractal();
  });
  function updateSlider(){
    slider_spread.value = spread;
    label_spread.innerText = 'spread' + Number(spread).toFixed(3);
    slider_sides.value = sides;
    label_sides.innerText ="Sides:"+ sides;

    slider_lineWidth.value = lineWidth;
    label_lineWidth.innerText = "Width:"+ lineWidth;
  }
  updateSlider()

  this.window.addEventListener('resize' ,function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
    drawFractal();
    size= canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
  });
});
