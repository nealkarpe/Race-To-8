import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var bgColors = ["#8CC152","#E9573F","#F6BB42"];
var players = ["A", "B", "C"];

function Circle(props) {
  if(props.index <= props.numberFilled)
  {
    return(<div onClick={() => props.clickFunc2(props.value, props.index)} style={{backgroundColor: bgColors[props.value]}}>{props.index}</div>);
  }
  else return(<div>{props.index}</div>);
}


class Row extends React.Component {

  render() {

    let circles = [];
    for(let i=1; i<=8; i++){
      circles.push(<Circle clickFunc2={this.props.clickFunc2} value={this.props.value} index={i} numberFilled={this.props.numberFilled} />)
    }

    return (
      <div class="flex-container">
        <button onClick={() => this.props.clickFunc(this.props.value)} style={{backgroundColor: bgColors[this.props.value]}}><div>
          Go
        </div></button>


        {circles}


      </div>
    );
  }
}





class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numFilled: [0,0,0],
    };
  }


  handleClick(i) {
    const numFilled = this.state.numFilled.slice();
    if (calculateWinner(numFilled) !== null) {
      return;
    }
    numFilled[i] += 1;
    this.setState({
      numFilled: numFilled,
    });
  }

  handleClickBack(row,index) {
    const numFilled = this.state.numFilled.slice();
    if (calculateWinner(numFilled) !== null) {
      return;
    }
    if(index >= numFilled[row]) return;

    numFilled[row]=index;
    this.setState({
      numFilled: numFilled,
    });
  }



  renderRow(value) {
    return <Row clickFunc={i => this.handleClick(i)} clickFunc2={(i,j) => this.handleClickBack(i,j)} numberFilled={this.state.numFilled[value]} value={value}/>;
  }


  render() {
    const numFilled = this.state.numFilled.slice();
    const winner = calculateWinner(numFilled);

    let status;

    if (winner !== null) {
      status = "The winner is " + players[winner] + "!";
    } else {
      status = "Game in progress";
    }


    return (
      <div className="game">
        <center><h1>Race to 8!</h1></center>
        <div className="game-board">
          <div>
            <div className="board-row">
              {this.renderRow(0)}
            </div>
            <div className="board-row">
              {this.renderRow(1)}
            </div>
            <div className="board-row">
              {this.renderRow(2)}
            </div>
          </div>

        </div>
        <center>
        <div className="game-info">
          {status}<br/>
          A: {numFilled[0]}<br/>
          B: {numFilled[1]}<br/>
          C: {numFilled[2]}<br/>
        </div>
        </center>

        <div className="refresh">
          <center><button onClick={
            () => {
              this.setState({numFilled: [0,0,0]});
            }


          }>
            <i class="fa fa-refresh fa-5x" aria-hidden="true"></i>
          </button></center>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(numFilled)
{
  for(let i=0; i<=2; i++)
  {
    if(numFilled[i] >= 8) return i;
  }

  return null;
}