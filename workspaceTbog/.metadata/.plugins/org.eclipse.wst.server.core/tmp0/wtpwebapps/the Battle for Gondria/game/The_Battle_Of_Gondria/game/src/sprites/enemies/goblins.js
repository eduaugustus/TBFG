class Goblins {
    constructor(scene, camada1) {
        this.scene = scene;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_Goblin") {

                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                // goblin.setScale(2);
                goblin.lifes = 3;
                goblin.jump = 0;
                goblin.isHit = {
                    right: false,
                    left: false
                };
                goblin.isDead = false;
                goblin.canHit = true;
                goblin.canMove = true;
                goblin.anims.play('goblin_standing_right',true);

            } else if (spawns[i].name === 'Spawn_Boss') {
                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                goblin.lifes = 4;
                goblin.jump = 0;
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
        if(goblin.stop==undefined||goblin.stop==false){

            this.colisao = true;
            player.setVelocityX(0);
            if (player.x - goblin.x <= 0) {
                goblin.setVelocityX(200);
            } else {
                goblin.setVelocityX(-200);
            }
            goblin.setVelocityY(-200);
            if (goblin.body.velocity.x <= 0) {
                player.setVelocityX(200);
            } else {
                player.setVelocityX(-200);
            }
            player.setVelocityY(-100);
            this.player.lifes -= 1;
            console.log(this.player.lifes + ' - player goblin hit');
            this.player.hit.play();
            player.setVelocityY(-150);
            this.player.hit.play();
        }

    }

    update(player) {
        this.player = player;
        for (let i = 0; i < this.array.children.entries.length; i++) {
            let goblin = this.array.children.entries[i];
            if (goblin === this.boss) {
                console.log(goblin.lifes);
                if (goblin.lifes == 0) {
                    this.c_player.active = false;

                    let data = {
                        player: this.scene.player
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
                    if (goblin.jump == 10 || goblin.jump == 20 || goblin.jump == 30) {
                        goblin.canMove = false;
                        goblin.canHit = true;
                        goblin.stop = true;
                        goblin.setVelocityX(0);
                        goblin.setVelocityY(0);
                        goblin.jump++;
                        setTimeout(() => {
                            goblin.canHit = false;
                            goblin.canMove = true;
                            goblin.stop = false;
                        }, 5000);

                    } else if (goblin.jump > 30) {
                        goblin.jump = 0;
                    } else if (player.x > 32) {
                        if (player.x < goblin.x) {
                            if (goblin.body.onFloor()) {
                                this.scene.goblin_jump.play();
                                goblin.jump++;
                                if (goblin.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                goblin.setVelocityX(-200);
                                goblin.setVelocityY(-500);
                            }
                        } else if (player.x > goblin.x) {
                            if (goblin.body.onFloor()) {
                                goblin.jump++;
                                this.scene.goblin_jump.play();
                                if (goblin.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                goblin.setVelocityX(200);
                                goblin.setVelocityY(-500);
                            }
                        } else {
                            if (goblin.body.onFloor()) {
                                goblin.jumps++;
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
            } else if (goblin.canMove) {


                if (goblin.lifes == 0) {
                    goblin.anims.play('morte');
                    goblin.lifes = -1;
                    setTimeout(() => goblin.destroy(), 466);
                    goblin.isDead = true;
                }
                if (!goblin.isDead) {

                    if (goblin.y > 490) {
                        goblin.destroy();
                    } else if (player.y - goblin.y < 72 && player.y - goblin.y > -72 && this.scene.colisao == false) {
                        /* if (goblin.body.touching.up) {
                            goblin.destroy();
                        player.setVelocityY(-100);
                    } else*/
                        if (player.x - goblin.x < 200 && player.x - goblin.x > 0 && !goblin.isHit.right) {
                            if (player.y - goblin.y < -20 && goblin.body.onFloor()) {
                                goblin.setVelocityY(-150);
                                this.scene.goblin_jump.play();
                            }
                            goblin.anims.play('goblin_runing_right',true);
                            goblin.setVelocityX(100);
                        } else if (player.x - goblin.x > -200 && player.x - goblin.x < 0 && !goblin.isHit.left) {
                            if (player.y - goblin.y < -20 && goblin.jump < 15 && goblin.body.onFloor()) {
                                this.scene.goblin_jump.play();
                                goblin.setVelocityY(-150);

                            }
                            
                            goblin.anims.play('goblin_runing_left',true);
                            goblin.setVelocityX(-100);
                        } else if (!goblin.isHit.right && !goblin.isHit.left) {
                            goblin.setVelocityX(0);
                            console.log(goblin.anims);
                        }
                    } else if (!goblin.isHit.right && !goblin.isHit.left) {
                        goblin.setVelocityX(0);
                    }
                    if (goblin.isHit.right) {
                        setTimeout(() => goblin.isHit.right = false, 500);
                    }
                    if (goblin.isHit.left) {
                        setTimeout(() => goblin.isHit.left = false, 500);
                    }
                }
            }
        }
    }
}
export default Goblins;