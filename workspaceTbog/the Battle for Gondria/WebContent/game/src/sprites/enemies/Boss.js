export default class Boss{
	 constructor(scene, camada1) {
	        this.scene = scene;
	        let spawns = this.scene.spawns;
	        this.array = this.scene.physics.add.group();
	        console.log("oi");
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

	            }
	        }
	        this.scene.physics.add.collider(this.array, camada1);
	        
	        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.Hit, null, this.scene);
	    }
}