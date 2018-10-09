class Slimes {
    constructor(scene, camada1) {
        this.scene = scene;
        const anims = scene.anims;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === 'Spawn_Slime_Boss') {

                this.boss = this.array.create(spawns[i].x, spawns[i].y, 'slime_verde');
                this.boss.setScale(5.0);
                this.boss.lifes = 4;
                this.boss.canHit = false;
                this.boss.cor = "verde";
                this.boss.isHit = {
                    right: false,
                    left: false
                };
                this.boss.isDead = false;
                this.boss.jumps = 0;
                this.boss.canMove = true;
            }
            if (spawns[i].name === "Spawn_Slime_Verde") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_verde');
                // slime.setScale(1.5);
                slime.lifes = 2;
                slime.cor = "verde";
                slime.isHit = {
                    right: false,
                    left: false
                };
                slime.isDead = false;
                slime.canHit = true;
            }
            if (spawns[i].name === "Spawn_Slime_Azul") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_azul');
                slime.lifes = 3;
                slime.cor = "azul";
                slime.isHit = {
                    right: false,
                    left: false
                };
                slime.isDead = false;
                slime.setScale(1.7);
                slime.canHit = true;
            }
            if (spawns[i].name === "Spawn_Slime_Vermelho") {
                let slime = this.array.create(spawns[i].x, spawns[i].y, 'slime_vermelho');
                slime.lifes = 4;
                slime.cor = "vermelho";
                slime.setScale(1.7);
                slime.isHit = {
                    right: false,
                    left: false
                };
                slime.isDead = false;
                slime.canHit = true;
            }
        }

        //Cria a colisão do slime com a layer 1
        this.scene.physics.add.collider(this.array, camada1);
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.slimeHit, null, this.scene);
        this.scene.colisao = false;
    }

    slimeHit(player, slime) {
        if (slime.stop != true) {

            this.colisao = true;
            player.setVelocityX(0);
            if (player.x - slime.x <= 0) {
                slime.setVelocityX(200);
            } else {
                slime.setVelocityX(-200);
            }
            slime.setVelocityY(-200);
            if (slime.body.velocity.x <= 0) {
                player.setVelocityX(200);
            } else {
                player.setVelocityX(-200);
            }

            player.setVelocityY(-150);
            this.player.lifes -= 1;
            console.log(this.player.lifes + ' - player slime hit');
            this.player.hit.play();
        } else {
            slime.setVelocityX(0);
        }
        this.player.hit.play();
    }

    update(player) {
        this.player = player;
        for (let i = 0; i < this.array.children.entries.length; i++) {
            let slime = this.array.children.entries[i];
            if (slime === this.boss) {
                if (slime.lifes == 0) {
                    this.c_player.active = false;
                    
                    let data = {
                        player: this.scene.player
                    };
                    slime.anims.play('morte');
                    slime.lifes = -1;
                    setTimeout(
                        () =>{ slime.destroy();
                            this.scene.player.victory.play();
                            this.scene.music.stop();
                        }, 2000);
                    this.scene.player.deletaIntervalo();
                    setTimeout(() => {
                        this.scene.scene.start('CalculaPontuacao', data);
                    }, 5000);
                } else if (slime.canMove) {
                    slime.setTexture('slime_' + slime.cor, 0);
                    if (slime.jumps == 10 || slime.jumps == 20 || slime.jumps == 30) {
                        slime.canMove = false;
                        slime.canHit = true;
                        slime.anims.play("slime_" + slime.cor + "_hit_left", true);
                        slime.stop = true;
                        slime.setVelocityX(0);
                        slime.setVelocityY(0);
                        slime.jumps++;
                        setTimeout(() => {
                            slime.canHit = false;
                            slime.canMove = true;
                            slime.stop = false;
                        }, 5000);

                    } else if (slime.jumps > 30) {
                        slime.jumps = 0;
                    } else if (player.x > 64 && player.x < 800) {
                        if (player.x < slime.x) {
                            if (slime.body.onFloor()) {
                                this.scene.slime_sound.play();
                                slime.jumps++;
                                if (slime.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                slime.setVelocityX(-100);
                                slime.setVelocityY(-400);
                            }
                        } else if (player.x > slime.x) {
                            if (slime.body.onFloor()) {
                                slime.jumps++;
                                this.scene.slime_sound.play();
                                if (slime.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                slime.setVelocityX(100);
                                slime.setVelocityY(-400);
                            }
                        } else {
                            if (slime.body.onFloor()) {
                                slime.jumps++;        
                                this.scene.slime_sound.play();
                                if (slime.canHit == false) {
                                    this.scene.cameras.main.shake(50);
                                }
                                slime.setVelocityX(0);
                                slime.setVelocityY(-300);
                            }
                        }
                    }
                } else {

                }
            } else {

                if(slime.body.touching.up){
                    slime.lifes = 0;
                    player.setVelocityY(-100);
                }else if (slime.isHit.left && slime.lifes > 0) {
                    slime.anims.play("slime_" + slime.cor + "_hit_left", true);
                        slime.isHit.left = false;
                } else if (slime.isHit.right) {
                    slime.anims.play("slime_" + slime.cor + "_hit_right", true);
                        slime.isHit.right= false;
                } else if (slime.x - player.x < 150 && slime.x - player.x > 0) {
                    if (slime.body.onFloor()) {
                        this.scene.slime_sound.play();
                        slime.anims.play('slime_' + slime.cor + '_jump_left', true);
                        slime.setVelocityX(-80);
                        slime.setVelocityY(-200);
                    }
                } else if (slime.x - player.x > -150 && slime.x - player.x < 0) {
                    if (slime.body.onFloor()) {
                        this.scene.slime_sound.play();
                        slime.anims.play('slime_' + slime.cor + '_jump_right', true);
                        slime.setVelocityX(80);
                        slime.setVelocityY(-200);
                    }
                } else {
                    slime.setTexture('slime_' + slime.cor, 0);
                    slime.setVelocityX(0);
                }

                if (slime.lifes == 0) {

                    if (slime.isHit.left) {
                        slime.anims.play("slime_" + slime.cor + "_hit_left", true);
                    } else if (slime.isHit.right) {
                        slime.anims.play("slime_" + slime.cor + "_hit_right", true);
                    }

                    slime.isDead = true;
                    slime.lifes= -1;
                    slime.anims.play('morte');
                    setTimeout(() => {
                        this.atualizaPontuacao();
                        slime.destroy();
                    }, 466);


                }
                if (slime.y > 490) {
                    slime.destroy();
                }
            }
        }


    }

    atualizaPontuacao() {
        for (let i = 0; i < this.array.children.entries.length; i++) {

            let slime = this.array.children.entries[i];

            if (slime.isDead == true) {

                if (slime.cor == 'vermelho') {
                    this.scene.player.score += 60;
                } else if (slime.cor == 'azul') {
                    this.scene.player.score += 40;
                } else {
                    this.scene.player.score += 20;
                }
                slime.isDead = false;
            }

        }
    }

}
export default Slimes;