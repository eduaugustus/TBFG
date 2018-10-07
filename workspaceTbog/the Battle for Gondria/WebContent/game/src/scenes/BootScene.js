class BootScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'BootScene'
        });
    }
    preload() {

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('MainMenu');
        });

        /*Faz o load da fonte personalizada */
        this.load.bitmapFont('myfont', '../../game/assets/fonts/font.png', '../../game/assets/fonts/font.fnt');

        /*Faz load dos arquivos usados na cena mainMenu e outras cenas  */
        this.load.image('btnJogar', '../../game/assets/images/botoes/btnJogar.png');
        this.load.image('btnJogarPress', '../../game/assets/images/botoes/btnJogarPress.png');

        this.load.image('btnAjuda', '../../game/assets/images/botoes/btnAjuda.png');
        this.load.image('btnAjudaPress', '../../game/assets/images/botoes/btnAjudaPress.png');


        this.load.image('btnInicio', '../../game/assets/images/botoes/btnInicio.png');
        this.load.image('btnInicioPress', '../../game/assets/images/botoes/btnInicioPress.png');

        /*Faz load dos arquivos usados na cena Ajuda e outras cenas  */
        this.load.image('bgGeral', '../../game/assets/background/scene_menus.png');

        this.load.image('btnVoltar', '../../game/assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', '../../game/assets/images/botoes/btnVoltarPress.png');

        this.load.image('pular', '../../game/assets/images/menus/pular.png');
        this.load.image('andarDireita', '../../game/assets/images/menus/andarDireita.png');
        this.load.image('andarEsquerda', '../../game/assets/images/menus/andarEsquerda.png');
        this.load.image('atacar', '../../game/assets/images/menus/atacar.png');
        this.load.image('interagir', '../../game/assets/images/menus/interagir.png');
        this.load.image('pausar', '../../game/assets/images/menus/pausar.png');

        this.load.spritesheet({
            key: 'setas', url: '../../game/assets/images/botoes/setas.png',
            frameConfig: { frameWidth: 80, frameHeight: 80 }
        });

        this.load.image('btnFase1', '../../game/assets/images/botoes/btnFase1.png');
        this.load.image('btnFase1Press', '../../game/assets/images/botoes/btnFase1Press.png');
        this.load.image('btnFase2', '../../game/assets/images/botoes/btnFase2.png');
        this.load.image('btnFase2Press', '../../game/assets/images/botoes/btnFase2Press.png');
        this.load.image('btnFase3', '../../game/assets/images/botoes/btnFase3.png');
        this.load.image('btnFase3Press', '../../game/assets/images/botoes/btnFase3Press.png');
        this.load.image('btnFase4', '../../game/assets/images/botoes/btnFase4.png');
        this.load.image('btnFase4Press', '../../game/assets/images/botoes/btnFase4Press.png');
        this.load.image('btnVoltar', '../../game/assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', '../../game/assets/images/botoes/btnVoltarPress.png');

        this.load.image('fase_1_cor', '../../game/assets/images/menus/screenTBOG.png');
        this.load.image('fase_2_cor', '../../game/assets/images/menus/screenFase2.png');
        this.load.image('fase_2_pb', '../../game/assets/images/menus/screenTBOGpreta.png');
        this.load.image('fase_3_cor', '../../game/assets/images/menus/screenTBOG.png');
        this.load.image('fase_3_pb', '../../game/assets/images/menus/screenTBOGpreta.png');
        this.load.image('fase_4_cor', '../../game/assets/images/menus/screenTBOG.png');
        this.load.image('fase_4_pb', '../../game/assets/images/menus/screenTBOGpreta.png');

        this.load.audio('menusMusic', '../../game/assets/musics/scenesMusics/menuMusic.mp3');

        /*Faz load dos arquivos usados na cena Level_1 e outras cenas  */
        this.load.spritesheet({
            key: 'sprite_hero', url: '../../game/assets/images/mobs/heroi.png',
            frameConfig: { frameWidth: 60, frameHeight: 84 }
        });

        this.load.spritesheet('bandeira_branca', '../../game/assets/images/itensCenario/bandeira_branca.png', {
            frameWidth: 36,
            frameHeight: 60
        });

        this.load.spritesheet('bandeira_verde', '../../game/assets/images/itensCenario/bandeira_verde.png', {
            frameWidth: 36,
            frameHeight: 60
        });

        this.load.spritesheet('sprite_alavanca', '../../game/assets/images/itensCenario/alavanca.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet('sprite_chave', '../../game/assets/images/itensCenario/chave.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet('sprite_moeda', '../../game/assets/images/itensCenario/moeda.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image('hud_primario', '../../game/assets/images/huds/hud_score_vida.png');
        this.load.image('hud_secundario', '../../game/assets/images/huds/hud_tempo.png');

        this.load.image('coracao_cheio', '../../game/assets/images/huds/coracao_cheio.png');
        this.load.image('coracao_vazio', '../../game/assets/images/huds/coracao_vazio.png');

        this.load.image('btnVoltar', '../../game/assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', '../../game/assets/images/botoes/btnVoltarPress.png');

        this.load.image('fase_1_sky', '../../game/assets/background/fase_1_sky.png');
        this.load.image('fase_1_montanhas', '../../game/assets/background/fase_1_montanhas.png');
        this.load.image('fase_1_ponte', '../../game/assets/images/itensCenario/ponte.png');
        
        this.load.image("fase_1_tileset", "../../game/assets/tilesets/fase_1_tileset.png");


        this.load.audio("jump", "../../game/assets/sounds/jump.mp3");
        this.load.audio("espada", '../../game/assets/sounds/espada.mp3');
        this.load.audio("morte", '../../game/assets/sounds/death.mp3');
        this.load.audio("hit", '../../game/assets/sounds/hit.mp3');
        this.load.audio("pegar", '../../game/assets/sounds/pegar.mp3');
        this.load.audio('vitoria','../../game/assets/sounds/victory.mp3');

        

        /*Faz load dos arquivos usados na cena casa e outras cenas  */
        this.load.tilemapTiledJSON('map_casa', '../../game/assets/tilemap/map_casa.json');
        this.load.image('fase_casa', '../../game/assets/tilesets/fase_casa.png');

        /*Itens de Cenário */
        this.load.image('itensCenario', '../../game/assets/images/itensCenario/itensDeCenario.png');
        this.load.spritesheet('sprite_pocao', '../../game/assets/images/itensCenario/pocao.png', {
            frameWidth: 15,
            frameHeight: 16
        });

        /*Sprite do aldeão*/
        this.load.spritesheet('sprite_aldeao', '../../game/assets/images/mobs/aldeao.png', {
            frameWidth: 31,
            frameHeight: 38
        });

        this.load.image('msg', '../../game/assets/images/huds/msg.png');
        //sprite aldeão

        //Carrega a sprite de efeito quando um inimigo morre
        this.load.spritesheet('inimigoDie', '../../game/assets/images/itensCenario/inimigo_die.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        //Carrega imagens da fase 3
        this.load.image('fase_3_background', '../../game/assets/background/fase_3_background.png');
        this.load.image('fase_3_tileset', '../../game/assets/tilesets/fase_3_tileset.png');

        //Carrega imagens da fase 3 
        this.load.image('fase_4_tileset', '../../game/assets/tilesets/fase_4_tileset.png');
        this.load.spritesheet('inimigo_die','../../game/assets/images/itensCenario/inimigo_die.png',{
            frameWidth:32,
            frameHeight:32
        })

    }
}

export default BootScene;