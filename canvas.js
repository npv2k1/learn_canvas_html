// Hiển thị log
function logg(e) {
  console.log("Position: ", e.clientX, ":", e.clientY);
}



/**
 * TODO Chuyển mã màu RGB sang hex
 * @param {Decimal} c 
 */
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * TODO Khởi tạo
 */
var arr = []; //Tạo mảng để nhớ những điểm đã vẽ
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas"); // Xác định canvas
  const ctx = canvas.getContext("2d"); // tạo context 2d để thao tác
  // resize canvas
  canvas.height = 500;
  canvas.width = 1000;

  var preX, preY; // Lưu lại tọa độ điểm trước đó

  let p = false;

  ctx.lineWidth = 10; // Bề rộng đường vẽ
  ctx.lineCap = "round"; // Loại đường vẽ

  /**
   * TODO hàm vẽ.
   * ! e: chứa toàn bộ thông tin khi sự kiện kích hoạt (tọa độ chuôt, ...)
   * @param {event} e
   * ! canvas.offsetLeft : trả về vị trí canvas với đối tượng cha
   * ! trả về tọa độ chuột e.clientX
   */
  function draw(e) {
    if (!p) return;

    ctx.beginPath();
    ctx.moveTo(preX, preY); // di chuyển đến tọa tộ (...,...)
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop); // vẽ 1 đường tới toạn độ (..., ...). nếu không có moveTo thì nó sẽ vẽ thành những chấm
    preX = e.clientX - canvas.offsetLeft;
    preY = e.clientY - canvas.offsetTop;
    arr.push([e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop]);
    ctx.stroke();
    ctx.closePath();
  }
  canvas.addEventListener("mousedown", (e) => {
    p = true;
    ctx.beginPath();
    ctx.strokeStyle = "black"; // đặt màu cho đường vẽ
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
  });
  canvas.addEventListener("mousemove", (e) => {
    draw(e);
  });
});
/**
 * TODO xóa canvas
 */
function clearCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
/**
 * TODO vẽ lại theo mảng arr
 */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function delay(delayInms) {
  // delay function
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
}
function drawAgain() {
  autoDraw(arr);
  arr = [];
}
