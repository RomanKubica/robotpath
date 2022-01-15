import React from 'react';
import TestUpdate from './testupdate';

export default class RobotPath extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          size: props.size,
          x: '',
          y: '',
          prevX:'',
          prevY:'',
          prevDirection:'',
          direction: '',
          path: '',
          room: this.generateRoom(props.size),
        };
      }

      componentDidMount() {
        // console.log(this.state.size)
        // console.log(this.state.room);
     }

     // end position is calculated on the backend. We receive it and update FE
      handleSubmit = async e => {
        e.preventDefault();
        // console.log(this.state);
        const response = await fetch('/getPath', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ path: this.state.path, size: this.state.size, x: this.state.x, y:this.state.y, direction: this.state.direction }),
        });
        const body = await response.json();

        this.setState({ 
            prevX: this.state.x,
            prevY: this.state.y,
            prevDirection: this.state.direction,
        });
        //TODO check if body and robot exists
        this.setState({ 
            x: body.robotPosition[0].newX,
            y: body.robotPosition[0].newY,
            direction: body.robotPosition[0].newD,
        });

        this.displayRobot(body.robotPosition[0].newD);
      };
      
      // removes previos position of robot and sets new the position in the room
      displayRobot(currentDirection){
        //if exists
        let room = [...this.state.room];
        if (this.state.prevX !== '' && this.state.prevX > -1 && this.state.prevY !== '' && this.state.prevY > -1) {
            let prevPosition = {...room[this.state.prevY][this.state.prevX]};
            prevPosition = "";
            room[this.state.prevY][this.state.prevX] = prevPosition;
        }
        
        // new position
        room = [...this.state.room];
        //switched i j for display x y
        let position = {...room[this.state.y][this.state.x]};
        position = currentDirection;
        //switched i j for display x y
        room[this.state.y][this.state.x] = position;
        this.setState({room});
      }

      // on direction update display also robot
      handleDirectionOnChange = e => {
        //TODO extend x y to update robot too
        const inputDirection = e.target.value;
        this.setState({
          direction: inputDirection
        });

        this.displayRobot(inputDirection);
      };

      // this.state.room 2d array
      generateRoom = (size) => {
        let room = [];
        for (let i = 0; i < size; i++) {
          let rows = [];
          for (let j = 0; j < size; j++) {
            rows.push(
                null
            );
          }
          room.push(rows);
        }
        return room;
      };

      // generate HTML room
      displayForm() { 
        let divs = []
        for (let i = 0; i < this.state.size; i++) {
            let rows = [];
            for (let j = 0; j < this.state.size; j++) {
              rows.push(
                <div key={'tile-'+i+'-'+j} className="tile" >{this.state.room[i][j]}</div>
              );
            }
            divs.push(<div key={'row-'+i} className="row">{rows}</div>);
          }
          return divs;
       }

      render() {
        let condition = (this.state.x > -1 && this.state.y > -1 && this.state.direction !== '' );
        return (
            <div className="wrapper">
                <form onSubmit={this.handleSubmit}>
                <TestUpdate val={this.state.x}/>
                    <label>
                        Room size:
                        <input
                            type="text"
                            value={this.state.size}
                            disabled={true}
                        />
                    </label>
                    <label>
                        Start X:
                        <input
                            type="text"
                            value={this.state.x}
                            onChange={e => this.setState({ x: e.target.value })}
                        />
                    </label>
                    <label>
                        Start Y:
                        <input
                            type="text"
                            value={this.state.y}
                            onChange={e => this.setState({ y: e.target.value })}
                        />
                    </label>
                    <label>
                        Direction:
                        <input
                            type="text"
                            value={this.state.direction}
                            onChange={this.handleDirectionOnChange}
                        />
                    </label>
                    {condition ? 
                    <React.Fragment>
                        <label>
                            Path:
                            <input
                            type="text"
                            value={this.state.path}
                            onChange={e => this.setState({ path: e.target.value })}
                            />
                        </label>
                        <button type="submit">Calculate path</button> 
                    </React.Fragment>
                :
                <div>Enter data first</div>
                    }
                </form>
                {   <div style={{width: this.state.size*40 + 10}} className="room">{this.displayForm()} </div> }                
            </div>
        );
      }
}
