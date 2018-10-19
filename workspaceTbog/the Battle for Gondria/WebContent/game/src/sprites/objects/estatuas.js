export default class Estatuas{
	constructor(scene){
		this.scene = scene;
		let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_estatua") {
                let estatua = this.array.create(spawns[i].x, spawns[i].y, 'estatua');
                estatua.anims.play('estatua',true);

            }
        }
        this.scene.physics.add.collider(this.array, this.scene.layer1);
	}
}