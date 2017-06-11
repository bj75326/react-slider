//Slider.js

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.css';

let noop = ()=>{};
let isTouched = false;
let startX, thumbStartX;
let refPointX;

class Slider extends Component{

    constructor(props){
        super(props);

        const defaultValue = props.defaultValue === undefined ? props.min : props.defaultValue;
        const value = props.value === undefined ? defaultValue : props.value;

        this.state = {
            value: this.trimAlignValue(value),
            dragging: false
        };
        //console.log(this.state);
    }

    static defaultProps = {
        prefixCls: 'bin-slider',
        className: '',
        //defaultValue: 0,
        ident: '',
        onChange: noop,
        min: 0,
        max: 100,
        step: 1,
        disabled: false
    };

    static PropTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.number,
        ident: PropTypes.require,
        onChange: PropTypes.func,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        disabled: PropTypes.bool
    };

    trimAlignValue(value, nextProps={}){
        const mergedProps = {...this.props, ...nextProps};
        const val = this.ensureValueInRange(value, mergedProps);
        return this.ensureValuePrecision(val, mergedProps);
    }

    ensureValueInRange(value, {min, max}){
        if(value < min){
            return min;
        }
        if(value > max){
            return max;
        }
        return value;
    }

    ensureValuePrecision(value, props){
        //小数情况暂时简单处理
        return this.getClosestPoint(value, props);
    }

    getClosestPoint(value, {step, min}){
        const val = Math.round((value - min)/step) * step + min;
        return val;
    }

    handleTouchStart(e){
        if(!isTouched){
            isTouched = true;
            e.preventDefault();

            let touch = e.touches[0];
            startX = touch.clientX;
            let thumb = e.target;
            thumbStartX = thumb.getBoundingClientRect().left;
            refPointX = this.sliderRef.getBoundingClientRect().left;
        }
    }

    handleTouchMove(e){
        if(isTouched){
            let touch = e.touches[0];
            //let thumb = e.target;
            let deltaX = touch.clientX - startX;
            const min = this.props.min;
            const max = this.props.max;
            const step = this.props.step;

            let value = Math.round((thumbStartX + deltaX - refPointX) / (this.sliderOverallLength/((max-min)/step))) * step + min;
            console.log(value);
            //this.setState({value: this.trimAlignValue(value)});
            this.props.onChange(this.props.ident, this.trimAlignValue(value));
        }
    }

    handleTouchEnd(e){
        if(isTouched){
            isTouched = false;
        }
    }

    getSlider(slider){
        this.sliderRef = slider;
        console.log(this.sliderRef);
    }

    getThumbPosition(val, min, max){
        let percentage = (val-min) / (max-min) * 100;
        return percentage + '%';
    }

    componentWillReceiveProps(nextProps){
        if('value' in nextProps){
            this.setState({
                value: nextProps.value
            });
        }
    }

    componentDidMount(){
        //componentDidMount 在 DOMContentLoaded 之前执行
        //componentDidMount 可以用来处理异步数据获取的操作 并可以setState触发重新渲染

        //模拟ready
        const onDOMContentLoaded = ()=>{
            document.removeEventListener('DOMConentLoaded', onDOMContentLoaded, false);
            this.sliderOverallLength = this.sliderRef.clientWidth;
        };

        document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);
    }

    render(){
        console.log('render run');
        const {className, prefixCls, disabled, min, max, step} = this.props;

        const percentage = this.getThumbPosition(this.state.value, min, max);

        const sliderClassName = classnames({
            [styles[className]]: !!className,
            [styles[prefixCls]]: true
        });

        return (
            <div className={sliderClassName}>
                <div className={styles[`${prefixCls}-content`]} ref={this.getSlider.bind(this)}>
                    <div className={styles[`${prefixCls}-runway`]}></div>
                    <div className={styles[`${prefixCls}-progress`]} style={{width: percentage}}></div>
                    <div className={styles[`${prefixCls}-thumb`]} style={{left: percentage}}
                         onTouchStart={this.handleTouchStart.bind(this)}
                         onTouchMove={this.handleTouchMove.bind(this)}
                         onTouchEnd={this.handleTouchEnd.bind(this)}
                    >
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider;