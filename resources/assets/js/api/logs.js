import { params }      from '../utils/assist';
import { authRequest } from "./request";

const index = async (param) => {
    param = params(param);
    return await authRequest('log?' + param);
};

export default {
    index,
}
