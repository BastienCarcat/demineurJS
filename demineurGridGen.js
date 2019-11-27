

//Projet pas encore fini


function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class MaGrid{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.monTableau = new Array(y);  // créer le tab
        for (var i = 0; i < y; i++) {
            this.monTableau[i] = new Array(x);
            for (var j = 0; j < x; j++) {
                this.monTableau[i][j] = 0;
            }
        }
    }

        addMine(nbMine) {

        for (var j = 0; j < nbMine; j++) { //met les mines aleatoirements
            var coordX = rand(this.x);
            var coordY = rand(this.y);
            if (this.monTableau[coordY][coordX] != "M") {
                this.monTableau[coordY][coordX] = "M";
            } else {
                j--;
            }
        }
        //   console.log(monTableau);
    }

    countMine() {   //attribue la valeur aux cases adjacentes aux mines
        var value = 0;
        //console.log(this.monTableau[3][0]);
        for (var i = 0; i < this.y; i++) {
            for (var j = 0; j < this.x; j++) {
                value = 0;
                if (this.monTableau[i][j] != "M") {

                    if(i == 0) {  //coté haut
                        if (j == 0) {  //angle haut a gauche
                            console.log("i en haut " +i);
                            if(this.monTableau[i+1][j] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i+1][j+1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i][j+1] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }
                        else if (j == this.x) {  //angle haut a droite
                            if(this.monTableau[i][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i+1][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i+1][j] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }else{
                            if(this.monTableau[i+1][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i+1][j] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i+1][j+1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i][j+1] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }
                    }
                    else if(j == 0) {  //coté gauche   && i != this.y

                        console.log("this.y "+this.y);
                        if(this.monTableau[i+1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j+1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i][j+1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i+1][j+1] == "M"){
                            value = value + 1;
                        }
                        this.monTableau[i][j] = value;
                    }
                    else if(j == this.x) {  //coté droit
                        if(this.monTableau[i+1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j-1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i][j-1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i+1][j-1] == "M"){
                            value = value + 1;
                        }
                        this.monTableau[i][j] = value;
                    }else if(i == this.y) {  //coté bas
                        if (j == 0) {  //angle bas a gauche
                            if(this.monTableau[i][j+1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j+1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }
                        else if (j == this.x) {  //angle bas a droite
                            if(this.monTableau[i-1][j] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i][j-1] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }
                        else{
                            if(this.monTableau[i][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i][j+1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j-1] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j] == "M"){
                                value = value + 1;
                            }
                            if(this.monTableau[i-1][j+1] == "M"){
                                value = value + 1;
                            }
                            this.monTableau[i][j] = value;
                        }
                    }
                    else{  //milieu du tab
                        if(this.monTableau[i+1][j-1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i+1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i+1][j+1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i][j-1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i][j+1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j-1] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j] == "M"){
                            value = value + 1;
                        }
                        if(this.monTableau[i-1][j+1] == "M"){
                            value = value + 1;
                        }
                        this.monTableau[i][j] = value;
                    }
                }
                //this.monTableau[i][j] = value;
            }
        }
        //console.log(this.monTableau[0][0]);
    }
}




var grid = new MaGrid(10, 5);
grid.addMine(10);
console.log(grid.monTableau);
console.log(grid.countMine());

