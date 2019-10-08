
const ToColumn = require('./to_column');

class ToTable{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    toTable(tableName){
        const queryMap = this.queryMap;
        queryMap.table = tableName;
        return new ToColumn(queryMap);
    }
}

module.exports = ToTable;