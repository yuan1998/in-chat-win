import {authRequest} from "./request";

const update = async (settingId , id , data) => {
    let options = {
        url: `setting/${settingId}/template/${id}`,
        data ,
        method: 'PATCH' ,
    };

    return await authRequest(options);
};

const create = async (settingId, data) => {
    let options = {
        url: `setting/${settingId}/template` ,
        data ,
        method: 'POST'
    };

    return await authRequest(options);
};

const one = async (settingId) => {
    return await authRequest(`setting/${settingId}/template/one`);
};

export default {
    create ,
    update ,
    one ,
}
