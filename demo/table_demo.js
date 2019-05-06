import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Column, Cell } from 'fixed-data-table-2';
import TradeDialog from 'components/tradeDialog/index.js';
import {
    Switch, Input, Tab, Pagination, Select, Button, Dialog,
} from 'qnui';
import { api, nameSpace, isEmpty } from 'utils/index';
import MsgToast from 'public/components/msgToast/index';
import Dimensions from 'react-dimensions';

const TabPane = Tab.TabPane;

/**
 * @description 返现状态
 * @author      Bin
 * @date        2018-12-05
 * @class       SmallTools
 * @extends     {React.Component}
 */
class ReturnMoney extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dbcrm: [], // item
            dbteade: [], // trade
            page: 0, // 默认是1
            selectKind: 'item', // 默认是商品
            aliName: '', // 支付宝姓名,
            visible: false, // 删除记录的弹窗
            deleteId: '', // 删除记录的id
            deleteName: '', // 删除记录的支付宝姓名
            visibleState: false, // 切换状态二次确认弹窗
            prevalue: '', // 切换之前的状态
            changeState: '', // 将要切换的状态
            changeID: '', // 切换的id
            changeStateName: '', // 切换人的姓名(用户名)
            showImportDialog: false, // 导入excel弹窗的显隐
            selectFileName: '', // 选择的文件名
            canIsClick: true, // 防止在回调之前多次点击确定
        };
        this.click = this.click.bind(this); // 点击起飞触发
        this.onChange = this.onChange.bind(this); // 商品/交易切换触发
        this.onchangeAliName = this.onchangeAliName.bind(this); // 阿里姓名改变触发
        this.change = this.change.bind(this); // 翻页触发的
        this.onChangeStatus = this.onChangeStatus.bind(this); // 返现状态过滤
        this.findItem = 0; // 查询,默认为0;
    }


    /**
     * @description 页面初始化,加载商品的数据
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    componentDidMount() {
        api({
            method: '/Wangwang/getUserAlipayAccount',
            args: {
                planet: 'item',
            },
            isloading: true,
            mode: 'json',
            callback: (json) => {
                this.setState({
                    dbcrm: json.dbcrm,
                    dbteade: json.dbteade,
                });
            },
        });
    }

    /**
     * @description 删除记录
     * @author      Bin
     * @date        2018-12-07
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    delectRecord(id, name) {
        this.setState({
            visible: true,
            deleteId: id,
            deleteName: name,
        });
    }

    /**
     * @description 删除记录 弹窗 关闭
     * @author      Bin
     * @date        2018-12-07
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    onCloseDelete = () => {
        this.setState({
            visible: false,
        });
    };


    /**
     * @description 删除记录 弹窗 确定
     * @author      Bin
     * @date        2018-12-07
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    onClickDelete = () => {
        /* 请求删除的api */
        api({
            method: '/Wangwang/deletePaybackStatus',
            args: {
                planet: this.state.selectKind,
                userRowId: this.state.deleteId,
            },
            isloading: true,
            mode: 'json',
            callback: (json) => {
                /* 如果成功,则刷新数据 */
                this.getData(this.state.selectKind);
                /* 关闭弹窗 */
                this.onCloseDelete();
            },
        });
    };


    /**
     * @description 分页器触发
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    change(value) {
        this.setState({
            page: value - 1,
        });
    }


    /**
     * @description 商品/交易切换触发
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    onChange(value) {
        /* 如果切换后与现在一样,则不变化 */
        if (this.state.selectKind == value) {
            MsgToast('error', `已经是${value == 'item' ? '商品' : '交易'}`, 2000);
        } else {
        /* 请求新的数据 */
            api({
                method: '/Wangwang/getUserAlipayAccount',
                args: {
                    planet: value,
                },
                isloading: true,
                mode: 'json',
                callback: (json) => {
                    this.setState({
                        dbcrm: json.dbcrm,
                        dbteade: json.dbteade,
                        selectKind: value,
                    });
                },
            });
        }
    }


    /**
     * @description 更新数据源
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    getData(type) {
        api({
            method: '/Wangwang/getUserAlipayAccount',
            args: {
                planet: type,
            },
            isloading: true,
            mode: 'json',
            callback: (json) => {
                this.setState({
                    /* 其实dbteade没用,数据返回都是在dbcrm */
                    dbcrm: json.dbcrm,
                    dbteade: json.dbteade,
                    selectKind: type,
                });
            },
        });
    }


    /**
     * @description 返现状态的过滤
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    onChangeStatus(value) {
        switch (value) {
        /* 全部状态 */
        case 'all':
            this.getData(this.state.selectKind);
            break;
            /* 已返现 */
        case 'yes':
            const newListyes = this.state.dbcrm.filter(item => item.status == 2);
            this.setState({
                dbcrm: newListyes,
            });
            break;
            /* 未返现 */
        case 'no':
            const newListno = this.state.dbcrm.filter(item => item.status == 0);
            this.setState({
                dbcrm: newListno,
            });
            break;
            /* 待返现 */
        case 'wait':
            const newListwait = this.state.dbcrm.filter(item => item.status == 1);
            this.setState({
                dbcrm: newListwait,
            });
            break;
        default:
            break;
        }
    }

    /**
     * @description 点击起飞触发
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    click() {
        const type = this.state.selectKind;
        /* 优化,当数据为 1 ,在搜索时候, 增强用户体验度 否则它会在只有一条数据内进行检索 */
        /* 设置为10 当数据少于5 重新请求, 之前只是查询一个用户的一条数据,现在为了防止同一个用户走漏洞,因此把所有数据展示出来,基本上用户不会超过5次.但是测试号知道就行. */
        if (this.state.dbcrm.length < 5 && this.state.aliName != '') {
            api({
                method: '/Wangwang/getUserAlipayAccount',
                args: {
                    planet: type,
                },
                isloading: true,
                mode: 'json',
                callback: (json) => {
                    this.setState({
                        /* 其实dbteade没用,数据返回都是在dbcrm */
                        dbcrm: json.dbcrm,
                        dbteade: json.dbteade,
                        selectKind: type,
                    }, this.click);
                },
            });
        } else {
            const aliName = this.state.aliName.trim(); // 输入的搜索
            const dbcrm = this.state.dbcrm; // 信息
            /* 点击起飞,首先要确定输入了支付宝的姓名,如果没有输入则检索的是商品或者交易 根据selectKind */
            if (isEmpty(this.state.aliName)) {
                this.getData(this.state.selectKind);
            } else {
                /* 目前是根据先前一次性返回的数据进行检索的,因此紧急上线,下一次的pro应写一个专门的接口来应对 */
                const crmArr = [];
                for (let i = 0; i < this.state.dbcrm.length; i++) {
                    /* 判断用户昵称 或者 支付宝账号  seller_alipay_account为支付宝账号 */
                    /* 这里加trim,原因是字符串有的前后有空格 */
                    const seller_nick = isEmpty(dbcrm[i].seller_nick) ? '' : dbcrm[i].seller_nick; // 防止为 null trim会出错
                    const seller_alipay_account = isEmpty(dbcrm[i].seller_alipay_account) ? '' : dbcrm[i].seller_alipay_account; // 防止为 null trim会出错
                    if ((aliName == seller_nick.trim()) || (aliName == seller_alipay_account.trim())) {
                        /* 查看存在的条数 */
                        this.findItem = this.findItem + 1;
                        crmArr.push(this.state.dbcrm[i]);
                    }
                }
                /* 信息不存在,弹窗 存在需恢复为0 */
                if (this.findItem == 0) {
                    MsgToast('error', '不存在', 2000);
                } else {
                    this.setState({
                        dbcrm: crmArr,
                        selectKind: this.state.selectKind == 'item' ? 'item' : 'trade',
                    });
                    this.findItem = 0;
                }
            }
        }
    }


    /**
     * @description     切换用户的状态
     * @author          Bin
     * @date            2018-12-06
     * @memberof        ReturnMoney
     * @value 0,1,2     0 未返现   1 待返现  2 已返现
     */
    changeStatus(prevalue, name, value, id) {
        this.setState({
            visibleState: true, // 切换状态的弹窗
            changeStateName: name, // 切换状态用户的名字
            changeState: value, // 将要切换的状态
            prevalue, // 切换之前的状态
            changeID: id, // 切换人的id
        });
    }

    /**
     * @description 阿里姓名改变触发
     * @author      Bin
     * @date        2018-12-05
     * @param       {*} value
     * @memberof    ReturnMoney
     */
    onchangeAliName(value) {
        this.setState({
            aliName: value,
        });
    }


    /**
     * @description     关闭切换状态的弹窗触发的函数
     * @author          Bin
     * @date            2018-12-21
     * @returns
     * @memberof        ReturnMoney
     */
    onCloseState = () => {
        this.setState({
            visibleState: false,
        });
    }

    /**
     * @description         确定切换状态
     * @author              Bin
     * @date                2018-12-21
     * @returns
     * @memberof            ReturnMoney
     */

    reallChangeState = () => {
        const prePage = this.state.page;
        const { selectKind, changeState, changeID } = this.state;
        api({
            method: '/Wangwang/modifyPaybackStatus',
            args: {
                planet: selectKind,
                status: changeState,
                userRowId: changeID,
            },
            isloading: true,
            mode: 'json',
            callback: (json) => {
                this.getData(this.state.selectKind);// 刷新数据
                this.onCloseState(); // 关闭弹窗
            },
        });
    }


    /**
     * @description 上传CSV以后,查看返现情况
     * @memberof    ReturnMoney
     */
    popupConfirm = (json) => {
        this.setState({
            showImportDialog: false,
        });
        Dialog.confirm({
            content: `操作人数:${json.peopleNum},成功人数:${json.successNum},失败原因:${json.err}`,
        });
    };


    /**
     * @description         导入文件 >> 弹窗 >> 隐藏弹窗
     * @author              Bin
     * @date                2018-12-22
     * @returns
     * @memberof            ReturnMoney
     */

    onCloseImportModal = () => {
        this.setState({
            showImportDialog: false,
        });
    }

    /**
     * @description         导入文件 >> 弹窗 >> 确定触发 (需要判断文件的类型是否正确)
     * @author              Bin
     * @date                2018-12-22
     * @returns
     * @memberof            ReturnMoney
     */

    reallImport = () => {
        const self = this;
        // 非空判断
        if (this.selectFileInput.files.length == 0) {
            MsgToast('error', '请选择文件！', 1000);
            return;
        }
        const file = this.selectFileInput.files[0];
        const selectFileName = this.selectFileInput.files[0].name;
        // 文件格式判断
        if (!/\.(csv|CSV)/.test(selectFileName)) {
            MsgToast('error', '请选择csv格式的文件！', 2000);
        } else {
            const reader = new FileReader();
            reader.readAsText(file, 'utf-8');
            // 注：onload是异步函数，此处需独立处理
            reader.onload = function (e) {
                let str = e.target.result;
                if (str.indexOf('&,,,,,,,,') > 1) {
                    /* 第一个正则去掉空格 第二个正则去掉多余的 " */
                    str = str.replace(/\s+/g, '').replace(/\"/g, '').split(',&,,,,,,,,');
                    str.shift();
                    if (str[str.length - 1] == '') {
                        str.pop();
                    }
                } else if (str.indexOf(',&') > 1) {
                    str = str.replace(/\s+/g, '').replace(/\"/g, '').split('&');
                    str.shift();
                    if (str[str.length - 1] == '') {
                        str.pop();
                    }
                } else if (str.indexOf(',,,,,,,,,') > 1) {
                    str = str.replace(/\s+/g, '').split(',,,,,,,,,');
                    str.shift();
                } else {
                    console.error('格式错误', str);
                }
                // 用户点击确定以后,置灰,防止多次点击,回调成功后恢复
                self.setState({
                    canIsClick: false,
                });
                api({
                    method: '/Wangwang/uploadCSVData',
                    // host : '//crm.yhq.aiyongbao.com', 留着,记住要配置 conf/因为返现接口需要引入
                    args: {
                        data: str,
                    },
                    isloading: true,
                    mode: 'json',
                    callback: (json) => {
                        self.setState({
                            canIsClick: true,
                        });
                        if (json.code == 200) {
                            /* 成功处理以后,返回处理信息以弹窗形式 */
                            self.popupConfirm(json);
                        } else if (json.code == 403) {
                            MsgToast('error', '权限不够', 2000);
                        } else {
                            MsgToast('error', json.message, 2000);
                        }
                    },
                });
            };
        }
    }

    render() {
        /* 数据要被处理,因此用newDcrm接收处理过后的数据 */
        let newDcrm = [];
        if (isEmpty(this.state.dbcrm.length)) {
            newDcrm = this.state.dbteade.slice(this.state.page * 10, this.state.page * 10 + 10);
        } else if (this.state.dbcrm.length == 1) {
            newDcrm = this.state.dbcrm;
        } else {
        /* this.state.page = 0 的时候, 其实就是第一页的数据 每次展示10条数据 */
            newDcrm = this.state.dbcrm.slice(this.state.page * 10, this.state.page * 10 + 10);
        }
        const tableWidth = this.props.containerWidth;
        /* 切换状态弹窗的footer */
        const footer = (
            <div>
                <div>
                    <Button type="primary" style={{ marginRight: '-12px' }} onClick={this.reallChangeState}>确定</Button>
                    {' '}
&nbsp;&nbsp;
                    <Button type="normal" onClick={this.onCloseState}>关闭</Button>
                </div>
            </div>
        );

        /* 导入文件弹窗的footer */
        const importFooter = (
            <div>
                <div>
                    <Button type="primary" style={{ marginRight: '-12px' }} disabled={!this.state.canIsClick} onClick={this.reallImport}>确定</Button>
                    {' '}
&nbsp;&nbsp;
                    <Button type="normal" onClick={this.onCloseImportModal}>关闭</Button>
                </div>
            </div>
        );

        const prevalue = this.state.prevalue == 0 ? '未返现' : (this.state.prevalue == 1 ? '待返现' : '已返现');
        const changeState = this.state.changeState == 0 ? '未返现' : (this.state.changeState == 1 ? '待返现' : '已返现');
        const { selectFileName } = this.state;
        return (
            <div className="returnMoney">

                {/* 删除记录的弹窗 */}
                <Dialog
                  visible={this.state.visible}
                    onOk={this.onClickDelete}
                    onCancel={this.onCloseDelete}
                  onClose={this.onCloseDelete}
                  title="天冷了,要注意保暖哦"
                    footerAlign={this.state.footerAlign}
                >

                    <h5 style={{ color: 'gray' }}>{`您确定删除 : ${this.state.deleteName} 吗?`}</h5>

                </Dialog>

                {/* 切换状态弹窗 */}
                <TradeDialog
                  style={{ width: '540px' }}
                    visible={this.state.visibleState}
                  footer={footer}
                  className="send-dialog"
                  onClose={this.onCloseState}
                  title={<span className="title">切换用户返现状态</span>}
                >
                    <br />
                    <br />
                    你确定要将用户:
                    &nbsp;&nbsp;
                    [
                    {this.state.changeStateName}
]
                    &nbsp;&nbsp;
                    的状态由
                    &nbsp;&nbsp;
                    <span style={{ color: 'red' }}>{prevalue}</span>
                    &nbsp;&nbsp;
                    切换到
                    &nbsp;&nbsp;
                    <span style={{ color: 'red' }}>{changeState}</span>
                    &nbsp;&nbsp;
                    吗?

                </TradeDialog>

                {/* 导入文件弹窗 */}
                <TradeDialog
                  style={{ width: '540px' }}
                  visible={this.state.showImportDialog}
                    footer={importFooter}
                  className="send-dialog"
                    onClose={this.onCloseImportModal}
                  title={<span className="title">导入文件</span>}
                >
                    {/* 导入文件弹窗内容 */}

                    <Button
                      className="importPrintSelectFileBtn"
                        onClick={() => {
                            this.selectFileInput.click();
                        }}
                    >
选择文件
                    </Button>
                    <input
                      type="file"
                        ref={node => this.selectFileInput = node}
                        style={{
                            position: 'absolute', opacity: 0, top: 0, left: 0,
                        }}
                      onChange={() => {
                            if (this.selectFileInput.files.length == 0) {
                                this.setState({
                                    selectFileName: '',
                                });
                            } else {
                                this.setState({
                                    selectFileName: this.selectFileInput.files[0].name,
                                });
                            }
                        }}
                    />
                    <span style={{ color: '#9B9B9B', marginLeft: '8px' }}>{selectFileName}</span>
                </TradeDialog>

                <div className="returnMoney_search">
                    {/* 用户昵称 或者 支付宝账号 的输入 */}
                    <Input onChange={this.onchangeAliName} size="large" placeholder="搜索支付宝账号/用户昵称" />
                    {/* 搜索选项 */}
                    <Select className="returnMoney_search_qifei" onChange={this.onChange} defaultValue={this.state.selectKind}>
                        <li value="item">商品</li>
                        <li value="trade">交易</li>
                    </Select>
                    {/* 起飞进行数据的检索 */}
                    <Button className="returnMoney_search_qifei" type="primary" onClick={this.click}>起飞</Button>
                    <Button
                      type="primary"
                      className="returnMoney_search_qifei"
                        onClick={() => {
                            this.setState({
                                showImportDialog: true,
                                selectFileName: '',
                            });
                        }}
                    >
导入订单
                    </Button>
                </div>

                {/* 数据table展示 */}
                <Table
                  rowHeight={55} // 行高
                  rowsCount={newDcrm.length} // 行数
                  width={tableWidth - 30} // table宽度
                  height={600} // table的高度
                  headerHeight={60}
                >

                    {/* ID */}
                    <Column
                      flexGrow={1}
                      header={<Cell>ID</Cell>}
                      width={50}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].id}
                          </Cell>
                        )}
                    />

                    {/* 用户昵称 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>用户昵称</Cell>}
                        width={100}
                        cell={({ rowIndex, ...props }) => (
                          <Cell {...props}>
                                {newDcrm[rowIndex].seller_nick}
                            </Cell>
                        )}
                    />

                    {/* 支付宝名 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>支付宝名</Cell>}
                      width={100}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].seller_name}
                          </Cell>
                        )}
                    />

                    {/* 支付宝账号 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>支付宝账号</Cell>}
                      width={100}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].seller_alipay_account}
                          </Cell>
                        )}
                    />

                    {/* 是否已返现 */}
                    <Column
                    // flexGrow    = {1}
                      header={(
                            <Cell className="select_style">
                              <span className="select_style_p">是否已返现</span>
                              <Select defaultValue="all" onChange={this.onChangeStatus}>
                                    <li value="no">未返现</li>
                                    <li value="wait">待返现</li>
                                    <li value="yes">已返现</li>
                                    <li value="all">所有</li>
                                </Select>
                          </Cell>
                        )}
                      width={200}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].status == 0 ? '未返现' : (newDcrm[rowIndex].status == 1 ? '待返现' : '已返现')}
                              {/* 等待开发 */}
                              <Select style={{ marginLeft: '12' }} disabled={newDcrm[rowIndex].status == 2} value={newDcrm[rowIndex].status == 2 ? '' : newDcrm[rowIndex].status} size="small" onChange={(value) => { this.changeStatus(newDcrm[rowIndex].status, newDcrm[rowIndex].seller_name, value, newDcrm[rowIndex].id); }}>
                                    {/* <li value="2">已返现</li> */}
                                    <li value="1">待返现</li>
                                    <li value="0">未返现</li>
                                </Select>
                          </Cell>
                        )}
                    />

                    {/* 添加时间 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>添加时间</Cell>}
                      width={100}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].add_time}
                          </Cell>
                        )}
                    />

                    {/* 到期时间 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>到期时间</Cell>}
                      width={100}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].vip_time}
                          </Cell>
                        )}
                    />

                    {/* 返现金额 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>返现金额</Cell>}
                      width={100}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {newDcrm[rowIndex].return_money == 0 ? newDcrm[rowIndex].optionnick == null ? '26' : `32-${newDcrm[rowIndex].optionnick}` : newDcrm[rowIndex].return_money }
                          </Cell>
                        )}
                    />

                    {/* 删除记录 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>删除记录</Cell>}
                      width={30}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              <Button disabled type="primary" size="small" onClick={() => { this.delectRecord(newDcrm[rowIndex].id, newDcrm[rowIndex].seller_name); }}>删除</Button>
                          </Cell>
                        )}
                    />

                    {/* 是否手动 */}
                    <Column
                      flexGrow={1}
                      header={<Cell>是否手动返现</Cell>}
                      width={30}
                      cell={({ rowIndex, ...props }) => (
                            <Cell {...props}>
                              {/* 之前的数据(徐婉莹手动CSV文件之前)都是 2, 1 2 都为自动返现, 0 为手动返现 */}
                              {newDcrm[rowIndex].is_auto_return == 1 ? '自动返现' : newDcrm[rowIndex].is_auto_return == 2 ? '自动返现' : newDcrm[rowIndex].is_auto_return == 3 ? <span style={{ color: 'red' }}>全球购</span> : <span style={{ color: 'red' }}>手动返现</span>}
                          </Cell>
                        )}
                    />
                </Table>

                {/* 分页 */}
                <Pagination style={{ marginLeft: `${tableWidth - 650}`, marginTop: 15 }} total={this.state.dbcrm.length} defaultCurrent={2} onChange={this.change} />
,
            </div>
        );
    }
}

// export default ReturnMoney;
        
export default Dimensions({
    getHeight() {
        return window.innerHeight;
    },
    getWidth() {
        return window.innerWidth - 30;
    },
})(ReturnMoney);    