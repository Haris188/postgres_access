
const From = require('./from');
const ToTable = require('./to_table');
const SetData = require('./set_data');
const Where = require('./where');
const SubmitQuery = require('./submit_query');




class Database{
    constructor(database_pool){
        this.queryMap = {
            pool: database_pool,
        }
    }
    
    get(columnNames){
        const selectClause = this.getSelectClause(columnNames);
        const queryMap = Object.assign(this.queryMap, {type: 'SELECT', select: selectClause});
        return new From(queryMap);
    }

    getSelectClause(columnNames){
        if(columnNames !== undefined){
            const selectClause = columnNames.toString();
            return selectClause;
        }
    }

    add(rowData){
        const queryMap = Object.assign(this.queryMap, {
            type: 'INSERT',
            values: rowData,
            table: '',
            columnNames: '',
        });
        return new ToTable(queryMap);
    }

    update(table){
        const queryMap = Object.assign(this.queryMap, {
            type: 'UPDATE',
            table: table,
            values: '',
            columnNames: '',
            where: ''
        });
        return new SetData(queryMap);
    }

    deleteFrom(table){
        const queryMap = Object.assign(this.queryMap, {
            type: 'DELETE',
            table: table,
            where: '',
        });
        return new Where(queryMap);
    }

    deleteTable(table){
        const queryMap = Object.assign(this.queryMap, {
            type: 'DROP',
            table: table,
        })
        return new SubmitQuery(queryMap);
    }

    query(queryString){
        const queryMap = Object.assign(this.queryMap, {
            type: 'QUERY',
            query: queryString
        });
        return new SubmitQuery(queryMap);
    }
}

module.exports = Database;
