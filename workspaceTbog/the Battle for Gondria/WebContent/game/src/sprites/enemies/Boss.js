	export default class Boss{
		 constructor(scene, camada1) {
		        this.scene = scene;
		        let spawns = this.scene.spawns;
		        this.array = this.scene.physics.add.group();
		        
		        for (let i = 0; i < spawns.length; i++) {
		             if (spawns[i].name === 'spawn_Boss') {
		                let rei = this.array.create(spawns[i].x, spawns[i].y, 'rei');
		                rei.lifes = 4;
		                // rei.setScale(2);
		                rei.jumps = 0;
		                rei.isHit = {
		                    right: false,
		                    left: false
		                };
		                rei.isDead = false;
		                rei.canHit = false;
		                rei.canMove = true;
		                this.boss = rei;
		                rei.anims.play('rei_stand',true)
		            }
		        }
		        this.scene.physics.add.collider(this.array, camada1);
		        
		        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.reiHit, null, this.scene);
		    }
		 reiHit(boss,player){
			 if (this.boss.boss.canMove&&this.boss.boss.lifes>0) {
		            this.colisao = true;
		            player.setVelocityX(0);
		            if (player.x - boss.x <= 0) {
		                boss.setVelocityX(150);
		            } else {
		                boss.setVelocityX(-150);
		            }
		            boss.setVelocityY(-200);
		            if (boss.body.velocity.x <= 0) {
		                player.setVelocityX(150);
		            } else {
		                player.setVelocityX(-150);
		            }
		            player.setVelocityY(-100);
		            this.player.lifes -= 1;
		            this.player.hit.play();
		            player.setVelocityY(-150);
		            this.player.hit.play();
		        }
		 }
		 
		 update(player){
			 let rei = this.boss;
			 if(rei.lifes==0){
                     this.c_player.active = false;
                     
                 let data = {
                     player: this.scene.player,
                     fase: "4",
                     bossPontuacao : 1150
                 };
                 
                 rei.anims.play('morte');
                 rei.lifes = -1;
                 setTimeout(
                     () => {
                         rei.destroy();
                         this.scene.player.victory.play();
                         this.scene.music.stop();
                     }, 2000);
                 this.scene.player.deletaIntervalo();
                 setTimeout(() => {
                     this.scene.scene.start('CalculaPontuacao', data);
                 }, 5000);
                 }
			 if(rei.lifes>0){
				 
			 if(rei.jumps==10){
				 rei.jumps=0;
				 console.log(rei)
				 rei.canMove=false;
				 rei.canHit=true;
				 rei.anims.play('morte',true);
				 this.c_player.active=false;
				 setTimeout(()=>{
						 rei.anims.play('rei_stand',true)
						 rei.x=448;
						 rei.y= 76;
						 rei.setVelocityX(0);
						 rei.setVelocityY(0);
						 rei.body.allowGravity = false;
						 this.scene.porta.open();
						 let portal = this.scene.physics.add.sprite(rei.x, rei.y, "portal", 0);
						 portal.setScale(1.5);
						 portal.setAlpha(0.6);
						 portal.body.allowGravity = false;
						 portal.anims.play('portal',true);
						 this.portal = portal;
						 
					 },500);
			 }else if(rei.canMove&&this.scene.soldados == undefined){
				 
				 if(rei.x>0&&rei.x<864){
						 if(rei.x>player.x&&rei.body.onFloor()){
							rei.jumps++
							let oi = Math.random();
					 		rei.setVelocityX(-300*oi);
					 		let hey = Math.random();
					 		rei.setVelocityY(-700*hey);
					 		
					 		rei.anims.play('rei_left');
				 		}else if(rei.x<player.x&&rei.body.onFloor()){
				 			rei.jumps++
					 		rei.setVelocityX(150);
					 		rei.setVelocityY(-500);
					 		rei.anims.play('rei_right');
				 		}
				 }else{
					 rei.setVelocityX(rei.body.velocity.x*-1);					 
				 }
			 }else if(!rei.canMove&&this.scene.soldados == undefined&&this.scene.porta.aberta == false){
				 if(!rei.body.allowGravity){
					 this.scene.cameras.main.shake(150);
					 this.portal.destroy();
					 rei.x=448;
					 rei.y= 100;
					 rei.body.allowGravity = true;
					 if(rei.lifes==3||rei.lifes==2){
						 this.scene.criaPocoes();
						 
					 }
				 }
				 if(rei.canHit==false){
					 setTimeout(()=>rei.canMove=true,1000)
				 }
			 }
		 }
		 }
	
	}