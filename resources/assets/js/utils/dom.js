const on = (el , eventName , callback) => {
    el.addEventListener(eventName , callback);
};

const off = (el , eventName) => {
    el.removeEventListener(eventName);
};

export {
    on ,
    off ,
}
