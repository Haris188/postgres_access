
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
        if(tables !== undefined){
            const fromClause = tables.toString();
            return fromClause;
        }
    }
}

module.exports = From;