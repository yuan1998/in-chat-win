import {tokenName} from "./config";

const setStorage = (key , value) => window.localStorage.setItem(key , JSON.stringify(value));

const getStorage = (key) => JSON.parse(window.localStorage.getItem(key));

const removeStorage = (key) => window.localStorage.removeItem(key);

const clearStorage = () => window.localStorage.clear();

const clearAuthStorage = () => {
    removeStorage(tokenName);
    removeStorage(tokenName + '_expired_at');
};


export {
    clearStorage ,
    removeStorage ,
    getStorage ,
    setStorage ,
    clearAuthStorage
}
