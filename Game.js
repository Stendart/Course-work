const screen = document.getElementById('scene');
console.clear();
console.log('update');


class Map {
    constructor(i, j) {
        this.protectionBonus = 0; //Вообще нет смысле указывать свойства класса, в JS это ничего не даст.
        this.pointOnStep = 1;     // -//-
        this.image = '';          // -//-

        this.i = i;
        this.j = j;

        this.mapTileOnClick = this.mapTileOnClick.bind(this);
    }

    mapTileOnClick(e) {
        console.clear();
        /*
        just tip:
        Всегда старайся делать логи более информативными. console.log("Click", e) - огонь!
        Проверил что ивент робит, и что туда падает вывел! То, что в  ты сделал 1м аргументом описание - хорошо.
        Еще лучше, если бы указал откуда этот вызов идёт, типа "Map class click:". Сейчас в этом не много смысла,
        но в жирном проекте, где в консоли много инфы - это пригодится.
        */
        //console.log("Click", e);
        console.log('Map class click:', this.i + ' j: ' + this.j);
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
        this.mas = [];
    }

    addToArray(mapSection) {
        this.mas.push(mapSection);
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

            this.mas[i] = [];

            for (let j = 0; j < 10; j++) {
                let random = Math.random();
                if (random > 0.9) {
                    this.mas[i][j] = this.createElement(new MapMountain(i, j), row);
                } else if (random < 0.1) {
                    this.mas[i][j] = this.createElement(new MapForest(i, j), row);
                } else
                    this.mas[i][j] = this.createElement(new MapPlain(i, j), row);        //Стоит ли так оставлять? Или массив вынести отдельным методом (как?)

                //console.log(random);
            }
        }
        //console.log(this.mas)
    }
}


const dto = new class DTO {      //Сделать Синглтоном // легко!
    constructor() {
        //this.ob;
        this.currentSelectedUnit; //id юнита
    }

    transfer(I, J) {
        //console.log("Hi " + document.getElementsByClassName("tileCell")[0].clientWidth);
        //const widthScreen = document.getElementsByClassName('tileCell')[0].clientWidth;
        //const heightScreen = document.getElementsByClassName('tileCell')[0].clientHeight;
        //let i = I;
        //let j = J;


        //this.rob.pX = widthScreen * J;    //получаем координаты нового нахождения робота
        //this.rob.pY = heightScreen * I;   //умножая ширину/высоту клетки на её номер в строке/столбце ()
        //return ob
        //this.moveRob();

        this.rob.moveTo(I, J);
        this.rob.render();
    }

    collectRobotInfo(robot) {
        this.rob = robot;
        console.log('ID= ' + this.rob.id);
    }

    /*moveRob() {
        // this.rob.posX = this.rob.pX;
        // this.rob.posY = this.rob.pY;
        this.rotateRob();
        console.log('this.rob = ' + this.rob);
        this.rob.skin.style.left = this.rob.pX + 'px';
        this.rob.skin.style.top = this.rob.pY + 'px';

    }*/

    rotateRob() {        //======ToDo
        if (this.rob.skin.style.left > this.rob.pX + 'px') {
            this.rob.skin.style.transform = 'rotate(' + 270 + 'deg)';
            console.log('Поворот произошел?');
        } else if (this.rob.skin.style.left < this.rob.pX + 'px') {
            this.rob.skin.style.transform = 'rotate(' + 90 + 'deg)';
        }


    }
}(); // т.к. я переделал в синглтон, если мы сразу вызываем созданный класс то нужны пустые скобки конструктора.

//dto = new DTO();


function getMapTileSize() {
    const width = document.getElementsByClassName('tileCell')[0].offsetWidth;
    const height = document.getElementsByClassName('tileCell')[0].offsetHeight;
    return {
        width: width,
        height: height,
    };
}

class Robot {

    constructor(id) {
        this.HP;
        this.damage;
        this.def;
        this.skin;
        this.pointAction;  // опять же - объявлять пустые значения тут нет смысла.

        // this.posX;
        // this.posY;

        this.id = id;
        /*
                this.stepWidth = document.getElementsByClassName('tileCell')[0].clientWidth;        //Ширины и высота квадратика текстурки
                this.stepHeight = document.getElementsByClassName('tileCell')[0].clientHeight;
                //  ↑ Это нужно перенести в отдельный метод getMapTileSize и потом оптимизировать
        */
        this.onclick = this.onclick.bind(this); // Правильно ли сделал? // отлично
        this.moveTo = this.moveTo.bind(this);
        this.render = this.render.bind(this);
    }


    /*move() {
        this.posX += this.stepWidth;
        this.skin.style.left = this.posX + 'px';
    }*/

    moveTo(i, j) {
        const needsUpdate = this.i !== i || this.j !== j;
        this.i = i;
        this.j = j;
        if (needsUpdate) this.render();
    }


    onclick() {

        create.mas.forEach((el, i) => {
            console.log('Цикл ' + el);
            el.getRobot().skin.classList.remove('selected');
        });
        console.log('This is a robot ' + this.skin.classList);
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

    saveRobot(rob) {     //=================================ВОЗМОЖНО, НЕ ИСПОЛЬЗУЕТСЯ====================
        let saveRob = rob;  //объект робот для передачи в метод движения по клику
        console.log('saveRob: ' + saveRob);
    }

    render() {

        const { width, height } = getMapTileSize();

        this.width = this.height = height;

        // чё я тут сделал ↑ :
        // Метод getMapTileSize возвращает объект с двумя полями - width, height.
        // Мы эти поля берем тут как константы
        // То есть, работает это так:
        // const Object = { param1: value1, param2: value2, }; //Создали объект с двумя полями.
        // const { param1 } = Object;  - взяли из этого объекта поле и используем как переменную в этом блоке
        //
        // так же можно было бы сделать так:
        // const param1 = Object.param1; - одно и то же.
        //
        this.skin.style.width = this.width + 'px';
        this.skin.style.height = this.height + 'px';

        const borderSize = 4;

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
        this.height = 50; // будем хранить размеры робота в нём же, для расчётов пригодится)

        this.i = posI;
        this.j = posJ;
        // this.posX = posX;
        // this.posY = posY;
    }
}


class wrapperRobot {             // Стоит ли так оставлять класс? Или метод генерации лучше в Робота перенести?
    constructor(r) {
        this.setupRobotSkin(r);
        this.ob = r;
    }

    // renderRobot(r){
    /* нууу... это не совсем рендер. Ведь тут мы один раз создаем контейнер,
    а потом уже меняем положения, повороты и прочее, то есть, как раз ПОТОМ мы и рендерим. */

    setupRobotSkin(r) {
        r.skin = document.createElement('DIV');
        r.skin.className = 'robot';

        //container.appendChild(Map.skin);

        /*
        r.skin.style.position= "absolute";
        r.skin.style.backgroundImage = "url(" + r.sprite + ")";
        r.skin.style.backgroundSize = "100% 100%";
        */
        /* какой смысл держать тут статические стили? перенесем их в CSS */

        r.skin.style.width = r.width + 'px';
        r.skin.style.height = r.height + 'px';

        /*
        r.skin.style.left = r.posX + 'px';
        r.skin.style.top = r.posY + 'px';

        а вот с этими отдельная песня - их мы будем рендерить ИЗ I и J в самом роботе!
        */

        r.skin.style.backgroundImage = 'url(' + r.sprite + ')';

        screen.appendChild(r.skin);
        //console.log(r.stepWidth);
        //console.log(r.stepHeight);
        r.skin.onclick = r.onclick;         //Стоит ли так оставлять?
    }

    getRobot() {
        return this.ob;
    }

}

class army {
    constructor() {
        this.mas = [];    // TODO:
        // ( ↑ ) Плохо называть массивы МАССИВ =. Вместо этого именовать так, что бы было понятно,
        // для чего создан этот массив. Например, если это массив роботов, то robots = [];
        this.IdGenerator = 0;
        //console.log("Массив " + this.mas);
    }

    createArmy() {
        for (this.IdGenerator; this.IdGenerator < 3; this.IdGenerator++) {     //Сделать более осмысленный способ задания кол-ва роботов

            this.mas[this.IdGenerator] = new wrapperRobot(new feavyRobot(1, this.IdGenerator, this.IdGenerator));
            this.mas[this.IdGenerator].getRobot().render();
            console.log('Проход ' + this.IdGenerator);
            console.log('Проход генератора ' + this.mas[this.IdGenerator].getRobot().skin);     //Стоит так делать?(Засовывать геттер, что бы достучатсья до робота. Или лучше просто рендер робота не выносить во wrapper и сделать прост метод в классе Robot?)
            //Слушай, ну, рендер я бы точно сделал в самом роботе. Но как служебный метод может пригодится.

            //this.mas[this.IdGenerator].getRobot().skin.onclick+=this.onclick();
            //this.mas[this.IdGenerator]

        }
    }

    /* onclick() { // это тут не нужно)
        console.log('New click!!!');
    }*/

    /* console.log("Test in method");
     this.mas.forEach((el, i) =>{
         this.mas[i] = new wrapperRobot(new feavyRobot(100, 100, this.IdGenerator));
         this.IdGenerator++;
         console.log("Проход " + i);
     })*/
}

// Если окно изменило размер - всё перерендерить:
window.onresize = function () {
    create.mas.forEach((el) => {
        el.getRobot().render();
    });
}


m = new FillingMap();
m.generateMap();

//r = new wrapperRobot(new feavyRobot(100, 100, 20));
//r.renderRobot(new feavyRobot(100, 100, 20));

create = new army();
create.createArmy();

//r2 = new wrapperRobot();
//r2.renderRobot(new feavyRobot(400, 200, 10));


//const widthScreen = document.getElementsByClassName("map")[0].clientWidth;