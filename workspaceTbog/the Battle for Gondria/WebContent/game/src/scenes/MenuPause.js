class MenuPause extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuPause"
        })
    }
    init(data, x) {
        
        this.player = data[0];
        this.name = data[1];
        this.player.deletaIntervalo();

    }
    create() {
        this.scene.bringToTop();
        let jogarBtn = this.add.image(432, 310, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);
        jogarBtn.setScrollFactor(0);
        console.log(this.name);
        jogarBtn.on('pointerdown', () => {
            this.player.menuIsSet = false;
            this.scene.moveBelow('MenuPause', this.name);
            this.scene.stop('MenuPause');
            this.player.keys.pause.isDown = false;
            this.player.criaIntervalo();
            this.scene.resume(this.name);
        });
        
        let voltarBtn = this.add.image(432, 200, "btnVoltar").setInteractive();
        voltarBtn.setScale(0.65);
        voltarBtn.setScrollFactor(0);
        // console.log(this.player.scene);
        voltarBtn.on('pointerdown', () => {
            this.name.music.stop();
            // this.name.music.stop();
            this.player.sceneMainMenu = true;
            this.scene.sendToBack();
            this.scene.stop('MenuPause');
            this.player.keys.pause.isDown = false;
            // console.log(this.scene);
            this.scene.stop(this.name.name);
            this.scene.resume(this.name);
        });
    }
}
export default MenuPause;