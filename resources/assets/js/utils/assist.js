import {setStorage} from "./storage";

const { MIX_TOKEN_NAME } = process.env;

const saveToken = (data) => {
    setStorage(MIX_TOKEN_NAME , data.access_token);
    setStorage(MIX_TOKEN_NAME + '_expired_at' , new Date().getTime() + data.expires_in * 1000);
};

const oneOf = (key , arr) => {
    return arr.includes(key);
};

const removeOf = (key , arr) => {
    let result = arr.indexOf(key);

    if(result === -1){
        return false;
    }

    return !!arr.splice(result , 1);
};

const trim = (s, c) => {
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp(
        "^[" + c + "]+|[" + c + "]+$", "g"
    ), "");
};

const params = (obj) => {
    let str = '';

    for(let key in obj) {
        let item = obj[key];
        switch (typeof item) {
            case 'string':
                str += `${key}=${item}&`;
                break;
            case 'object' :
                if (isArray(item)) {
                    let t = '';
                    item.forEach( (each) => {
                        t += `${each},`;
                    });
                    t = trim(t , ',');
                    str += `${key}=${t}&`;
                }
                break;
        }
    }

    return trim(str , '&');
};

const cloneOf = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

export {
    saveToken,
    oneOf,
    removeOf,
    params ,
    trim,
    cloneOf
}
