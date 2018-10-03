import Anims from '../sprites/Anims.js';
class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });
    }


    preload() {
        
        let anim = new Anims(this);
        anim.criaAnims(this.anims);
        this.load.tilemapTiledJSON("map_mainMenu", "assets/tilemap/mainMenuMap.json");
        this.load.image('logo', 'assets/images/logo.png');
        
    }


    create() {

        const map = this.make.tilemap({
            key: 'map_mainMenu'
        });

        let foreground = map.addTilesetImage('ground', 'fase_1_tileset');
        let middleground_2 = map.addTilesetImage('itensDeCenario', 'itensCenario');
        let middleground = map.addTilesetImage('montanhas', 'fase_1_montanhas');
        let background = map.addTilesetImage('sky', 'fase_1_sky');

        map.createStaticLayer('background', background, 0, 0);
        map.createStaticLayer('middleground', middleground, 0, 0);
        map.createStaticLayer('middleground_2', middleground_2, 0, 0);
        map.createStaticLayer('foreground', foreground, 0, 0);

        let hero = this.add.sprite(85, 375, 'sprite_hero');
        hero.anims.play('move');

        let logo = this.add.image(432, 200, 'logo');
        logo.setScale(0.13);

        let jogarBtn = this.add.image(320, 310, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);

        let ajudaBtn = this.add.image(535, 310, "btnAjuda").setInteractive();
        ajudaBtn.setScale(0.65);

        if(this.sound.sounds[0]===undefined){
            let music= this.sound.add('menusMusic');
            music.setLoop(true);
            music.setVolume(0.3);
        }
        // console.log(this.sound);
        if(this.sound.sounds[0].isPlaying==false){
            this.sound.sounds[0].play();
        }

        jogarBtn.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnJogarPress");
            setTimeout(()=> {
                btn.setTexture("btnJogar");
                this.scene.scene.start('MenuFases');
            },150)
        });

        ajudaBtn.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnAjudaPress");
            setTimeout(()=> {
                btn.setTexture("btnAjuda");
                this.scene.scene.start('AjudaScene');
            },150)
        });
        
    }

}
export default MainMenu;