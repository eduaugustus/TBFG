class Ponte {
  constructor(ponteConfig) {
    this.config = ponteConfig;
    this.ponte_2_ativada = false;
  }

  update(player, alavancas) {
    this.alavancas = alavancas;
    this.player = player;

    if (player.keys.action.isDown) {
      this.criaPonte(this.config.layer);
    }

  }

  criaPonte(layer) {
    // console.log(this.config.layer);

    
    if (this.ponte_2_ativada == false) {
      this.ponte_2_ativada = true;

      /*Pega a diferença da distancia entre o player e a alavanca */
      let alavanca_1_X;
      let alavanca_1_Y;
      alavanca_1_X = this.alavancas.alavanca_1[0].x - this.player.sprite.body.x;
      alavanca_1_Y = this.alavancas.alavanca_1[0].y - this.player.sprite.body.y;

      let yTronco = this.config.yIndexColisao_1;

      let yGrade = this.config.yIndexNaoColisao_1;

      /*Caso a diferença da distância seja Y < 52 e X < 50 e X > 0
      a alavanca é atavida e é feita a construção da ponte */
      if ((alavanca_1_Y < 72)) {
        if ((alavanca_1_X < 50 && alavanca_1_X > 0) && this.player.alavanca_1_Active == false) {
          this.player.alavanca_1_Active = true;
          let indexTronco = this.config.IndexBlocoDeColisao;
          let indexGrade = this.config.IndexBlocoDeNaoColisao;
          this.alavancas.alavanca_1[0].anims.play('alavanca_ativa');

          let i;
          let j = 2;
          let tileXinicial = this.config.xInicial_1;
          let tileXfinal = this.config.xFinal_1;

          for (i = tileXinicial; i <= tileXfinal; i++) {
            j = j + 3;
            (function (i) {
              setTimeout(function () {
                layer.putTileAt(indexGrade, i, yGrade);
                layer.putTileAt(indexTronco, i, yTronco);
              }, i * j);
            })(i);

          }

        }

      } //Fim da Criação da ponte

    } else if (this.alavancas.alavanca_2 != null) {

      /*Pega a diferença da distancia entre o player e a alavanca */
      let alavanca_2_X;
      let alavanca_2_Y;
      alavanca_2_X = this.alavancas.alavanca_2[0].x - this.player.sprite.body.x;
      alavanca_2_Y = this.alavancas.alavanca_2[0].y - this.player.sprite.body.y;
      let yTronco = this.config.yIndexColisao_2;

      let yGrade = this.config.yIndexNaoColisao_2;

      /*Caso a diferença da distância seja Y < 52 e X < 50 e X > 0
      a alavanca é atavida e é feita a construção da ponte */
      if ((alavanca_2_Y < 72)) {
        if ((alavanca_2_X < 50 && alavanca_2_X > 0) && this.player.alavanca_2_Active == false) {

          this.player.alavanca_2_Active = true;
          let indexTronco = this.config.IndexBlocoDeColisao;
          let indexGrade = this.config.IndexBlocoDeNaoColisao;
          this.alavancas.alavanca_2[0].anims.play('alavanca_ativa');

          let i;
          let j = 2;
          let tileXinicial = this.config.xInicial_2;
          let tileXfinal = this.config.xFinal_2;

          for (i = tileXinicial; i <= tileXfinal; i++) {
            j = j + 3;
            (function (i) {
              setTimeout(function () {
                layer.putTileAt(indexGrade, i, yGrade);
                layer.putTileAt(indexTronco, i, yTronco);
              }, i * j);
            })(i);

          }

        }

      } //Fim da Criação da ponte
    }

  }

}
export default Ponte