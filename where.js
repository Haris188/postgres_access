
const SubmitQuery = require('./submit_query');

class Where {
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    submitQuery(){
        const queryMap = this.queryMap;
        return new SubmitQuery(queryMap).submitQuery();
    }

    where(condition){
        const whereClause = this.getWhereClause(condition);
        const queryMap = this.queryMap;
        queryMap.where = whereClause;
        return new SubmitQuery(queryMap);
    }

    getWhereClause(condition){
        const whereClause = condition;
        return whereClause;
    }
}

module.exports = Where;