function init(){
	selectCheckbox(false);
	loadScreen();
}

function loadArrays(){
	size=10;
	xCoordinateSquare = new Array(size);
	yCoordinateSquare = new Array(size);
	colorSquare = new Array(size);

	xCoordinateCircle = new Array(size);
	yCoordinateCircle = new Array(size);
	colorCircle = new Array(size);

	xCoordinateTriangle = new Array(size);
	yCoordinateTriangle = new Array(size);
	colorTriangle = new Array(size);

	xCoordinateRectangle = new Array(size);
	yCoordinateRectangle = new Array(size);
	colorRectangle = new Array(size);

	listOrderedXAxisX = new Array(size);
	listOrderedYAxisX = new Array(size);
	listOrderedColorAxisX = new Array(size);
	listOrderedFormAxisX = new Array(size);

	listOrderedXAxisY = new Array(size);
	listOrderedYAxisY = new Array(size);
	listOrderedColorAxisY = new Array(size);
	listOrderedFormAxisY = new Array(size);	 
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

function loadScreen(){
	var axisX,axisY;
	drawAxis(axisX,20,500,500,500);
	drawAxis(axisY,20,20,20,500);
	
	var coordinateX, coordinateY,coordinateZero;
	
	drawCoordinate(coordinateX,"500",490,512);
	drawCoordinate(coordinateY,"500",0,15);
	drawCoordinate(coordinateZero,"0",10,510);
}

function start(){
	clean();
	loadArrays();
	loadScreen();
	selectCheckbox(true);

	for(i=0;i<size;i++){
		generateCoordinatesAndColor(i);
		if(i==size-1){
			orderAxisX();
			orderAxisY();
		}		
	}
}



function clean(){
	var screenForms=document.getElementById("screenForms").getContext("2d");
	screenForms.clearRect(21, 0, 500, 499);

	var screenCoordinates=document.getElementById("screenCoordinates").getContext("2d");
	screenCoordinates.clearRect(0, 0,90,150);
}

function selectCheckbox(selectedCheckbox){
	for(j=0;j<=document.getElementsByName("checkboxForms").length-1;j++){
		document.getElementsByName("checkboxForms")[j].checked=selectedCheckbox;
		document.getElementsByName("checkboxColor")[j].checked=selectedCheckbox;

	}
}

function generateCoordinatesAndColor(i){
	var x=0,y=0,color=0;
	x=30+Math.floor(Math.random()*410);
	y=30+Math.floor(Math.random()*450);
	color=Math.floor(Math.random()*4);
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
	listCoordinates.fillText("("+x.toString()+","+y.toString()+")",10,15*i);	
}	

function chooseForm(x,y,color){
	var form;
	form=Math.floor(Math.random()*4);
	listAxisX(x,y,color,form);
	listAxisY(x,y,color,form);
	if(form==0){
		storesSquare(x,y,color);
		return generateSquare(x,y,color);
	}
	if(form==1){
		storesCircle(x,y,color);
		return generateCircle(x,y,color,color);
	}
	if(form==2){
		storesTriangle(x,y,color);
		return generateTriangle(x,y,color,color);
	}
	if(form==3){
		storesRectangle(x,y,color);
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

function generateCircle(x,y,color,stroke){
	
	var circle=document.getElementById("screenForms").getContext("2d");
	
	circle.beginPath();
	circle.clearRect(x - 10 - 1, y - 10 - 1, 10 * 2 + 2, 10 * 2 + 2);
	circle.closePath();
	
	circle.fillStyle=color;
	circle.strokeStyle=stroke;
	circle.beginPath();
	//eixo x,eixo y, raio, inicio circulo,fim circulo
	circle.arc(x,y,10,0,Math.PI*2);
	circle.closePath()
	circle.stroke();
	circle.fill();
}

function generateSquare(x,y,color){

	//cria elemento dentro do elemento canvas "tela" e define contexto 2d
	var square=document.getElementById("screenForms").getContext("2d");
	//preenchimento da color
	square.fillStyle=color;
	//eixo x, eixo y, comprimento,altura
	square.fillRect(x,y,20,20);
}

function generateTriangle(x,y,color,stroke){
	

	var triangle=document.getElementById("screenForms").getContext("2d");
	
	triangle.beginPath();
	triangle.clearRect(x-1,y-21,22,22);
	triangle.closePath();
	
	triangle.fillStyle=color;
	triangle.strokeStyle=stroke;
	triangle.beginPath();
	//inicia o desenho no eixo x=200,y=140
	triangle.moveTo(x,y);
	//faz um linha ate o proximo eixo x=300 y=140
	triangle.lineTo(x+20,y);
	//faz outra linha ate o eixo x=250 y=10
	triangle.lineTo(x+10,y-20);
	triangle.closePath();
	triangle.stroke();
	triangle.fill();	
}

function generateRectangle(x,y,color){

	var rectangle=document.getElementById("screenForms").getContext("2d");
	rectangle.fillStyle=color;
	rectangle.fillRect(x,y,30,20);
}

function storesSquare(x,y,color){
	var i=0;
	while(i<size){
		if(xCoordinateSquare[i]==null){
			xCoordinateSquare[i]=x;
			yCoordinateSquare[i]=y;
			colorSquare[i]=color;
			break;
		}
		i++;
	}	
}

function storesCircle(x,y,color){
	var i=0;
	while(i<size){
		if(xCoordinateCircle[i]==null){
			xCoordinateCircle[i]=x;
			yCoordinateCircle[i]=y;
			colorCircle[i]=color;
			break;
		}
		i++;
	}	
}

function storesTriangle(x,y,color){
	var i=0;
	while(i<size){
		if(xCoordinateTriangle[i]==null){
			xCoordinateTriangle[i]=x;
			yCoordinateTriangle[i]=y;
			colorTriangle[i]=color;
			break;
		}
		i++;
	}	
}

function storesRectangle(x,y,color){
	var i=0;
	while(i<size){
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
		for(i=0;i<size;i++){
			hideSquare(i,false);}					
	}
	else{
		for(i=0;i<size;i++){
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
		for(i=0;i<size;i++){
			hideRectangle(i,false);}					
	}
	else{
		for(i=0;i<size;i++){
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
		for(i=0;i<size;i++){
			hideCircle(i,false);}					
	}
	else{
		for(i=0;i<size;i++){
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
		for(i=0;i<size;i++){
			hideTriangle(i,false);}					
	}
	else{
		for(i=0;i<size;i++){
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
		for(i=0;i<size;i++){
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
	for(i=0;i<size;i++){
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
	var j=size-1;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<size;i++){
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

	}
	if(value<currentValueX){
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
	for(i=0;i<size;i++){
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
	var j=size-1;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<size;i++){
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

	}
	if(value<currentValueY){
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

