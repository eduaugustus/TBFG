var pontuacaoTotal, pontuacaoBonusTempo;

class CalculaPontuacao extends Phaser.Scene {
    constructor() {
        super({
            key: 'CalculaPontuacao'
        });
        this.pontuacaoTotal;
		this.pontuacaoBonusTempo;
    }
    
    init(data){
    	this.pontuacao = data.player.score;
    	this.fase = data.fase;
    	this.pontBoss = data.bossPontuacao;
    	this.segundos = data.player.secs;
    	this.minutos = data.player.mins;
    	this.tempo;
    	this.ajustaTempo(this.segundos, this.minutos);
    }
    
    cadastraPontuacao(tempo, pontuacao, bossPontuacao, fase){
    	$.ajax({
    		type: "POST",
			url: "../../CadastraPontuacao",
			data:"tempo="+tempo+"&pontuacao="+(pontuacao + bossPontuacao)+"&fase="+fase,
			success: function (pontuacoes) {
				pontuacaoTotal = pontuacoes[0];
				pontuacaoBonusTempo = pontuacoes[1];
				console.log(pontuacoes);
				console.log(pontuacaoTotal);
				console.log(pontuacaoBonusTempo);
			},
			error: function (msg) {
				alert(msg.msg);
			}
    	});
    }


    create() {
    	this.cadastraPontuacao(this.tempo, this.pontuacao, this.pontBoss, this.fase);

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

        this.pontFase = this.add.bitmapText(40, 150, 'myfont', 'Pontuacao Fase: ' + this.pontuacao, 40);
        this.time = this.add.bitmapText(500, 150, 'myfont', 'Tempo: ' + this.tempo, 40);
        
        setTimeout(() => {
        	this.pontTempoBonus = this.add.bitmapText(40, 220, 'myfont', 'Bonus de tempo: +' + pontuacaoBonusTempo, 40);
            this.pontBoss = this.add.bitmapText(40, 290, 'myfont', 'Boss morto: +' + this.pontBoss, 40);
            this.pontTotal = this.add.bitmapText(40, 360, 'myfont', 'Pontuacao Total: ' + pontuacaoTotal, 50);
        }, 750);

        
    }

    ajustaTempo(segundos, minutos) {
        let result = (minutos < 10 ? "0" + minutos : minutos);
        result += ":" + (segundos < 10 ? "0" + segundos : segundos);
        result = "00:" + result;
        return this.tempo = result;
    }
    
}

export default CalculaPontuacao;