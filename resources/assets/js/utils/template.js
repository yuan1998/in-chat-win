import {cloneOf} from "./assist";

const defaultHeader = {
    backIconColor: '#fff' ,
    title: '小老弟.' ,
    telIconColor: '#fff' ,
    telNumber: '120-120' ,
    showTelNumber: false ,
    backgroundColor: '#4185f4',
    color: '#fff'
};

const defaultMain = {
    backgroundColor: '#f9f5f7' ,
};

const defaultLeftPop = {
    showAvatar: true ,
    avatar: null ,
    showName: false ,
    name: '大老哥' ,
    backgroundColor: '#ffffff' ,
    color: "#33383f" ,
};

const defaultRightPop = {
    showAvatar: true ,
    showName: false ,
    name: '小老弟' ,
    avatar: null ,
    color: "#33383f" ,
    backgroundColor: '#cce5ff'
};

const defaultForm = {
    placeholder: 'please enter' ,
    wrapBackgroundColor: '#fff' ,
    backgroundColor: '#f3f3f3' ,
    color: '#555' ,
    elementTagName: 'input' ,
    btnColor: '#fff' ,
    btnText: '发送',
    btnBackgroundColor: "#4185f4" ,
    inputSpan: 12 ,
    buttonSpan: 3 ,
};

const defaultFooter = {
    borderColor: '#f6f5f7' ,
    backgroundColor: '#fff' ,
    text: '我是啊老哥.' ,
    color: '#e4e4e6' ,
};

const defaultSetting = () => {
    return cloneOf({
        form: defaultForm ,
        footer: defaultFooter ,
        right: defaultRightPop ,
        left: defaultLeftPop ,
        main: defaultMain ,
        header: defaultHeader ,
    });
};

const mergeSetting = (setting) => {
    return {
        form:   setting.form   ? Object.assign(defaultForm     , setting.form)   : defaultForm ,
        footer: setting.footer ? Object.assign(defaultFooter   , setting.footer) : defaultFooter ,
        right:  setting.right  ? Object.assign(defaultRightPop , setting.right)  : defaultRightPop ,
        left:   setting.left   ? Object.assign(defaultLeftPop  , setting.left)   : defaultLeftPop ,
        main:   setting.main   ? Object.assign(defaultMain     , setting.main)   : defaultMain ,
        header: setting.header ? Object.assign(defaultHeader   , setting.header) : defaultHeader ,
    }
};

export {
    defaultSetting ,
    mergeSetting,
}
