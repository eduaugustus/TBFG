import Soldados from "../enemies/soldados.js";
export default class Porta{
	constructor(scene){
		this.scene = scene;
		let spawns = this.scene.objetos;
		this.aberta = false;
		this.array =  this.scene.physics.add.group();
		for(let i = 0;i<spawns.length;i++){
			if(spawns[i].name==="porta"){
				let porta = this.array.create(spawns[i].x,spawns[i].y,'porta');
				porta.body.allowGravity = false;
				porta.name = "spawn_soldado"
			}
		}
	}
	open(){
		this.aberta = true;	
		for(let i =0 ; i<this.array.children.entries.length;i++){
			let porta = this.array.children.entries[i];
			porta.anims.play('porta_abre',true);
			setTimeout(()=>{
				porta.anims.stop();	
				this.scene.spawns = this.array.children.entries;
				if(this.scene.soldados==undefined){					
					this.scene.soldados  = new Soldados(this.scene,this.scene.layer1,this.scene.layer2);
				}
			},1990)
		}
	}
	close(){
		setTimeout(()=>
				this.aberta = false,2200)
		for(let i =0 ; i<this.array.children.entries.length;i++){
			let porta = this.array.children.entries[i];
			porta.anims.play('porta_fecha',true);
			setTimeout(()=>porta.anims.stop(),1990)
		}
	}
} 