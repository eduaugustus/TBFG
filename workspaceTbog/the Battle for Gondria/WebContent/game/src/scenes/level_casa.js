import Player from "../sprites/player.js";
import Moeda from "../sprites/objects/Moeda.js";
import Pocao from "../sprites/objects/pocao.js";

class Level_casa extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'Level_casa'
    });
  }

  init(data) {
    this.name = data.scene;
    this.player = data.player;
    this.casa = data.casa;
    // this.player.oldScene = data.scene_level;
  }

  create() {
    // this.scene.bringToTop()

    // console.log(this.player.oldScene);
    //Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({ key: "map_casa" });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let tilesetCasa = map.addTilesetImage("fase_casa", "fase_casa");

    //Cria layers não colidivel
    map.createDynamicLayer('background', tilesetCasa, 0, 0);
    
    //Cria e seta os blocos do tileset da layer 1
    this.layer1 = map.createDynamicLayer("foreground", tilesetCasa);
    this.layer2 = map.createDynamicLayer('middleground', tilesetCasa);

    //Seta os blocos que serão colidiveis na layer 1
    this.layer1.setCollision(10,11,12);
    this.layer2.setCollision(10,11,12);

    // /*INICIO - Debug para colisão */
    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // this.layer1.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    /*FIM - Debug para colisão */

    //Seta cena do player
    this.player.setScene(this);

    //Cria um player dentro da cena da fase, com coordenadas x e y
    this.player.spawnPlayer(864, 244);

    //Seta o bounce do player
    this.player.criaKeys(this);
    this.player.keys.action.isDown=false;
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);

    
    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, this.layer1);
    this.physics.add.collider(this.player.sprite, this.layer2);
    
    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);
    
    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

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
    
    //Cria o hud do jogador
    this.player.createHUD();

    this.colisao = false;

  }

  update() {
    this.player.update(null, this, this.layer1);
    this.secs = this.player.mins * 60 + this.player.timersecs;
    this.casa.update(this.player, this);
  }

}
export default Level_casa;
