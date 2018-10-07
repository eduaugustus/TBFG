
class Pocao {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_pocao", 0);
    this.sprite.body.allowGravity = false;

    this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite, this.coletaPocao, null, this.scene);

  }

  coletaPocao(pocao, player) {
    if(this.player.lifes == 4){
      this.player.score += 25;
    }else{
      this.player.lifes += 1;
      this.player.score += 25;
    }
    this.player.pegar.play();
    pocao.destroy();
  }
}
export default Pocao;