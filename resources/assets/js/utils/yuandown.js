
const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    str = div.innerHTML;
    div = undefined;
    return str;
};

/**
 *
 * @type {{linkLine: {regex: RegExp, handle(*=): *}, addAttribute: {regex: RegExp, handle(*=): *}, breakWord: {regex: RegExp, handle(*): *}}}
 */
const rules = {
    linkLine: {
        regex: /(?:\#\!)\s*(.*?)\s*#*\s*(?:\!\#)/m,
        handle(str) {
            let stra;
            while ((stra = this.regex.exec(str)) !== null) {
                str = str.replace(stra[0], '<a class="yuan-send-select-message" style="display: inline-block;color: #3184ff;padding-top: 5px;" >' + escape(stra[1].trim()) + '</a>').trim();
            }
            return str;
        }
    },
    addAttribute: {
        regex: /(!\[(.*?)\:(.*?)\])\((.*?)\)/m,
        handle(str) {
            let stra;
            while ((stra = this.regex.exec(str)) !== null) {
                str = str.replace(stra[0], '<span ' + stra[2] + '="' + stra[3] +'" >'+ escape(stra[4].trim())+ '</span>').trim();
            }
            return str;
        }
    },
    breakWord: {
        regex : /\r\n?|\n/g,
        handle(str) {
            return str.replace(this.regex , '<br />');
        }
    },
};

const Yuandown = (str) => {
    for(let key in rules) {
        str = rules[key].handle(str);
    }
    return str;
};

export {
    Yuandown,
    rules
}
