
const From = require('./from');

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

    add(row){
        const valuesClause = this.getValuesClause(row);
        const queryMap = {
            values: insertClause,
            into: '',
            where: '',
        }
        return new ToTable(queryMap);
    }

    getValuesClause(row){
        const rowEmpty = checkEmpty(row);
        let valuesClause = null;
        if(rowEmpty){
            console.log("row cannot be empty");
        }
        else{
            rowsString = row.toString();
            const valuesClause =`VALUES (${rowsString})`;
        }
    }
}

const hero = new Database()
    .get('*')
    .from(['sb','ds'])
    .where('id = 2')
    .submitQuery();
console.log(hero);