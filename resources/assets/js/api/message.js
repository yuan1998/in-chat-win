import {authRequest} from "./request";

const update = async (id , data) => {
    let options = {
        url: 'message/' + id ,
        data,
        method: 'PATCH',
    };

    return await authRequest(options);
};

const create = async (data) => {
    let options = {
        url: 'message',
        data,
        method: 'POST'
    };

    return await authRequest(options);
};

const destroy = async (id) => {
    let options = {
        url : 'message/' + id,
        method: 'DELETE',
    };
    return await authRequest(options);
};

const index = async (id) => {
    return await authRequest('setting/' + id + '/message');
};

const show = async (id) => {
    return await authRequest('message/' + id);
};

export default {
    create,
    update,
    index,
    show,
    destroy
}
