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
