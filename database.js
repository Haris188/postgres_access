
const From = require('./from');
const ToTable = require('./to_table');
const SetData = require('./set_data');

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

    update(table){
        const queryMap = {
            type: 'UPDATE',
            table: table,
            values: '',
            columnNames: '',
            where: ''
        }
        return new SetData(queryMap);
    }
}

const hero = new Database()
    .update('users')
    .setData()
    .toColumns('first_name, last_name')
    .where('id = 4')
    .submitQuery();
console.log(hero);