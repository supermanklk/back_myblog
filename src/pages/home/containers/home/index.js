import React from 'react'
import './index.scss';
import { hashHistory } from 'react-router'
import Dimensions from 'react-dimensions';

import axios from "axios";
import {
    Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag,Button,Modal,Input,Form
  } from 'antd';
  
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  



class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            deletePhone : '', // 将要删除的用户
            active1 : 'none', // 默认不显示用户
            active2 : '', // 默认显示课程
            active : '1', // 默认为1 是显示未登录的, 当为2的时候显示用户的个人中心
            columns1 : [{
              title: '姓名',
              dataIndex: 'name',
              key: 'name'
            },{
              title: '城市',
              dataIndex: 'country',
              key: 'country'
            }, {
              title: '账号/手机号',
              dataIndex: 'phone',
              key: 'phone'
            }, {
              title: 'Email',
              dataIndex: 'email',
              key: 'email'
            }, {
              title: '密码',
              dataIndex: 'password',
              key: 'password'
            }, {
              title: 'id',
              dataIndex: 'id',
              key: 'id'
            },{
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              render: (text, record) => (
                <span>
                  <Button onClick={() => {this.showModal1(record)} }  type="primary">删除</Button>
                  <Divider type="vertical" />
                  <Button onClick={() => { this.showModal2(record)}}  type="primary">修改</Button>
                  <Divider  type="vertical" />
                </span>
              ),
              //每一行增加删除和修改按钮  record选中行的数据
            }],
            data1 : [],
            columns2 : [{
              title: '课程名字',
              dataIndex: 'direction',
              key: 'direction'
            },{
              title: '章节',
              dataIndex: 'chapter',
              key: 'chapter'
            }, {
              title: '课程详情描述',
              dataIndex: 'detail_direction',
              key: 'detail_direction'
            }, {
              title: '课程地址',
              dataIndex: 'movie_address',
              key: 'movie_address'
            },{
              title: '操作',
              dataIndex: 'action',
              key: 'action',
              render: (text, record) => (
                <span>
                  <Button onClick={() => {this.showModal3(record)} }  type="primary">删除</Button>
                  <Divider type="vertical" />
                  <Button onClick={() => { this.showModal4(record)}}  type="primary">修改</Button>
                  <Divider  type="vertical" />
                  <Button onClick={() => { this.showModal5()}}  type="primary">添加</Button>
                  <Divider  type="vertical" />
                </span>
              ),
              //每一行增加删除和修改按钮  record选中行的数据
            }],
            data2 : [],

            visible1 : false,// 弹出框  这个是修改的弹出框
            visible2 : false,//这个是删除的弹出框
            visible3 : false,
            visible4 : false,
            visible5 : false,  //添加课程的弹出框
            List:[],  // 表单1内选择列的值
            List2:[],  //另一个表单

        }
    }


    handleCancel = (e) => {   //关闭弹出框按钮
      console.log(e);
      this.setState({
        visible1 : false,
        visible2 : false,
        visible3 : false,
        visible4 : false,
        visible5 : false,
      });
  }

  showModal1 = (list) => {  //第一个弹出框的控制
    let phone = list.phone;
      this.setState({
          visible1 : true,
          visible2 : false,
          visible3 : false,
          visible4 : false,
          visible5 : false,
          List:list ,
          deletePhone : phone

      });
    }

    showModal2 = (list) => {  //第二个弹出框的控制
      this.setState({
          visible1 : false,
          visible2 : true,
          visible3 : false,
          visible4 : false,
          visible5 : false,
          List:list
      });
    }
    showModal3 = (list) => {  //第二个弹出框的控制
      this.setState({
          visible1 : false,
          visible2 : false,
          visible3 : true,
          visible4 : false,
          visible5 : false,
          List2:list
      });
    }
    showModal4 = (list) => {  //第二个弹出框的控制
      this.setState({
          visible1 : false,
          visible2 : false,
          visible3 : false,
          visible4 : true,
          visible5 : false,
          List2:list
      });
    }
    showModal5 = () => {  //第二个弹出框的控制
      this.setState({
          visible1 : false,
          visible2 : false,
          visible3 : false,
          visible4 : false,
          visible5 : true,
      });
    }

    delUser = (user) =>{  //删除用户
      axios.get(`http://bin.mynatapp.cc/GP_MOVIE/public/index.php/api/v1.Graduation_User/deleteUserInfo?phone=17637794444/${user}`)
      .then((res)=>{
          console.log(res);
          })
      .catch((error)=>{
          console.log(error);
      })
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


    getUserAll = () => {
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
          this.setState({
            data1:data
          })
          
      })
      .catch((error)=>{
          console.log(error);
      })
    }

    componentDidMount() {
      // 首先去检查用户是否为非法登录
      if(!localStorage.getItem('account')) {
        // 说明用户没有登录,则跳转到登录页面
        hashHistory.push({
          pathname: '/welcome',
        });
      }
     
     this.getUserAll();



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
          this.setState({
            data2:data1
          })
          
      })
      .catch((error)=>{
          console.log(error);
      })
    }

    deleteUser = () => {
      // 请求接口 传递phone  删除用户 并更新数据
      axios.get(`http://bin.mynatapp.cc/GP_MOVIE/public/index.php/api/v1.Graduation_User/deleteUserInfo?phone=${this.state.deletePhone}`)
      .then((res) => {
        if(res['data']['code'] == 200) {
          // 说明删除成功
          // 隐藏
          this.setState({
            visible1 : false
          },() => {
            // 更新数据
            this.getUserAll();
          })
        } else {
          // 用户不存在
        }
        
      })
      .catch((error) => {

      })
    }
 
    outUser = () => {
      // 退出管理后台
      // 清除缓存
      sessionStorage.clear(); 
      hashHistory.push({
        pathname: '/welcome',
      });
    }

    render() {
        console.log('查看视宽',this.props.containerWidth);
        console.log('查看视高',this.props.containerHeight);
        return (    
            <div className="home">
            <div className="layer1"> {/* 删除的弹出框 */}
              {/* 用户删除的弹窗 */}
              <Modal
                        title="删除"
                        visible={this.state.visible1}
                        onCancel={this.handleCancel}
                        closable="true"
                        footer={null}
                      >
                      <div style={{overflow:"hidden"}}>
                      <Button style={{float:"right",marginTop:"20px"}}  onClick = {this.deleteUser} type="primary" shape="round"  size="large">确认删除</Button>

                      </div>
              </Modal>
              </div>
              <div className="layer2"> {/* 修改的弹出框 */}
              {/* 用户修改的弹窗 */}
              <Modal
                        title="修改用户信息"
                        visible={this.state.visible2}
                        onCancel={this.handleCancel}
                        closable="true"
                        footer={null}
                      >
                      <Form>
                        <Form.Item
                          label="name"
                        >
                        <Input value={this.state.List.name} />
                        </Form.Item>
                        <Form.Item
                          label="Country"
                        >
                        <Input value={this.state.List.country} />
                        </Form.Item>
                        <Form.Item
                          label="Phone"
                        >
                        <Input value={this.state.List.phone} />
                        </Form.Item>
                        <Form.Item
                          label="Emai"
                        >
                        <Input value={this.state.List.email} />
                        </Form.Item>
                        <Form.Item
                          label="Password"
                        >
                        <Input value={this.state.List.password} />
                        </Form.Item>
                      
                      </Form>
                      <div style={{overflow:"hidden"}}>
                      <Button style={{float:"right",marginTop:"20px"}} type="primary" shape="round"  size="large">确认修改</Button>
                      </div>
              </Modal>
            </div>
            {/* 第二个数据表格*/}
            <div className="layer3"> {/* 删除的弹出框 */}
              {/* 课程删除的弹窗 */}
              <Modal
                        title="删除"
                        visible={this.state.visible3}
                        onCancel={this.handleCancel}
                        closable="true"
                        footer={null}
                      >
                     <Input value={this.state.List2.courseID} />
                      <div style={{overflow:"hidden"}}>
                      <Button style={{float:"right",marginTop:"20px"}} type="primary" shape="round"  size="large">确认删除</Button>
                      </div>
              </Modal>
              </div>
              <div className="layer2"> {/* 修改的弹出框 */}
              {/* 课程的修改弹窗 */}
              <Modal
                        title="修改数据"
                        visible={this.state.visible4}
                        onCancel={this.handleCancel}
                        closable="true"
                        footer={null}
                      >
                      <Form>
                        <Form.Item
                          label="课程名字"
                        >
                        <Input value={this.state.List2.direction} />
                        </Form.Item>
                        <Form.Item
                          label="章节"
                        >
                        <Input value={this.state.List2.chapter} />
                        </Form.Item>
                        <Form.Item
                          label="详细描述"
                        >
                        <Input value={this.state.List2.detail_direction} />
                        </Form.Item>
                        <Form.Item
                          label="课程地址"
                        >
                        <Input value={decodeURIComponent(this.state.List2.movie_address)} />
                        </Form.Item>
                      
                      </Form>
                      <div style={{overflow:"hidden"}}>
                      <Button style={{float:"right",marginTop:"20px"}} type="primary" shape="round"  size="large">确认修改</Button>
                      </div>
              </Modal>
            </div> 
            <div className="layer5"> {/* 添加课程的弹出框*/}
              <Modal
                        title="添加"
                        visible={this.state.visible5}
                        onCancel={this.handleCancel}
                        closable="true"
                        footer={null}
                      >
                      <Form>
                        <Form.Item
                          label="level"
                        >
                        <Input name='level' />
                        </Form.Item>
                        <Form.Item
                          label="courseID"
                        >
                        <Input name='courseID' />
                        </Form.Item>
                        <Form.Item
                          label='direction'
                        >
                        <Input name='direction' />
                        </Form.Item>
                        <Form.Item
                          label="price"
                        >
                        <Input name='price' />
                        </Form.Item>
                        <Form.Item
                          label="chapter"
                        >
                        <Input name='chapter' />
                        </Form.Item>
                        <Form.Item
                          label='position'
                        >
                        <Input name='position' />
                        </Form.Item>
                        <Form.Item
                          label='movie_address'
                        >
                        <Input name='movie_address' />
                        </Form.Item>
                        <Form.Item
                          label='is_main'
                        >
                        <Input name='is_main' />
                        </Form.Item>
                        <Form.Item
                          label='img_url'
                        >
                        <Input name='img_url' />
                        </Form.Item>
                        <Form.Item
                          label='detail_direction'
                        >
                        <Input name='detail_direction' />
                        </Form.Item>
                        <Form.Item
                          label='chapter_num'
                        >
                        <Input name='chapter_num' />
                        </Form.Item>
                      
                      </Form>
                      <div style={{overflow:"hidden"}}>
                      <Button style={{float:"right",marginTop:"20px"}} type="primary" shape="round"  size="large">确认添加</Button>
                      </div>
              </Modal>
            </div>  
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
                        <Menu.Item key="2" onClick = {this.outUser}>退出</Menu.Item>
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
                        <Table style = {{display : this.state.active2}} columns={this.state.columns2} dataSource={this.state.data2} scroll={{ x: 1300 }} />
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