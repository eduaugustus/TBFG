import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
import Bandeira from "../sprites/objects/bandeira.js";
import Moeda from "../sprites/objects/Moeda.js";
import Chave from "../sprites/objects/Chave.js";
import Pocao from "../sprites/objects/pocao.js";
import Aldeao from "../sprites/Aldeao.js";
import Ponte from "../sprites/objects/ponte.js";
import Casa from "../sprites/objects/casa.js";
class Level_1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level_1'
        });
    }

    preload() {
        this.secs = 0;
        this.SceneBoss= 'Level_1_boss';
       
    }


    create() {
        this.ended = false;
        if (this.music == undefined) {
            this.music = this.sound.add('music_1_1');
            this.music.setLoop(true);
            this.music.setVolume(0.5);
            this.music.play();
        } else {
            this.music.stop();
            this.music.play();
        }
        this.slime_sound = this.sound.add('slime_jump');
        this.slime_sound.setVolume(0.3);

        //Cria o mapa apartir do arquivos JSON que veio do Tiled
        const map = this.make.tilemap({
            key: "map_fase_1"
        });

        /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
        let blocos = map.addTilesetImage("blocos", "fase_1_tileset");
        let background = map.addTilesetImage('ceu', 'fase_1_sky');
        let midground = map.addTilesetImage('montanhas', 'fase_1_montanhas');
        let itensCenario = map.addTilesetImage('itensDeCenario', 'itensCenario');
        let casa = map.addTilesetImage('casa', 'fase_casa');

        //Cria layers não colidivel
        map.createDynamicLayer('background', background, 0, 0);
        map.createDynamicLayer('midground', midground, 0, 0);

        //Cria a layer da casa do aldeão
        this.houseLayer = map.createDynamicLayer('casa', casa);

        map.createDynamicLayer('midground_2', itensCenario);
        map.createDynamicLayer('midground_3', itensCenario);

        //Cria e seta os blocos do tileset da layer 1
        let layer1 = map.createDynamicLayer("foreground_1", blocos);

        this.layer1 = layer1;

        //Cria e seta os blocos do tileset da layer 2
        let layer2 = map.createStaticLayer("foreground_2", blocos);


        //Seta os blocos que serão colidiveis na layer 1
        layer1.setCollision([1, 2, 3, 4, 5, 6, 10]);

        //Seta os blocos que serão colidiveis na layer 2
        layer2.setCollisionBetween(1, 6);

        layer2.forEachTile(tile => {
            // alert('oieeeee');
            if (tile.index != -1) {
                // console.log(tile);
                tile.collideDown = false;
                tile.collideUp = true;
                tile.collideLeft = false;
                tile.collideRight = false;
            }

        });

        //Cria um player dentro da cena da fase, com coordenadas x e y
        this.player = new Player(this);
        this.player.spawnPlayer(20, 352 );

        //Seta o bounce do player
        this.player.sprite.setBounce(0.1);
        this.player.sprite.setScale(0.5);
        this.player.criaKeys(this);
        //Seta a colisão do player com a layer 1
        this.physics.add.collider(this.player.sprite, layer1);

        //Cria e seta os blocos do tileset da layer 2
        this.physics.add.collider(this.player.sprite, layer2);

        // /*INICIO - Debug para colisão */
        // const debugGraphics = this.add.graphics().setAlpha(0.75);

        // camada1.renderDebug(debugGraphics, {
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

        //Cria uma camera que seguira o player
        this.cameras.main.startFollow(this.player.sprite);

        //Seta os limites do mapa que a camera acompanhará
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        let spawnLayer = map.getObjectLayer("spawns");
        this.spawns = spawnLayer.objects;

        this.parado = true;
        this.slimes = new Slimes(this, layer1);
        for (let i = 0; i < this.spawns.length; i++) {
            if (this.spawns[i].name === "Spawn_Flag") {
                this.bandeira = new Bandeira(this, this.spawns[i].x, this.spawns[i].y, this.player);
            }
            if (this.spawns[i].name === "Spawn_aldeao") {
                this.aldeao = new Aldeao(this, this.spawns[i].x, this.spawns[i].y);
                this.aldeao.sprite.play('aldeaoMove');
            }
        }
        this.physics.add.collider(this.bandeira.sprite, layer1);
        this.physics.add.collider(this.aldeao.sprite, layer1);

        // Criação da alavanca
        this.alavancas = {
            alavanca_1: map.createFromObjects('itensInteracao', 'alavanca', {
                key: 'sprite_alavanca'
            }),
            alavanca_2: null
        }

        /*this.ponte recebe a layer que ficará a ponte e também as
        coordenas de onde a ponte começa e termina*/
        this.ponteConfig = {
            layer: layer1,

            xInicial_1: 145,
            xFinal_1: 151,

            yIndexColisao_1: 12,
            yIndexNaoColisao_1: 11,

            IndexBlocoDeColisao: 10,
            IndexBlocoDeNaoColisao: 11,

            /*Caso a fase tenha uma segunda ponte, é
            aplicado uma segunda configuração */
            xInicial_2: null,
            xFinal_2: null,

            yIndexColisao_2: null,
            yIndexNaoColisao_2: null,

        };
        // console.log(this.ponteConfig);

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

        /*Criação da interação da casa*/
        this.moved = false;
        /*Coordenadas da porta da casa que o jogador
        terá que interagir */
        this.casaConfig = {
            x: 3200,
            y: 352,
            portaX: 864,
            portaY: 244
        };

        this.casa = new Casa(this.casaConfig, this, this.player);

        /*Manda a msg para aldeão */
        // this.msg = 'Aldeao:\n'
        // +' Voce so podera entrar na casa \n'
        // +' quando tiver chave consigo.';

        this.msg = 'Aldeao:\n' +
            ' FALA MEU CHAPA';

        // Chama o método que cria o hud do player
        this.player.createHUD();
        this.player.criaIntervalo();
        this.colisao = false;
    }

    update() {
        this.player.update(this.slimes, this, this.layer1);
        this.slimes.update(this.player.sprite, this.slimes);
        this.secs = this.player.mins * 60 + this.player.timersecs;
        this.aldeao.update(this, this.player, this.msg);
        this.ponte.update(this.player, this.alavancas);
        this.casa.update(this.player, this);
    }

}
export default Level_1;