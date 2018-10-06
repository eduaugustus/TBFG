
class Aldeao {
  constructor(scene, x, y) {
    this.scene = scene;
    this.msg;
    this.msgText;
    this.msgOn = false; 
    this.sprite = this.scene.physics.add.sprite(x, y, "sprite_aldeao", 0);

  }

  update(scene, player, msg){

    if(player.keys.action.isDown){

      let xdistance = this.sprite.x - player.sprite.body.x;
      let ydistance = this.sprite.y - player.sprite.body.y;

      if(this.msgOn == false){
        if(ydistance <= 38){
          if((xdistance < 60)&&(xdistance > -16)){
            this.msgOn = true;
            this.msg = scene.add.image(this.sprite.x + -100, this.sprite.y + -100, 'msg');
            this.msgText = scene.add.bitmapText(this.sprite.x + -230, this.sprite.y + -135, 'myfont', msg, 30); 
            this.excluiMsg();
          }
        }
      }
    }

  }

  excluiMsg(){
    setTimeout(() => {
      this.msg.destroy();
      this.msgText.destroy();
    }, 5000);
  }

}
export default Aldeao