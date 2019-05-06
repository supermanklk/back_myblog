import React from 'react';
import { Layout } from 'antd';
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
        return(
            <div>
                <Layout>
                    <Header>在线视频学习系统</Header>
                    <Content>
                        
                    </Content>
                    <Footer>2019/4/18</Footer>
                </Layout>
            </div>
        )
    }
}


export default Welcome;