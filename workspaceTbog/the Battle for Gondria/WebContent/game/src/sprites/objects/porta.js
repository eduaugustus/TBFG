export default class Porta{
	constructor(scene){
		this.scene = scene;
		let spawns = this.scene.objetos;
		this.array =  this.scene.physics.add.group();
		for(let i = 0;i<spawns.length;i++){
			if(spawns[i].name==="porta"){
				this.array.create()
			}
		}
	}
} 