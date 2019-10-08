
const From = require('./from');

class Database{
    
    get(columnNames){
        const selectClause = this.getSelectClause(columnNames);
        const queryMap = {select: selectClause};
        return new From(queryMap);
    }

    getSelectClause(columnNames){
        const columnsEmpty = columnNames.length < 1 ? true: false;
        let selectClause = 'SELECT';
        if(!columnsEmpty){
            const columsAsString = columnNames.toString();
            selectClause = `SELECT ${columsAsString}`;
        }
        return selectClause;
    }
}

// class From{
//     constructor(queryMap){
//         this.queryMap = queryMap;
//     }

//     from(tables){
//         const fromClause = this.getFromClause(tables);
//         const queryMap = this.queryMap;
//         queryMap.from = fromClause;
//         queryMap.where = '';
//         return new Where(queryMap);
//     }

//     getFromClause(tables){
//         const tablesEmpty = tables.length < 1 ? true: false;
//         let fromClause = '';
//         if(tablesEmpty){
//             fromClause = {success: false, data:"from cannot be empty"}
//         }
//         else{
//             const stringTables = tables.toString();
//             fromClause = `FROM ${stringTables}`;
//         }
//         return fromClause;
//     }
// }


// class Where {
//     constructor(queryMap){
//         this.queryMap = queryMap;
//     }

//     submitQuery(){
//         const queryMap = this.queryMap;
//         return new SubmitQuery(queryMap).submitQuery();
//     }

//     where(condition){
//         const whereClause = this.getWhereClause(condition);
//         const queryMap = this.queryMap;
//         queryMap.where = whereClause;
//         return new SubmitQuery(queryMap);
//     }

//     getWhereClause(condition){
//         const conditionEmpty = this.checkEmpty(condition);
//         let whereClause = '';
//         if(conditionEmpty){
//             whereClause = {success: false, data:"where cannot be empty"}
//         }
//         else{
//             whereClause = `WHERE ${condition}`;
//         }
//         return whereClause;
//     }

//     checkEmpty(condition){
//         if(condition === null || condition === ''){
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
// }

// class SubmitQuery{
//     constructor(queryMap){
//         this.queryMap = queryMap;
//     }

//     submitQuery(){
//         console.log(this.queryMap);
//         let queryString = '';
//         const select = this.queryMap.select;
//         const from = this.queryMap.from;
//         const where = this.queryMap.where;
//         queryString = `${select} ${from} ${where}`;
//         return queryString;
//     }
// }


const hero = new Database().get('users, id').from('db').where(`id = '2' AND location = 'mississauga'`).submitQuery();
console.log(hero);