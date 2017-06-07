//Test.js

import React, {Component} from 'react';
import Slider from './Slider.js';

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {
            slider_status_01: {value: 0}
        }
    }

    onChange(ident){

    }

    render(){
        return (
            <div className="page">
                <div className="subtitle">
                    <div className="page-back"></div>
                    <div className="page-title">React-Slider</div>
                    <div className="extension"></div>
                    <div className="desc">
                        <p>此例请用移动端查看</p>
                    </div>
                </div>
                <div className="viewport slider">
                    <h5 className="bin-cell-desc">基本用法</h5>
                    <div className="bin-cell-wrapper">
                        <a className="bin-cell">
                            <div className="bin-cell-left">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                            <div className="bin-cell-content">
                                <div className="bin-cell-title">
                                    <span className="bin-cell-text">默认</span>
                                    <span className="bin-cell-label">{"value: " + this.state.slider_status_01.value}</span>
                                </div>
                                <div className="bin-cell-value">
                                    <Slider value={this.state.slider_status_01.value} ident="slider_status_01"/>
                                </div>
                            </div>
                            <div className="bin-cell-right">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Test;