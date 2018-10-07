class Casa {

  constructor(casaConfig, scene, player) {
    this.config = casaConfig;
    this.player = player;
    this.scene = scene;
  }

  update(player,scene) {
    this.player = player;

    if (this.player.keys.action.isDown) {
      if ((this.player.intoHouse == false) && (this.player.hasIntoHouse == false)) {

        this.entraNaCada(this.config);

      } else {
        this.saiDaCasa(this.config, scene);
      }
    }

  }

  entraNaCada(casa) {
    /*Parte que fará o jogador interagir com a casa*/
    let distanciaCasaX;
    let distanciaCasaY;
    distanciaCasaX = casa.x - this.player.sprite.body.x;
    distanciaCasaY = casa.y - this.player.sprite.body.y;

    if (distanciaCasaY <= 64) {
      if ((distanciaCasaX < 20) && (distanciaCasaX > -16) && (this.player.chave == 1)) {
        this.player.intoHouse = true;
        this.player.keys.action.isDown = false;
        this.player.oldSprite = this.player.sprite;
        this.player.oldScene = this.scene;

        this.scene.scene.launch('Level_casa', {
          scene: this.scene,
          player: this.player,
          casa: this
        });

        this.scene.scene.sendToBack(this.scene);
        this.scene.scene.bringToTop('level_casa');
        this.scene.scene.pause();

      }
    }
  }

  saiDaCasa(casa, scene) {

    /*Parte em que o jogador sai da casa */
    let distanciaPortaX = casa.portaX - this.player.sprite.body.x;
    let distanciaPortaY = casa.portaY - this.player.sprite.body.y;

    if (distanciaPortaY <= 64) {
      if ((distanciaPortaX < 15) && (distanciaPortaX > -16)) {
        let cenaCasa = scene;
        this.scene.scene.sendToBack(cenaCasa);
        this.scene.scene.sleep(cenaCasa);
        this.player.setScene(this.player.oldScene);
        this.player.sprite = this.player.oldSprite;
        this.scene.scene.resume(this.player.scene);
        this.player.intoHouse = false;
        this.player.hasIntoHouse = true;
        this.player.criaKeys(this.player.scene);
        this.player.createHUD();
        cenaCasa.scene.stop();
      }
    }
  }

}
export default Casa