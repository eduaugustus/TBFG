class CalculaPontuacao extends Phaser.Scene {
    constructor() {
        super({
            key: 'CalculaPontuacao'
        });
    }

    init(data){
        this.pontuacao = data.player.score;
        this.segundos = data.player.secs;
        this.minutos = data.player.mins;
        this.tempo;
        this.ajustaTempo(this.segundos, this.minutos);
    }

    create() {

        this.add.image(432, 240, 'bgGeral');

        this.btnInicio = this.add.image(785, 35, 'btnInicio').setInteractive();
        this.btnInicio.setScale(0.6);

        this.btnInicio.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnInicioPress");
            setTimeout(() => {
                btn.setTexture("btnInicio");
                this.scene.scene.start('MenuFases');
            }, 150)
        });

        this.pont = this.add.bitmapText(100, 150, 'myfont', 'Pontuacao:', 50);
        this.time = this.add.bitmapText(100, 275, 'myfont', 'Tempo:', 50);

        this.pontResult = this.add.bitmapText(400, 150, 'myfont', this.pontuacao, 45);
        
        this.timeResultado = this.add.bitmapText(275, 275, 'myfont', this.tempo, 45);
        

    }

    ajustaTempo(segundos, minutos) {
        let result = (minutos < 10 ? "0" + minutos : minutos);
        result += ":" + (segundos < 10 ? "0" + segundos : segundos);
        return this.tempo = result;
    }
    

}

export default CalculaPontuacao;