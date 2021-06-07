import React, { Component } from 'react';
import './App.css';
import Confetti from 'react-dom-confetti';
import {boardData, winningCombinations} from './stateData';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: boardData,
      winner: false,
      onclick: false,
      indexes: [],
      winningCombinationsMatrix: winningCombinations,
      modal: false
    };
  }

  onClickHandler = (id) => {
    this.setState(
      (prevState) => ({
        board: prevState.board.map((el) =>
          el.id === id ? { ...el, clicked: true, active: true } : el
        ),
      }),
      function () {
        this.squareClicked();
      });
  };

  squareClicked() {
    const clickedItems = this.state.board.map((el) => {
      return el.active === true;
    });
    
    this.state.winningCombinationsMatrix.forEach((line) => {
      const [p1, p2, p3, p4, p5] = line;
      if (
        clickedItems[p1] &&
        clickedItems[p2] &&
        clickedItems[p3] &&
        clickedItems[p4] &&
        clickedItems[p5]
      ) {
        this.setState({
          winner: true,
          indexes: line,
        });
      }
    })}    

// update winning indexes to carry on the game
  componentDidUpdate() {
    if (this.state.winner === true) {
      this.setState((prevState) => ({
        winningCombinationsMatrix: prevState.winningCombinationsMatrix.filter(
          (item) => !item.every((it, i) => it === this.state.indexes[i])
        ),
        winner: false,
      }));
    }
  }

  render() {

    const iswinningIndex = this.state.indexes;
    const config = {
      angle: 360,
      spread: 360,
      startVelocity: 40,
      elementCount: 500,
      dragFriction: 0.15,
      duration: 3000,
      stagger: 3,
      width: "20px",
      height: "20px",
      perspective: "1000px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
    };

    return (
      <div className="App">
        <div style={{color: 'whiteSmoke'}}>
          <h3>Are you a Javascript/React freak ?</h3>
          <h4>Then try this Jingo-Script game</h4>
          <h5>Standby - Camera - React-ion !!!</h5>
        </div>
        <div className='confetti-top' >
          <Confetti active={this.state.winner} config={config} />
          <Confetti active={this.state.winner} config={config} />
        </div>
        <div className="board" style={{marginRight: '45px'}}>
          {this.state.board.map(({ id, name, clicked }, index) => (
            <div
              key={id}
              className={iswinningIndex.includes(index) ? 'active' : "square"}
              style={{ backgroundColor: clicked ? 'yellow' : 'square' }}
              onClick={() => this.onClickHandler(id)} >
              <div className='displayText'>
                <span>{id + 1 + '.'}</span>
                <span >{name}</span>
              </div>
            </div>
          ))}
        </div>
           <br />
          <div className='confetti-bottom' >
            <Confetti active={this.state.winner} config={config} />
          </div>´                     
      </div>
    );
  }
}

export default App


