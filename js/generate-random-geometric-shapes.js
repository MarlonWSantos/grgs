const SIZE=10;
const MAX_COORDINATE_X=710;
const MAX_COORDINATE_Y=450;
const MAX_COLORS=4;
const MAX_FORMS=4;

//point x, point y
const POINTS_LABEL_X=[750,512];
//point x, point y
const POINTS_LABEL_Y=[0,15];
//point x, point y
const POINTS_LABEL_ZERO=[10,510];
const MARGIN_LEFT_CANVAS=30;

//area canvas x, y, w, h
const AREA_CANVAS_FORMS=[21,0,750,499];3
//area canvas x, y, w, h
const AREA_CANVAS_COORDINATE=[0,0,90,150];

const MARGIN_LEFT_CANVAS_COORD = 10;
const MARGIN_TOP_CANVAS_COORD = 15;



function loadArrays(){
			
	xCoordinateSquare = new Array(SIZE);
	yCoordinateSquare = new Array(SIZE);
	colorSquare = new Array(SIZE);

	xCoordinateCircle = new Array(SIZE);
	yCoordinateCircle = new Array(SIZE);
	colorCircle = new Array(SIZE);

	xCoordinateTriangle = new Array(SIZE);
	yCoordinateTriangle = new Array(SIZE);
	colorTriangle = new Array(SIZE);

	xCoordinateRectangle = new Array(SIZE);
	yCoordinateRectangle = new Array(SIZE);
	colorRectangle = new Array(SIZE);

	listOrderedXAxisX = new Array(SIZE);
	listOrderedYAxisX = new Array(SIZE);
	listOrderedColorAxisX = new Array(SIZE);
	listOrderedFormAxisX = new Array(SIZE);

	listOrderedXAxisY = new Array(SIZE);
	listOrderedYAxisY = new Array(SIZE);
	listOrderedColorAxisY = new Array(SIZE);
	listOrderedFormAxisY = new Array(SIZE);	 
}


function start(){
	clean();
	loadArrays();
	loadScreen();
	selectCheckbox(true);
	enableCheckbox();
	enableSlider();

	for(i=0;i<SIZE;i++){
		generateCoordinatesAndColor(i);
		if(i==SIZE-1){
			orderAxisX();
			orderAxisY();
		}		
	}
}


function clean(){
	var screenForms=document.getElementById("screenForms").getContext("2d");
	//area canvas x, y, w, h
	screenForms.clearRect(AREA_CANVAS_FORMS[0],AREA_CANVAS_FORMS[1],AREA_CANVAS_FORMS[2],AREA_CANVAS_FORMS[3]);

	var screenCoordinates=document.getElementById("screenCoordinates").getContext("2d");
	//area canvas x, y, w, h
	screenCoordinates.clearRect(AREA_CANVAS_COORDINATE[0],AREA_CANVAS_COORDINATE[1],AREA_CANVAS_COORDINATE[2],AREA_CANVAS_COORDINATE[3]);
}



function enableCheckbox(){
	var components = document.getElementsByClassName("form-check-input");
		
	for(j=0;j<=components.length-1;j++){
		components[j].removeAttribute('disabled');
	}
	
}

function enableSlider(){
	var componentsSlides = document.getElementsByName("sliderAxis");
	
		for(j=0;j<=componentsSlides.length-1;j++){
			componentsSlides[j].removeAttribute('disabled');
	}
	
}

function generateCoordinatesAndColor(i){
	var x=0,y=0,color=0;
	x=MARGIN_LEFT_CANVAS+Math.floor(Math.random()*MAX_COORDINATE_X);
	y=MARGIN_LEFT_CANVAS+Math.floor(Math.random()*MAX_COORDINATE_Y);
	color=Math.floor(Math.random()*MAX_COLORS);
	color=chooseColor(color);
	showCoordinates(x,y,i);
	return chooseForm(x,y,color);
}



function showCoordinates(x,y,i){
	x=x-10;
	y=Math.abs(y-525);

	var listCoordinates=document.getElementById("screenCoordinates").getContext("2d");
	listCoordinates.font="15px Verdana";
	listCoordinates.fillStyle="#000000";
	listCoordinates.textAlign="left";
	listCoordinates.textBaseline="top";	
	listCoordinates.fillText("("+x.toString()+","+y.toString()+")",MARGIN_LEFT_CANVAS_COORD,MARGIN_TOP_CANVAS_COORD*i);	
}	

function chooseForm(x,y,color){
	var form;
	form=Math.floor(Math.random()*MAX_FORMS);
	listAxisX(x,y,color,form);
	listAxisY(x,y,color,form);
	if(form==0){
		storageSquare(x,y,color);
		return generateSquare(x,y,color);
	}
	if(form==1){
		storageCircle(x,y,color);
		return generateCircle(x,y,color,color);
	}
	if(form==2){
		storageTriangle(x,y,color);
		return generateTriangle(x,y,color,color);
	}
	if(form==3){
		storageRectangle(x,y,color);
		return generateRectangle(x,y,color);
	}
}

function chooseColor(color){
	if (color==0){
		return "blue";
	}
	if(color==1){
		return "red";
	}
	if(color==2){
		return "green";
	}
	if(color==3){
		return "orange";
	}
}


function storageSquare(x,y,color){
	var i=0;
	while(i<SIZE){
		if(xCoordinateSquare[i]==null){
			xCoordinateSquare[i]=x;
			yCoordinateSquare[i]=y;
			colorSquare[i]=color;
			break;
		}
		i++;
	}	
}

function storageCircle(x,y,color){
	var i=0;
	while(i<SIZE){
		if(xCoordinateCircle[i]==null){
			xCoordinateCircle[i]=x;
			yCoordinateCircle[i]=y;
			colorCircle[i]=color;
			break;
		}
		i++;
	}	
}

function storageTriangle(x,y,color){
	var i=0;
	while(i<SIZE){
		if(xCoordinateTriangle[i]==null){
			xCoordinateTriangle[i]=x;
			yCoordinateTriangle[i]=y;
			colorTriangle[i]=color;
			break;
		}
		i++;
	}	
}

function storageRectangle(x,y,color){
	var i=0;
	while(i<SIZE){
		if(xCoordinateRectangle[i]==null){
			xCoordinateRectangle[i]=x;
			yCoordinateRectangle[i]=y;
			colorRectangle[i]=color;
			break;
		}
		i++;
	}	
}

function showOrHideSquare(){	
	if(document.getElementsByName("checkboxForms")[0].checked==true){
		for(i=0;i<SIZE;i++){
			hideSquare(i,false);}					
	}
	else{
		for(i=0;i<SIZE;i++){
			hideSquare(i,true);}			
	}
}
function hideSquare(i,hide){
	var fill;
	if(hide==true){
		fill="white";
	}else{
		fill=colorSquare[i];

	}
	generateSquare(xCoordinateSquare[i],yCoordinateSquare[i],fill);
}

function showOrHideRectangle(){	
	if(document.getElementsByName("checkboxForms")[2].checked==true){
		for(i=0;i<SIZE;i++){
			hideRectangle(i,false);}					
	}
	else{
		for(i=0;i<SIZE;i++){
			hideRectangle(i,true);}			
	}
}
function hideRectangle(i,hide){
	var fill;
	if(hide==true){
		fill="white";
	}else{
		fill=colorRectangle[i];

	}
	generateRectangle(xCoordinateRectangle[i],yCoordinateRectangle[i], fill);
}

function showOrHideCircle(){
	if(document.getElementsByName("checkboxForms")[3].checked==true){
		for(i=0;i<SIZE;i++){
			hideCircle(i,false);}					
	}
	else{
		for(i=0;i<SIZE;i++){
			hideCircle(i,true);}			
	}
}
function hideCircle(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=colorCircle[i];
		stroke=colorCircle[i];
	}
	generateCircle(xCoordinateCircle[i],yCoordinateCircle[i], fill, stroke)
}


function showOrHideTriangle(){	
	if(document.getElementsByName("checkboxForms")[1].checked==true){
		for(i=0;i<SIZE;i++){
			hideTriangle(i,false);}					
	}
	else{
		for(i=0;i<SIZE;i++){
			hideTriangle(i,true);}			
	}
}

function hideTriangle(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=colorTriangle[i];
		stroke=colorTriangle[i];
	}
	generateTriangle(xCoordinateTriangle[i],yCoordinateTriangle[i], fill, stroke);
}

function hideColor(color,hide){
		for(i=0;i<SIZE;i++){
			if(colorSquare[i]==color){
				hideSquare(i,hide);
			}
			if(colorCircle[i]==color){
				hideCircle(i,hide);
			}
			if(colorTriangle[i]==color){
				hideTriangle(i,hide);
			}
			if(colorRectangle[i]==color){
				hideRectangle(i,hide);
			}
		}
}

function showOrHideBlue(){
	if(document.getElementsByName("checkboxColor")[0].checked==true){
		hideColor("blue",false);
	}
	else{
		hideColor("blue",true);
	}
}

function showOrHideGreen(){
	if(document.getElementsByName("checkboxColor")[1].checked==true){
		hideColor("green",false);
	}
	else{
		hideColor("green",true);
	}
}

function showOrHideRed(){
	if(document.getElementsByName("checkboxColor")[2].checked==true){
		hideColor("red",false);
	}
	else{
		hideColor("red",true);
	}
}

function showOrHideOrange(){
	if(document.getElementsByName("checkboxColor")[3].checked==true){
		hideColor("orange",false);
	}
	else{
		hideColor("orange",true);
	}
}

function listAxisX(x,y,color,form){
	for(i=0;i<SIZE;i++){
		if(listOrderedXAxisX[i]==null){
			listOrderedXAxisX[i]=x;
			listOrderedYAxisX[i]=y;
			listOrderedColorAxisX[i]=color;
			listOrderedFormAxisX[i]=form;
			break;
		}
	}
}

function orderAxisX(){
	var j=SIZE-1;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<SIZE;i++){
			if(listOrderedXAxisX[i]>listOrderedXAxisX[i+1]){
				tempX=listOrderedXAxisX[i];
				tempY=listOrderedYAxisX[i];
				tempColor=listOrderedColorAxisX[i];
				tempForm=listOrderedFormAxisX[i];

				listOrderedXAxisX[i]=listOrderedXAxisX[i+1];
				listOrderedYAxisX[i]=listOrderedYAxisX[i+1];
				listOrderedColorAxisX[i]=listOrderedColorAxisX[i+1];
				listOrderedFormAxisX[i]=listOrderedFormAxisX[i+1];

				listOrderedXAxisX[i+1]=tempX;
				listOrderedYAxisX[i+1]=tempY;
				listOrderedColorAxisX[i+1]=tempColor;
				listOrderedFormAxisX[i+1]=tempForm;
			}
		}
		j--;
	}
}

var currentValueX=-1;
function sliderX(value){
	if(value>=currentValueX){
		for(i=0;i<=value;i++){
			hideAxisX(i,true);
		}
		currentValueX=value;

	}else{
		for(i=currentValueX;i>value;i--){
			hideAxisX(i,false);
		}
		currentValueX=value;
	}

}

function hideAxisX(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=listOrderedColorAxisX[i];
		stroke=listOrderedColorAxisX[i];
	}
	
	if(listOrderedFormAxisX[i]==0){
		generateSquare(listOrderedXAxisX[i],listOrderedYAxisX[i], fill);
	}
	if(listOrderedFormAxisX[i]==1){
		generateCircle(listOrderedXAxisX[i],listOrderedYAxisX[i], fill, stroke);
	}
	if(listOrderedFormAxisX[i]==2){
		generateTriangle(listOrderedXAxisX[i],listOrderedYAxisX[i], fill, stroke);
	}
	if(listOrderedFormAxisX[i]==3){
		generateRectangle(listOrderedXAxisX[i],listOrderedYAxisX[i], fill);
	}
}

function listAxisY(x,y,color,form){
	for(i=0;i<SIZE;i++){
		if(listOrderedYAxisY[i]==null){
			listOrderedXAxisY[i]=x;
			listOrderedYAxisY[i]=y;
			listOrderedColorAxisY[i]=color;
			listOrderedFormAxisY[i]=form;
			break;
		}
	}
}

function orderAxisY(){
	var j=SIZE-1;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<SIZE;i++){
			if(listOrderedYAxisY[i]<listOrderedYAxisY[i+1]){
				tempX=listOrderedXAxisY[i];
				tempY=listOrderedYAxisY[i];
				tempColor=listOrderedColorAxisY[i];
				tempForm=listOrderedFormAxisY[i];

				listOrderedXAxisY[i]=listOrderedXAxisY[i+1];
				listOrderedYAxisY[i]=listOrderedYAxisY[i+1];
				listOrderedColorAxisY[i]=listOrderedColorAxisY[i+1];
				listOrderedFormAxisY[i]=listOrderedFormAxisY[i+1];

				listOrderedXAxisY[i+1]=tempX;
				listOrderedYAxisY[i+1]=tempY;
				listOrderedColorAxisY[i+1]=tempColor;
				listOrderedFormAxisY[i+1]=tempForm;
			}
		}
		j--;
	}
}

var currentValueY=-1;
function sliderY(value){
	if(value>=currentValueY){
		for(i=0;i<=value;i++){
			hideAxisY(i,true);
		}
		currentValueY=value;

	}else{	
		for(i=currentValueY;i>value;i--){
			hideAxisY(i,false);
		}
		currentValueY=value;
	}

}

function hideAxisY(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=listOrderedColorAxisY[i];
		stroke=listOrderedColorAxisY[i];
	}
	
	if(listOrderedFormAxisY[i]==0){
		generateSquare(listOrderedXAxisY[i],listOrderedYAxisY[i], fill);
	}
	if(listOrderedFormAxisY[i]==1){
		generateCircle(listOrderedXAxisY[i],listOrderedYAxisY[i], fill, stroke);
	}
	if(listOrderedFormAxisY[i]==2){
		generateTriangle(listOrderedXAxisY[i],listOrderedYAxisY[i], fill, stroke);
	}
	if(listOrderedFormAxisY[i]==3){
		generateRectangle(listOrderedXAxisY[i],listOrderedYAxisY[i], fill);
	}
}
