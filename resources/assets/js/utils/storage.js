const { MIX_TOKEN_NAME } = process.env;

const setStorage = (key , value) => window.localStorage.setItem(key , JSON.stringify(value));

const getStorage = (key) => JSON.parse(window.localStorage.getItem(key));

const removeStorage = (key) => window.localStorage.removeItem(key);

const clearStorage = () => window.localStorage.clear();

const clearAuthStorage = () => {
    removeStorage(MIX_TOKEN_NAME);
    removeStorage(MIX_TOKEN_NAME + '_expired_at');
};


export {
    clearStorage ,
    removeStorage ,
    getStorage ,
    setStorage ,
    clearAuthStorage
}
