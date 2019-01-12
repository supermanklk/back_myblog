var Tools = {
    // 验证手机号的有效性,可以接受 Number 也可以接受 字符串
    isPhone(phone) {
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            return false; 
        }else{
            return true;
        } 
    },

    // fetch接口封装
    api: function({ url, args='', callback }) {
        let argsStr = '';
        if(args!='') {
            for(let key in args) {
                argsStr += key + '=' + args[key] + '&';
            }
            argsStr = '?' + argsStr.substr(0, argsStr.length-1);
        }
        
        fetch(url+argsStr)
        .then(response => response.json())
        .then(res => {
            callback(res);
        });
    },

    /* 判断是否为空 */
    isEmpty: function(key){
        if (typeof(key) === 'string') {
            key = key.replace(/(^\s*)|(\s*$)/g, '');
            if (key == '' || key == null || key == 'null' || key == undefined || key == 'undefined') {
                return true
            } else {
                return false
            }
        } else if (typeof(key) === 'undefined') {
            return true;
        } else if (typeof(key) == 'object') {
            for(let i in key){
                return false;
            }
            return true;
        }else if (typeof(key) == 'boolean'){
            return false;
        }
    },
}

export const isPhone = Tools.isPhone.bind(Tools);
export const api = Tools.api.bind(Tools);
export const isEmpty = Tools.isEmpty.bind(Tools);