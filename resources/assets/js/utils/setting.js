const defaultData = {
    name: '' ,
    description: '' ,
    'list-open': false ,
    'list-model': 'white' ,
    type: 0,
};
const defaultSetting = {
    tag: '6666' ,
    waitTime: '3' ,
    again: true ,

    //
    name: 'test' ,
    messageType: 0 ,
    tel: '029-110' ,

    // main
    mainColor: '#009EB0' ,
    mainColorText: '#fff' ,
    bgColor: '#f1f1f1' ,

    // left
    lmColor: '#DAF4FE' ,
    lmColorText: '#000' ,
    lmText: 'Test Something ....' ,
    lmName: 'TestName' ,
    lmAvatar: '' ,

    // right
    rmColor: '#FFFEFF' ,
    rmColorText: '#000' ,
    rmText: 'Test' ,

    //footer
    footerText: 'Test' ,
    footerColor: '#F4F3F5' ,
    footerColorText: '#DEDDDF' ,

    // input
    inputColor: '#F2F2FB' ,
    inputWrapColor: '#FFFEFF' ,
    inputColorText: '#AAAAAC' ,
    inputText: '请输入...' ,

    //button
    buttonColor: '#00C400' ,
    buttonColorText: '#fff' ,
    buttonText: '发送'
};
const defaultList = [];

const mergeSetting = (data = {}) => {
    data = Object.assign(defaultData,data);
    let setting = data['setting'] || {};

    setting = Object.assign(defaultSetting , setting);
    data.setting = setting;

    if (!data['list-data'])
        data['list-data'] = defaultList;

    return data;
};

const defaultForm = {
    ...defaultData,
    'list-data': defaultList,
    setting: defaultSetting,
};

export {
    defaultList,
    defaultData,
    defaultSetting,
    mergeSetting,
    defaultForm
}
