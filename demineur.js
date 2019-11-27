var grid = [   //fonctionne avec n'importe quelle grille
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    ['M', 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [2, 2, 3, 'M', 3, 1, 2, 2, 2, 1],
    [1, 'M', 4, 'M', 3, 'M', 2, 'M', 'M', 1],
    [1, 2, 'M', 2, 2, 1, 2, 2, 3, 2],
    [1, 2, 2, 1, 0, 0, 0, 0, 1, 'M'],
    [1, 'M', 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
];

class Cellule {
    constructor(){
        this.drapeau=false;
        this.reveal=false;
    }

}

class Mine extends Cellule{
    constructor(){
        super();
    }
}

class Nombre extends Cellule{
    constructor(num){
        super();
        this.valeur=num;
    }
}

class Demineur {
    constructor() {
        this.fin = 0;

        this.tableau = grid.map(function (rangee) {
            return rangee.map(function (num) {
                //console.log(num);
                if (num === 'M') {
                    return new Mine();

                } else {
                    return new Nombre(num);

                }
            });
        });
        this.maxY = this.tableau.length - 1;
        let ligne = this.tableau[0];
        this.maxX = ligne.length - 1;
    }

    display() {
        console.clear();
        console.log('\n\n');
        var chaine = " ";
        var tamp = " ";
        for(let i=0;i<=jeu.maxX;i++){
            tamp = tamp + "   " + i;
        }
        console.log("x→"+tamp + "\n"+ "y" +"\n"+"↓");
        var j=0;
        var tab = this.tableau.forEach(function (rangee) {
            rangee.forEach(function (element) {
                if (element.drapeau) {  //si est flagué
                    chaine = chaine + "   ┼";
                } else if (element.reveal) {
                    //révèle la valeur de la case actuelle;
                    if(element.valeur<10 && element.valeur>0){
                        chaine = chaine + "   " + element.valeur;
                    }
                    else if(element.valeur==0){
                        chaine = chaine + "   ░";
                    }
                    else{
                        chaine = chaine + "   💣";
                    }

                } else {
                    chaine = chaine + "   -";
                }

            });

            console.log(j + " " + chaine + "\n");
            j++;
            chaine = " ";

        });
        console.log("\n");
        jeu.testvic();
    }

    flag(x, y) {
        if(jeu.tableau[y][x].drapeau == true || jeu.tableau[y][x].reveal == true){
            jeu.tableau[y][x].drapeau = false;
        }
        else{
            jeu.tableau[y][x].drapeau = true;
        }
        jeu.display();
    }
    click(x, y){
        if(jeu.tableau[y][x].drapeau == true){
            //console.log("Drapeau sur la case");  // pas possible
        }
        else if (jeu.tableau[y][x].valeur >=0 && jeu.tableau[y][x].valeur <=8){

            if(jeu.tableau[y][x].valeur == 0 && jeu.tableau[y][x].reveal == false){
                jeu.tableau[y][x].reveal = true;
                if(y == 0) {  //coté haut
                    if (x == 0) {  //angle haut a gauche
                        this.click(x, y+1);
                        this.click(x+1, y+1);
                        this.click(x+1, y);
                    } else if (x == jeu.maxX) {  //angle haut a droite
                        this.click(x, y+1);
                        this.click(x-1, y+1);
                        this.click(x-1, y);
                    }
                    else{
                        this.click(x-1, y+1);
                        this.click(x, y+1);
                        this.click(x+1, y+1);
                        this.click(x+1, y);
                        this.click(x-1, y);
                    }
                }
                else if(y == jeu.maxY) {  //coté bas
                    if (x == 0) {  //angle bas a gauche
                        this.click(x+1, y);
                        this.click(x+1, y-1);
                        this.click(x, y-1);
                    } else if (x == jeu.maxX) {  //angle bas a droite
                        this.click(x, y-1);
                        this.click(x-1, y-1);
                        this.click(x-1, y);
                    }
                    else{
                        this.click(x+1, y);
                        this.click(x+1, y-1);
                        this.click(x, y-1);
                        this.click(x-1, y-1);
                        this.click(x-1, y);
                    }
                }
                else if(x == 0) {  //coté gauche
                    this.click(x, y+1);
                    this.click(x+1, y+1);
                    this.click(x+1, y);
                    this.click(x+1, y-1);
                    this.click(x, y-1);
                }
                else if(x == jeu.maxX) {  //coté droit
                    this.click(x, y+1);
                    this.click(x, y-1);
                    this.click(x-1, y-1);
                    this.click(x-1, y);
                    this.click(x-1, y+1);
                }
                else{  //milieu du tab
                    this.click(x, y+1);
                    this.click(x+1, y+1);
                    this.click(x+1, y);
                    this.click(x+1, y-1);
                    this.click(x, y-1);
                    this.click(x-1, y-1);
                    this.click(x-1, y);
                    this.click(x-1, y+1);
                }
            }
            else if(jeu.tableau[y][x].valeur != 0 && jeu.tableau[y][x].reveal == false){
                jeu.tableau[y][x].reveal = true;
            }

        }
        else{
            jeu.tableau[y][x].reveal = true;

        }
        jeu.display();
    }

    testvic(){
        var win = 0;
        var loose = 0;
        var tab = jeu.tableau.forEach(function (rangee) {
            rangee.forEach(function (element) {
                //tout les elements du tab

                if(element.valeur >= 0 && element.valeur <=8 && element.reveal == false){
                    //si il reste un element à découvrire
                    win = 1;
                }
                else if(element.reveal == true && element.valeur === undefined){
                    loose = 1;

                }
            });
        });

        if(win == 0){
            console.log("   Vous avez gagné !\n\n");
            jeu.fin = 1;
        }
        else if(loose == 1){
            console.log("   BOOOOOOM !\n\n");
            jeu.fin = 1;
        }
    }

}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}


var scanf = require('scanf');
var jeu = new Demineur();


while(jeu.fin == 0){
    jeu.display();
    console.log('  Actions :\n   Click [1]\n   Flag [2]\n');
    var action = scanf('%d');
    if(action == 1){
        jeu.display();
        console.log("  Coordonées du click :\n   X :");
        var X = scanf('%d');
        if(X <= jeu.maxX && X >= 0){
            console.log("   Y :");
            var Y = scanf('%d');
            if(Y <= jeu.maxY && Y >= 0){
                jeu.click(X,Y);
                console.log("   Click !");
                sleep(1000);
                jeu.display();
            }
            else{
                console.log('   Mauvaise coordonnée');
                sleep(1000);
                jeu.display();
            }
        }
        else{
            console.log('   Mauvaise coordonnée');
            sleep(1000);
            jeu.display();
        }
    }
    else if(action == 2){

        jeu.display();
        console.log("  Coordonées du flag :\n   X :");
        var X = scanf('%d');
        if(X <= jeu.maxX && X >= 0){
            console.log("   Y :");
            var Y = scanf('%d');
            if(Y <= jeu.maxY && Y >= 0){
                jeu.flag(X,Y);
                console.log("   Flag !");
                sleep(1000);
                jeu.display();
            }
            else{
                console.log('   Mauvaise coordonnée');
                sleep(1000);
                jeu.display();
            }
        }
        else{
            console.log('   Mauvaise coordonnée');
            sleep(1000);
            jeu.display();
        }

    }
    else{
        console.log("   Valeur non reconnue ");
        sleep(1000);
        jeu.display();
    }
}


