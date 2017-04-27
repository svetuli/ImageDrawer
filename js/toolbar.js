let toolNum = document.getElementById("tools-toolbar").children[0].childElementCount;
let elem = document.getElementById("tools-toolbar").children[0].children;
var currentTool = 'brush';
c.lineWidth = 10*2;

let dragging = false;

for(let i = 0; i < toolNum - 1; i++){
	elem[i].addEventListener("click", function(e){ setCurrentTool(i) });
}

function brush(){
	canvas.addEventListener("mousedown", engage);
	canvas.addEventListener("mousemove", down);
	canvas.addEventListener("mouseup", disengage); 
}

var down = function(e){
	drawPath(e.offsetX, e.offsetY, 10);
}

var point = function(e){
	drawPoint(e.offsetX, e.offsetY, 10);
}

var engage = function(){
	dragging = true;
}

var disengage = function(){
	dragging = false;
	c.beginPath();
}

function drawPath(x, y, radius){	
	if(dragging){
		c.lineTo(x, y);
		c.strokeStyle = "black";
		c.stroke();
		c.beginPath();
		c.arc(x, y, radius, 0, 2*Math.PI);
		c.fillStyle = "black";
		c.fill();
		c.beginPath();
		c.moveTo(x, y);
	}
}

function drawPoint(x, y, radius){
	c.beginPath();
	c.arc(x, y, radius, 0, 2*Math.PI);
	c.fillStyle = "black";
	c.fill();
	c.strokeStyle = "black";
	c.stroke();
	c.beginPath();
}

function line(){
	removeEventListeners();

	canvas.addEventListener("mousedown", function(e){ 
		c.moveTo(e.offsetX,e.offsetY) 
		console.log("offsetX: ", e.offsetX, " offsetY: ", e.offsetY);
	});
	canvas.addEventListener("mouseup", function(e){ 
		c.lineTo(e.offsetX, e.offsetY);
		c.stroke();
		console.log("offsetX: ", e.offsetX, " offsetY: ", e.offsetY);
	});
}

function removeEventListeners(){
	canvas.removeEventListener("mousedown", engage);
	canvas.removeEventListener("mousemove", down);
	canvas.removeEventListener("mouseup", disengage);
}

function setCurrentTool(i){
	currentTool = elem[i].id;
	console.log(elem[i].id ,' tool selected');

	switch(currentTool){
		case 'line':
			line();
			break;
		case 'circle':
			circle();
			break;
		case 'square':
			square();
			break;
		case 'eraser':
			eraser();
			break;
		case 'undo':
			undo();
			break;
		case 'bin':
			bin();
			break;
		default:
			//var a = c.cloneNode(true);
			//c.parentNode.replaceChild(a, c);
			brush();
	}
}