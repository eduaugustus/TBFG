
class Chave {
  constructor(scene, x, y,player) {
    this.scene = scene;
    this.player = player;
    // console.log(this.scene);
    // console.log(this.scene.player.chave);
    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_chave", 0);

    this.sprite.body.allowGravity = false;

    this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite, this.coletaChave, null, this.scene);

  }

  coletaChave(chave, player) {
    player.score += 40;
    this.player.chave = 1;
    chave.destroy();
  }
}
export default Chave