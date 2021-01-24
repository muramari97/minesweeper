import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, Page, Button} from 'react-onsenui';

import SecondPage from './SecondPage'

export default class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {highscore:9999};
  }
  pushPage() {
    this.props.navigator.pushPage({component: SecondPage,props:{scorechange:this.scorechange}});
  }

  scorechange(time){
    var highscore = this.state;
    if(time < highscore){
      state.highscore = time;
    }
    this.setState(state);
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{textAlign: 'center'}}>
          <h1>Minesweeper</h1>
          <h3>High Score:{this.state.highscore}</h3>
          <Button onClick={this.pushPage.bind(this)}>START</Button>
        </p>
      </Page>
    );
  }
}