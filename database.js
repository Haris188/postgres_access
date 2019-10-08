
const From = require('./from');
const ToTable = require('./to_table');

class Database{
    
    get(columnNames){
        const selectClause = this.getSelectClause(columnNames);
        const queryMap = {type: 'SELECT', select: selectClause};
        return new From(queryMap);
    }

    getSelectClause(columnNames){
        if(columnNames !== undefined){
            const selectClause = columnNames.toString();
            return selectClause;
        }
    }

    add(rowData){
        const queryMap = {
            type: 'INSERT',
            values: rowData,
            table: '',
            columnNames: '',
        };
        return new ToTable(queryMap);
    }
}

const hero = new Database()
    .add('3,33,3')
    .toTable('he')
    .toColumns('')
    .submitQuery();
console.log(hero);