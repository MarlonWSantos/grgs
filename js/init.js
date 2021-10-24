//AxisX x1,y1,x2,y2
const POINTS_AXIS_X=[20,500,750,500];
//AxisY x1,y1,x2,y2
const POINTS_AXIS_Y=[20,20,20,500];

function init(){
	selectCheckbox(false);
	loadScreen();
}

function selectCheckbox(selectedCheckbox){
	var components = document.getElementsByClassName("form-check-input");
	
	for(j=0;j<=components.length-1;j++){
		components[j].checked=selectedCheckbox;

	}
}

function loadScreen(){
	var axisX,axisY;

	//AxisX x1,y1,x2,y2
	drawAxis(axisX,POINTS_AXIS_X[0],POINTS_AXIS_X[1],POINTS_AXIS_X[2],POINTS_AXIS_X[3])
	//AxisY x1,y1,x2,y2
	drawAxis(axisY,POINTS_AXIS_Y[0],POINTS_AXIS_Y[1],POINTS_AXIS_Y[2],POINTS_AXIS_Y[3]);
	
	var coordinateX, coordinateY,coordinateZero;
		
	//point x, point y
	drawCoordinate(coordinateX,"750",POINTS_LABEL_X[0],POINTS_LABEL_X[1]);
	drawCoordinate(coordinateY,"500",POINTS_LABEL_Y[0],POINTS_LABEL_Y[1]);
	drawCoordinate(coordinateZero,"0",POINTS_LABEL_ZERO[0],POINTS_LABEL_ZERO[1]);
	
}

function drawAxis(axis,beginLineOnX,beginLineOnY,endLineOnX,endLineOnY){
	var axis=document.getElementById("screenForms").getContext("2d");
	axis.strokeStyle="black";
	axis.beginPath();
	axis.moveTo(beginLineOnX,beginLineOnY);
	axis.lineTo(endLineOnX,endLineOnY);
	axis.closePath();
	axis.stroke();
}

function drawCoordinate(coordinate,value,x,y){
	var coordinate=document.getElementById("screenForms").getContext("2d");
	coordinate.font="12px Verdana";
	coordinate.fillStyle="#000000";
	coordinate.fillText(value,x,y);
}

