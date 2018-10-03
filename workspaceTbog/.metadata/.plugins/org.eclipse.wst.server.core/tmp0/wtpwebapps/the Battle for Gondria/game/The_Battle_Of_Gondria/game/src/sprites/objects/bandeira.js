class Bandeira {
    constructor(scene,x,y,player){
        this.player = player;
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x,y,"bandeira_branca",0);
            
        this.sprite.anims.play('bandeira_branca_play',true);
        this.c_player = this.scene.physics.add.overlap(this.sprite, this.scene.player.sprite,this.ending,null,this.scene);
        if(this.scene.ended==true){
            this.scene.ended=false;
        }
    }

    ending(bandeira, player){
        bandeira.anims.play('bandeira_verde_play',true);
        this.player.deletaIntervalo();
        this.player.canStop = false;
        this.player.initBossSecs = this.player.secs;
        this.player.initBossMins = this.player.mins;
        console.log(this.ended);
        if(!this.ended){
            setTimeout(()=>{
                this.scene.stop();
                this.scene.launch(this.SceneBoss,{player: this.player});
            },
            2000);
        }
        this.ended = true;
    }
}
export default Bandeira;