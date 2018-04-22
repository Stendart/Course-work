class Map {
    constructor() {
        this.protectionBonus;
        this.pointOnStep;
        this.image;

        this.x;	//X - координата отрисовки отдельного спрайта карты
        this.y;
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
        super(x, y);
        this.protectionBonus = 5;
        this.pointOnStep = 5;
        this.image = "Forest.png";
    }
}

class MapPlain extends Map {
    constructor() {
        super(x, y);
        this.protectionBonus = 0;
        this.pointOnStep = 1;
        this.image = "Plain.png";
    }
}

class FillingMap {
    constructor() {
        this.mas = [];
        this.mapCount = 0;
    }

    addToArray(mapSection) {
        this.mas[this.mapCount] = mapSection;
        this.mapCount++;
    }


    createElement(Map, posX, posY) {
        Map.skin = document.createElement('div');
        Map.skin.className = "map";
        Map.skin.style.width = Map.skin.style.height = 5 + "%";
        //this.skin.style.height = 40 + "px";
        Map.skin.style.position = "absolute";
        Map.skin.style.left = posX + "px";//this.posX + "px";
        Map.skin.style.top = posY + "px";//this.posY + "px";
        document.body.appendChild(Map.skin);
        Map.skin.style.backgroundImage = "url(" + Map.image + ")";//Map.image;
        Map.skin.style.backgroundSize = "100% 100%";
        //Map.skin.style.backgroundPosition = "-10px -10px";

        Map.x = posX;	//Координаты отрисовки конкретного спрайта
        Map.y = posY;

        this.addToArray(Map);
    }

    generateMap() {
        const screen = document.getElementById("scene").offsetWidth;  // получение ширины ДИВа
        const screenHeight = document.getElementById("scene").offsetHeight;	// получение высоты ДИВа

        let x = 10;
        let y = 10;
        let checkLine = 1;
        let checColumn = 1;

        this.createElement(new MapPlain(), x, y);

        const widthScreen = document.getElementsByClassName("map")[0].clientWidth;	// размер ширины квадрата карты
        const countScreen = screen / widthScreen;

        const heightScreen = document.getElementsByClassName("map")[0].clientHeight;
        //const countHeightScreen = screenHeight / heightScreen; // подсчет кол-ва квадратов в высоту
        for (let i = 0; i < 1000; i++) {
            x += widthScreen;
            if (checkLine >= Math.floor(countScreen)) {
                if (y + heightScreen > screenHeight)
                    break;
                y += heightScreen;
                checkLine = 0;
                x = 10;
            }

            this.createElement(new MapPlain(), x, y);
            checkLine++;
        }

        console.log(y);
        console.log(screenHeight);
    }

    generateMap2(){			// Метод в разработке!
    	this.mas.forEach((i,el)=>{

    		console.log("i = "+i + "el = " + el)

    		if(Math.random > 0.7){

    			this.createElement(new MapForest(), i.x, i.y);
    		}
    	});
    }
}

m = new FillingMap();
//mount = new MapPlain();

//m.createElement(mount);
m.generateMap();
m.generateMap2();


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