class AjudaScene extends Phaser.Scene {

  constructor() {
    super({
      key: "AjudaScene"
    });
  }


  preload() {



  }

  create() {

    var music = this.sound.add('menusMusic');

    // music.play();

    this.add.image(432, 240, 'bgGeral');

    this.voltarBtn = this.add.image(785, 35, 'btnVoltar').setInteractive();
    this.voltarBtn.setScale(0.6);

    this.voltarBtn.on("pointerdown", function () {
      let btn = this;
      btn.setTexture("btnVoltarPress");
      setTimeout(() => {
        btn.setTexture("btnVoltar");
        this.scene.scene.start('MainMenu');
      }, 150)
    });
    let botaoUp = this.add.sprite(55, 120, 'setas').setScale(0.750);
    let botaoLeft = this.add.sprite(55, 240, 'setas').setScale(0.750);
    let botaoRight = this.add.sprite(55, 360, 'setas').setScale(0.750);
    let botaoZ = this.add.sprite(440, 120, 'setas').setScale(0.750);
    let botaoC = this.add.sprite(440, 240, 'setas').setScale(0.750);
    let botaoP = this.add.sprite(440, 360, 'setas').setScale(0.750);

    botaoUp.anims.play('up');
    botaoLeft.anims.play('left');
    botaoRight.anims.play('right');
    botaoZ.anims.play('keyZ');
    botaoC.anims.play('keyC');
    botaoP.anims.play('keyP');

    let heroBotaoUp = this.add.sprite(140, 120, 'sprite_hero');
    let heroBotaoLeft = this.add.sprite(140, 240, 'sprite_hero');
    let heroBotaoRight = this.add.sprite(140, 360, 'sprite_hero');
    this.heroBotaoZ = this.add.sprite(510, 120, 'sprite_hero');
    let heroBotaoC = this.add.sprite(510, 240, 'sprite_hero');
    heroBotaoUp.anims.play('sprite_hero_right');
    heroBotaoLeft.anims.play('sprite_hero_left');
    heroBotaoRight.anims.play('sprite_hero_right');
    this.heroBotaoZ.anims.play('sprite_hero_z_right');
    heroBotaoC.anims.play('sprite_hero_c');

    this.add.image(290, 120, 'pular').setScale(0.6);
    this.add.image(290, 240, 'andarEsquerda').setScale(0.6);
    this.add.image(290, 360, 'andarDireita').setScale(0.6);
    this.add.image(680, 120, 'atacar').setScale(0.8);
    this.add.image(680, 250, 'interagir').setScale(0.7);
    this.add.image(600, 370, 'pausar').setScale(0.7);
    setInterval(() => {
      this.heroBotaoZ.anims.play('sprite_hero_z_right');
    }, 2000);
  }
  update() {}


}
export default AjudaScene;