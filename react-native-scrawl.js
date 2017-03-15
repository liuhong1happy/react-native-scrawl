/**
 * @author Holly Liu <liuhong1.happy@163.com>
 * @file react-native-scrawl index file
 * @version 0.2.0
 */

import React, { Component } from 'react';
import {
	PanResponder,
	Platform
} from 'react-native'
import {
	Svg,
	Path
} from 'react-native-svg';
/**
 * This class requires the modules :
 * {@link https://github.com/facebook/react|react} & 
 * {@link https://github.com/facebook/react-native|react-native} & 
 * {@link https://github.com/react-native-community/react-native-svg|react-native-svg}
 * @namespace
 * @class
 * @extends {Component}
 */
class Scrawl extends Component {
    /**
     * Creates an instance of Scrawl.
     * @constructs constructor
     * @param {number} props.width - width of canvas 
     * @param {number} props.height - height of canvas 
     * @param {object} props.attr - attr of the scrawl path, you can see 
     * {@link https://github.com/react-native-community/react-native-svg#common-props|react-native-svg#common-props}
     * @memberOf Scrawl
     */
	constructor(props){
		super(props);
        /**
         * state of Scrawl
         * @property {object[]} this.state.d - the paths of scrawl
         * @memberOf Scrawl
         */
		this.state = {
			d: []
		}
    }
    /**
     * componentWillMount of react lief cycle
     * @private
     * @memberOf Scrawl
     */
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


    /**
     * Handler of PanResponder
     * @private
     * @param {any} evt 
     * @param {any} gestureState 
     * @memberOf Scrawl
     */
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
    /**
     * Handler of PanResponder
     * @private
     * @param {any} evt 
     * @param {any} gestureState 
     * @memberOf Scrawl
     */
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
    /**
     * Handler of PanResponder
     * @private
     * @param {any} e 
     * @memberOf Scrawl
     */
    handleEnd(e){
        this.moving = false;
    }
    /**
     * Clear all path
     * @public
     * @memberOf Scrawl
     * @description clear this.paths & this.state.d
     */
    clear(){
        if(!this.paths) return;
        this.paths = [];
		this.setState({
			d: []
		})
    }


    /**
     * Base64 of svg
     * @callback  Base64Callback
     * @param {string} base64 Base64 Code of Image
     */
    /**
     * Get the base64 code of image.
     * @public
     * @param {Base64Callback} callback 
     * @returns react-native-svg's SVG toDataURL function return value
     * @memberOf Scrawl
     */

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


/**
 * propTypes of Scrawl
 * @static
 * @memberOf Scrawl
 */
Scrawl.propTypes = {
    width: React.PropTypes.number, 
    height: React.PropTypes.number,
    attr: React.PropTypes.object
};
/**
 * defaultProps of Scrawl
 * @static
 * @memberOf Scrawl
 */
Scrawl.defaultProps = { 
    width: 600, 
    height: 400,
    attr: { "stroke": "#000","strokeWidth": 6,"fill": "none"}
}

export default Scrawl;