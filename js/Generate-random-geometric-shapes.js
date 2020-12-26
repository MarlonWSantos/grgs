function init(){
	selectCheckbox(false);
	loadScreen();
}

function loadArrays(){
	xCoordinateSquare = new Array(10);
	yCoordinateSquare = new Array(10);
	colorSquare = new Array(10);

	xCoordinateCircle = new Array(10);
	yCoordinateCircle = new Array(10);
	colorCircle = new Array(10);

	xCoordinateTriangle = new Array(10);
	yCoordinateTriangle = new Array(10);
	colorTriangle = new Array(10);

	xCoordinateRectangle = new Array(10);
	yCoordinateRectangle = new Array(10);
	colorRectangle = new Array(10);

	listOrderedXAxisX = new Array(10);
	listOrderedYAxisX = new Array(10);
	listOrderedColorAxisX = new Array(10);
	listOrderedFormAxisX = new Array(10);

	listOrderedXAxisY = new Array(10);
	listOrderedYAxisY = new Array(10);
	listOrderedColorAxisY = new Array(10);
	listOrderedFormAxisY = new Array(10);	 
}

function drawAxis(axis,beginLineOnX,beginLineOnY,endLineOnX,endLineOnY){
	var axis=document.getElementById("screenForms").getContext("2d");
	axis.strokeStyle="#00000";
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

	for(i=0;i<10;i++){
		generateCoordinatesAndColor(i);
		if(i==9){
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
		return generateSquare(x,y,color);
	}
	if(form==1){
		return generateCircle(x,y,color);
	}
	if(form==2){
		return generateTriangle(x,y,color);
	}
	if(form==3){
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

function generateCircle(x,y,color){
	storesCircle(x,y,color);
	
	var circle=document.getElementById("screenForms").getContext("2d");
	circle.fillStyle=color;
	circle.strokeStyle="black";
	circle.beginPath();
	//eixo x,eixo y, raio, inicio circulo,fim circulo
	circle.arc(x,y,10,0,Math.PI*2);
	//circulo.closePath()
	//circulo.stroke();
	circle.fill();
}

function generateSquare(x,y,color){
	storesSquare(x,y,color);

	//cria elemento dentro do elemento canvas "tela" e define contexto 2d
	var square=document.getElementById("screenForms").getContext("2d");
	//preenchimento da color
	square.fillStyle=color;
	//eixo x, eixo y, comprimento,altura
	square.fillRect(x,y,20,20);
}

function generateTriangle(x,y,color){
	storesTriangle(x,y,color);

	var triangle=document.getElementById("screenForms").getContext("2d");
	triangle.fillStyle=color;
	triangle.strokeStyle="#000000";
	triangle.beginPath();
	//inicia o desenho no eixo x=200,y=140
	triangle.moveTo(x,y);
	//faz um linha ate o proximo eixo x=300 y=140
	triangle.lineTo(x+20,y);
	//faz outra linha ate o eixo x=250 y=10
	triangle.lineTo(x+10,y-20);
	//triangulo.closePath();
	//triangulo.stroke();
	triangle.fill();
}

function generateRectangle(x,y,color){
	storesRectangle(x,y,color);

	var rectangle=document.getElementById("screenForms").getContext("2d");
	rectangle.fillStyle=color;
	rectangle.fillRect(x,y,30,20);
}

function storesSquare(x,y,color){
	var i=0;
	while(i<10){
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
	while(i<10){
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
	while(i<10){
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
	while(i<10){
		if(xCoordinateRectangle[i]==null){
			xCoordinateRectangle[i]=x;
			yCoordinateRectangle[i]=y;
			colorRectangle[i]=color;
			break;
		}
		i++;
	}	
}

function hideSquare(){	
	if(document.getElementsByName("checkboxForms")[0].checked==true){
		for(i=0;i<10;i++){
			showOrHideSquare(i,false);}					
	}
	else{
		for(i=0;i<10;i++){
			showOrHideSquare(i,true);}			
	}
}
function showOrHideSquare(i,hide){
	var fill;
	if(hide==true){
		fill="white";
	}else{
		fill=colorSquare[i];

	}
	var quadrado=document.getElementById("screenForms").getContext("2d");
	quadrado.fillStyle=fill;
	quadrado.fillRect(xCoordinateSquare[i],yCoordinateSquare[i],20,20);
}

function hideRectangle(){	
	if(document.getElementsByName("checkboxForms")[2].checked==true){
		for(i=0;i<10;i++){
			showOrHideRectangle(i,false);}					
	}
	else{
		for(i=0;i<10;i++){
			showOrHideRectangle(i,true);}			
	}
}
function showOrHideRectangle(i,hide){
	var fill;
	if(hide==true){
		fill="white";
	}else{
		fill=colorRectangle[i];

	}
	var retangulo=document.getElementById("screenForms").getContext("2d");
	retangulo.fillStyle=fill;
	retangulo.fillRect(xCoordinateRectangle[i],yCoordinateRectangle[i],30,20);
}

function hideCircle(){
	if(document.getElementsByName("checkboxForms")[3].checked==true){
		for(i=0;i<10;i++){
			showOrHideCircle(i,false);}					
	}
	else{
		for(i=0;i<10;i++){
			showOrHideCircle(i,true);}			
	}
}
function showOrHideCircle(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=colorCircle[i];
		stroke="black";
	}
	var circulo=document.getElementById("screenForms").getContext("2d");
	circulo.fillStyle=fill;
	circulo.strokeStyle=stroke;
	circulo.beginPath();
	circulo.arc(xCoordinateCircle[i],yCoordinateCircle[i],10,0,Math.PI*2);
	circulo.closePath()
	circulo.stroke();
	circulo.fill();
}


function hideTriangle(){	
	if(document.getElementsByName("checkboxForms")[1].checked==true){
		for(i=0;i<10;i++){
			showOrHideTriangle(i,false);}					
	}
	else{
		for(i=0;i<10;i++){
			showOrHideTriangle(i,true);}			
	}
}

function showOrHideTriangle(i,hide){
	var fill,stroke;
	if(hide==true){
		fill="white";
		stroke="white";
	}else{
		fill=colorTriangle[i];
		stroke="#000000";
	}
	var triangulo=document.getElementById("screenForms").getContext("2d");
	triangulo.fillStyle=fill;
	triangulo.strokeStyle=stroke;
	triangulo.beginPath();
	//inicia o desenho no eixo x=200,y=140
	triangulo.moveTo(xCoordinateTriangle[i],yCoordinateTriangle[i]);
	//faz um linha ate o proximo eixo x=300 y=140
	triangulo.lineTo(xCoordinateTriangle[i]+20,yCoordinateTriangle[i]);
	//faz outra linha ate o eixo x=250 y=10
	triangulo.lineTo(xCoordinateTriangle[i]+10,yCoordinateTriangle[i]-20);
	triangulo.closePath();
	triangulo.stroke();
	triangulo.fill();
}

/*---------------------------------------------------------------------------------*/

function hideBlue(){
	if(document.getElementsByName("checkboxColor")[0].checked==true){
		for(i=0;i<10;i++){
			if(colorSquare[i]=="blue"){
				showOrHideSquare(i,false);
			}
			if(colorCircle[i]=="blue"){
				showOrHideCircle(i,false);
			}
			if(colorTriangle[i]=="blue"){
				showOrHideTriangle(i,false);
			}
			if(colorRectangle[i]=="blue"){
				showOrHideRectangle(i,false);
			}
		}
	}
	else{
		for(i=0;i<10;i++){
			if(colorSquare[i]=="blue"){
				showOrHideSquare(i,true);
			}
			if(colorCircle[i]=="blue"){
				showOrHideCircle(i,true);
			}
			if(colorTriangle[i]=="blue"){
				showOrHideTriangle(i,true);
			}
			if(colorRectangle[i]=="blue"){
				showOrHideRectangle(i,true);
			}
		}
	}
}

function hideGreen(){
	if(document.getElementsByName("checkboxColor")[1].checked==true){
		for(i=0;i<10;i++){
			if(colorSquare[i]=="green"){
				showOrHideSquare(i,false);
			}
			if(colorCircle[i]=="green"){
				showOrHideCircle(i,false);
			}
			if(colorTriangle[i]=="green"){
				showOrHideTriangle(i,false);
			}
			if(colorRectangle[i]=="green"){
				showOrHideRectangle(i,false);
			}
		}
	}
	else{
		for(i=0;i<10;i++){
			if(colorSquare[i]=="green"){
				showOrHideSquare(i,true);
			}
			if(colorCircle[i]=="green"){
				showOrHideCircle(i,true);
			}
			if(colorTriangle[i]=="green"){
				showOrHideTriangle(i,true);
			}
			if(colorRectangle[i]=="green"){
				showOrHideRectangle(i,true);
			}
		}
	}
}

function hideRed(){
	if(document.getElementsByName("checkboxColor")[2].checked==true){
		for(i=0;i<10;i++){
			if(colorSquare[i]=="red"){
				showOrHideSquare(i,false);
			}
			if(colorCircle[i]=="red"){
				showOrHideCircle(i,false);
			}
			if(colorTriangle[i]=="red"){
				showOrHideTriangle(i,false);
			}
			if(colorRectangle[i]=="red"){
				showOrHideRectangle(i,false);
			}
		}
	}
	else{
		for(i=0;i<10;i++){
			if(colorSquare[i]=="red"){
				showOrHideSquare(i,true);
			}
			if(colorCircle[i]=="red"){
				showOrHideCircle(i,true);
			}
			if(colorTriangle[i]=="red"){
				showOrHideTriangle(i,true);
			}
			if(colorRectangle[i]=="red"){
				showOrHideRectangle(i,true);
			}
		}
	}
}

function hideOrange(){
	if(document.getElementsByName("checkboxColor")[3].checked==true){
		for(i=0;i<10;i++){
			if(colorSquare[i]=="orange"){
				showOrHideSquare(i,false);
			}
			if(colorCircle[i]=="orange"){
				showOrHideCircle(i,false);
			}
			if(colorTriangle[i]=="orange"){
				showOrHideTriangle(i,false);
			}
			if(colorRectangle[i]=="orange"){
				showOrHideRectangle(i,false);
			}
		}
	}
	else{
		for(i=0;i<10;i++){
			if(colorSquare[i]=="orange"){
				showOrHideSquare(i,true);
			}
			if(colorCircle[i]=="orange"){
				showOrHideCircle(i,true);
			}
			if(colorTriangle[i]=="orange"){
				showOrHideTriangle(i,true);
			}
			if(colorRectangle[i]=="orange"){
				showOrHideRectangle(i,true);
			}
		}
	}
}

/****************************************************************************************/
function listAxisX(x,y,color,form){
	for(i=0;i<10;i++){
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
	var j=9;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<10;i++){
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
		fill=listOrderedColorAxisY[i];
		stroke="black";
	}
	
	if(listOrderedFormAxisX[i]==0){
		var quadrado=document.getElementById("screenForms").getContext("2d");
		quadrado.fillStyle=fill;
		quadrado.fillRect(listOrderedXAxisX[i],listOrderedYAxisX[i],20,20);
	}
	if(listOrderedFormAxisX[i]==1){
		var circulo=document.getElementById("screenForms").getContext("2d");
		circulo.fillStyle=fill;
		circulo.strokeStyle=stroke;
		circulo.beginPath();
		circulo.arc(listOrderedXAxisX[i],listOrderedYAxisX[i],10,0,Math.PI*2);
		circulo.fill();
	}
	if(listOrderedFormAxisX[i]==2){
		var triangulo=document.getElementById("screenForms").getContext("2d");
		triangulo.fillStyle=fill;
		triangulo.strokeStyle=stroke;
		triangulo.beginPath();
		triangulo.moveTo(listOrderedXAxisX[i],listOrderedYAxisX[i]);
		triangulo.lineTo(listOrderedXAxisX[i]+20,listOrderedYAxisX[i]);
		triangulo.lineTo(listOrderedXAxisX[i]+10,listOrderedYAxisX[i]-20);
		triangulo.fill();	
	}
	if(listOrderedFormAxisX[i]==3){
		var retangulo=document.getElementById("screenForms").getContext("2d");
		retangulo.fillStyle=fill;
		retangulo.fillRect(listOrderedXAxisX[i],listOrderedYAxisX[i],30,20);		
	}
}

function listAxisY(x,y,color,form){
	for(i=0;i<10;i++){
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
	var j=9;
	var tempX=0;
	var tempY=0;
	var tempColor=0;
	var tempForm=0;

	while(j>=0){
		for(i=0;i<10;i++){
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
		stroke="black";
	}
	
	if(listOrderedFormAxisY[i]==0){
		var quadrado=document.getElementById("screenForms").getContext("2d");
		quadrado.fillStyle=fill;
		quadrado.fillRect(listOrderedXAxisY[i],listOrderedYAxisY[i],20,20);
	}
	if(listOrderedFormAxisY[i]==1){
		var circulo=document.getElementById("screenForms").getContext("2d");
		circulo.fillStyle=fill;
		circulo.strokeStyle=stroke;
		circulo.beginPath();
		circulo.arc(listOrderedXAxisY[i],listOrderedYAxisY[i],10,0,Math.PI*2);
		circulo.fill();
	}
	if(listOrderedFormAxisY[i]==2){
		var triangulo=document.getElementById("screenForms").getContext("2d");
		triangulo.fillStyle=fill;
		triangulo.strokeStyle=stroke;
		triangulo.beginPath();
		triangulo.moveTo(listOrderedXAxisY[i],listOrderedYAxisY[i]);
		triangulo.lineTo(listOrderedXAxisY[i]+20,listOrderedYAxisY[i]);
		triangulo.lineTo(listOrderedXAxisY[i]+10,listOrderedYAxisY[i]-20);
		triangulo.fill();	
	}
	if(listOrderedFormAxisY[i]==3){
		var retangulo=document.getElementById("screenForms").getContext("2d");
		retangulo.fillStyle=fill;
		retangulo.fillRect(listOrderedXAxisY[i],listOrderedYAxisY[i],30,20);		
	}
}
