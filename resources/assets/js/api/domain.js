import {authRequest} from "./request";

const update = async (id , data) => {
    let options = {
        url: 'domain/' + id ,
        data,
        method: 'PATCH',
    };

    return await authRequest(options);
};

const create = async (data) => {
    let options = {
        url: 'domain',
        data,
        method: 'POST'
    };

    return await authRequest(options);
};

const destroy = async (id) => {
    let options = {
        url : 'domain/' + id,
        method: 'DELETE',
    };
    return await authRequest(options);
};

const index = async () => {
    return await authRequest('domain');
};

const show = async (id) => {
    return await authRequest('domain/' + id);
};

const inSetting = async (id) => {
    return await authRequest('setting/' + id + '/domain');
};

export default {
    create,
    update,
    index,
    show,
    destroy,
    inSetting
}
