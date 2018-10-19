class Goblins {
    constructor(scene, camada1) {
        this.scene = scene;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_Goblin") {

                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                goblin.lifes = 3;
                goblin.jump = 0;
                goblin.isHit = {
                    right: false,
                    left: false
                };
                goblin.isDead = false;
                goblin.canHit = true;
                goblin.canMove = true;
                goblin.anims.play('goblin_standing_left', true);

            } else if (spawns[i].name === 'Spawn_Boss') {
                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                goblin.lifes = 4;
                goblin.jumps = 0;
                goblin.isHit = {
                    right: false,
                    left: false
                };
                goblin.isDead = false;
                goblin.canHit = false;
                goblin.canMove = true;
                this.boss = goblin;

            }
        }
        this.scene.physics.add.collider(this.array, camada1);
        
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.goblinHit, null, this.scene);
    }
    
    goblinHit(goblin, player) {
        if ((goblin.stop == undefined || goblin.stop == false)&&this.goblins.collides&&!goblin.lifes>0) {
        	if (goblin.body.touching.down&&player.body.touching.up){
        		
        	}else if(goblin.body.touching.down&&player.body.touching.up){
        		goblin.setVelocityY(-200);
        		
        	}else{
        		
            this.goblins.collides = false;
            this.colisao = true;
            player.setVelocityX(0);
            if (player.x - goblin.x <= 0) {
                goblin.setVelocityX(150);
            } else {
                goblin.setVelocityX(-150);
            }
            goblin.setVelocityY(-200);
            if (goblin.body.velocity.x <= 0) {
                player.setVelocityX(150);
            } else {
                player.setVelocityX(-150);
            }
            goblin.canMove = false;
            player.setVelocityY(-100);
            this.player.lifes -= 1;
            this.player.hit.play();
            player.setVelocityY(-150);
            this.player.hit.play();
        }
        }
        
    }
    
    update(player) {
        this.collides = false;
        this.player = player;
        for (let i = 0; i < this.array.children.entries.length; i++) {
            let goblin = this.array.children.entries[i];
            if(!goblin.isDead){

            	if (goblin === this.boss) {
                    this.collides = true;
                    if (goblin.lifes == 0) {
                        this.c_player.active = false;
                        
                    let data = {
                        player: this.scene.player,
                        fase: "2",
                        bossPontuacao : 1050
                    };
                    
                    goblin.anims.play('morte');
                    goblin.lifes = -1;
                    setTimeout(
                        () => {
                            goblin.destroy();
                            this.scene.player.victory.play();
                            this.scene.music.stop();
                        }, 2000);
                    this.scene.player.deletaIntervalo();
                    setTimeout(() => {
                        this.scene.scene.start('CalculaPontuacao', data);
                    }, 5000);
                } else if (goblin.canMove) {
                    if (goblin.jumps == 10 || goblin.jumps == 20 || goblin.jumps == 30) {
                    	goblin.anims.play('goblin_hitted_left', true);
                    	goblin.canMove = false;
                        goblin.canHit = true;
                        goblin.stop = true;
                        goblin.setVelocityX(0);
                        goblin.setVelocityY(0);
                        goblin.jumps++;
                        setTimeout(() => {
                            goblin.canHit = false;
                            goblin.canMove = true;
                            goblin.stop = false;
                        }, 5000);

                    } else if (goblin.jumps > 30) {
                        goblin.jumps = 0;
                    } else if (player.x > 32) {
                        if (player.x < goblin.x) {
                            if (goblin.body.onFloor()) {
                                this.scene.goblin_jump.play();
                                goblin.jumps++;
                                if (goblin.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                goblin.anims.play('goblin_runing_left', true);
                                let oi = Math.random(); 
                                let hey = Math.random(); 
                                goblin.setVelocityX(-200*oi);
                                goblin.setVelocityY(-500*hey);
                            }
                        } else if (player.x > goblin.x) {
                            if (goblin.body.onFloor()) {
                                goblin.jumps++;
                                this.scene.goblin_jump.play();
                                if (goblin.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                goblin.anims.play('goblin_runing_right', true);
                                let oi = Math.random(); 
                                let hey = Math.random(); 
                                goblin.setVelocityX(200*oi);
                                goblin.setVelocityY(-500*hey);
                            }
                        } else {
                            if (goblin.body.onFloor()) {
                                goblin.jumpss++;
                                this.scene.goblin_sound.play();
                                if (goblin.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                goblin.setVelocityX(0);
                                goblin.setVelocityY(-300);
                            }
                        }
                    }
                } else {
                    
                }
            } else  {

                
                if (goblin.lifes == 0) {
                	this.scene.player.score += 80;
                    goblin.isDead = true;
                    goblin.anims.play('morte');
                    goblin.lifes = -1;
                    setTimeout(() => goblin.destroy(), 466);
                }else if (!goblin.isDead&&!goblin.isHit.left&&!goblin.isHit.right) {
                    
                    if (goblin.y > 490) {
                        goblin.isDead = true;
                        goblin.destroy();
                    } else if (player.y - goblin.y < 72 && player.y - goblin.y > -72 && this.scene.colisao == false) {
                        if(player.x - goblin.x<64&&player.x-goblin.x>=0){
                            goblin.anims.play('goblin_hitting_left', true);
                            setTimeout(()=>{
                                if(!goblin.isDead){
                                    goblin.setVelocityX(100);
                                    this.collides=true;
                                }
                            },700);
                        }else if(player.x - goblin.x>-64&&player.x-goblin.x<0){
                            goblin.anims.play('goblin_hitting_right', true);
                            setTimeout(()=>{                                
                                goblin.setVelocityX(-100);
                                this.collides=true;
                            },700);
                        }else if (player.x - goblin.x < 200 && player.x - goblin.x > 0 && !goblin.isHit.left&& goblin.body.onFloor()) {
                            goblin.anims.play('goblin_runing_right', true);
                            goblin.setVelocityX(100);
                        } else if (player.x - goblin.x > -200 && player.x - goblin.x < 0 && !goblin.isHit.right&& goblin.body.onFloor()) {
                            goblin.anims.play('goblin_runing_left', true);
                            goblin.setVelocityX(-100);
                        } else if (!goblin.isHit.right && !goblin.isHit.left) {
                            goblin.setVelocityX(0);
                        }
                    } else if (!goblin.isHit.right && !goblin.isHit.left) {
                        goblin.setVelocityX(0);
                        goblin.anims.play('goblin_standing_left', true);
                    }
                    if (goblin.isHit.right) {
                        goblin.anims.play('goblin_hitted_right', true);
                    }
                    if (goblin.isHit.left) {
                        goblin.anims.play('goblin_hitted_left', true);
                    }
	            	}else{
	            	setTimeout(()=>{
	            		if(goblin.body.onFloor()){
	            			goblin.isHit.left=false;
	            			goblin.isHit.right = false;
	            		}
	            	},2000)
	            }
            }
        }
    }
}
}
export default Goblins;