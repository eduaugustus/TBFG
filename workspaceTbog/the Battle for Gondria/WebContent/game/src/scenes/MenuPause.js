class MenuPause extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuPause"
        })
    }
    init(data, x) {
        this.player = data[0];
        this.name = data[1];
        this.player.keys.pause.isDown = false;
    	this.player.deletaIntervalo();

    }
    create() {
    	
        this.scene.bringToTop();
        let restartBtn = this.add.image(432, 310, "btnRestart").setInteractive();
        restartBtn.setScale(0.65);
        restartBtn.setScrollFactor(0);
        restartBtn.on('pointerdown', () => {
            this.player.menuIsSet = false;
            this.scene.moveBelow('MenuPause', this.name);
            this.scene.stop('MenuPause');
            this.player.restartScene();
        });
        
        let jogarBtn = this.add.image(432, 200, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);
        jogarBtn.setScrollFactor(0);
        jogarBtn.on('pointerdown', () => {
            this.player.menuIsSet = false;
            this.scene.moveBelow('MenuPause', this.name);
            this.scene.stop('MenuPause');
            this.player.keys.pause.isDown = false;
            this.player.criaIntervalo();
            this.scene.resume(this.name);
        });
        
        let voltarBtn = this.add.image(432, 400, "btnInicio").setInteractive();
        voltarBtn.setScale(0.65);
        voltarBtn.setScrollFactor(0);
        voltarBtn.on('pointerdown', () => {
            this.name.music.stop();
            // this.name.music.stop();
            this.player.sceneMainMenu = true;
            this.scene.sendToBack();
            this.scene.stop('MenuPause');
            this.player.keys.pause.isDown = false;
            this.scene.stop(this.name.name);
            this.scene.resume(this.name);
        });
        
        
    }
}
export default MenuPause;