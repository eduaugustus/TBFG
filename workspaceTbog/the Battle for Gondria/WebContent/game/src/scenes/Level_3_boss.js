import Player from "../sprites/player.js";
import Goblins from "../sprites/enemies/goblins.js";
import Moeda from "../sprites/objects/Moeda.js";
import Chave from "../sprites/objects/Chave.js";
import Pocao from "../sprites/objects/pocao.js";
import Fantasmas from "../sprites/enemies/fantasmas.js";
import Goblin_caverna from "../sprites/enemies/goblin_caverna.js";

class Level_3 extends Phaser.Scene {

  constructor() {
    super({
      key: 'Level_3_boss'
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

    this.secs = 0;

  }


  create() {
    this.goblin_jump = this.sound.add('goblin_jump');
    this.goblin_jump.setVolume(0.1);
    if (this.music == undefined) {
      this.music = this.sound.add('music_3_2');
      this.music.setLoop(true);
      this.music.setVolume(0.5);
      this.music.play();
    } else {
      this.music.stop();
      this.music.play();
    }
    // this.ended = false;
    // let music = this.sound.add('music_1_1');
    // music.setLoop(true);
    // music.play();
    // music.setVolume(0.5);
    // this.slime_sound = this.sound.add('slime_jump');
    // this.slime_sound.setVolume(0.3);

    // Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({
      key: "map_fase_3_boss"
    });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let blocos = map.addTilesetImage("fase_3_tileset", "fase_3_tileset");
    let background = map.addTilesetImage('fase_3_background', 'fase_3_background');

    //Cria layers não colidivel
    map.createDynamicLayer('background', background, 0, 0);
    // map.createDynamicLayer('midground', midground, 0, 0);

    //Cria e seta os blocos do tileset da layer 1
    let layer1 = map.createDynamicLayer("foreground_1", blocos);

    this.layer1 = layer1;

    //Cria e seta os blocos do tileset da layer 2
    let layer2 = map.createDynamicLayer("foreground_2", blocos);

    //Seta os blocos que serão colidiveis na layer 1
    layer1.forEachTile(tile => {
      if (tile.index != -1) {
        tile.collideDown = true;
        tile.collideUp = true;
        tile.collideLeft = true;
        tile.collideRight = true;
      }
    });

    //Seta os blocos que serão colidiveis na layer 1
    layer1.setCollisionByProperty({
      collides: true
    });

    layer2.forEachTile(tile => {
      // alert('oieeeee');
      if (tile.index != -1) {
        tile.collideDown = false;
        tile.collideUp = true;
        tile.collideLeft = false;
        tile.collideRight = false;
      }

    });

    //Seta os blocos que serão colidiveis na layer 2
    layer2.setCollisionByProperty({
      collides: true
    });

    //Cria um player dentro da cena da fase, com coordenadas x e y
    this.player = new Player(this);
    this.player.spawnPlayer(20, 0);

    //Seta o bounce do player, escala da sprite, teclas de movimento e 
    //seta a colisão com os mobs como 'false'
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);
    this.player.criaKeys(this);
    this.colisao = false;
    let spawnLayer = map.getObjectLayer("spawns");
    this.spawns = spawnLayer.objects;
    this.goblins =  new Goblin_caverna(this, layer1); 
    // this.fantasmas = new Fantasmas(this);
    /*INICIO - Debug para colisão */
    // const debugGraphics = this.add.graphics().setAlpha(0.75/);

    // layer1.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    // layer2.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
    /*FIM - Debug para colisão */

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, layer1);

    //Cria e seta os blocos do tileset da layer 2
    this.physics.add.collider(layer2, this.player.sprite);

    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);

    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // let spawnLayer = map.getObjectLayer("spawns");
    // this.spawns = spawnLayer.objects;
    // this.goblins = new Goblins(this, layer1);
    // this.parado = true;
    // for (let i = 0; i < this.spawns.length; i++) {
      // if (this.spawns[i].name === "Spawn_Flag") {
      //     this.bandeira = new Bandeira(this, this.spawns[i].x, this.spawns[i].y, this.player);
      // }
      // if (this.spawns[i].name === "spawn_aldeao") {
        // this.aldeao = new Aldeao(this, this.spawns[i].x, this.spawns[i].y);
        // this.aldeao.sprite.play('aldeaoMove');
      // }
    // }

    // this.physics.add.collider(this.bandeira.sprite, layer1);
    // this.physics.add.collider(this.aldeao.sprite, layer1);

    /*Cria as moedas */
    // let coinLayer = map.getObjectLayer("moedas");
    // this.moedasObjetos = coinLayer.objects;

    // for (let i = 0; i < this.moedasObjetos.length; i++) {
    //   this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
    //   this.moeda.sprite.anims.play('giraMoeda');
    // }

    // /*Cria as Poções */
    // let PotionLayer = map.getObjectLayer("pocoes");
    // this.pocoesObjetos = PotionLayer.objects;

    // for (let i = 0; i < this.pocoesObjetos.length; i++) {
    //   this.pocao = new Pocao(this, this.pocoesObjetos[i].x, this.pocoesObjetos[i].y);
    //   this.pocao.sprite.anims.play('potionEffect');
    // }

    this.player.createHUD();

    this.player.criaIntervalo();
  }

  update() {
    this.player.update(this.goblins, this, this.layer1);
    this.goblins.update(this.player.sprite);
    // this.fantasmas.update(this.player.sprite);
    
    // this.goblins.update(this.player.sprite);
    this.secs = this.player.mins * 60 + this.player.timersecs;
    // this.aldeao.update(this, this.player, this.msg);
    // this.ponte.update(this.player, this.alavancas);
    // this.casa.update(this.player, this);
    // this.layer1.forEachTile(tile => {
    //   if (tile.index == 815) {
    //     tile.collideDown = true;
    //     tile.collideUp = true;
    //     tile.collideLeft = true;
    //     tile.collideRight = true;
    //   }
    // });
    // this.layer1.setCollisionByProperty({
    //   collides: true
    // });
  }

}
export default Level_3;