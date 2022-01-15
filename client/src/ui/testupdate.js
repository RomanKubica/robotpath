import React from 'react';

export default class TestUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          val: props.val,
        };
      }

      componentDidMount() {
        // console.log(this.state.size)
        // console.log(this.state.room);
     }

     componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
          this.setState({
            val: nextProps.val
          });
        }
      }

          
     render() {
        return (
            <div className="testupdate">
                TEstupdate <input 
                type="text"
                value={this.state.val}
                />
            </div>
        );
      }
}
