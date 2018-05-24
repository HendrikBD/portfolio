class Board extends React.Component {
    constructor(props){
          super(props)
          
          this.state = {
                  size: "small",
                  generation: 0,
                }
        }
    
    changeSize(size, board){
          
          board.setState({
                  generation: 0
                })
          
          switch(size){
                  case "small":
                      $(".size").removeClass("active")
                      $(".size")[2].classList.add("active");
                      break;
                    case "medium":
                      $(".size").removeClass("active")
                      $(".size")[1].classList.add("active");
                      break;
                    case "large":
                      $(".size").removeClass("active")
                      $(".size")[0].classList.add("active");
                      break;
                  }
          
          board.refs.grid.setState(board.refs.grid.updateSize(size))
          
          board.setState({
                  size: size,
                })
        }
    
    render(){
          
          return (
                  <div className="board">
                    <div><div className="generation">Generation: {this.state.generation}</div></div>
                    <Grid
                      ref="grid"
                      size={this.state.size}
                      board={this}
                    />
                    <Options 
                      changeSize={this.changeSize}
                      board={this}
                    />
                  </div>
                )
        }
}


class Grid extends React.Component {
    constructor(props){
          super(props);
          
          this.state=this.updateSize(this.props.size)
        }
    
    updateSize(size){
          
          var width, height;
          
          switch(size){
                  case "small":
                      width = 50;
                      height = 30;
                      break;
                    case "medium":
                      width = 70;
                      height = 50;
                      break;
                    case "large":
                      width = 100;
                      height = 80;
                      break;
                  }
          
          var binary = Array.from({length: width*height}, ()=> Math.round(Math.random()*3)>2 ? 1 : 0);
          var arr = Array.from({length: width*height}, (x,i)=> binary[i] ? "live" : "dead");
          
          var obj = {
                  width: width,
                  height: height,
                  binary: binary,
                  environment: arr,
                }
          
          return obj
        }
    
    clear(self){
          
          self.props.board.setState({
                  generation: self.props.board.state.generation+1
                })
          
          var width=self.state.width, height=self.state.height;
          
          var binary = Array.from({length: width*height}, ()=>0);
          var arr = Array.from({length: width*height}, ()=>"dead");
          
          self.setState({
                  binary: binary,
                  environment: arr,
                })
        }
    
    renderCells(){
          var cells = [];
          
          for(var i=0; i<this.state.width*this.state.height; i++){
                  cells.push(
                            <Cell
                              key={i}
                              num={i}
                              state={this.state.environment[i]}
                              grid={this}
                              toggleCell={this.toggleCell}
                            />
                          );
                }
          return cells
        }
    
    toggleCell(ind, grid){
          var binary = grid.state.binary.slice(), environment = grid.state.environment.slice();
          
          binary[ind] = binary[ind] ? 0 : 1;
          environment[ind] = environment[ind]=="live" ? "dead" : "live";
          
          grid.setState({
                  binary: binary,
                  environment: environment,
                })
        }
    
    getNeighbours(self, ind){
          var neighbours = [[-1,-1], [0,-1], [1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0]];
          var row = Math.floor(ind/self.state.width), col = ind%self.state.width;
          var numNeighbours = 0;
          
          neighbours.forEach(function(neighbour){
                  neighbour[0] = (neighbour[0] + col + self.state.width)%self.state.width;
                  neighbour[1] = (neighbour[1] + row + self.state.height)%self.state.height;
                  
                  var ind = neighbour[0] + neighbour[1]*self.state.width;
                  numNeighbours += self.state.binary[ind];
                })
          
          
          return numNeighbours
        }
    
    reproduce(self){
          self.props.board.setState({
                  generation: self.props.board.state.generation+1
                })
          
          var length = self.state.width*self.state.height, newBinary = self.state.binary.slice();
          var numNeighbours;
          
          for(var i=0; i<length; i++){
                  numNeighbours = self.getNeighbours(self, i);
                  if(numNeighbours<2){
                            if(newBinary[i]){
                                        newBinary[i] = 0;
                                      }
                          } else if(numNeighbours==3){
                                    if(!newBinary[i]){
                                                newBinary[i] = 1;
                                              }
                                  } else if(numNeighbours>3){
                                            newBinary[i]=0;
                                          }
                }
          
          // var arr = Array.from({length: length}, (x,i)=> newBinary[i] ? "live" : "dead");

              var arr = Array.from({length: length}, function(x,i){
                let state = "dead";
                if(self.state.binary[i] && newBinary[i]){
                  state = "live"
                } else if(newBinary[i]){
                  state = "baby"
                }
                return state
              });

      self.setState({
        binary: newBinary,
        environment: arr,
      })
    }

  componentDidMount(){
    var self=this;

    this.setState({
      play: false
    }, function(){
      self.play(self)
    });

  }

  play(self){

    if(!self.state.play){
      var int = setInterval(()=>self.reproduce(self),100);
      self.setState({
        interval: int,
        play: true,
      })
    } else {
      clearInterval(self.state.interval)
      self.setState({
        interval: null,
        play: false,
      })
    }

  }

  render(){

    return (
      <div className={"grid "+this.props.size }>
      {this.renderCells()}
      </div>
    )
  }

}

class Cell extends React.Component {
  render(){
    // console.log(this)
   
    return (
      <div className={"cell " + this.props.state} onClick={()=>this.props.toggleCell(this.props.num, this.props.grid)}></div>
    )
  }
}

class Options extends React.Component {
  render(){
    return(
      <div className="controls">
      <div className="play" onClick={()=>this.props.board.refs.grid.play(this.props.board.refs.grid)}>Play/Pause</div>
      <div className="clear" onClick={()=>this.props.board.refs.grid.clear(this.props.board.refs.grid)}>Clear</div>
      <div className="random" onClick={()=>this.props.changeSize(this.props.board.state.size, this.props.board)}>Random</div>

      <div className="size" onClick={()=>this.props.changeSize("large", this.props.board)}>Large</div>
      <div className="size" onClick={()=>this.props.changeSize("medium", this.props.board)}>Medium</div>
      <div className="size active" onClick={()=>this.props.changeSize("small", this.props.board)}>Small</div>
      </div>
    )
  }
}

ReactDOM.render(<Board />, document.getElementById("view"))
