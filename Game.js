class Map
{
	constructor()
	{
		this.protectionBonus;
		this.pointOnStep;
		this.image;
	}


}

class mapMountain extends Map
{
	constructor()
	{
		super();
		this.protectionBonus = 20;
		this.pointOnStep = 10;
		this.image = "005.png";
	}
}

class mapForest extends Map
{
	constructor()
	{
		//super;
		this.protectionBonus = 5;
		this.pointOnStep = 5;
		this.image = "005.png";
	}
}

class mapPlain extends Map
{
	constructor()
	{
		//super;
		this.protectionBonus = 0;
		this.pointOnStep = 1;
		this.image = "005.png";
	}
}



class fillingMap
{
	createElement(Map)
	{
		Map.skin = document.createElement('div');
		Map.skin.style.width = Map.skin.style.height = 70 + "px";
		//this.skin.style.height = 40 + "px";
		Map.skin.style.position= "absolute";
		Map.skin.style.left= 200 + "px";//this.posX + "px";
		Map.skin.style.top= 100 + "px";//this.posY + "px";
		document.body.appendChild(Map.skin);
		Map.skin.style.backgroundImage = "url(" + Map.image + ")";//Map.image;
		Map.skin.style.backgroundPosition = "-10px -10px";
		//background-position:-100px -100px

		
	}

}

m = new fillingMap();
mount = new mapMountain();

m.createElement(mount);





/*this.skin = document.createElement('div');
		this.skin.style.width = this.skin.style.height = (Math.random()*(50-10+1))+10 + "px";
		//this.skin.style.height = 40 + "px";
		this.skin.style.position= "absolute";
		this.skin.style.left= this.posX + "px";
		this.skin.style.top= this.posY + "px";
		document.body.appendChild(this.skin);
		this.skin.style.backgroundImage = [ "url(http://galerey-room.ru/images_thumb/093225_1419402745.png)",
											"url(http://galerey-room.ru/images_thumb/093119_1419402679.png)",
											"url(http://galerey-room.ru/images_thumb/093242_1419402762.png)"] [Math.floor(Math.random()*2)]*/