
//On lance une première fois au chargement de la page le programme
window.onload = function(){
	//On déclare une variable qui permet le raffraichissement du jeu (60 fois par seconde) qui est appelée lorsque le joueur déclenche le jeu
var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
    
    var terrain = document.getElementById("terrain");			//On récupère le canvas créé dans le html (index.html)
    var context = terrain.getContext("2d");
    
    // On déclare toutes les variables utilisées par le programme
    
    
	var J1X = 8;			// Position des palettes en X et Y
	var J1Y = 150;			
	var J2X = 684;
	var J2Y = 150;
	var width = 8;			// Largeur des palettes
	var height = 100;			//Longueur des palettes
	var haut1 = 0;			//Lorsque la variable est égale à 1, déclenche le mouvement associé
	var bas1 = 0;
	var haut2 = 0;
	var bas2 = 0;
	var balleX = 30;			//Position de la balle en X et Y
	var balleY = 200;			
	var balleR = 5;			//Rayon de la balle
	var balleVitesse = 2;			
	var directionX = 1;			// direction de la balle
	var directionY = 1;
	var speed = 5;			//Vitesse de déplacement des éléments du jeu
	var scoreJ1 = 0;
	var scoreJ2 = 0;
	var touche1 = {};			//Variables contenant le code des touches pressées 
	var touche2 = {};
	var url = "../menu.html";
	
	var start = function(){			//Cette fonction redessine le jeu à chaque raffraichissement
	context.fillStyle = "#ffffff";
	context.fillRect(J1X,J1Y,width,height);
	context.fillRect(J2X,J2Y,width,height);
	context.fillRect(348,0,4,400);
	context.beginPath();
	context.arc(balleX,balleY,balleR,2*Math.PI, false);
	context.fill();
	}
	
	var restart = function(){			//Lorsqu'un point est marqué, cette fonction réinitialise les variables
		J1X = 8;
		J1Y = 150;
		J2X = 684;
		J2Y = 150;
		balleX = 30;
		balleY = 200;
		balleR = 5;
		balleVitesse = 0;
		directionX = 1;
		directionY = 1;
		speed = 5;
	}
	
	var PVP = function(){			//Liste des fonction à exécuter lorsqu'on choisit de jouer à deux
		context.clearRect(0,0,700,400);
		start();
		balle();
		move();
		score();
		animation(PVP);
		
	}
	
	
	window.addEventListener("keydown", function(event){			//On détecte les touches pressées
		touche1 = event.keyCode;
		if(touche1 == 90){
			haut1 = 1;
		}  
		if(touche1 == 83){
			bas1 = 1;
		}
		touche2 = event.keyCode;
		if(touche2 == 104){
			haut2 = 1;
		}
		if(touche2 == 101){
			bas2 = 1;
		}
	})
	
	window.addEventListener("keyup", function(event){			//On détecte le relâchement des touches
		touche1 = event.keyCode;
		if(touche1 == 90){
			haut1 = 0;
		}
		if(touche1 == 83){
			bas1 = 0;
		}
		touche2 = event.keyCode;
		if(touche2 == 104){
			haut2 = 0;
		}
		if(touche2 == 101){
			bas2 = 0;
		}
	})
	
	var move = function(){			//Fonction permettant le déplacement des palettes
		if(haut1 == 1 && bas1 != 1){
			J1Y = J1Y-speed;
			if(J1Y < 0){
				J1Y = 0;
			}
			
		}
		
		if(bas1 == 1 && haut1 != 1){
			J1Y = J1Y+speed;
			if(J1Y > 300){
				J1Y = 300;
			}
			
		}
		
		if(haut2 == 1 && bas2 != 1){
			J2Y = J2Y-speed;
			if(J2Y < 0){
				J2Y = 0;
			}
			
		}
		
		if(bas2 == 1 && haut2 != 1){
			J2Y = J2Y+speed;
			if(J2Y > 300){
				J2Y = 300;
			}
		}
	}
	

	
	var balle = function(){			//Fonction permettant le déplacement de la balle
		balleX =balleX + directionX*balleVitesse;
		balleY =balleY + directionY*balleVitesse;
		if(balleX > (J2X-5) && balleY > (J2Y+38) && balleY < (J2Y+height-38)){
			directionX = -directionX;
			balleVitesse = balleVitesse+(1/2);
		}
		if(balleX > (J2X-5) && balleY >= (J2Y+5) && balleY <= (J2Y+38)){
			directionX = -directionX;
			directionY = directionY-1;
			balleVitesse = balleVitesse+(1/2);
		}
		if(balleX > (J2X-5) && balleY >= (J2Y+height-38) && balleY <= (J2Y+height-5)){
			directionX = -directionX;
			directionY = directionY+1;
			balleVitesse = balleVitesse+(1/2);
		}
		
		
		if(balleX < (J1X+width+5) && balleY > (J1Y+38) && balleY < (J1Y+height-38)){
			directionX = -directionX;
			balleVitesse = balleVitesse+(1/2);
		}
		if(balleX < (J1X+width+5) && balleY >= (J1Y+5) && balleY <= (J1Y+38)){
			directionX = -directionX;
			directionY = directionY-1;
			balleVitesse = balleVitesse+(1/2);
		}
		if(balleX < (J1X+width+5) && balleY > (J1Y+height-38) && balleY < (J1Y+height-5)){
			directionX = -directionX;
			directionY = directionY+1;
			balleVitesse = balleVitesse+(1/2);
		}
		if(balleY > 395 || balleY < 5){
			directionY = -directionY;
		}
	}
	
	var score = function(){			//Fonction permettant de tenir le score
		if(balleX < 5){
			restart();
			scoreJ2 = scoreJ2+1;
			$("#Joueur2").html(scoreJ2);
		}
		if(balleX > 695){
			restart();
			scoreJ1 = scoreJ1+1;
			$("#Joueur1").html(scoreJ1);
		}
		if(scoreJ1 == 7){
			alert("Le joueur 1 gagne!");
			retour();
		}
		if(scoreJ2 == 7){
			alert("Le joueur 2 gagne!");
			retour();
		}
	}
	function retour(){
		document.location.replace(url)
	}
	window.addEventListener("keydown", function(event){			//On détecte les touches pressées
		var relancer = event.keyCode;
		if(relancer == 13){
			balleVitesse = 2;
		}
	})
	
	animation(PVP);
}

