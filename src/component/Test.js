//Test.js

import React, {Component} from 'react';
import Slider from './Slider.js';

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {
            slider_status_01: {value: 0},
            slider_status_02: {value: 20},
            slider_status_03: {value: 15}
        }
    }

    onChange(ident, value){
        if(this.state.hasOwnProperty(ident)){
            this.setState({[ident]: {value: value}});
        }
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
                                    <Slider value={this.state.slider_status_01.value} ident="slider_status_01" min={0} max={100} step={1} onChange={this.onChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="bin-cell-right">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                        </a>
                        <a className="bin-cell">
                            <div className="bin-cell-left">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                            <div className="bin-cell-content">
                                <div className="bin-cell-title">
                                    <span className="bin-cell-text">初始值</span>
                                    <span className="bin-cell-label">{"value: " + this.state.slider_status_02.value}</span>
                                </div>
                                <div className="bin-cell-value">
                                    <Slider value={this.state.slider_status_02.value} ident="slider_status_02" min={0} max={100} step={1} onChange={this.onChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="bin-cell-right">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                        </a>
                        <a className="bin-cell">
                            <div className="bin-cell-left">
                                <div className="bin-cell-btnGroup"></div>
                            </div>
                            <div className="bin-cell-content">
                                <div className="bin-cell-title">
                                    <span className="bin-cell-text">左右文字</span>
                                    <span className="bin-cell-label">{"value: " + this.state.slider_status_03.value}</span>
                                </div>
                                <div className="bin-cell-value">
                                    <Slider value={this.state.slider_status_03.value} ident="slider_status_03" min={0} max={100} step={1} onChange={this.onChange.bind(this)}/>
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