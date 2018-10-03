import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
import Bandeira from "../sprites/objects/bandeira.js";
class Level_1_boss extends Phaser.Scene {

  constructor() {
    super({
      key: 'Level_1_boss'
    });
  }

  init(data) {
    this.player = data.player;
    data.player.canStop = true;
    data.player.scene.music.stop();
    this.player.setScene(this);

    // console.log(this.player);
  }
  preload() {
    this.load.audio('slime_boss', 'assets/sounds/slime_boss_jump.wav');
    this.load.tilemapTiledJSON("map_1_boss", "assets/tilemap/map_fase_1_boss.json");
  }


  create() {
    if (this.music == undefined) {
      this.music = this.sound.add('music_1_2');
      this.music.setLoop(true);
      this.music.setVolume(0.5);
      this.music.play();
    } else {
      this.music.stop();
      this.music.play();
    }
    //Cria o mapa apartir do arquivos JSON que veio do Tiled
    const mapBoss = this.make.tilemap({
      key: "map_1_boss"
    });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let tilesetBlocos = mapBoss.addTilesetImage("fase_1_tileset", "fase_1_tileset");
    let background = mapBoss.addTilesetImage('fase_1_sky', 'fase_1_sky');
    let middleground = mapBoss.addTilesetImage('fase_1_montanhas', 'fase_1_montanhas');

    //Cria layers não colidivel
    mapBoss.createDynamicLayer('background', background, 0, 0);
    mapBoss.createDynamicLayer('middleground', middleground, 0, 0);

    //Cria e seta os blocos do tileset da layer 1
    let layer1 = mapBoss.createStaticLayer("foreground_1", tilesetBlocos, 0, 0);

    //Cria e seta os blocos do tileset da layer 2
    let layer2 = mapBoss.createStaticLayer("foreground_2", tilesetBlocos, 0, 0);


    //Seta os blocos que serão colidiveis na layer 1
    // layer1.setCollisionBetween(1, 6);
    layer1.forEachTile(tile => {
      // alert('oieeeee');
      if (tile.index != -1) {
        // console.log(tile);
        tile.collideDown = true;
        tile.collideUp = true;
        tile.collideLeft = true;
        tile.collideRight = true;
      }

    });
    layer2.forEachTile(tile => {

      if (tile.index != -1) {
        tile.collideDown = false;
        tile.collideUp = true;
        tile.collideLeft = false;
        tile.collideRight = false;
      }

    });
    layer1.setCollisionByProperty({
      collides: true
    });
    layer2.setCollisionBetween(1, 10);
    
    this.player.spawnPlayer(20, 90);

    //Seta o bounce do player
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);
    this.player.criaKeys(this);
    this.player.createHUD();
    this.player.criaIntervalo();

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, layer1);
    // Cria e seta os blocos do tileset da layer 2
    this.physics.add.collider(this.player.sprite, layer2);

    this.colisao = false;

    let spawnLayer = mapBoss.getObjectLayer("spawns");
    this.spawns = spawnLayer.objects;
    this.boss = new Slimes(this, this.spawns);
    this.physics.add.collider(this.boss.boss, layer1);
    this.slime_sound = this.sound.add('slime_boss');
    this.slime_sound.setVolume(0.3);


  }

  update() {
    this.player.update(this.boss, this, this.alavanca, this.ponte, this.aldeao, this.casa, this.moedas);
    this.secs = this.player.mins * 60 + this.player.timersecs;
    this.boss.update(this.player.sprite);

  }

}
export default Level_1_boss;