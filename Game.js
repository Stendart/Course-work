const screen = document.getElementById("scene");


class Map {
    constructor(i,j) {
        this.protectionBonus;
        this.pointOnStep;
        this.image;

        this.i = i;
        this.j = j;

        this.onclick = this.onclick.bind(this);
    }

    onclick(e){
        console.clear()
        //console.log("Click", e);
        console.log(this.i + " j: "+ this.j);
        //this.
        dto.transfer(this.i, this.j); //=======================================
    }

   
}

class MapMountain extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 20;
        this.pointOnStep = 10;
        this.image = "Mountain.jpg";
    }

    onclick(){
        super.onclick();
        console.log("This mountain" + " i: "+this.i + " j: "+this.j);
    }
}

class MapForest extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 5;
        this.pointOnStep = 5;
        this.image = "Forest.jpg";
    }
}

class MapPlain extends Map {
    constructor(i, j) {
        super(i, j);
        this.protectionBonus = 0;
        this.pointOnStep = 1;
        this.image = "Plain.jpg";
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
}



class DTO{      //Сделать Синглтоном
    constructor(){
        //this.ob;
        this.currentSelectedUnit; //id юнита
    }

     transfer(I, J){
        //console.log("Hi " + document.getElementsByClassName("tileCell")[0].clientWidth);
        const widthScreen = document.getElementsByClassName("tileCell")[0].clientWidth;
        const heightScreen = document.getElementsByClassName("tileCell")[0].clientHeight;
        //let i = I;
        //let j = J;

        
        this.rob.pX = widthScreen * J;    //получаем координаты нового нахождения робота
        this.rob.pY = heightScreen * I;   //умножая ширину/высоту клетки на её номер в строке/столбце ()
        //return ob
        this.moveRob();
    }

    collectRobotInfo(robot){
        this.rob = robot;
        console.log("ID= " + this.rob.id);
    }

    moveRob(){
       // this.rob.posX = this.rob.pX;
       // this.rob.posY = this.rob.pY;

console.log("this.rob = "+ this.rob);
        this.rob.skin.style.left = this.rob.pX + "px";
        this.rob.skin.style.top = this.rob.pY + "px";

        
    }
}

dto = new DTO();


class Robot{
    constructor(id){
        this.HP;
        this.damage;
        this.def;
        this.skin;
        this.pointAction;

        this.posX;
        this.posY;


        this.id = id;


        this.stepWidth = document.getElementsByClassName("tileCell")[0].clientWidth;        //Ширины и высота квадратика текстурки
        this.stepHeight = document.getElementsByClassName("tileCell")[0].clientHeight;

        this.onclick = this.onclick.bind(this); // Правильно ли сделал?
    }

    move(){
        this.posX +=this.stepWidth;
        this.skin.style.left = this.posX + "px";
    }

    upgrade(){

    }

    onclick(){
        console.log("This is a robot " );
        //this.move();        
        //this.saveRobot(this);
        dto.collectRobotInfo(this);
    }

    saveRobot(rob){
        let saveRob = rob;  //объект робот для передачи в метод движения по клику
        console.log("saveRob: " + saveRob);
    }
}


class feavyRobot extends Robot{
    constructor(posX, posY, id){
        super(id);
        this.HP = 100;
        this.damage = 25;
        this.def = 30;
        this.sprite = "robot.png";
        this.pointAction = 10;

        this.posX = posX;
        this.posY = posY;
    }
}


class wrapperRobot{             // Стоит ли так оставлять класс? Или метод генерации лучше в Робота перенести?
    constructor(){

    }

    renderRobot(r){
        r.skin = document.createElement('DIV');
        r.skin.className = 'robot';
        
        //container.appendChild(Map.skin);

        r.skin.style.left = r.posX + "px";
        r.skin.style.top = r.posY + "px";
        r.skin.style.width = 50 + "px";
        r.skin.style.height = 50 + "px";
        r.skin.style.position= "absolute";
        r.skin.style.backgroundImage = "url(" + r.sprite + ")";



        screen.appendChild(r.skin);
        console.log(r.stepWidth);
        console.log(r.stepHeight);
        r.skin.onclick = r.onclick;
    }

}


m = new FillingMap();
m.generateMap();

r = new wrapperRobot();
r.renderRobot(new feavyRobot(100, 100, 20));

//r2 = new wrapperRobot();
//r2.renderRobot(new feavyRobot(400, 200, 10));





//const widthScreen = document.getElementsByClassName("map")[0].clientWidth;