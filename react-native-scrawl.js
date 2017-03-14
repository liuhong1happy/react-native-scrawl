import React, { Component } from 'react';
import {
	PanResponder,
	Platform
} from 'react-native'
import {
	Svg,
	Path
} from 'react-native-svg';

class Scrawl extends Component {
	constructor(props){
		super(props);
		this.state = {
			d: []
		}
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => this.handleStart(evt, gestureState),
            onPanResponderMove: (evt, gestureState) => this.handleMove(evt, gestureState),
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt)=>this.handleEnd(evt),
            onPanResponderTerminate: (evt)=>this.handleEnd(evt),
            onShouldBlockNativeResponder: (evt, gestureState) => true
        });
    }
    handleStart(evt, gestureState){
		const x = Platform.OS==='ios' ? evt.nativeEvent.locationX : gestureState.x0;
		const y = Platform.OS==='ios' ? evt.nativeEvent.locationY : gestureState.y0;

        this.paths = this.paths || [];
        this.d = ["M"+x+","+y];
		this.path = {};
        this.path.attr = this.props.attr || {};
		this.path.d = this.d;
        this.moving = true;
        this.paths.push(this.path);
    }
    handleMove(evt, gestureState){
		const x = Platform.OS==='ios' ? evt.nativeEvent.locationX : gestureState.moveX;
		const y = Platform.OS==='ios' ? evt.nativeEvent.locationY : gestureState.moveY;
		const { dx, dy } = gestureState;
        if(this.moving){
            this.d.push("L"+x+","+y);
            this.path.d = this.d;
        }
        this.moving = true;
		this.setState({
			d: this.d
		})
    }
    handleEnd(e){
        this.moving = false;
    }
    clear(){
        if(!this.paths) return;
        for(let i=0;i<this.paths.length;i++){
            this.paths = [];
        }
		this.setState({
			d: []
		})
    }
	toDataURL(callback) {
		return this.refs.root.toDataURL(callback)
	}
	render(){
		this.paths = this.paths || [];
		var {width,height} = this.props;
		return (<Svg ref="root" {...this._panResponder.panHandlers} width={width} height={height} >{
			this.paths.map(function(ele,pos){
				return (<Path key={pos} {...ele.attr} d={ele.d.join("")} />)
			})
		}</Svg>)
	}
}

Scrawl.propTypes = { 
	width: React.PropTypes.number, 
	height: React.PropTypes.number,
    attr: React.PropTypes.object
};

Scrawl.defaultProps = { 
	width: 600, 
	height: 400,
    attr: { "stroke": "#000","strokeWidth": 6,"fill": "none"}
}

export default Scrawl;