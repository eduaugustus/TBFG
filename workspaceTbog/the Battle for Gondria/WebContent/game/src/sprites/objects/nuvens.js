class Nuvens {
    constructor(cena) {
        this.scene = cena;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "nuvem") {
                let random = Math.floor(Math.random() * 100) + 1; 
                if(random>=50){
                    let nuvem = this.array.create(spawns[i].x, spawns[i].y, 'nuvem1');
                    nuvem.body.allowGravity = false;
                    nuvem.setScale(0.5);
                    nuvem.setVelocityX(20);
                }else{
                    let nuvem = this.array.create(spawns[i].x, spawns[i].y, 'nuvem2');
                    nuvem.body.allowGravity = false;
                    nuvem.setVelocityX(20);
                }
            }
        }
    }
    update(){
        for (let i = 0; i < this.array.children.entries.length; i++) {
            let nuvem = this.array.children.entries[i];
        }
    }
}
export default Nuvens;