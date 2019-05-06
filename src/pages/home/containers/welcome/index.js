import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,Layout
  } from 'antd';
import './index.scss';
import Dimensions from 'react-dimensions';
const {
    Header, Footer, Sider, Content,
  } = Layout;


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const { containerWidth, containerHeight }  = this.props;
        console.log('containerWidth',containerWidth);
        console.log('containerHeight',containerHeight);
        return(
            <div className = "welcome">
                <Layout>
                    <Header style = {{background : '#16A4FF'}}>在线视频学习系统</Header>
                    <Content className="" style = {{paddingTop : '30px', height : containerHeight - 200 - 60 + 'px'}}>
                        <div className="">
                        <Form onSubmit={this.handleSubmit}  className="login-form">
                            <Form.Item>
                           
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item>
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>记住密码</Checkbox>
                            <a className="login-form-forgot" href="">忘记密码?</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            Or <a href="">联系管理员!</a>
                            </Form.Item>
                        </Form>
                        </div>
                    </Content>
                    <Footer style = {{height : '200px', paddingBottom : '100px'}}>
                        Made with ❤ bin
                    </Footer>
                </Layout>
            </div>
        )
    }
}

export default Dimensions({
    getHeight() {
        return window.innerHeight;
    },
    getWidth() {
        return window.innerWidth - 30;
    },
})(Welcome);    