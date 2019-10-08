
const SubmitQuery = require('./submit_query');

class ToColumn{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    submitQuery(){
        const queryMap = this.queryMap;
        return new SubmitQuery(queryMap).submitQuery();
    }

    toColumns(columnNames){
        const queryMap = this.queryMap;
        queryMap.columnNames = columnNames;
        return new SubmitQuery(queryMap);
    }
}

module.exports = ToColumn;