const screen = document.getElementById("scene");

class Map {
    constructor() {
        this.protectionBonus;
        this.pointOnStep;
        this.image;
    }
}

class MapMountain extends Map {
    constructor() {
        super();
        this.protectionBonus = 20;
        this.pointOnStep = 10;
        this.image = "Mountain.png";
    }
}

class MapForest extends Map {
    constructor() {
        super();
        this.protectionBonus = 5;
        this.pointOnStep = 5;
        this.image = "Forest.png";
    }
}

class MapPlain extends Map {
    constructor() {
        super();
        this.protectionBonus = 0;
        this.pointOnStep = 1;
        this.image = "005.png";
    }
}

class FillingMap {
    constructor() {
        this.mas = [];

    }

    addToArray(mapSection) {
        this.mas.push(mapSection);
    }


    createElement(Map, container) {



        Map.skin = document.createElement('DIV');
        Map.skin.className = 'tileCell';
        Map.skin.style.backgroundImage = "url(" + Map.image + ")"; // Map.image;
        container.appendChild(Map.skin);
        //this.addToArray(Map);
        return Map;
    }

    generateMap() {
        //const screen = document.getElementById("scene");

        for (let i = 0; i < 20; i++) {
            let row = document.createElement('DIV');
            row = document.createElement('DIV');
            row.className = 'tilesRow';
            screen.appendChild(row);

            this.mas[i] = [];

            for (let j = 0; j < 10; j++) {
                let random = Math.random();
                if(random > 0.9){
                    this.mas[i][j] = this.createElement(new MapMountain(), row);
                }else if(random < 0.1){
                    this.mas[i][j] = this.createElement(new MapForest(), row);
                }else
                this.mas[i][j] = this.createElement(new MapPlain(), row);        //Стоит ли так оставлять? Или массив вынести отдельным методом (как?)   

                console.log(random);
            }
        }
        console.log(this.mas)
    }


    randomGenerate(){
       /* this.mas.forEach((el,i)=>{
            
            if(Math.random() > 0.9){
                console.log(i);
            }
            //console.log("el " + el + "i "+i);
        })*/
        //console.log(this.mas[0].length);
        for(let i = 0; i < this.mas.length; i++){

            for(let j = 0; j < this.mas[i].length; j++){
                if(Math.random() > 0.9){
                    

                    this.mas[i][j] = this.createElement(new MapMountain(), row);
                    console.log(this.mas[i][j])
                }
                
            
            }
        }
    }


}

m = new FillingMap();
//mount = new MapMountain();

//m.createElement(mount);
m.generateMap();
//m.randomGenerate();

/*
this.skin = document.createElement('div');
this.skin.style.width = this.skin.style.height = (Math.random()*(50-10+1))+10 + "px";
// this.skin.style.height = 40 + "px";
this.skin.style.position= "absolute";
this.skin.style.left= this.posX + "px";
this.skin.style.top= this.posY + "px";
document.body.appendChild(this.skin);
this.skin.style.backgroundImage = [
    "url(http://galerey-room.ru/images_thumb/093225_1419402745.png)",
    "url(http://galerey-room.ru/images_thumb/093119_1419402679.png)",
    "url(http://galerey-room.ru/images_thumb/093242_1419402762.png)"
][
    Math.floor(Math.random()*2)
]
*/