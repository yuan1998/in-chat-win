import {setStorage} from "./storage";
import {tokenName}  from "./config";

const saveToken = (data) => {
    setStorage(tokenName , data.access_token);
    setStorage(tokenName + '_expired_at' , new Date().getTime() + data.expires_in * 1000);
};

export {
    saveToken
}
