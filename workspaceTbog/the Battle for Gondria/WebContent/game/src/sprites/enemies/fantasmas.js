class Fantasmas {
    constructor(cena){
        this.scene = cena;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_fantasma") {
                let fantasma = this.array.create(spawns[i].x, spawns[i].y, 'fantasma');
                fantasma.body.allowGravity = false;
                console.log(fantasma);
                fantasma.canHit = true;
                fantasma.anims.play('ghost',true);
                // goblin.setScale(2);

            }
        }
        this.scene.physics.add.overlap(this.array, this.scene.player.sprite, this.ghostHit, null, this.scene);
    }
    ghostHit(player, ghost){
        if (this.fantasmas.collides) {
            this.fantasmas.collides = false;
            this.colisao = true;
            player.setVelocityY(-300); 
            player.setVelocityX(-200);   
            this.player.lifes--;
        }
    }
    update(player){
        if(!this.collides){
            setTimeout(()=>{
                if(!this.collides){
                    this.collides = true;
                }
            },1000);
        }
        for(let i =0;i<this.array.children.entries.length;i++){
            let ghost = this.array.children.entries[i];
            if(player.x-ghost.x>-432&player.x-ghost.x<0){
                if(ghost.body.velocity.x!=-150){
                    ghost.setVelocityX(-150);
                    ghost.anims.play('ghost',true);
                }
            }
            let ghostdistance = player.x-432-ghost.x;
            if(ghostdistance<10&&ghostdistance>-10){
                let random = Math.floor(Math.random() * 100) + 1;  
                if(random>=50){
                    if(ghost.body.velocity.x!=150){
                        ghost.anims.play('ghost_back',true);
                        ghost.setVelocityX(150);
                    }
                }else{
                    ghost.destroy();
                }
            }
            }
    }
}
export default Fantasmas;