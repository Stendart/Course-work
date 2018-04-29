const screen = document.getElementById('scene');

class Map {
    constructor(i,j) {
        this.protectionBonus;
        this.pointOnStep;
        this.image;

        this.i = i;
        this.j = j;

        this.mapTileOnClick = this.mapTileOnClick.bind(this);
    }

    mapTileOnClick(e){
        console.clear()
        //console.log("Click", e);
        console.log('Map class click ' + this.i + " j: "+ this.j);
        dto.transfer(this.i, this.j); //=======================================
    } 
}

class MapMountain extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 20;
        this.pointOnStep = 10;
        this.image = 'Mountain.jpg';
    }
}

class MapForest extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 5;
        this.pointOnStep = 5;
        this.image = 'Forest.jpg';
    }
}

class MapPlain extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 0;
        this.pointOnStep = 1;
        this.image = 'Plain.jpg';
    }
}

class FillingMap {
    constructor() {
        this.robotsArray = [];
    }

    addToArray(mapSection) {
        this.robotsArray.push(mapSection);
    }

    createElement(Map, container) {
        Map.skin = document.createElement('DIV');
        Map.skin.className = 'tileCell';
        Map.skin.style.backgroundImage = 'url(' + Map.image + ')';
        container.appendChild(Map.skin);

        Map.skin.onclick = Map.mapTileOnClick;

        return Map;
    }

    generateMap() {

        for (let i = 0; i < 20; i++) {
            let row = document.createElement('DIV');
            row = document.createElement('DIV');
            row.className = 'tilesRow';
            screen.appendChild(row);

            this.robotsArray[i] = [];

            for (let j = 0; j < 10; j++) {
                let random = Math.random();
                if (random > 0.9){
                    this.robotsArray[i][j] = this.createElement(new MapMountain(i, j), row);
                } else if(random < 0.1){
                    this.robotsArray[i][j] = this.createElement(new MapForest(i,j), row);
                } else
                    this.robotsArray[i][j] = this.createElement(new MapPlain(i,j), row);
            }
        }
    }
}



const dto = new class DTO {      //Сделать Синглтоном
    constructor() {
        //this.ob;
        this.currentSelectedUnit; //id юнита
    }

    transfer(i, j){
        this.rob.moveTo(i, j);
    }

    collectRobotInfo(robot) {
        this.rob = robot;
        console.log('ID= ' + this.rob.id);
    }

}();

//dto = new DTO();


function getMapTileSize() {
    const width = document.getElementsByClassName('tileCell')[0].offsetWidth;
    const height = document.getElementsByClassName('tileCell')[0].offsetHeight;
    return {
        width: width,
        height: height, 
    }
}

class Robot {
    constructor(id){
        this.HP;
        this.damage;
        this.def;
        this.skin;
        this.pointAction;
        this.id = id; 
        
                //РАЗОБРАТЬСЯ!!!
        this.onclick = this.onclick.bind(this); // Правильно ли сделал?
        this.moveTo = this.moveTo.bind(this);
        this.render = this.render.bind(this); 
    }


    moveTo(i, j) {
        const needsUpdate = this.i !==i || this.j !== j;
        this.rotateRob(i, j);
        this.i = i;
        this.j = j;
        if(needsUpdate) {

            this.render();
            
        }
    }


    onclick() {

        robotsArmy.robotsArray.forEach((el, i)=> {
            console.log('Цикл ' + el);
            el.getRobot().skin.classList.remove('selected');   //|||||||||||||||||
        })
        console.log('This is a classList ' + this.skin.classList);
        this.skin.classList.add('selected');
        dto.collectRobotInfo(this);
    }

    render() {
        const { width, height } = getMapTileSize();
        this.width = this.height = height;

        this.skin.style.width = this.width + 'px';
        this.skin.style.height = this.height + 'px';

        const borderSize = 4; 

        this.skin.style.top = ((this.i) * (height) + (height - borderSize * 2) / 2 - this.height / 2) + 'px';
        this.skin.style.left = ((this.j) * (width) + (width - borderSize * 2) / 2 - this.width / 2) + 'px';
    }

    rotateRob(i, j){        //======ToDo
        if(this.j > j ){
            this.sprite = "robotLeft.png";
            this.skin.style.backgroundImage = 'url(' + this.sprite + ')';
            console.log("this.skin.style.left = " + this.skin.style.left + ' j =' + j);

        }else if(this.j < j ){
            this.sprite = "robotRight.png";
            this.skin.style.backgroundImage = 'url(' + this.sprite + ')';
            console.log("this.skin.style.left = " + this.skin.style.left + ' j =' + j);

        }else if(this.i > i ){
            this.sprite = "robot1.png";
            this.skin.style.backgroundImage = 'url(' + this.sprite + ')';
            //this.rob.render();
            console.log("this.skin.style.top = " + this.skin.style.top + 'i = ' + i);

        }else if(this.i < i ){
            this.sprite = "robotForw.png";
            this.skin.style.backgroundImage = 'url(' + this.sprite + ')';
            //this.rob.render();
            console.log("this.skin.style.top = " + this.skin.style.top + 'i = ' + i);
        }
    } 
}


class feavyRobot extends Robot {
    constructor(posI, posJ, id) {
        super(id);
        this.HP = 100;
        this.damage = 25;
        this.def = 30;
        this.sprite = 'robot1.png';
        this.pointAction = 10;

        this.width = 50;
        this.height = 50;

        this.i= posI;
        this.j = posJ;

    }
}


class wrapperRobot {             // Стоит ли так оставлять класс? Или метод генерации лучше в Робота перенести?
    constructor(r) {
        this.setupRobotSkin(r);
        this.ob = r;
    }

    setupRobotSkin(r) {
        r.skin = document.createElement('DIV');
        r.skin.className = 'robot';

        r.skin.style.width = r.width + 'px';
        r.skin.style.height = r.height + 'px';
        r.skin.style.backgroundImage = 'url(' + r.sprite + ')';
        screen.appendChild(r.skin);

        r.skin.onclick = r.onclick;
    }

    getRobot() {
        return this.ob;
    }

}

class Army {
    constructor(){
        this.robotsArray = [];    //ToDo
        this.IdGenerator = 0;
        //console.log("Массив " + this.mas);
    }

    createArmy(countRob) {
        for(this.IdGenerator; this.IdGenerator < countRob; this.IdGenerator++){     //Сделать более осмысленный способ задания кол-ва роботов

            this.robotsArray[this.IdGenerator] = new wrapperRobot(new feavyRobot(1, this.IdGenerator, this.IdGenerator));
            this.robotsArray[this.IdGenerator].getRobot().render();
            console.log("Проход " + this.IdGenerator);
            console.log("Проход генератора " + this.robotsArray[this.IdGenerator].getRobot().skin);

        }
    }
}

class Display {
    constructor() {
        this.disp = document.getElementById('display');
        this.disp.style.display = 'flex';
        this.disp.style.justifyContent = 'space-around';
        this.arrayIcon = [];
    }

    createIcon() {
        this.btn = document.createElement('input')
        //this.btn.id = 'b1'
        this.btn.type = 'button'
        this.btn.style.backgroundImage = 'url(' + 'robotForw.png' + ')';
        this.btn.style.backgroundSize = 'contain';
        this.btn.style.width = 70 + 'px';
        this.btn.style.height = 70 + 'px';
        //this.btn.value = 'T'
        this.btn.setAttribute('onclick', 'obj.HandleClick1();')
        this.disp.appendChild(this.btn);
        return this.btn;
    }

    createArrayIcon(count) {
        for(let i = 0; i<count; i++) {
            this.arrayIcon[i] = this.createIcon();
        }
    }

    


}





//Если окно изменит размеры - всё перерендерить
window.onresize = function () {
    robotsArmy.robotsArray.forEach((el) => {
        el.getRobot().render();
    });
}


m = new FillingMap();
m.generateMap();

disp = new Display();
disp.createArrayIcon(5);


const countRob = 3;
robotsArmy = new Army();
robotsArmy.createArmy(countRob);

