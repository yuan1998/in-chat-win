import { authRequest } from "./request";

const update = async (id, data) => {
    let options = {
        url   : 'setting/' + id,
        data,
        method: 'PATCH',
    };

    return await authRequest(options);
};

const create = async (data) => {
    let options = {
        url   : 'setting',
        data,
        method: 'POST'
    };

    return await authRequest(options);
};

const destroy = async (id) => {
    let options = {
        url   : 'setting/' + id,
        method: 'DELETE',
    };
    return await authRequest(options);
};

const index = async () => {
    return await authRequest('setting');
};

const show = async (id) => {
    return await authRequest('setting/' + id);
};

export default {
    create,
    update,
    index,
    show,
    destroy
}
