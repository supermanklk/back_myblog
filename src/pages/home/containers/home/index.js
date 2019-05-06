import React from 'react'
import './index.scss';
import Dimensions from 'react-dimensions';
import axios from "axios";
import {
    Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag
  } from 'antd';
  
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  



class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            active : '1', // 默认为1 是显示未登录的, 当为2的时候显示用户的个人中心
            columns1 : [{
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },{
              title: 'Country',
              dataIndex: 'country',
              key: 'country'
            }, {
              title: 'Phone',
              dataIndex: 'phone',
              key: 'phone'
            }, {
              title: 'Email',
              dataIndex: 'email',
              key: 'email'
            }, {
              title: 'Password',
              dataIndex: 'password',
              key: 'password'
            }, {
              title: 'Id',
              dataIndex: 'id',
              key: 'id'
            }],
            data1 : [],
            columns2 : [{
              title: 'direction',
              dataIndex: 'direction',
              key: 'direction'
            },{
              title: 'chapter',
              dataIndex: 'chapter',
              key: 'chapter'
            }, {
              title: 'detail_direction',
              dataIndex: 'detail_direction',
              key: 'detail_direction'
            }, {
              title: 'movie_address',
              dataIndex: 'movie_address',
              key: 'movie_address'
            }],
            data2 : []

        }
    }

    handleClick = (e) => {
        console.log('click ', e);
    }

    componentDidMount() {
     
      let data = [];
      axios.get(`http://bin.mynatapp.cc/GP_MOVIE/public/index.php/api/v1.Graduation_User/getUserAll`)
      .then((res)=>{
          console.log(res.data);
          for(let index in res.data){
            data.push({
              name:res.data[index].name,
              country:res.data[index].country,
              id:res.data[index].hava_pay_id,
              password:res.data[index].password,
              phone:res.data[index].phone,
              email:res.data[index].email
            })
          }
          console.log(1111);
          console.log(data);
          this.setState({
            data1:data
          })
          
      })
      .catch((error)=>{
          console.log(error);
      })



      let data1 = [];
      axios.get(`http://bin.mynatapp.cc/GP_MOVIE/public/index.php/api/v1/movie`)
      .then((res)=>{
          console.log(res.data);
          for(let index in res.data){
            data1.push({
              direction:res.data[index].direction,
              chapter:res.data[index].chapter,
              detail_direction:res.data[index].detail_direction,
              movie_address:res.data[index].movie_address,
            })
          }
          console.log(2222);
          console.log(data1);
          this.setState({
            data2:data1
          })
          
      })
      .catch((error)=>{
          console.log(error);
      })
    }

    render() {
        console.log('查看视宽',this.props.containerWidth);
        console.log('查看视高',this.props.containerHeight);
        return (    
            <div className="home"> 
                <Layout>
                    <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                    </Header>
                    <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        <Table columns={this.state.columns1} dataSource={this.state.data1} />
                        <Table columns={this.state.columns2} dataSource={this.state.data2} />
                        </Content>
                    </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}


export default (Dimensions({
	getHeight : function() {
		return window.innerHeight;
	},
	geiWidth : function() {
		return window.innerWidth;
	}
})(Home));