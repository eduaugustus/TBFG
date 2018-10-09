class Anims {

  constructor(scene) {}
  criaAnims(anims) {
    if (anims.anims.size == 0) {

      anims.create({
        key: 'move',
        frames: anims.generateFrameNumbers('sprite_hero', {
          start: 4,
          end: 5
        }),
        frameRate: 6,
        repeat: -1
      });
      anims.create({
        key: 'up',
        frames: anims.generateFrameNumbers('setas', {
          start: 0,
          end: 1
        }),
        frameRate: 2,
        yoyo: true,
        repeat: -1
      });

      anims.create({
        key: 'left',
        frames: anims.generateFrameNumbers('setas', {
          start: 4,
          end: 5
        }),
        frameRate: 2,
        repeat: -1
      });

      anims.create({
        key: 'right',
        frames: anims.generateFrameNumbers('setas', {
          start: 2,
          end: 3
        }),
        frameRate: 2,
        repeat: -1
      });

      anims.create({
        key: 'keyZ',
        frames: anims.generateFrameNumbers('setas', {
          start: 8,
          end: 9
        }),
        frameRate: 2,
        repeat: -1
      });

      anims.create({
        key: 'keyC',
        frames: anims.generateFrameNumbers('setas', {
          start: 10,
          end: 11
        }),
        frameRate: 2,
        repeat: -1
      });

      anims.create({
        key: 'keyP',
        frames: anims.generateFrameNumbers('setas', {
          start: 12,
          end: 13
        }),
        frameRate: 2,
        repeat: -1
      });
      /*INICIO - Animação da moeda */
      anims.create({
        key: 'giraMoeda',
        frames: anims.generateFrameNumbers('sprite_moeda', {
          start: 0,
          end: 7
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: false
      });
      


      //Animação - andar para esquerda
      anims.create({
        key: 'sprite_hero_left',
        frames: anims.generateFrameNumbers('sprite_hero', {
          start: 6,
          end: 9
        }),
        frameRate: 4,
        yoyo: true,
        repeat: -1
      });

      //Animação - andar para direita
      anims.create({
        key: 'sprite_hero_right',
        frames: anims.generateFrameNumbers('sprite_hero', {
          start: 0,
          end: 3
        }),
        frameRate: 4,
        yoyo: true,
        repeat: -1
      });

      //Animação - atacar
      anims.create({
        key: 'sprite_hero_z_right',
        frames: anims.generateFrameNumbers('sprite_hero', {
          start: 10,
          end: 13
        }),
        frameRate: 8,
        repeat: 1
      });
      anims.create(
        {
          key:"sprite_hero_z_left",
          frames: anims.generateFrameNumbers('sprite_hero',{
            start:14,
            end:17
          }), 
          frameRate:8,
          repeat:1
        }
      );

      //Animação - interagir
      anims.create({
        key: 'sprite_hero_c',
        frames: anims.generateFrameNumbers('sprite_hero', {
          start: 4,
          end: 5
        }),
        frameRate: 1,
        yoyo: true,
        repeat: -1
      });

      /*Animações de interação */
      anims.create({
        key: 'alavanca_ativa',
        frames: anims.generateFrameNumbers('sprite_alavanca', {
          start: 0,
          end: 5 
        }),
        frameRate: 4
      });

      anims.create({
        key: 'bandeira_branca_play',
        frames: anims.generateFrameNumbers('bandeira_branca', {
          start: 0,
          end: 3
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: false
      });

      anims.create({
        key: 'bandeira_verde_play',
        frames: anims.generateFrameNumbers('bandeira_verde', {
          start: 0,
          end: 3
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
      });

      /*FIM - Animação da moeda */

      /*ANIMS - Pocao */
      anims.create({
        key: 'potionEffect',
        frames: anims.generateFrameNumbers('sprite_pocao', {
          start: 0,
          end: 2
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
      });

      anims.create({
        key: 'aldeaoMove',
        frames: anims.generateFrameNumbers('sprite_aldeao', {
          start: 0,
          end: 1
        }),
        frameRate: 5,
        repeat: -1,
        yoyo: true
      });
      anims.create({
        key:'morte',
        frames: anims.generateFrameNumbers('inimigo_die',{
          start:0,
          end:8
        }),
        frameRate: 18,
        repeat:-1
      });
      console.log(anims)

      



    }
    return anims;
  }

}
export default Anims;