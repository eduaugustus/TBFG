class MenuFases extends Phaser.Scene {

    constructor() {
        super({ key: "MenuFases" });
    }

    preload() {

        let faseDisponivel = 0;

       
    }
    create() {


        // music.play();

        this.add.image(432, 240, 'bgGeral');

        this.voltar = this.add.image(785, 35, 'btnVoltar').setInteractive();
        this.voltar.setScale(0.6);

        this.voltar.on('pointerdown', function () {
            let btn = this;
            btn.setTexture("btnVoltarPress");
            setTimeout(() => {
                btn.setTexture("btnVoltar");
                this.scene.scene.start('MainMenu');
            }, 150);
        });

        this.faseDisponivel = 4;

        //Fase 1
        if ((this.faseDisponivel == 1) || (this.faseDisponivel >= 1)) {

            this.fase1 = this.add.image(140, 300, 'btnFase1').setScale(0.7);
            this.fase1.setInteractive();

            this.fase1.on('pointerdown', function () {
                this.scene.sound.sounds[0].stop();
                let btn = this;
                btn.setTexture("btnFase1Press");
                setTimeout(() => {
                    btn.setTexture("btnFase1");
                    let data = {
                        scene : 'Level_1'
                    }
                    this.scene.scene.start('Level_load',data);
                }, 150);
            });

            this.add.image(143, 230, 'fase_1_cor').setScale(0.170);
        }

        //Fase 2
        if (this.faseDisponivel < 2) {

            this.fase2 = this.add.image(335, 300, 'btnFase2Press').setScale(0.7);
            this.add.image(335, 230, 'fase_2_pb').setScale(0.170);

        } else if (this.faseDisponivel >= 2) {

            this.fase2 = this.add.image(335, 300, 'btnFase2').setScale(0.7);
            this.fase2.setInteractive();

            this.fase2.on('pointerdown', function () {
                this.scene.sound.sounds[0].stop();
                let btn = this;
                btn.setTexture("btnFase2Press");
                setTimeout(() => {
                    btn.setTexture("btnFase2");
                   let data = {
                        scene : 'Level_2'
                    }
                    this.scene.scene.start('Level_load',data);
                }, 150);
            });

            this.add.image(335, 230, 'fase_2_cor').setScale(0.115);
        }

        //Fase 3
        if (this.faseDisponivel < 3) {

            this.fase3 = this.add.image(515, 300, 'btnFase3Press').setScale(0.7);
            this.add.image(515, 230, 'fase_3_pb').setScale(0.170);

        } else if (this.faseDisponivel >= 3) {

            this.fase3 = this.add.image(515, 300, 'btnFase3').setScale(0.7);
            this.fase3.setInteractive();

            this.fase3.on('pointerdown', function () {
                
                this.scene.sound.sounds[0].stop();
                let btn = this;
                btn.setTexture("btnFase3Press");
                setTimeout(() => {
                    btn.setTexture("btnFase2");
                   let data = {
                        scene : 'Level_3'
                    }
                    this.scene.scene.start('Level_load',data);
                }, 150);
            });

            this.add.image(515, 230, 'fase_3_cor').setScale(0.170);
        }

        //Fase 4
        if (this.faseDisponivel < 4) {

            this.fase4 = this.add.image(705, 300, 'btnFase4Press').setScale(0.7);
            this.add.image(705, 230, 'fase_4_pb').setScale(0.170);

        } else if (this.faseDisponivel == 4) {

            this.fase4 = this.add.image(705, 300, 'btnFase4').setScale(0.7);
            this.fase4.setInteractive();

            this.fase4.on('pointerdown', function () {
                this.scene.sound.sounds[0].stop();
                let btn = this;
                btn.setTexture("btnFase4Press");
                setTimeout(() => {
                    btn.setTexture("btnFase4");
                    let data = {
                        scene : 'Level_4'
                    };
                    this.scene.scene.start('Level_load',data);
                }, 150);
            });

            this.add.image(705, 230, 'fase_4_cor').setScale(0.170);
        }

        

    }

    update() {

    }
}
export default MenuFases;