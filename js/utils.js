function rectanglecollision({ rec1, rec2 }) {
    return (rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x &&
        rec1.attackBox.position.x <= rec2.position.x + rec2.width &&
        rec1.attackBox.position.y + rec1.attackBox.height >= rec2.position.y &&
        rec1.attackBox.position.y <= rec2.position.y + rec2.height)
}
let timer = 60
let timerid
function winner({player,enemy,timerid}){
    clearTimeout(timerid)
    document.querySelector("#winner").style.display='flex'
    if(player.health===enemy.health){
        document.querySelector("#winner").innerHTML='Tie'
        console.log("Tie")
    }
    else if(player.health>enemy.health){
        document.querySelector("#winner").innerHTML='Player 1 Win'
    }
    else if(player.health<enemy.health){
        document.querySelector("#winner").innerHTML='Player 2 Win'
    }
}
function decreasetimer(){

    if(timer>0) {
        timer-=1
        timerid = setTimeout(decreasetimer,1000)
        document.querySelector(".timer").innerHTML=timer
    }
    if(timer===0){
        winner({player:player,enemy:enemy,timerid:timerid})}

}  
