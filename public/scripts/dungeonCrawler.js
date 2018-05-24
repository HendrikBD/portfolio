var lvl1={}, lvl2={}, lvl3={}, lvl4={};
var freeze = false,  holdHp=false;

makeDungeons();
newDungeon();


function makeDungeons(){
  lvl1.num= 1;
  lvl1.bossRoom= [[15,24],[80,92]];
  lvl1.boss= [19,85];
  lvl1.portal= [22,88];
  lvl1.startRoom=[[5,14],[15,21]];
  lvl1.start= [9,17];
  lvl1.rooms= [
    [[10,28],[60,79]], [[11,20],[52,59]], [[21,26],[46,57]], [[27,30],[49,55]], [[22,28],[32,45]], [[10,26],[28,31]], [[5,10],[22,31]]
  ];
  lvl1.doors= [
    [[19,20], [79,80]], [[14,15], [59,60]], [[20,21],[54,55]], [[26,27],[50,51]], [[23,24],[45,46]], [[24,25],[31,32]], [[7,8],[21,22]]
  ];
  lvl1.enemies= [];

  lvl2.num=2;
  lvl2.bossRoom= [[2,10],[2,10]];
  lvl2.boss= [3,4];
  lvl2.portal= [6, 7];
  lvl2.startRoom= [[38,42],[7,11]];
  lvl2.start= [39,8];
  lvl2.rooms= [
    [[11, 20],[4,7]], [[18,20],[7,16]], [[18,28],[17,24]], [[25,35],[25,30]], [[20,24],[25,30]], [[36,40],[20,28]], [[34,42],[12,19]]
  ];
  lvl2.doors= [
    [[10,11],[5,6]], [[19,20],[16,17]], [[26,27],[24,25]], [[24,25],[26,27]], [[35,36],[26,27]], [[37,38],[19,20]], [[40,41],[11,12]]
  ];
  lvl2.enemies= [];

  lvl3.num=3;
  lvl3.bossRoom= [[12,21],[35,40]];
  lvl3.boss= [15,36];
  lvl3.portal= [19,38];
  lvl3.startRoom= [[2,7],[5,10]];
  lvl3.start= [3,7];
  lvl3.rooms= [
    [[8,20],[6,9]], [[8,12],[10,14]], [[9,18],[15,19]], [[16,22],[20,27]], [[21,27],[6,14]], [[23,26],[15,25]], [[17,22],[28,34]]
  ];
  lvl3.doors= [
    [[7,8],[7,8]], [[9,10],[9,10]], [[10,11],[14,15]], [[17,18],[19,20]], [[20,21],[7,8]], [[24,25],[14,15]], [[22,23],[23,24]], [[19,20],[27,28]], [[19,20],[34,35]]
  ];
  lvl3.enemies= [];

  lvl4.num=4;
  lvl4.bossRoom= [[2,20],[42,58]];
  lvl4.boss= [6,49];
  lvl4.portal= [3,52];
  lvl4.startRoom= [[45,51],[79,85]];
  lvl4.start= [48,82];
  lvl4.rooms= [
    [[21,34],[48,52]], [[22,27 ],[53, 57]], [[30,33],[30, 47]], [[20,30],[30, 33]], [[10,19],[27, 36]], [[35,43],[46,54]], [[34,44],[55,70]], [[38,50],[71,78]]
  ];
  lvl4.doors= [
    [[20,21],[49,51]], [[25,26],[52, 53]], [[31,32],[47, 48]], [[19,20],[31, 32]], [[34,35],[49,51]], [[37,38],[54,55]], [[40,41],[70,71]], [[47,48],[78,79]]
  ];
  lvl4.enemies= [];




}

function newDungeon(){
  buildLevel(lvl1);
  buildLevel(lvl2);
  buildLevel(lvl3);
  buildLevel(lvl4);

  postPadding(lvl1);
  postPadding(lvl2);
  postPadding(lvl3);
  postPadding(lvl4);
}

function buildLevel(level){
  level.environment=Array.from({length: level.rooms.length+1},()=>[])
  var hp=8, enemies=6, weapon=1;

  var num=0, arr = Array.from({length: level.rooms.length}, (x,i)=>i);
  while(num<hp){
    if(num==level.rooms.length){
      arr = Array.from({length: level.rooms.length}, (x,i)=>i);
      level.environment[level.rooms.length].push(2);
    } else {
      var a = arr[Math.floor(Math.random()*arr.length)];
      arr.splice(arr.indexOf(a), 1);
      level.environment[a].push(2);
    } 
    num++;
  }

  var num=0, arr = Array.from({length: level.rooms.length}, (x,i)=>i);
  while(num<enemies){
    var a = arr[Math.floor(Math.random()*arr.length)];
    arr.splice(arr.indexOf(a), 1);
    level.environment[a].push(3);
    num++;
  }

  var num=0, arr = Array.from({length: level.rooms.length}, (x,i)=>i);
  while(num<weapon){
    var a = arr[Math.floor(Math.random()*arr.length)];
    arr.splice(arr.indexOf(a), 1);
    level.environment[a].push(4);
    num++;
  }


  level.grid = Array.from({length: 60}, (x,i)=>Array.from({length: 100}, ()=>0))

  buildRoom(level, level.startRoom)

  for(var i=0; i<level.rooms.length; i++){
    buildRoom(level, level.rooms[i], level.environment[i])
  }


  buildRoom(level, level.bossRoom, level.environment[i])

  for(var i=0; i<level.doors.length; i++){
    buildRoom(level, level.doors[i])
  }

  level.grid[level.start[0]][level.start[1]] = 5;
  level.grid[level.boss[0]][level.boss[1]] = 6;
  level.grid[level.boss[0]+1][level.boss[1]] = 6;
  level.grid[level.boss[0]][level.boss[1]+1] = 6;
  level.grid[level.boss[0]+1][level.boss[1]+1] = 6;


}

function postPadding(level){
  var levelCorners = [[-1,-1], [-1, -1]];

  for(var i=0; i<level.grid.length; i++){
    for(var j=0; j<level.grid[0].length; j++){
      if(level.grid[i][j]==1){
        if(i<levelCorners[0][0] || levelCorners[0][0]==-1){
          levelCorners[0][0] = i;
        } else if(i>levelCorners[1][0] || levelCorners[1][0]==-1){
          levelCorners[1][0] = i;
        }
        if(j<levelCorners[0][1] || levelCorners[0][1]==-1){
          levelCorners[0][1] = j;
        } else if(j>levelCorners[1][1] || levelCorners[1][1]==-1){
          levelCorners[1][1] = j;
        }
      }
    } 
  }

  level.grid.splice(levelCorners[1][0]+1, level.grid.length)
  level.grid.splice(0, levelCorners[0][0])

  for(var i=0; i<level.grid.length; i++){
    level.grid[i].splice(levelCorners[1][1], 100);
    level.grid[i].splice(0,levelCorners[0][1]);
  }

  for(var i=0; i<level.grid.length; i++){
    level.grid[i].unshift(0,0,0,0,0)
    level.grid[i].push(0,0,0,0,0)
  }

  var arr = Array.from({length: level.grid[0].length},()=>0);
  level.grid.unshift(arr,arr,arr,arr,arr);
  level.grid.push(arr,arr,arr,arr,arr);

  level.start = [level.start[0]-levelCorners[0][0]+5, level.start[1]-levelCorners[0][1]+5];
  level.boss = [level.boss[0]-levelCorners[0][0]+5, level.boss[1]-levelCorners[0][1]+5];
  level.portal = [level.portal[0]-levelCorners[0][0]+5, level.portal[1]-levelCorners[0][1]+5];

  for(var i=0; i<level.enemies.length; i++){
    level.enemies[i] = [level.enemies[i][0]-levelCorners[0][0]+5, level.enemies[i][1]-levelCorners[0][1]+5];
  }


}

function buildRoom(level, room, env){
  var locations = [], grid = level.grid;

  for(var i=room[0][0]; i<room[0][1]; i++){
    for(var j=room[1][0]; j<room[1][1]; j++){
      grid[i][j]=1;
    }
  }
  if(!env){
    env=[];
  }

  for(var i=0; i<env.length; i++){
    var j=0, place, overlap=true;

    while(overlap){
      overlap=false;
      place = [room[0][0]+Math.floor(Math.random()*(room[0][1]-room[0][0])), room[1][0]+Math.floor(Math.random()*(room[1][1]-room[1][0]))]

      for(var k=0; k<locations.length; k++){
        if(locations[k][0]==place[0] && locations[k][1]==place[1]){
          overlap=true;
        }
      }

      j++;
    }
    locations.push(place);
    grid[place[0]][place[1]]=env[i];
    if(env[i]==3){
      level.enemies.push(place)
    }
  }

}



var tiles = ["wall", "floor", "hp", "enemy", "weapon", "player", "boss", "portal"]

var baseStats = {
  hp: [100, 200, 300, 400, 500],
  dmgLvl: [15, 25, 35, 45, 55],
  dmgWeapon: [15, 25, 35, 45, 55],
  weapon: ["Dagger", "Short Sword", "Long Sword+1", "Falchion+2", "Master Sword"],
  hpE: [70, 110, 150, 170],
  dmgE: [15, 25, 35, 50],
  xpE: [10, 16, 30, 60],
  hpPick: [30, 40, 55, 80],
  xp: [50, 80, 150, 300, 1800],
}

class Root extends React.Component {
  constructor(props){
    super(props)

    this.state={
      level: lvl1,
      dungLvl: 1,
      loc: lvl1.start,
      player: {
        level: 1,
        hp: baseStats.hp[0],
        dmg: baseStats.dmgLvl[0] + baseStats.dmgWeapon[0],
        weapon: 0,
        xp: baseStats.xp[0],
      },
      enemies: Array.from({length: 6}, function(){
        var obj={
          dmg: baseStats.dmgE[0],
          hp: baseStats.hpE[0],
        }
        return obj
      }),
      boss: {
        dmg: 2*baseStats.dmgE[0],
        hp: 2*baseStats.hpE[0],
      }
    }

  }

  levelUp(){
    console.log("Level up!")

    this.state.player.level ++;
    this.state.player.dmg = baseStats.dmgLvl[this.state.player.level-1] + baseStats.dmgWeapon[this.state.player.weapon];
    this.state.player.xp = baseStats.xp[this.state.player.level-1]+this.state.player.xp

    if(this.state.player.hp<baseStats.hp[this.state.player.level-1]){
      this.state.player.hp  = baseStats.hp[this.state.player.level-1];
    }

    console.log(this)
  }

  newLevel(){
    console.log(this);
  }

  defeatBoss(){
    var bossLoc = this.state.level.boss;
    var portal = this.state.level.portal;

    this.state.level.grid[bossLoc[0]][bossLoc[1]]=1;
    this.state.level.grid[bossLoc[0]+1][bossLoc[1]]=1;
    this.state.level.grid[bossLoc[0]][bossLoc[1]+1]=1;
    this.state.level.grid[bossLoc[0]+1][bossLoc[1]+1]=1;

    if(this.state.level.num<4){
      this.state.level.grid[portal[0]][portal[1]]=7;
    } else {
      this.win();
    }
  }

  updateStatus(self){
    var healthPer = Math.round(100*self.player.hp/baseStats.hp[self.player.level-1]);
    var xpPer = Math.round(100*(baseStats.xp[self.player.level-1]-self.player.xp)/baseStats.xp[self.player.level-1]);
    var hpRem = (self.player.hp<0) ? 0 : self.player.hp;

    healthPer = (healthPer>100) ? 100 : healthPer;
    healthPer = (healthPer<0) ? 0 : healthPer;


    $(".health.bar > div:nth-child(2)")[0].innerText="HP: "+ String(hpRem) +"/" + String(baseStats.hp[self.player.level-1])
    $(".xp.bar > div:nth-child(2)")[0].innerText="XP: "+ String(baseStats.xp[self.player.level-1]-self.player.xp) +"/" + String(baseStats.xp[self.player.level-1])

    $(".health.bar > div:nth-child(1)")[0].style["width"] = String(healthPer)+"%";
    $(".xp.bar > div:nth-child(1)")[0].style["width"] = String(xpPer)+"%";

  }

  restart(self){
    makeDungeons();
    newDungeon();
    freeze = false;

    var cols = (lvl1.grid[0].length<38) ? lvl1.grid[0].length : 38;
    $(".dungeon").css("grid-template-columns", "repeat(" + String(cols) + ",30px)")

    $(".message .text")[0].innerText = "";
    $(".message .button")[0].innerText = "";
    $(".message")[0].classList.remove("gameOver");
    $(".message")[0].classList.remove("win");

    self.setState({
      level: lvl1,
      dungLvl: 1,
      player: {
        level: 1,
        hp: baseStats.hp[0],
        dmg: baseStats.dmgLvl[0] + baseStats.dmgWeapon[0],
        weapon: 0,
        xp: baseStats.xp[0],
      },
      enemies: Array.from({length: 6}, function(){
        var obj={
          dmg: baseStats.dmgE[0],
          hp: baseStats.hpE[0],
        }
        return obj
      }),
      boss: {
        dmg: 2*baseStats.dmgE[0],
        hp: 2*baseStats.hpE[0],
      },
      loc: lvl1.start,
    }, function(){
      self.updateStatus(self.state);
    })
  }

  gameOver(){
    freeze = true;

    var self=this;
    $(".message .text")[0].innerText = "Game Over";
    $(".message .button")[0].innerText = "Play Again";
    $(".message")[0].classList.add("gameOver");
    console.log(this)

    $(".message .button").on("click", function(){
      self.restart(self);
    })
  }

  win(){
    freeze = true;

    var self=this;

    $(".message .text")[0].innerText = "You Killed the Beastie";
    $(".message .button")[0].innerText = "Play Again";
    $(".message")[0].classList.add("win");
    console.log(this)

    $(".message .button").on("click", function(){
      self.restart(self);
    })

  }

  interact(obj,pos){
    var proceed = false;
    switch(obj){
      case 1:
        proceed=true;
        break;
      case 2:

        if(!(this.player.hp==baseStats.hp[this.player.level-1])){
          this.player.hp+=baseStats.hpPick[this.root.state.dungLvl-1];
          if(this.player.hp>baseStats.hp[this.player.level-1]){
            this.player.hp=baseStats.hp[this.player.level-1];
          }
          this.root.updateStatus(this)

          if(this.player.hp>baseStats.hp[this.player.level-1]){
            this.player.hp=baseStats.hp[this.player.level-1];
          }
        } else {
          holdHp='next';
        }
        proceed=true;


        break;
      case 3:
        for(var i=0; i<this.root.state.level.enemies.length; i++){
          if(this.root.state.level.enemies[i][0]==pos[0] && this.root.state.level.enemies[i][1]==pos[1]){
            this.enemies[i].hp -= this.player.dmg + Math.round(Math.random()*5);
            if(this.enemies[i].hp<0){
              proceed=true;
              this.player.xp -= baseStats.xpE[this.root.state.dungLvl-1];
              if(this.player.xp<=0){
                this.root.levelUp()
              }
            } else {
              this.player.hp -= this.enemies[i].dmg + Math.round(Math.random()*5);
              if(this.player.hp<=0){
                this.root.gameOver();
              }
            }
            this.root.updateStatus(this)
          }
        }
        break;
      case 4:
        console.log(this)
        this.player.weapon++;
        this.player.dmg = baseStats.dmgLvl[this.player.level-1] + baseStats.dmgWeapon[this.player.weapon];
        console.log(this)
        proceed=true;
        break;
      case 6:
        this.boss.hp -= this.player.dmg + Math.round(Math.random()*5);
        if(this.boss.hp<=0){
          proceed=true;
          this.player.xp-=2*baseStats.xpE[this.root.state.dungLvl-1];
          this.root.defeatBoss();
          if(this.player.xp<=0){
            this.root.levelUp()
          } 
        } else {
          this.player.hp -= this.boss.dmg + Math.round(Math.random()*5);
          if(this.player.hp<=0){
            this.player.hp = 0;
            this.root.gameOver();
          }
          console.log(this.player.hp)
        }
        this.root.updateStatus(this)
        break;
      case 7:
        break;
    }

    this.root.setState({
      dungLvl: this.root.state.dungLvl,
    })

    return proceed;
  }

  render(){
    return(
      <div className="root">
      <Status
      player={this.state.player}
      />
      <Dungeon 
      grid={this.state.level.grid}
      loc={this.state.level.start}
      interact={this.interact}
      root={this}
      player={this.state.player}
      enemies={this.state.enemies}
      boss={this.state.boss}
      />
      <div className="message">
      <div className="text"></div>
      <div className="button"></div>
      </div>
      </div>
    )
  }
}

class Status extends React.Component {
  render(){
    return (
      <div className="status">
      <div className="health bar"><div></div><div>HP: 100/100</div></div>
      <div className="xp bar"><div></div><div>XP: 0/50</div></div>
      <p>Level: {this.props.player.level}</p>
      <p>Weapon: {baseStats.weapon[this.props.player.weapon]}</p>
      <div className="legend">
      <div className="player"></div><div>Player</div>
      <div className="hp"></div><div>HP Up</div>
      <div className="weapon"></div><div>Weapon Upgrade</div>
      <div className="enemy"></div><div>Enemy</div>
      <div className="portal"></div><div>Portal</div>
      </div>
      </div>
    )
  }
}

class Dungeon extends React.Component {


  componentDidMount(){
    var self=this;
    var cols = (this.props.grid[0].length<38) ? this.props.grid[0].length : 38;
    $(".dungeon").css("grid-template-columns", "repeat(" + String(cols) + ",30px)")

    $("body").keypress(function(key){self.handleKey(key.originalEvent.keyCode)})
  }

  handleKey(code){
    var newPos;

    switch(code){
      case 37:
        newPos = [this.props.root.state.loc[0], this.props.root.state.loc[1]-1];
        break;
      case 38:
        newPos = [this.props.root.state.loc[0]-1, this.props.root.state.loc[1]];
        break;
      case 39:
        newPos = [this.props.root.state.loc[0], this.props.root.state.loc[1]+1];
        break;
      case 40:
        newPos = [this.props.root.state.loc[0]+1, this.props.root.state.loc[1]];
        break;
    }

    newPos = (freeze) ? this.props.root.state.loc : newPos

    var obj = this.props.grid[newPos[0]][newPos[1]];

    switch(obj){
      case 0:
        break;
      case 7:
        var self = this, start = eval("lvl" + String(this.props.root.state.dungLvl+1) + ".start");

        this.props.root.setState({
          dungLvl: this.props.root.state.dungLvl+1,
          level: eval("lvl" + String(this.props.root.state.dungLvl+1)),
          enemies: Array.from({length: 6}, function(){
            var obj={
              dmg: baseStats.dmgE[self.props.root.state.dungLvl],
              hp: baseStats.hpE[self.props.root.state.dungLvl],
            }
            return obj
          }),
          boss: {
            dmg: 2*baseStats.dmgE[self.props.root.state.dungLvl],
            hp: 2*baseStats.hpE[self.props.root.state.dungLvl],
          },
          loc: start,
        })

        var cols = (this.props.grid[0].length<38) ? this.props.grid[0].length : 38;
        $(".dungeon").css("grid-template-columns", "repeat(" + String(cols) + ",30px)")
        break;

      default:
        if(this.props.interact(obj, newPos)){
          this.props.grid[newPos[0]][newPos[1]] = 5;
          if(holdHp=='next'){
            holdHp="true";
            this.props.grid[this.props.root.state.loc[0]][this.props.root.state.loc[1]] = 1;
          } else if(holdHp=='true'){
            holdHp=false;
            this.props.grid[this.props.root.state.loc[0]][this.props.root.state.loc[1]] = 2;
          } else {
            this.props.grid[this.props.root.state.loc[0]][this.props.root.state.loc[1]] = 1;
          }

          this.props.root.setState({
            loc: newPos,
          })
        }

        break;
    }

  }

  renderLevel(player){
    var grid = this.props.grid, level = [];
          var corners = [[-1,-1], [-1,-1]];
          
          player = this.props.root.state.loc;
          
          if(grid.length>=24){
                  if(player[0]-12>-1 && player[0]+12<grid.length){
                            corners[0][0] = player[0]-12;
                            corners[1][0] = player[0]+12;
                          } else if (player[0]+12<grid.length) {
                                    corners[0][0] = 0;
                                    corners[1][0] = 23;
                                  } else if (player[0]-12>-1){
                                            corners[0][0] = grid.length-24;
                                            corners[1][0] = grid.length-1;
                                          }
                } else {
                        corners[0][0] = 0;
                        corners[1][0] = grid.length;
                      }
          
          
          if(grid[0].length>=38){
                  if(player[1]-19>-1 && player[1]+19<grid[0].length){
                            corners[0][1] = player[1]-19;
                            corners[1][1] = player[1]+19;
                          } else if (player[1]+19<grid[0].length) {
                                    corners[0][1] = 0;
                                    corners[1][1] = 38;
                                  } else if (player[1]-19>-1){
                                            corners[0][1] = grid[0].length-39;
                                            corners[1][1] = grid[0].length-1;
                                          }
                } else {
                        corners[0][1] = 0;
                        corners[1][1] = grid[0].length;
                      }
          
          var location = this.props.root.state.loc, diffy, diffx, classNames;
          
          for(var i=corners[0][0]; i<corners[1][0]; i++){
                  diffy=Math.abs(i-location[0]);
                  for(var j=corners[0][1]; j<corners[1][1]; j++){
                            diffx=Math.abs(j-location[1]);
                            classNames= tiles[grid[i][j]];
                            
                            if((diffx>3 || diffy>3) && (diffx>4 || diffy>2) && (diffx>2 || diffy>4)){
                                        classNames += ", fog"
                                      }
                            
                            level.push(
                                        <div
                                          className={classNames}
                                          key={i*grid[0].length+j}
                                        >
                                        </div>
                                          );
                          }
                }
          
          return level
        }
    
    render(){
          
          return (
                  <div className="dungeon">
                    {this.renderLevel(this.props.player)}
                  </div>
                )
        }
    
}


ReactDOM.render(<Root />, document.getElementById("screen"))
