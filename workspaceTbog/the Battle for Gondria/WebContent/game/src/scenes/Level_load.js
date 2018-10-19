class Level_load extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level_load'
        })
    }
    init(data) {
        this.name = data.scene;
    }
    preload() {
        this.load.image('load_escudo', '../../game/assets/images/menus/escudo_load.png');
        this.switch();
    }
    create() {
        this.add.image(750, 400, 'load_escudo').setScale(0.05);
        let jogarBtn = this.add.image(432, 240, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);
        jogarBtn.setScrollFactor(0);
        jogarBtn.on('pointerdown', () => {
            this.scene.moveBelow(this, this.name);
            this.scene.stop(this);
            this.scene.launch(this.name);
        });

    }

    switch () {
        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
        });

        switch (this.name) {
            case 'Level_1':
                this.load.tilemapTiledJSON("map_fase_1", "../../game/assets/tilemap/map_fase_1.json");
                this.load.audio('music_1_1', '../../game/assets/musics/music_level_1.mp3');
                this.load.audio('music_1_2', '../../game/assets/musics/music_level_1_2.mp3');
                this.load.audio('slime_jump', '../../game/assets/sounds/slime_jump.mp3');
                this.load.spritesheet('slime_verde', '../../game/assets/images/mobs/slime_verde_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });

                this.load.spritesheet('slime_azul', '../../game/assets/images/mobs/slime_azul_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });

                this.load.spritesheet('slime_vermelho', '../../game/assets/images/mobs/slime_vermelho_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });
                this.load.spritesheet('slime_verde_hit', '../../game/assets/images/mobs/slime_verde_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });

                this.load.spritesheet('slime_azul_hit', '../../game/assets/images/mobs/slime_azul_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });

                this.load.spritesheet('slime_vermelho_hit', '../../game/assets/images/mobs/slime_vermelho_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });
                this.load.on('complete',
                    () => {
                        let anims = this.anims;
                        //animacao pular esquerda
                        anims.create({
                            key: "slime_verde_jump_left",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_left",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_left",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //animacoes andar pra direita
                        anims.create({
                            key: "slime_verde_jump_right",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_right",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_right",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit esquerda
                        anims.create({
                            key: "slime_verde_hit_left",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_left",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_left",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit direita
                        anims.create({
                            key: "slime_verde_hit_right",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_right",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_right",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });

                        anims.create({
                            key: 'dieEffect',
                            frames: anims.generateFrameNumbers('inimigoDie', {
                                start: 0,
                                end: 8
                            }),
                            frameRate: 10,
                        });
                    }
                );
                break;
            case 'Level_2':
                this.load.tilemapTiledJSON("map_2_boss", "../../game/assets/tilemap/map_fase_2_boss.json");
                this.load.spritesheet('goblin', '../../game/assets/images/mobs/goblin_spritesheet.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('goblin_hit', '../../game/assets/images/mobs/goblin_hit.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                /*Faz load dos arquivos usados na cena Level_2 e outras cenas  */
                this.load.tilemapTiledJSON('map_fase_2', '../../game/assets/tilemap/map_fase_2.json');
                this.load.image('fase_2_tileset', '../../game/assets/tilesets/fase_2_tileset.png');
                this.load.image('fase_2_sky', '../../game/assets/background/fase_2_sky.png');
                this.load.image('fase_2_montanhas', '../../game/assets/background/fase_2_montanhas.png');
                this.load.audio('music_2', '../../game/assets/musics/music_level_2.mp3');
                this.load.audio('music_boss', '../../game/assets/musics/music_level_2_2.mp3');
                this.load.audio('goblin_jump', '../../game/assets/sounds/goblin_jump.wav');
                this.load.on('complete', () => {
                    let anims = this.anims;
                    anims.create({
                        key: 'goblin_hitted_right',
                        frames: anims.generateFrameNumbers('goblin_hit', {
                            start: 0,
                            end: 4
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_hitted_left',
                        frames: anims.generateFrameNumbers('goblin_hit', {
                            start: 5,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_standing_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 0,
                            end: 1
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_standing_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 12,
                            end: 13
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_runing_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 7,
                            end: 10
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_runing_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 17,
                            end: 20
                        }),
                        frameRate: 4,
                        repeat: -1,
                        yoyo: true
                    });
                    anims.create({
                        key: 'goblin_hitting_left',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 25,
                            end: 29
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_hitting_right',
                        frames: anims.generateFrameNumbers('goblin', {
                            start: 30,
                            end: 34
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                });
                break;
            case 'Level_3':
                this.load.spritesheet('goblin_caverna', '../../game/assets/images/mobs/goblin_caverna_spritesheet.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('goblin_caverna_hit', '../../game/assets/images/mobs/goblin_caverna_hit.png', {
                    frameWidth: 42,
                    frameHeight: 42
                });
                this.load.spritesheet('fantasma', '../../game/assets/images/mobs/fantasma_spritesheet.png', {
                    frameWidth: 58,
                    frameHeight: 50
                })

                this.load.tilemapTiledJSON("map_fase_3_boss", "../../game/assets/tilemap/map_fase_3_boss.json");
                this.load.tilemapTiledJSON("map_fase_3", "../../game/assets/tilemap/map_fase_3.json");
                this.load.audio('goblin_jump', '../../game/assets/sounds/goblin_jump.wav');
                this.load.audio('music_3', '../../game/assets/musics/music_level_3.mp3');
                this.load.audio('music_3_2', '../../game/assets/musics/music_level_3_2.mp3');
                this.load.on('complete', () => {
                    let anims = this.anims;
                    anims.create({
                        key: 'goblin_caverna_hitted_right',
                        frames: anims.generateFrameNumbers('goblin_caverna_hit', {
                            start: 0,
                            end: 4
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_hitted_left',
                        frames: anims.generateFrameNumbers('goblin_caverna_hit', {
                            start: 5,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_standing_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 0,
                            end: 1
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_standing_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 12,
                            end: 13
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_runing_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 7,
                            end: 10
                        }),
                        frameRate: 4,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_runing_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 17,
                            end: 20
                        }),
                        frameRate: 4,
                        repeat: -1,
                        yoyo: true
                    });
                    anims.create({
                        key: 'goblin_caverna_hitting_left',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 25,
                            end: 29
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'goblin_caverna_hitting_right',
                        frames: anims.generateFrameNumbers('goblin_caverna', {
                            start: 30,
                            end: 34
                        }),
                        frameRate: 3,
                        repeat: -1
                    });
                    anims.create({
                        key: 'ghost',
                        frames: anims.generateFrameNumbers('fantasma', {
                            start: 0,
                            end: 3
                        }),
                        frameRate: 8,
                        repeat: -1
                    });
                    anims.create({
                        key: 'ghost_back',
                        frames: anims.generateFrameNumbers('fantasma', {
                            start: 4,
                            end: 7
                        }),
                        frameRate: 8,
                        repeat: -1
                    });

                });
                break;
            case "Level_4":

                //Carrega imagens da fase 3 
                this.load.image('fase_4_tileset', '../../game/assets/tilesets/fase_4_tileset.png');
                this.load.tilemapTiledJSON("map_fase_4", "../../game/assets/tilemap/map_fase_4.json");
                this.load.tilemapTiledJSON("map_fase_4_boss", "../../game/assets/tilemap/map_fase_4_boss.json");
                this.load.audio('music_4', '../../game/assets/musics/music_level_4.mp3');
                this.load.audio('music_4_2', '../../game/assets/musics/music_level_4_2.mp3');
                this.load.spritesheet('portal','../../game/assets/images/mobs/portal.png',{
                	frameWidth:41,
                	frameHeight:41
                })
                this.load.spritesheet('porta','../../game/assets/images/itensCenario/porta.png',{
                	frameWidth:64,
                	frameHeight:96
                });
                this.load.spritesheet('soldado','../../game/assets/images/mobs/soldado.png',{
                    frameHeight:84,
                    frameWidth:60
                });
                this.load.spritesheet('rei','../../game/assets/images/mobs/rei.png',{
                	frameHeight:43,
                    frameWidth:28
                })
                this.load.on('complete',()=>{
                	
                	let anims  = this.anims;
                	anims.create({
                		key: 'portal',
                        frames: anims.generateFrameNumbers('portal', {
                            start: 0,
                            end: 5
                        }),
                        frameRate: 10,
                        repeat: -1
                	});
                	anims.create({
                		key: 'porta_abre',
                        frames: anims.generateFrameNumbers('porta', {
                            start: 0,
                            end: 3
                        }),
                        frameRate: 2,
                        repeat: 0
                	});
                	anims.create({
                		key: 'porta_fecha',
                        frames: anims.generateFrameNumbers('porta', {
                            start: 3,
                            end: 6
                        }),
                        frameRate: 2,
                        repeat: 0
                	});
                	anims.create({
                		key: 'rei_left',
                        frames: anims.generateFrameNumbers('rei', {
                            start: 0,
                            end: 7
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'rei_right',
                        frames: anims.generateFrameNumbers('rei', {
                            start: 10,
                            end: 17
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'rei_stand',
                        frames: anims.generateFrameNumbers('rei', {
                            start: 8,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'soldado_attack_right',
                        frames: anims.generateFrameNumbers('soldado', {
                            start: 10,
                            end: 13
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'soldado_attack_left',
                        frames: anims.generateFrameNumbers('soldado', {
                            start: 14,
                            end: 17
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'soldado_stand',
                        frames: anims.generateFrameNumbers('soldado', {
                            start: 4,
                            end: 5
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'soldado_walk_right',
                        frames: anims.generateFrameNumbers('soldado', {
                            start: 0,
                            end: 3
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                	anims.create({
                		key: 'soldado_walk_left',
                        frames: anims.generateFrameNumbers('soldado', {
                            start: 6,
                            end: 9
                        }),
                        frameRate: 4,
                        repeat: -1
                	});
                });

            default:
                break;
        }
    }
}
export default Level_load;