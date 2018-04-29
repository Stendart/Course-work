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

    /*onclick(){ !!!!!!!!!!!!!!
        super.onclick();
        console.log("This mountain" + " i: "+this.i + " j: "+this.j);
    }*/
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
        //const screen = document.getElementById("scene");

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
                    this.robotsArray[i][j] = this.createElement(new MapPlain(i,j), row);        //Стоит ли так оставлять? Или массив вынести отдельным методом (как?)   

                //console.log(random);
            }
        }
        //console.log(this.mas)
    }
}



const dto = new class DTO {      //Сделать Синглтоном
    constructor() {
        //this.ob;
        this.currentSelectedUnit; //id юнита
    }

    transfer(i, j){
        //console.log("Hi " + document.getElementsByClassName("tileCell")[0].clientWidth);
        //const widthScreen = document.getElementsByClassName("tileCell")[0].clientWidth;
        //const heightScreen = document.getElementsByClassName("tileCell")[0].clientHeight;
        //let i = I;
        //let j = J;

        
        //this.rob.pX = widthScreen * j;    //получаем координаты нового нахождения робота
        //this.rob.pY = heightScreen * i;   //умножая ширину/высоту клетки на её номер в строке/столбце ()
        //return ob
        //this.moveRob();

        this.rob.moveTo(i, j);
        this.rob.render(); //????????????
    }

    collectRobotInfo(robot) {
        this.rob = robot;
        console.log('ID= ' + this.rob.id);
    }

    /*moveRob(){
       // this.rob.posX = this.rob.pX;
       // this.rob.posY = this.rob.pY;
        this.rotateRob();
        console.log("this.rob = "+ this.rob);
        this.rob.skin.style.left = this.rob.pX + "px";
        this.rob.skin.style.top = this.rob.pY + "px"; 
        
    }*/

    rotateRob(){        //======ToDo
        if(this.rob.skin.style.left > this.rob.pX + "px"){
            this.rob.sprite = "robotLeft.png";
            this.rob.initRob();
            //this.rob.skin.style.transform = "rotate(" + 270 + "deg)";
            console.log("Поворот произошел?");
        }else if(this.rob.skin.style.left < this.rob.pX + "px"){
            this.rob.sprite = "robotRight.png";
            this.rob.initRob();
        }else if(this.rob.skin.style.top > this.rob.pY + "px"){
            this.rob.sprite = "robot1.png";
            this.rob.initRob();
        }else if(this.rob.skin.style.top < this.rob.pY + "px"){
            this.rob.sprite = "robotForw.png";
            this.rob.initRob();
        }
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

        //this.posX;
        //this.posY;
        this.id = id; 
        
                //РАЗОБРАТЬСЯ!!!
        this.onclick = this.onclick.bind(this); // Правильно ли сделал?
        this.moveTo = this.moveTo.bind(this);
        this.render = this.render.bind(this); 
    }



/*    renderRobot(){
        this.skin = document.createElement('DIV');
        this.skin.className = 'robot';
        
        //container.appendChild(Map.skin);

        this.initRob();
        screen.appendChild(this.skin);
        console.log(this.stepWidth);
        console.log(this.stepHeight);
        this.skin.onclick = this.onclick;         //Стоит ли так оставлять?
    }

    initRob(){
        this.skin.style.left = this.posX + "px";
        this.skin.style.top = this.posY + "px";
        this.skin.style.width = 50 + "px";
        this.skin.style.height = 50 + "px";
        this.skin.style.position= "absolute";
        this.skin.style.backgroundImage = "url(" + this.sprite + ")";
        this.skin.style.backgroundSize = "100% 100%";
    }*/

    /*move(){
        this.posX +=this.stepWidth;
        this.skin.style.left = this.posX + "px";
    }*/

    moveTo(i, j) {
        const needsUpdate = this.i !==i || this.j !== j;
        this.i = i;
        this.j = j;
        if(needsUpdate) this.render();
    }


    onclick() {

        robotsArmy.robotsArray.forEach((el, i)=> {
            console.log('Цикл ' + el);
            el.getRobot().skin.classList.remove('selected');   //|||||||||||||||||
        })
        console.log('This is a classList ' + this.skin.classList);
        //this.move();        
        //this.saveRobot(this);
        this.skin.classList.add('selected');
       // this.skin.classList.remove("selected");
        dto.collectRobotInfo(this);

       /* if(this.skin.selected == true){
            console.log("Select!!!");
        }*/
        //this.skin.classList.remove("selected");
    }

    render() {
        const { width, height } = getMapTileSize();
        this.width = this.height = height;

        this.skin.style.width = this.width + 'px';
        this.skin.style.height = this.height + 'px';

        const borderSize = 4; // Разобраться |||||||||||||||||

        this.skin.style.top = ((this.i) * (height) + (height - borderSize * 2) / 2 - this.height / 2) + 'px';
        this.skin.style.left = ((this.j) * (width) + (width - borderSize * 2) / 2 - this.width / 2) + 'px';
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

        //this.renderRobot();
    }
}


class wrapperRobot {             // Стоит ли так оставлять класс? Или метод генерации лучше в Робота перенести?
    constructor(r) {
        this.setupRobotSkin(r);
        this.ob = r;
    }

    /*renderRobot(r){
        r.skin = document.createElement('DIV');
        r.skin.className = 'robot';
        
        //container.appendChild(Map.skin);

        r.skin.style.left = r.posX + "px";
        r.skin.style.top = r.posY + "px";
        r.skin.style.width = 50 + "px";
        r.skin.style.height = 50 + "px";
        r.skin.style.position= "absolute";
        r.skin.style.backgroundImage = "url(" + r.sprite + ")";
        r.skin.style.backgroundSize = "100% 100%";

        screen.appendChild(r.skin);
        console.log(r.stepWidth);
        console.log(r.stepHeight);
        r.skin.onclick = r.onclick;         //Стоит ли так оставлять?
    }*/

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

    createArmy() {
        for(this.IdGenerator; this.IdGenerator < 3; this.IdGenerator++){     //Сделать более осмысленный способ задания кол-ва роботов

            this.robotsArray[this.IdGenerator] = new wrapperRobot(new feavyRobot(1, this.IdGenerator, this.IdGenerator));
            this.robotsArray[this.IdGenerator].getRobot().render();
            console.log("Проход " + this.IdGenerator);
            console.log("Проход генератора " + this.robotsArray[this.IdGenerator].getRobot().skin);     //Стоит так делать?(Засовывать геттер, что бы достучатсья до робота. Или лучше просто рендер робота не выносить во wrapper и сделать прост метод в классе Robot?)
            //this.mas[this.IdGenerator].getRobot().skin.onclick+=this.onclick();
            //this.mas[this.IdGenerator]

        }
    }

   /* onclick(){
        console.log("New click!!!");
    }*/
       /* console.log("Test in method");
        this.mas.forEach((el, i) =>{
            this.mas[i] = new wrapperRobot(new feavyRobot(100, 100, this.IdGenerator));
            this.IdGenerator++;
            console.log("Проход " + i);
        })*/
}

//Если окно изменит размеры - всё перерендерить
window.onresize = function () {
    robotsArmy.robotsArray.forEach((el) => {
        el.getRobot().render();
    });
}


m = new FillingMap();
m.generateMap();

//r = new wrapperRobot(new feavyRobot(100, 100, 20));
//r.renderRobot(new feavyRobot(100, 100, 20));

robotsArmy = new Army();
robotsArmy.createArmy();

//r2 = new wrapperRobot();
//r2.renderRobot(new feavyRobot(400, 200, 10));





//const widthScreen = document.getElementsByClassName("map")[0].clientWidth;