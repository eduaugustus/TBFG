export default class Coruja{
	constructor(cena){
		this.scene = cena;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_coruja") {
                let coruja = this.array.create(spawns[i].x, spawns[i].y, 'coruja');
                coruja.body.allowGravity = false;
                coruja.anims.play('coruja',true);

            }
        }
	}
}