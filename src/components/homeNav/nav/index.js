import React from 'react'
import { Menu, Icon, Layout, Button } from 'antd'
const { Header, Footer, Sider, Content } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Nav extends React.Component {
    render() {
        return (
            <div> 
                <Menu 
                    mode = "horizontal" 
                    theme = "dark"  
                >
                    <Menu.Item>主页</Menu.Item>   
                    <Menu.Item><span><Icon type="mail"/><a href="#/home">新闻</a></span></Menu.Item>  
                    <Menu.Item> <a href="#/learn">关于学习</a> </Menu.Item>
                    <Menu.Item><a href="#/it">学习编程</a></Menu.Item>   
                    <Menu.Item><a href="#/imgs">图片</a></Menu.Item> 
                    <Menu.Item><a href="#/movies">电影</a></Menu.Item> 
                    <Menu.Item><a href="#/music">音乐</a></Menu.Item> 
                    <Menu.Item><a href="#/mood">心情</a></Menu.Item> 
                    <SubMenu key="sub2" title={<span><Icon type="setting" /><span>待定四项</span></span>}>
                        <Menu.Item key="7">你是猪大</Menu.Item>
                        <Menu.Item key="8">你是猪二</Menu.Item>
                        <Menu.Item key="9">你是猪三</Menu.Item>
                        <Menu.Item key="10">你是猪四</Menu.Item>
                    </SubMenu>
                </Menu>
          </div>
        )
    }
}


export default Nav