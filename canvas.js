function logg(e) {
  console.log("Position: ", e.clientX, ":", e.clientY);
}
var arr = [];
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.height = 500;
  canvas.width = 1000;
  //   ctx.fillRect(0, 0, 50, 50);
  //   console.log("hello");

  //   ctx.beginPath();
  //   ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
  //   ctx.moveTo(110, 75);
  //   ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
  //   ctx.moveTo(65, 65);
  //   ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
  //   ctx.moveTo(95, 65);
  //   ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
  //   ctx.stroke();
  // Cubic curves example

  //   ctx.beginPath();
  //   ctx.moveTo(75, 40);
  //   ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  //   ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  //   ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  //   ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  //   ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  //   ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  //   ctx.fill();

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  var r = 50,
    g = 50,
    b = 50;
  var preX, preY;
  let p = false;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  function draw(e) {
    if (!p) return;

    ctx.beginPath();
    // logg(e);
    ctx.moveTo(preX, preY);
    // ctx.moveTo(0, 0);
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    preX = e.clientX - canvas.offsetLeft;
    preY = e.clientY - canvas.offsetTop;
   
    arr.push([e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]);
    // console.log(r,g,b)
    // if(r<=255){
    //     ctx.strokeStyle = rgbToHex(r, g, b);
    //     r++;
    // }
    // else{
    //     if(g<=255){
    //          ctx.strokeStyle = rgbToHex(r, g, b);
    //          g+=30;
    //          r=0;
    //     }
    //     else{
    //         if(b<=255){
    //             ctx.strokeStyle = rgbToHex(r, g, b);
    //             b++;
    //             g=0;
    //             r=0;
    //         }
    //     }
    // }

    //ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.closePath();
    
  }

  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
  async function autoDraw(arr) {
    ctx.beginPath();
    ctx.moveTo(0, 0);

    // arr.forEach(i=>{
    //     //console.log(i)

    //     ctx.lineTo(i[0], i[1]);

    // })

    for (var i = 1; i < arr.length; i++) {
      ctx.beginPath();
      ctx.lineTo(arr[i][0], arr[i][1]);

      ctx.stroke();
      let delayres = await delay(10);
    }
  }

  canvas.addEventListener("mousedown", (e) => {
    p = true;
    ctx.beginPath();
    ctx.strokeStyle="black"
    preX = e.clientX - canvas.offsetLeft;
    preY = e.clientY - canvas.offsetLeft;
    ctx.moveTo(e.clientX, e.clientY);
    if (arr.length == 0) {
      arr.push([preX, preY]);
    }
    draw(e);
    logg(e);
  });
  canvas.addEventListener("mouseup", () => {
    p = false;
    console.log(arr);
   

    //tx.clearRect(0, 0, canvas.width, canvas.height);
    //autoDraw(arr);
    //arr = [];
  });
  canvas.addEventListener("mousemove", (e) => {
    draw(e);
  });
});

function clearCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
async function autoDraw(arr) {
  ctx.beginPath();
  ctx.moveTo(arr[0][0], arr[0][1]);
  ctx.strokeStyle = "red";
    for (var i = 1; i < arr.length; i++) {
        
      ctx.beginPath();
      ctx.moveTo(arr[i-1][0], arr[i-1][1]);
      ctx.lineTo(arr[i][0], arr[i][1]);

      ctx.stroke();
      let delayres = await delay(1);
    }
    // for (var i = 1; i < 1000; i++) {
    //   ctx.beginPath();
    //   ctx.lineTo(i+10, i+50);

    //   ctx.stroke();
    //   let delayres = await delay(1);
    // }
}

function drawAgain() {
  autoDraw(arr);
  arr = [];
}
