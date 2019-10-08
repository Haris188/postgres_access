
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
        const conditionEmpty = this.checkEmpty(condition);
        let whereClause = '';
        if(conditionEmpty){
            whereClause = {success: false, data:"where cannot be empty"}
        }
        else{
            whereClause = `WHERE ${condition}`;
        }
        return whereClause;
    }

    checkEmpty(condition){
        if(condition === null || condition === ''){
            return true;
        }
        else{
            return false;
        }
    }
}

module.exports = Where;