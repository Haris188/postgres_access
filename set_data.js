
const ToColumn = require('./to_column');

class SetData{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    setData(values){
        const queryMap = this.queryMap;
        queryMap.values = values;
        return new ToColumn(queryMap);
    }
}

module.exports = SetData;