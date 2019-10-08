
const Where = require('./where');

class From{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    from(tables){
        const fromClause = this.getFromClause(tables);
        const queryMap = this.queryMap;
        queryMap.from = fromClause;
        queryMap.where = '';
        return new Where(queryMap);
    }

    getFromClause(tables){
        const tablesEmpty = tables.length < 1 ? true: false;
        let fromClause = '';
        if(tablesEmpty){
            fromClause = {success: false, data:"from cannot be empty"}
        }
        else{
            const stringTables = tables.toString();
            fromClause = `FROM ${stringTables}`;
        }
        return fromClause;
    }
}

module.exports = From;