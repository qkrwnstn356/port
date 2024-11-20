const utils = {
    clone: (obj) => {
        if(obj) return JSON.parse(JSON.stringify(obj));
        else return null;
    },
}

export default utils;