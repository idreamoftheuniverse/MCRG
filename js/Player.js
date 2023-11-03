class Player {
  constructor() {
    this.name=null
    this.positionX=0
    this.positionY=0
    this.index=null
    this.rank=0
    this.score=0
    this.fuel=185
    this.life=185
  }

  addPlayer(){
    var playerIndex="players/player"+this.index
    if(this.index===1){
      this.positionX=width/2-100
      this.positionY = 680
    }
    else{
      this.positionX=width/2+100
      this.positionY = 680
    }
   database.ref(playerIndex).set({
    name:this.name,
    positionX:this.positionX,
    positionY:this.positionY,
    rank:this.rank,
    score:this.score
   })
  }
  
  update(){
    var playerIndex="players/player"+this.index
    database.ref(playerIndex).update({
    positionX:this.positionX,
    positionY:this.positionY,
    rank:this.rank,
    score:this.score,
    life:this.life
    })
  }

  getCount(){
    var playerCountRef=database.ref("playerCount")
    playerCountRef.on("value",function(data){
      playerCount=data.val()
    })
  }
  updateCount(count){
    database.ref("/").update({
      playerCount:count
    })
  }
  static getPlayersInfo(){
    var playerInfoRef=database.ref("players")
    playerInfoRef.on("value",data=>{
      allPlayers=data.val()
    })
  }

  getDistance(){
    var playerDistanceRef=database.ref("players/player"+this.index)
    playerDistanceRef.on("value",data=>{
      var data=data.val()
      this.positionX=data.positionX;
      this.positionY=data.positionY;
    })
  }

  getCarsAtEnd(){
    database.ref("carsAtEnd").on("value",data=>{
      this.rank=data.val()
    })
  }

  static updateCarsAtEnd(rank){
    database.ref("/").update({
      carsAtEnd:rank
    })
  }
}
