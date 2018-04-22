const screen = document.getElementById("scene");

class Map {
    constructor(i,j) {
        this.protectionBonus;
        this.pointOnStep;
        this.image;

        this.i = i;
        this.j = j;
    }

    onclick(e){
        console.clear()
        //console.log("Click", e);
        console.log(this.i + " j: "+ this.j);
        //this.
    }
}

class MapMountain extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 20;
        this.pointOnStep = 10;
        this.image = "Mountain.png";
    }

    onclick(){
        super.onclick();
        console.log("This mountain" + " i: "+this.i + " j: "+this.j);
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

   // onclick(){
   //     console.log(this.mas[i][j]);
    //}

    createElement(Map, container) {
        Map.skin = document.createElement('DIV');
        Map.skin.className = 'tileCell';
        Map.skin.style.backgroundImage = "url(" + Map.image + ")";
        container.appendChild(Map.skin);

        Map.skin.onclick = Map.onclick;

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
                    this.mas[i][j] = this.createElement(new MapMountain(i, j), row);
                }else if(random < 0.1){
                    this.mas[i][j] = this.createElement(new MapForest(i,j), row);
                }else
                this.mas[i][j] = this.createElement(new MapPlain(i,j), row);        //Стоит ли так оставлять? Или массив вынести отдельным методом (как?)   

                //console.log(random);
            }
        }
        //console.log(this.mas)
    }


    event(){
        
    }


}

m = new FillingMap();

m.generateMap();

let ev = document.getElementsByClassName("tileCell");
console.log(ev[0]);
        ev[0].click = new function(){
            console.log("Event working!");
        }


