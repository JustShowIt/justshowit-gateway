module.exports = {
    convertParamsToRunData (params) {
        let paramsList = {};
    
        if (typeof params === 'object') {
            Object.keys(params).forEach(key => {
                paramsList[key] = 1;
            });
        }
    
        return paramsList;
    }
}
