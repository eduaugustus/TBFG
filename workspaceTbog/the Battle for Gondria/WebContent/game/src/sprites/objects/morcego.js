export default class Morcego{
	constructor(cena){
		 this.scene = cena;
	        let spawns = this.scene.spawns;
	        this.array = this.scene.physics.add.group();
	        for (let i = 0; i < spawns.length; i++) {
	            if (spawns[i].name === "spawn_morcego") {
	                let morcego = this.array.create(spawns[i].x, spawns[i].y, 'morcego');
	                morcego.body.allowGravity = false;
	                morcego.anims.play('morcego',true);

	            }
	        }
	}
	update(player){
		for(let i =0;i<this.array.children.entries.length;i++){
            let morcego = this.array.children.entries[i];
            if(player.x-morcego.x>-864&player.x-morcego.x<0){
                if(morcego.body.velocity.x!=-150&&player.y-morcego.y<100&&player.y-morcego.y>-100){
                    morcego.setVelocityX(-150);
                }
            }
		}
	}
}