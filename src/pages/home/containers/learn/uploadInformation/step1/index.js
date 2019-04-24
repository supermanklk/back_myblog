import React from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Radio, Input, Icon } from 'antd';
import * as actions from '../action'; 
const RadioGroup = Radio.Group;
class Step1 extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            value: 1,
            userName: '',
          }
    }
 
     

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      }

 
	render() {
		return (
            <div className = "step1">
                <Radio value={1}>投简历</Radio>
                <Radio value={2}>招人</Radio>
                <div className="inline_input">
                    <div> 
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                        
                            <br/>
                                <Input  addonBefore="姓名" className = "inline_input" placeholder="请输入你的名字"/>
                                <Input  addonBefore="城市"className = "inline_input" placeholder="请输入你的城市"/>
                            <br/>
                                <Input addonBefore="邮箱" className = "inline_input" placeholder="请输入你的email"/>
                                <Input addonBefore="电话" className = "inline_input" placeholder="联系方式"/>
                        </RadioGroup>
                    </div>
                    <div>
                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                            <br/>
                                <Input  addonBefore="性别" className = "inline_input" placeholder="你的性别"/>
                                <Input  addonBefore="职位"className = "inline_input" placeholder="你期望的职位"/>
                            <br/>
                                <Input addonBefore="个人网站" className = "inline_input" placeholder="请输入你的网站"/>
                                <Input addonBefore="毕业院校" className = "inline_input" placeholder="毕业院校"/>
                        </RadioGroup>
                    </div>
                </div>
            </div>
			
		)
	}
}

const mapStateToProps = (state) => ({
    state: state.uploadInformationReducer
})
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1);