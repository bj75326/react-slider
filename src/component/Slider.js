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
        disabled: PropTypes.bool,
        leftText: PropTypes.any,
        rightText: PropTypes.any
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

            this.setState({dragging : true});
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
            this.setState({dragging : false});
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
        const prevValue = this.state.value;
        const value = nextProps.value !== undefined ? nextProps.value : prevValue;
        const nextValue = this.trimAlignValue(value, nextProps);

        if(nextValue === prevValue) return;

        this.setState({value: nextValue});
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

        //如果母组件状态与当前子组件不一致，触发母组件重新渲染
        if(this.props.hasOwnProperty('value') && this.props.value !== this.state.value){
            this.props.onChange(this.props.ident, this.state.value);
        }
    }

    render(){
        const {className, prefixCls, disabled, min, max, leftText, rightText} = this.props;

        const percentage = this.getThumbPosition(this.state.value, min, max);

        const dragging = !!this.state.dragging;

        const sliderClassName = classnames({
            [styles[className]]: !!className,
            [styles[prefixCls]]: true,
            [styles[`${prefixCls}-dragging`]]: dragging,
            [styles[`${prefixCls}-disabled`]]: disabled
        });

        return (
            <div className={sliderClassName}>
                {leftText !== undefined ? <div className={styles[`${prefixCls}-left`]}>{leftText}</div> : null}
                <div className={styles[`${prefixCls}-content`]} ref={this.getSlider.bind(this)}>
                    <div className={styles[`${prefixCls}-runway`]}></div>
                    <div className={styles[`${prefixCls}-progress`]} style={{width: percentage}}></div>
                    <div className={styles[`${prefixCls}-thumb`]} style={{left: percentage}}
                         onTouchStart={disabled ?  noop : this.handleTouchStart.bind(this)}
                         onTouchMove={disabled ?  noop : this.handleTouchMove.bind(this)}
                         onTouchEnd={disabled ?  noop : this.handleTouchEnd.bind(this)}
                    >
                    </div>
                </div>
                {rightText !== undefined ?  <div className={styles[`${prefixCls}-right`]}>{rightText}</div> : null}
            </div>
        );
    }
}

export default Slider;