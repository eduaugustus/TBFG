class Soldados {
    constructor(scene, camada1) {
        this.scene = scene;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_soldado") {

                let soldado = this.array.create(spawns[i].x, spawns[i].y, 'soldado');
                soldado.setScale(0.55);
                soldado.lifes = 4;
                soldado.jump = 0;
                soldado.isHit = {
                    right: false,
                    left: false
                };
                soldado.isDead = false;
                soldado.canHit = true;
                soldado.canMove = true;
                soldado.isAttacking = false;
            } 
        }
        this.scene.physics.add.collider(this.array, camada1);
        
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.soldadoHit, null, this.scene);
        this.collides = false;
    }
    
    soldadoHit(soldado,player){
    	if ((soldado.stop == undefined || soldado.stop == false)&&this.soldados.collides&&!soldado.lifes>0) {
        
            this.soldados.collides = false;
            this.colisao = true;
            player.setVelocityX(0);
            if (player.x - soldado.x <= 0) {
                soldado.setVelocityX(150);
            } else {
                soldado.setVelocityX(-150);
            }
            soldado.setVelocityY(-200);
            if (soldado.body.velocity.x <= 0) {
                player.setVelocityX(150);
            } else {
                player.setVelocityX(-150);
            }
            soldado.canMove = false;
            player.setVelocityY(-100);
            this.player.lifes -= 1;
            console.log(this.player.lifes + ' - player goblin hit');
            this.player.hit.play();
            player.setVelocityY(-150);
            this.player.hit.play();
        }
    }
    
	update(player){
		this.collides = false;
		for (let i = 0; i < this.array.children.entries.length; i++) {
            let soldado = this.array.children.entries[i];
            if(soldado.lifes>0&& !soldado.isHit.left&&!soldado.isHit.right){
            	let xDistance = player.x-soldado.x;
            	let yDistance = player.y-soldado.y;
            	if(yDistance<60){
            		if(xDistance<100&&xDistance>=0){
            			if(!soldado.isAttacking){            	
            			soldado.anims.play('soldado_walk_right',true);
            			}
            			soldado.setVelocityX(100)
            		}else if(xDistance>-100&&xDistance<0){
            			if(!soldado.isAttacking){            	
            			soldado.anims.play('soldado_walk_left',true);
            			}
            			soldado.setVelocityX(-100)
            		}else{
            			if(!soldado.isAttacking){            				
            			soldado.anims.play('soldado_stand',true);
            			}
            			soldado.setVelocityX(0)
            		}
            		if(xDistance<40&&xDistance>=0){
            			soldado.isAttacking = true;
            			if(!soldado.isAttacking){            	
            				soldado.anims.play('soldado_attack_right',true);
            			}
            			setTimeout(()=>{this.collides = true},500)
            			
            			setTimeout(()=>{soldado.isAttacking = false},1000)
            		}else if(xDistance>-40&&xDistance<0){
            			soldado.isAttacking = true;
            			if(!soldado.isAttacking){            	
            				soldado.anims.play('soldado_attack_left',true);
            			}
            			setTimeout(()=>{this.collides = true},500);
            			setTimeout(()=>{soldado.isAttacking = false},1000);
            		}
            	}else{
        			soldado.setVelocityX(0)
        			soldado.anims.play('soldado_stand',true);
            	}
            	
            }else if(soldado.lifes==0){
            	soldado.isDead = true;
            	soldado.lifes--;
            	soldado.anims.play('morte');
                setTimeout(() => {
//                    this.atualizaPontuacao();
                    soldado.destroy();
                }, 466);

            }else{
            	setTimeout(()=>{            		
            	if(soldado.body.onFloor()){
            		soldado.isHit.right= false;
            		soldado.isHit.left= false;
            	}
            	},500)
            }
           }
	}
}
export default Soldados;