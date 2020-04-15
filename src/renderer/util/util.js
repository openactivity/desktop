let util = {};
util.title = function (title) {
    title = title || '会议系统';
    window.document.title = title;
};

var env = process.env.NODE_ENV;

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};


util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({ name: routers[i].children[0].name });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};


util.formatDate = function (date, fmt) {

    if(date instanceof Date){
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1
                    ? str
                    : ('00' + str).substr(str.length))
            }
        }
        return fmt
    }else{
        return date
    }
}

util.isNotEmpty = function (obj) {
    if (obj != undefined && obj != null && obj != "") {
        return true;
    } else {
        return false;
    }
}

util.strToHexCharCode = (str) => {
    if (str === "")
        return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for (var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}


util.s4 = function(){
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

util.querySerialize = query => {
    let serialize = '';
    if(!query) return serialize;
    Object.keys(query).map(elem => {
        serialize = serialize + elem + '=' + query[elem] + '&';
    });
    return serialize;
}
export default util;
