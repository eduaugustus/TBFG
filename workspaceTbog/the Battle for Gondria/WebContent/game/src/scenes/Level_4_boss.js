import Player from "../sprites/player.js";
import Goblins from "../sprites/enemies/goblins.js";
import Moeda from "../sprites/objects/Moeda.js";
import Porta from "../sprites/objects/porta.js";
import Pocao from "../sprites/objects/pocao.js";
import Fantasmas from "../sprites/enemies/fantasmas.js";
import Boss from "../sprites/enemies/Boss.js";

class Level_4_boss extends Phaser.Scene {

  constructor() {
    super({
      key: 'Level_4_boss'
    });
  }

  init(data) {
    this.player = data.player;
    data.player.canStop = true;
    data.player.scene.music.stop();
    this.player.setScene(this);

  }

  create() {
    if (this.music == undefined) {
      this.music = this.sound.add('music_4_2');
      this.music.setLoop(true);
      this.music.setVolume(0.5);
      this.music.play();
    } else {
      this.music.stop();
      this.music.play();
    }

    // Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({
      key: "map_fase_4_boss"
    });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let background = map.addTilesetImage("fase_4_tileset", "fase_4_tileset");
    let blocos = map.addTilesetImage("fase_4_tileset", "fase_4_tileset");
    //Cria layers não colidivel
    map.createDynamicLayer('background', background, 0, 0);

    //Cria e seta os blocos do tileset da layer 1
    let layer1 = map.createDynamicLayer("foreground_1", blocos);

    this.layer1 = layer1;

    //Cria e seta os blocos do tileset da layer 2
    let layer2 = map.createDynamicLayer("foreground_2", blocos);
    this.layer2 = layer2;
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
    let objects = map.getObjectLayer('objects');
    this.objetos = objects.objects;
    this.porta = new Porta(this);

    this.player.spawnPlayer(140, 352);

    //Seta o bounce do player, escala da sprite, teclas de movimento e 
    //seta a colisão com os mobs como 'false'
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);
    this.player.criaKeys(this);
    this.colisao = false;

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, layer1);

    //Cria e seta os blocos do tileset da layer 2
    this.physics.add.collider(layer2, this.player.sprite);

    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);

    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

     let spawnLayer = map.getObjectLayer("spawns");
     this.spawns = spawnLayer.objects;
     this.boss = new Boss(this,layer1);
     
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
     this.criaPocoes();
     

    this.player.createHUD();

    this.player.criaIntervalo();
  }
  criaPocoes(){
	  for (let i = 0; i < this.pocoesObjetos.length; i++) {
	         this.pocao = new Pocao(this, this.pocoesObjetos[i].x, this.pocoesObjetos[i].y);
	         this.pocao.sprite.anims.play('potionEffect');
	     }
  }
  update() {
	if(this.soldados==undefined){
		this.player.update(this.boss, this, this.layer1);		
		this.boss.update(this.player.sprite);
	}else{
		this.player.update(this.soldados, this, this.layer1);		
		this.soldados.update(this.player.sprite);
		if(this.soldados.array.children.entries[0]==undefined){
			this.soldados = undefined;
			this.porta.close();
		}
	}
    this.secs = this.player.mins * 60 + this.player.timersecs;
  }

}
export default Level_4_boss;