import { params }      from '../utils/assist';
import { authRequest } from "./request";

const index = async (param) => {
    param = params(param);
    return await authRequest('log?' + param);
};

const destroy = async (id) => {
    let options = {
        url   : 'log/' + id,
        method: 'DELETE',
    };
    return await authRequest(options);
};

export default {
    index,
    destroy
}
