import Player from "../sprites/player.js";
import Goblins from "../sprites/enemies/goblins.js";
import Moeda from "../sprites/objects/Moeda.js";
import Chave from "../sprites/objects/Chave.js";
import Pocao from "../sprites/objects/pocao.js";
import Aldeao from "../sprites/Aldeao.js";
import Ponte from "../sprites/objects/ponte.js";
import Casa from "../sprites/objects/casa.js";
import Soldados from "../sprites/enemies/soldados.js";
class Level_4 extends Phaser.Scene {

  constructor() {
    super({
      key: 'Level_4'
    });
  }

  preload() {

    this.secs = 0;
    this.load.tilemapTiledJSON("map_fase_4", "../../game/assets/tilemap/map_fase_4.json");

    // this.load.audio('slime_jump', 'assets/sounds/slime_jump.mp3');
  }


  create() {
    if (this.music == undefined) {
      this.music = this.sound.add('music_4');
      this.music.setLoop(true);
      this.music.setVolume(0.5);
      this.music.play();
    } else {
      this.music.stop();
      this.music.play();
    }
    // if (this.music == undefined) {
    //   this.music = this.sound.add('music_2');
    //   this.music.setLoop(true);
    //   this.music.setVolume(0.5);
    //   this.music.play();
    // } else {
    //   this.music.stop();
    //   this.music.play();
    // }
    // this.ended = false;
    // let music = this.sound.add('music_1_1');
    // music.setLoop(true);
    // music.play();
    // music.setVolume(0.5);
    // this.slime_sound = this.sound.add('slime_jump');
    // this.slime_sound.setVolume(0.3);

    // Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({
      key: "map_fase_4"
    });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let background = map.addTilesetImage('fase_1_sky', 'fase_1_sky');
    let midground = map.addTilesetImage('fase_1_montanhas', 'fase_1_montanhas');
    let itensCenario = map.addTilesetImage('itensDeCenario', 'itensCenario');
    let blocos = map.addTilesetImage("fase_4_tileset", "fase_4_tileset");
    let casa = map.addTilesetImage('fase_casa', 'fase_casa');

    //Cria layers não colidivel
    map.createDynamicLayer('background', background);
    map.createDynamicLayer('midground_1', midground);
    map.createDynamicLayer('midground_2', blocos);

    //Cria a layer da casa do aldeão
    this.houseLayer = map.createDynamicLayer('casa', casa);

    map.createDynamicLayer('midground_3', itensCenario);

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
    this.player.spawnPlayer(9332, 0);

    //Seta o bounce do player, escala da sprite, teclas de movimento e 
    //seta a colisão com os mobs como 'false'
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);
    this.player.criaKeys(this);
    this.colisao = false;

    /*INICIO - Debug para colisão */
    const debugGraphics = this.add.graphics().setAlpha(0.75);

    layer1.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    layer2.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
    /*FIM - Debug para colisão */

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, layer1);

    //Cria e seta os blocos do tileset da layer 2
    this.physics.add.collider(layer2, this.player.sprite);

    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);

    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    
    // this.goblins =  new Goblins(this, layer1);
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

    // Criação da alavanca
    this.alavancas = {
      alavanca_1: map.createFromObjects('itensInteracao', 'alavanca_1', {
        key: 'sprite_alavanca'
      }),
      alavanca_2: null
    };

    /*this.ponte recebe a layer que ficará a ponte e também as
    coordenas de onde a ponte começa e termina*/
    this.ponteConfig = {
      layer: layer1,

      xInicial_1: 10,
      xFinal_1: 16,

      yIndexColisao_1: 13,
      yIndexNaoColisao_1: 12,

    /*Caso a fase tenha uma segunda ponte, é
    aplicado uma segunda configuração */
      xInicial_2: 0,
      xFinal_2: 0,

      yIndexColisao_2: 0,
      yIndexNaoColisao_2: 0,

      IndexBlocoDeColisao: 817,
      IndexBlocoDeNaoColisao: 818,

    };

    this.ponte = new Ponte(this.ponteConfig);


    /*Cria as moedas */
    let coinLayer = map.getObjectLayer("moedas");
    this.moedasObjetos = coinLayer.objects;

    for (let i = 0; i < this.moedasObjetos.length; i++) {
      this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
      this.moeda.sprite.anims.play('giraMoeda');
    }

    /*Cria as Poções */
    let PotionLayer = map.getObjectLayer("pocoes");
    this.pocoesObjetos = PotionLayer.objects;

    for (let i = 0; i < this.pocoesObjetos.length; i++) {
      this.pocao = new Pocao(this, this.pocoesObjetos[i].x, this.pocoesObjetos[i].y);
      this.pocao.sprite.anims.play('potionEffect');
    }

    /*Cria a chave */
    this.layerObjetos = map.getObjectLayer('itensInteracao');
    this.chave = null;

    for (let i = 0; i < this.layerObjetos.objects.length; i++) {
      if (this.layerObjetos.objects[i].name == 'chave') {
        this.chave = new Chave(this, this.layerObjetos.objects[i].x, this.layerObjetos.objects[i].y, this.player);
      }
    }
    let spawnLayer = map.getObjectLayer("spawns");
    this.spawns = spawnLayer.objects;
    this.soldados = new Soldados(this,layer1);

    /*Criação da interação da casa*/
    // this.moved = false;
    /*Coordenadas da porta da casa que o jogador
    terá que interagir */
    // this.casaConfig = {
    //   x: 4160,
    //   y: 96,
    //   portaX: 864,
    //   portaY: 244
    // };

    // this.casa = new Casa(this.casaConfig, this, this.player);

    /*Manda a msg para aldeão */
    // this.msg = 'Aldeao:\n'
    // +' Voce so podera entrar na casa \n'
    // +' quando tiver chave consigo.';

    // this.msg = 'Aldeao:\n' +
    //   ' FALA MEU CHAPA 2';

    // Chama o método que cria o hud do player
    // this.player.createHUD();
    // this.player.criaIntervalo();
    // this.colisao = false;
    this.player.createHUD();

    this.player.criaIntervalo();
  }

  update() {
    this.player.update(this.soldados, this, this.layer1);
    this.soldados.update(this.player.sprite);
    this.secs = this.player.mins * 60 + this.player.timersecs;
    // this.aldeao.update(this, this.player, this.msg);
    this.ponte.update(this.player, this.alavancas);
    // this.casa.update(this.player, this);
    this.layer1.forEachTile(tile => {
      if (tile.index == 817) {
        tile.collideDown = true;
        tile.collideUp = true;
        tile.collideLeft = true;
        tile.collideRight = true;
      }
    });
    this.layer1.setCollisionByProperty({
      collides: true
    });
  }

}
export default Level_4;