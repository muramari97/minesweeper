import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, renderToolbar, Page, Button, Row, Col, Switch, Dialog} from 'react-onsenui';

import "../www/css/style.css";

export default class SecondPage extends React.Component {
  constructor(props){
    super(props);
    var f = this.makefield();
    this.state = {
      field:f,
      flag:0,
      time:9999,
      ope:false,
      dia:false,
    };
    this.intervalID = null;

    this.tick = this.tick.bind(this);
    this.getmasu = this.getmasu.bind(this);
    this.setmasu = this.setmasu.bind(this);
    this.tapmasu = this.tapmasu.bind(this);
    this.openmasu = this.openmasu.bind(this);
    this.makefield = this.makefield.bind(this);
    this.makebomb = this.makebomb.bind(this);
    this.makenumber = this.makenumber.bind(this);
    this.gameover = this.gameover.bind(this);
    this.gameclear = this.gameclear.bind(this);
    this.checkclear = this.checkclear.bind(this);
  }
  popPage() {
    this.props.scorechange(time);
    this.props.navigator.popPage();
  }

  tick(){
    var s = this.state;
    s.time++;
    this.setState(s);
  }

  makefield(){
    var field = [
      [{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],[{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}],
      [{type:10,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:0,state:0},{type:10,state:0}]
    ];
    this.makebomb(field);
    this.makenumber(field);
    return field;
  }
/*空白：0
  数字：1-8
  地雷：9
  壁：10
  開いてない：0
  開いてる：1
  旗：2
*/

  makebomb(field){
    var bomb = 0;
    do{
      var x = Math.floor(Math.random()*9)+1;
      var y = Math.floor(Math.random()*9)+1;
      if(field[y][x] != 9){
        field[y][x] = 9;
        bomb += 1;
      }
    }while(bomb < 10);
  }

  makenumber(field){
    var bomb;
    for(var y=1;y<10;y++){
      for(var x=1;x<10;x++){
        if(field[y][x] == 0){
          bomb=0;
          if(field[y-1][x-1].type == 9){
            bomb+=1;
          }
          if(field[y-1][x].type == 9){
            bomb+=1;
          }
          if(field[y-1][x+1].type == 9){
            bomb+=1;
          }
          if(field[y][x-1].type == 9){
            bomb+=1;
          }
          if(field[y][x+1].type == 9){
            bomb+=1;
          }
          if(field[y+1][x-1].type == 9){
            bomb+=1;
          }
          if(field[y+1][x].type == 9){
            bomb+=1;
          }
          if(field[y+1][x+1].type == 9){
            bomb+=1;
          }
          field[y][x].type = bomb;
        }
      }
    }
  }

  getmasu(cell){
    if(cell.state == 3){
      return 3;
    }
    if(cell.type > 0 && cell.type < 9){
      return cell.type;
    }
    if(cell.type == 9){
      return 9;
    }
    else{
      return 0;
    }
  }

  setmasu(cell){
    if(cell.state == 0){
      return "closebox";
    }
    if(cell.state == 1){
      return "openbox";
    }
  }

  tapmasu(y,x){
    if(this.intervalID == null){
      this.intervalID = setInterval(this.tick,1000);
    }
    var s = this.state;

    if(s.ope == true){
      if(s.field[y][x].state == 0){
        s.field[y][x].state = 2;
      }
      else if(s.field[y][x] == 2){
        s.field[y][x] = 0;
      }
    }

    if(s.ope == false){
      if(s.field[y][x].state == 0){
        if(s.field[y][x].type == 9){
          this.gemeover();
        }
        if(s.field[y][x].type < 0 && s.field[y][x].type > 9){
          s.field[y][x].state = 1;
        }
        if(s.field[y][x].type == 0){
          this.openmasu(this.state.field,y,x);
        }
      }
    }
    this.setState(s);

    var result = this.checkclear(s.field);
    if(result == true){
      this.gameclear();
    }
  }

  openmasu(s,y,x){
    if(s[y][x].state == 1){
      return;
    }
    if(s[y][x].type == 10){
      return;
    }
    s[y][x].state = 1;
    if(s.field[y][x].type < 0 && s.field[y][x].type > 9){
      return;
    }
    this.openmasu(s,y-1,x-1);
    this.openmasu(s,y-1,x);
    this.openmasu(s,y-1,x+1);
    this.openmasu(s,y,x-1);
    this.openmasu(s,y,x+1);
    this.openmasu(s,y+1,x-1);
    this.openmasu(s,y+1,x);
    this.openmasu(s,y+1,x+1);
  }

  checkclear(field){
    for(var y=1;y<10;y++){
      for(var x=1;x<10;x++){
        if(field[y][x].type == 9){
          if(field[y][x].state == 2){
            return false;
          }
        }
        else if(field[y][x].state == 0){
          return false;
        }
      }
    }
    return true;
  }

  gameover(){
    clearInterval(this.intervalID);
    this.intervalID = null;

    var s = this.state;
    s.dia = true;
    s.time = -1;
    this.setState(s);
  }

  gameclear(){
    clearInterval(this.intervalID);
    this.intervalID = null;

    var s = this.state;
    s.dia = true;
    this.state(s);
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  render() {
    var messe,score;
    if(this.state.time < 0){
      masse = "GAME OVER";
      score = "";
    }
    else{
      messe = "GAME CLEAR";
      score = "Time:" + this.state.time + "秒";
    }

    return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{textAlign: 'center'}}>
        </p>

        <Switch onChange={(event)=>{
            var s = this.state;
            s.ope = event.value;
            this.setState(s);}}
            checked={this.state.ope}>
          </Switch>
        <Row>
          <Col className="nullbox">{this.state.field[0][0]}</Col>
          <Col className="nullbox">{this.state.field[0][1]}</Col>
          <Col className="nullbox">{this.state.field[0][2]}</Col>
          <Col className="nullbox">{this.state.field[0][3]}</Col>
          <Col className="nullbox">{this.state.field[0][4]}</Col>
          <Col className="nullbox">{this.state.field[0][5]}</Col>
          <Col className="nullbox">{this.state.field[0][6]}</Col>
          <Col className="nullbox">{this.state.field[0][7]}</Col>
          <Col className="nullbox">{this.state.field[0][8]}</Col>
          <Col className="nullbox">{this.state.field[0][9]}</Col>
          <Col className="nullbox">{this.state.field[0][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[1][0]}</Col>
          <Col className={this.setmasu(this.state.field[1][1])} onClick={()=>this.tapmasu(1,1)}>{this.getmasu(this.state.field[1][1])}</Col>
          <Col className={this.setmasu(this.state.field[1][2])}onClick={()=>this.tapmasu(1,2)}>{this.getmasu(this.state.field[1][2])}</Col>
          <Col className={this.setmasu(this.state.field[1][3])}onClick={()=>this.tapmasu(1,3)}>{this.getmasu(this.state.field[1][3])}</Col>
          <Col className={this.setmasu(this.state.field[1][4])}onClick={()=>this.tapmasu(1,4)}>{this.getmasu(this.state.field[1][4])}</Col>
          <Col className={this.setmasu(this.state.field[1][5])}onClick={()=>this.tapmasu(1,5)}>{this.getmasu(this.state.field[1][5])}</Col>
          <Col className={this.setmasu(this.state.field[1][6])}onClick={()=>this.tapmasu(1,6)}>{this.getmasu(this.state.field[1][6])}</Col>
          <Col className={this.setmasu(this.state.field[1][7])}onClick={()=>this.tapmasu(1,7)}>{this.getmasu(this.state.field[1][7])}</Col>
          <Col className={this.setmasu(this.state.field[1][8])}onClick={()=>this.tapmasu(1,8)}>{this.getmasu(this.state.field[1][8])}</Col>
          <Col className={this.setmasu(this.state.field[1][9])}onClick={()=>this.tapmasu(1,9)}>{this.getmasu(this.state.field[1][9])}</Col>
          <Col className="nullbox">{this.state.field[1][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[2][0]}</Col>
          <Col className={this.setmasu(this.state.field[2][1])}onClick={()=>this.tapmasu(2,1)}>{this.getmasu(this.state.field[2][1])}</Col>
          <Col className={this.setmasu(this.state.field[2][2])}onClick={()=>this.tapmasu(2,2)}>{this.getmasu(this.state.field[2][2])}</Col>
          <Col className={this.setmasu(this.state.field[2][3])}onClick={()=>this.tapmasu(2,3)}>{this.getmasu(this.state.field[2][3])}</Col>
          <Col className={this.setmasu(this.state.field[2][4])}onClick={()=>this.tapmasu(2,4)}>{this.getmasu(this.state.field[2][4])}</Col>
          <Col className={this.setmasu(this.state.field[2][5])}onClick={()=>this.tapmasu(2,5)}>{this.getmasu(this.state.field[2][5])}</Col>
          <Col className={this.setmasu(this.state.field[2][6])}onClick={()=>this.tapmasu(2,6)}>{this.getmasu(this.state.field[2][6])}</Col>
          <Col className={this.setmasu(this.state.field[2][7])}onClick={()=>this.tapmasu(2,7)}>{this.getmasu(this.state.field[2][7])}</Col>
          <Col className={this.setmasu(this.state.field[2][8])}onClick={()=>this.tapmasu(2,8)}>{this.getmasu(this.state.field[2][8])}</Col>
          <Col className={this.setmasu(this.state.field[2][9])}onClick={()=>this.tapmasu(2,9)}>{this.getmasu(this.state.field[2][9])}</Col>
          <Col className="nullbox">{this.state.field[2][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[3][0]}</Col>
          <Col className={this.setmasu(this.state.field[3][1])}onClick={()=>this.tapmasu(3,1)}>{this.getmasu(this.state.field[3][1])}</Col>
          <Col className={this.setmasu(this.state.field[3][2])}onClick={()=>this.tapmasu(3,2)}>{this.getmasu(this.state.field[3][2])}</Col>
          <Col className={this.setmasu(this.state.field[3][3])}onClick={()=>this.tapmasu(3,3)}>{this.getmasu(this.state.field[3][3])}</Col>
          <Col className={this.setmasu(this.state.field[3][4])}onClick={()=>this.tapmasu(3,4)}>{this.getmasu(this.state.field[3][4])}</Col>
          <Col className={this.setmasu(this.state.field[3][5])}onClick={()=>this.tapmasu(3,5)}>{this.getmasu(this.state.field[3][5])}</Col>
          <Col className={this.setmasu(this.state.field[3][6])}onClick={()=>this.tapmasu(3,6)}>{this.getmasu(this.state.field[3][6])}</Col>
          <Col className={this.setmasu(this.state.field[3][7])}onClick={()=>this.tapmasu(3,7)}>{this.getmasu(this.state.field[3][7])}</Col>
          <Col className={this.setmasu(this.state.field[3][8])}onClick={()=>this.tapmasu(3,8)}>{this.getmasu(this.state.field[3][8])}</Col>
          <Col className={this.setmasu(this.state.field[3][9])}onClick={()=>this.tapmasu(3,9)}>{this.getmasu(this.state.field[3][9])}</Col>
          <Col className="nullbox">{this.state.field[3][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[4][0]}</Col>
          <Col className={this.setmasu(this.state.field[4][1])}onClick={()=>this.tapmasu(4,1)}>{this.getmasu(this.state.field[4][1])}</Col>
          <Col className={this.setmasu(this.state.field[4][2])}onClick={()=>this.tapmasu(4,2)}>{this.getmasu(this.state.field[4][2])}</Col>
          <Col className={this.setmasu(this.state.field[4][3])}onClick={()=>this.tapmasu(4,3)}>{this.getmasu(this.state.field[4][3])}</Col>
          <Col className={this.setmasu(this.state.field[4][4])}onClick={()=>this.tapmasu(4,4)}>{this.getmasu(this.state.field[4][4])}</Col>
          <Col className={this.setmasu(this.state.field[4][5])}onClick={()=>this.tapmasu(4,5)}>{this.getmasu(this.state.field[4][5])}</Col>
          <Col className={this.setmasu(this.state.field[4][6])}onClick={()=>this.tapmasu(4,6)}>{this.getmasu(this.state.field[4][6])}</Col>
          <Col className={this.setmasu(this.state.field[4][7])}onClick={()=>this.tapmasu(4,7)}>{this.getmasu(this.state.field[4][7])}</Col>
          <Col className={this.setmasu(this.state.field[4][8])}onClick={()=>this.tapmasu(4,8)}>{this.getmasu(this.state.field[4][8])}</Col>
          <Col className={this.setmasu(this.state.field[4][9])}onClick={()=>this.tapmasu(4,9)}>{this.getmasu(this.state.field[4][9])}</Col>
          <Col className="nullbox">{this.state.field[4][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[5][0]}</Col>
          <Col className={this.setmasu(this.state.field[5][1])}onClick={()=>this.tapmasu(5,1)}>{this.getmasu(this.state.field[5][1])}</Col>
          <Col className={this.setmasu(this.state.field[5][2])}onClick={()=>this.tapmasu(5,2)}>{this.getmasu(this.state.field[5][2])}</Col>
          <Col className={this.setmasu(this.state.field[5][3])}onClick={()=>this.tapmasu(5,3)}>{this.getmasu(this.state.field[5][3])}</Col>
          <Col className={this.setmasu(this.state.field[5][4])}onClick={()=>this.tapmasu(5,4)}>{this.getmasu(this.state.field[5][4])}</Col>
          <Col className={this.setmasu(this.state.field[5][5])}onClick={()=>this.tapmasu(5,5)}>{this.getmasu(this.state.field[5][5])}</Col>
          <Col className={this.setmasu(this.state.field[5][6])}onClick={()=>this.tapmasu(5,6)}>{this.getmasu(this.state.field[5][6])}</Col>
          <Col className={this.setmasu(this.state.field[5][7])}onClick={()=>this.tapmasu(5,7)}>{this.getmasu(this.state.field[5][7])}</Col>
          <Col className={this.setmasu(this.state.field[5][8])}onClick={()=>this.tapmasu(5,8)}>{this.getmasu(this.state.field[5][8])}</Col>
          <Col className={this.setmasu(this.state.field[5][9])}onClick={()=>this.tapmasu(5,9)}>{this.getmasu(this.state.field[5][9])}</Col>
          <Col className="nullbox">{this.state.field[5][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[6][0]}</Col>
          <Col className={this.setmasu(this.state.field[6][1])}onClick={()=>this.tapmasu(6,1)}>{this.getmasu(this.state.field[6][1])}</Col>
          <Col className={this.setmasu(this.state.field[6][2])}onClick={()=>this.tapmasu(6,2)}>{this.getmasu(this.state.field[6][2])}</Col>
          <Col className={this.setmasu(this.state.field[6][3])}onClick={()=>this.tapmasu(6,3)}>{this.getmasu(this.state.field[6][3])}</Col>
          <Col className={this.setmasu(this.state.field[6][4])}onClick={()=>this.tapmasu(6,4)}>{this.getmasu(this.state.field[6][4])}</Col>
          <Col className={this.setmasu(this.state.field[6][5])}onClick={()=>this.tapmasu(6,5)}>{this.getmasu(this.state.field[6][5])}</Col>
          <Col className={this.setmasu(this.state.field[6][6])}onClick={()=>this.tapmasu(6,6)}>{this.getmasu(this.state.field[6][6])}</Col>
          <Col className={this.setmasu(this.state.field[6][7])}onClick={()=>this.tapmasu(6,7)}>{this.getmasu(this.state.field[6][7])}</Col>
          <Col className={this.setmasu(this.state.field[6][8])}onClick={()=>this.tapmasu(6,8)}>{this.getmasu(this.state.field[6][8])}</Col>
          <Col className={this.setmasu(this.state.field[6][9])}onClick={()=>this.tapmasu(6,9)}>{this.getmasu(this.state.field[6][9])}</Col>
          <Col className="nullbox">{this.state.field[6][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[7][0]}</Col>
          <Col className={this.setmasu(this.state.field[7][1])}onClick={()=>this.tapmasu(7,1)}>{this.getmasu(this.state.field[7][1])}</Col>
          <Col className={this.setmasu(this.state.field[7][2])}onClick={()=>this.tapmasu(7,2)}>{this.getmasu(this.state.field[7][2])}</Col>
          <Col className={this.setmasu(this.state.field[7][3])}onClick={()=>this.tapmasu(7,3)}>{this.getmasu(this.state.field[7][3])}</Col>
          <Col className={this.setmasu(this.state.field[7][4])}onClick={()=>this.tapmasu(7,4)}>{this.getmasu(this.state.field[7][4])}</Col>
          <Col className={this.setmasu(this.state.field[7][5])}onClick={()=>this.tapmasu(7,5)}>{this.getmasu(this.state.field[7][5])}</Col>
          <Col className={this.setmasu(this.state.field[7][6])}onClick={()=>this.tapmasu(7,6)}>{this.getmasu(this.state.field[7][6])}</Col>
          <Col className={this.setmasu(this.state.field[7][7])}onClick={()=>this.tapmasu(7,7)}>{this.getmasu(this.state.field[7][7])}</Col>
          <Col className={this.setmasu(this.state.field[7][8])}onClick={()=>this.tapmasu(7,8)}>{this.getmasu(this.state.field[7][8])}</Col>
          <Col className={this.setmasu(this.state.field[7][9])}onClick={()=>this.tapmasu(7,9)}>{this.getmasu(this.state.field[7][9])}</Col>
          <Col className="nullbox">{this.state.field[7][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[8][0]}</Col>
          <Col className={this.setmasu(this.state.field[8][1])}onClick={()=>this.tapmasu(8,1)}>{this.getmasu(this.state.field[8][1])}</Col>
          <Col className={this.setmasu(this.state.field[8][2])}onClick={()=>this.tapmasu(8,2)}>{this.getmasu(this.state.field[8][2])}</Col>
          <Col className={this.setmasu(this.state.field[8][3])}onClick={()=>this.tapmasu(8,3)}>{this.getmasu(this.state.field[8][3])}</Col>
          <Col className={this.setmasu(this.state.field[8][4])}onClick={()=>this.tapmasu(8,4)}>{this.getmasu(this.state.field[8][4])}</Col>
          <Col className={this.setmasu(this.state.field[8][5])}onClick={()=>this.tapmasu(8,5)}>{this.getmasu(this.state.field[8][5])}</Col>
          <Col className={this.setmasu(this.state.field[8][6])}onClick={()=>this.tapmasu(8,6)}>{this.getmasu(this.state.field[8][6])}</Col>
          <Col className={this.setmasu(this.state.field[8][7])}onClick={()=>this.tapmasu(8,7)}>{this.getmasu(this.state.field[8][7])}</Col>
          <Col className={this.setmasu(this.state.field[8][8])}onClick={()=>this.tapmasu(8,8)}>{this.getmasu(this.state.field[8][8])}</Col>
          <Col className={this.setmasu(this.state.field[8][9])}onClick={()=>this.tapmasu(8,9)}>{this.getmasu(this.state.field[8][9])}</Col>
          <Col className="nullbox">{this.state.field[8][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[9][0]}</Col>
          <Col className={this.setmasu(this.state.field[9][1])}onClick={()=>this.tapmasu(9,1)}>{this.getmasu(this.state.field[9][1])}</Col>
          <Col className={this.setmasu(this.state.field[9][2])}onClick={()=>this.tapmasu(9,2)}>{this.getmasu(this.state.field[9][2])}</Col>
          <Col className={this.setmasu(this.state.field[9][3])}onClick={()=>this.tapmasu(9,3)}>{this.getmasu(this.state.field[9][3])}</Col>
          <Col className={this.setmasu(this.state.field[9][4])}onClick={()=>this.tapmasu(9,4)}>{this.getmasu(this.state.field[9][4])}</Col>
          <Col className={this.setmasu(this.state.field[9][5])}onClick={()=>this.tapmasu(9,5)}>{this.getmasu(this.state.field[9][5])}</Col>
          <Col className={this.setmasu(this.state.field[9][6])}onClick={()=>this.tapmasu(9,6)}>{this.getmasu(this.state.field[9][6])}</Col>
          <Col className={this.setmasu(this.state.field[9][7])}onClick={()=>this.tapmasu(9,7)}>{this.getmasu(this.state.field[9][7])}</Col>
          <Col className={this.setmasu(this.state.field[9][8])}onClick={()=>this.tapmasu(9,8)}>{this.getmasu(this.state.field[9][8])}</Col>
          <Col className={this.setmasu(this.state.field[9][9])}onClick={()=>this.tapmasu(9,9)}>{this.getmasu(this.state.field[9][9])}</Col>
          <Col className="nullbox">{this.state.field[9][10]}</Col>
        </Row>
        <Row>
          <Col className="nullbox">{this.state.field[10][0]}</Col>
          <Col className="nullbox">{this.state.field[10][1]}</Col>
          <Col className="nullbox">{this.state.field[10][2]}</Col>
          <Col className="nullbox">{this.state.field[10][3]}</Col>
          <Col className="nullbox">{this.state.field[10][4]}</Col>
          <Col className="nullbox">{this.state.field[10][5]}</Col>
          <Col className="nullbox">{this.state.field[10][6]}</Col>
          <Col className="nullbox">{this.state.field[10][7]}</Col>
          <Col className="nullbox">{this.state.field[10][8]}</Col>
          <Col className="nullbox">{this.state.field[10][9]}</Col>
          <Col className="nullbox">{this.state.field[10][10]}</Col>
        </Row>
        <Dialog isOpen={this.state.dia}onCancel={this.popPage.bind(this)}>
          <div>
            <h1>{messe}</h1>
            <h2>{score}</h2>
            <Button onClick={this.popPage.bind(this)}>タイトルに戻る</Button>
          </div>
        </Dialog>
      </Page>
    );
  }
}