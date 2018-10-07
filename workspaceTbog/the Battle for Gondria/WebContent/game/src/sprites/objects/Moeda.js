
class Moeda {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_moeda", 0);
    this.sprite.body.allowGravity = false;

    this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite, this.coletaMoeda, null, this.scene);

  }

  coletaMoeda(moeda, player) {
    this.player.score += 15;
    this.player.pegar.play();
    moeda.destroy();
  }
}
export default Moeda