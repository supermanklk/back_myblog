import React from 'react'
import './index.scss';
import Dimensions from 'react-dimensions';
import axios from "axios";
import {
    Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag, Switch
  } from 'antd';
  
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  



class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            active1 : 'none', // 默认不显示用户
            active2 : '', // 默认显示课程
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
            },{
              title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>,
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
            },
            {
              title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>,
            }
            ],
            data2 : []

        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        switch (e.key) {
          case 'sub1':
            // 点击了课程
            this.setState({
              active1 : 'none',
              active2 : '',
            })
            break;
          case 'sub2':
            this.setState({
              active1 : '',
              active2 : 'none',
            })
            // 点击了用户
            break;
          case 'sub3':
            this.setState({
              active1 : 'none',
              active2 : 'none',
            })
            // 点击了权限
            break;
          default:
            break;
        }
    }

    componentDidMount() {
     
      let data = [];
      axios.get(`http://bin.mynatapp.cc/GP_MOVIE/public/index.php/api/v1.Graduation_User/getUserAll`)
      .then((res)=>{
          console.log(res.data);
          for(let index in res.data){
            const {name, country, hava_pay_id, password, phone, email} = res.data[index];
            data.push({
              name,
              country,
              hava_pay_id,
              password,
              phone,
              email
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
                        <Menu.Item key="1">主页</Menu.Item>
                        {/* <Menu.Item key="2">nav 2</Menu.Item> */}
                        {/* <Menu.Item key="3">nav 3</Menu.Item> */}
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
                        <SubMenu onTitleClick = {this.handleClick} key="sub1" title={<span><Icon type="user" />课程管理</span>}>
                            <Menu.Item key="1">前端课程</Menu.Item>
                            <Menu.Item key="2">后端课程</Menu.Item>
                            <Menu.Item key="3">全栈课程</Menu.Item>
                        </SubMenu>
                        <SubMenu onTitleClick = {this.handleClick} key="sub2" title={<span><Icon type="laptop" />用户管理</span>}>
                            <Menu.Item key="5">前端人员</Menu.Item>
                            <Menu.Item key="6">后端用户</Menu.Item>
                            <Menu.Item key="7">综合用户</Menu.Item>
                        </SubMenu>
                        <SubMenu onTitleClick = {this.handleClick} key="sub3" title={<span><Icon type="notification" />权限授权</span>}>
                            <Menu.Item key="9">修改权限</Menu.Item>
                        </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Make</Breadcrumb.Item>
                        <Breadcrumb.Item>With</Breadcrumb.Item>
                        <Breadcrumb.Item>Bin</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                        {/* 用户 */}
                        <Table style = {{display : this.state.active1}} columns={this.state.columns1} dataSource={this.state.data1} />
                        {/* 课程 */}
                        <Table style = {{display : this.state.active2}} columns={this.state.columns2} dataSource={this.state.data2} />
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