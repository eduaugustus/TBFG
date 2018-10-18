	export default class Boss{
		 constructor(scene, camada1) {
		        this.scene = scene;
		        let spawns = this.scene.spawns;
		        this.array = this.scene.physics.add.group();
		        
		        for (let i = 0; i < spawns.length; i++) {
		             if (spawns[i].name === 'spawn_Boss') {
		                let rei = this.array.create(spawns[i].x, spawns[i].y, 'rei');
		                rei.lifes = 5;
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
	
		 update(player){
			 let rei = this.boss;
			 if(rei.jumps==2){
				 rei.jumps=0;
				 console.log(rei)
				 rei.canMove=false;
				 rei.canHit=true;
				 rei.anims.play('morte',true);
				 this.c_player.active=false;
				 setTimeout(()=>{
						 rei.anims.play('rei_stand',true)
						 rei.x=448;
						 rei.y= 44;
						 rei.setVelocityX(0);
						 rei.setVelocityY(0);
						 rei.body.allowGravity = false;
						 this.scene.porta.open();
						 
					 },500);
			 }else if(rei.canMove&&this.scene.soldados == undefined){
				 
				 if(rei.x>0&&rei.x<864){
						 if(rei.x>player.x&&rei.body.onFloor()){
							rei.jumps++
					 		rei.setVelocityX(-150);
					 		rei.setVelocityY(-500);
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
					 rei.x=448;
					 rei.y= 100;
					 rei.body.allowGravity = true;					 
				 }
				 if(rei.canHit==false){
					 setTimeout(()=>rei.canMove=true,1000)
				 }
			 }
		 }
	
	}