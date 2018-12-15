import { setStorage } from "./storage";

const { MIX_TOKEN_NAME } = process.env;

const saveToken = (data) => {
    setStorage(MIX_TOKEN_NAME, data.access_token);
    setStorage(MIX_TOKEN_NAME + '_expired_at', new Date().getTime() + data.expires_in * 1000);
};

const oneOf = (key, arr) => {
    return arr.includes(key);
};

const removeOf = (key, arr) => {
    let result = arr.indexOf(key);
    if (result === -1) {
        return false;
    }
    return !!arr.splice(result, 1);
};

const trim = (s, c) => {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
        "^[" + c + "]+|[" + c + "]+$", "g"
    ), "");
};

const params = (obj) => {
    let str = [];

    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[ p ]));
        }
    }
    return str.join("&");
};

const cloneOf = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const parseTime = (time) => {
    time = parseInt(time);

    const second = time/ 1000;
    const minute = second / 60;
    const hour   = minute / 60;
    const day    = hour / 24;

    let str = '';
    if (day > 1) {
        str += `${Math.floor(day)}天`;
    }
    if (hour > 1) {
        str += `${Math.floor(hour % 24)}小时`;
    }
    if (minute > 1) {
        str += `${Math.floor(minute % 60)}分钟`;
    }
    if (second > 0) {
        let s = Math.floor(second % 60);
        str += `${s || '小于1'}秒`;
    }

    if (str === '') {
        console.log(time , second);
    }

    return str;
};

export {
    saveToken,
    oneOf,
    removeOf,
    params,
    trim,
    cloneOf,
    parseTime
}
