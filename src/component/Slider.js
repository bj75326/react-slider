//Slider.js

import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.css';

let noop = ()=>{};

class Slider extends Component{

    constructor(props){
        super(props);

    }

    static defaultProps = {
        prefixCls: 'bin-slider',
        className: '',
        defaultValue: 0,
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

    render(){
        const {className, prefixCls, disabled, min, max, step} = this.props;

        const sliderClassName = classnames({
            [styles[className]]: !!className,
            [styles[prefixCls]]: true
        });

        return (
            <div className={sliderClassName}>
                <div className={styles[`${prefixCls}-content`]}>
                    <div className={styles[`${prefixCls}-runway`]}></div>
                    <div className={styles[`${prefixCls}-progress`]} style={{}}></div>
                    <div className={styles[`${prefixCls}-thumb`]} style={{}}></div>
                </div>
            </div>
        );
    }
}

export default Slider;