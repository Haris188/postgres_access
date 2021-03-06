

class SubmitQuery{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    async submitQuery(){
        const queryType = this.queryMap.type;
        let queryString = '';
        switch (queryType) {
            case 'SELECT':
                queryString = this.prepareSelectQuery();
                break;

            case 'INSERT':
                queryString = this.prepareInsertQuery();
                break;

            case 'UPDATE':
                queryString = this.prepareUpdateQuery();
                break;

            case 'DELETE':
                queryString = this.prepareDeleteQuery();
                break;

            case 'DROP':
                queryString = this.prepareDropQuery();
                break;

            case 'QUERY':
                queryString = this.prepareQuery();
                break;
                        
            default :
                console.log('wrong query type');
                break;
        }
        if(queryString){
            const data = await this.executeQuery(queryString);
            return data;
        }
        else{
            console.log(`error while executing the query`);
        }
    }

    prepareSelectQuery(){
        const selectOK = this.validateSelect();
        if(selectOK){
            let queryString = '';
            const select = `SELECT ${this.queryMap.select}`;
            const from = `FROM ${this.queryMap.from}`;
            const where = this.queryMap.where === '' ? '' :`WHERE ${this.queryMap.where}`;
            queryString = `${select} ${from} ${where}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, either get, from or where'); 
            return false;
        }
    }

    validateSelect(){
        const queryMap = this.queryMap;
        if(
            queryMap.select === null || 
            queryMap.select === '' ||
            queryMap.select === undefined ||

            queryMap.from === null || 
            queryMap.from === '' ||
            queryMap.from === undefined ||

            queryMap.where === null || 
            queryMap.where === undefined
        ){
            return false;
        }
        else{
            return true;
        }
    }

    prepareInsertQuery(){
        const insertOK = this.validateInsert();
        if(insertOK){
            let queryString = '';
            const insert = `INSERT INTO ${this.queryMap.table}`;
            const values = `VALUES (${this.queryMap.values})`;
            const columnNames = this.queryMap.columnNames === '' ? '' :`(${this.queryMap.columnNames})`;
            queryString = `${insert}${columnNames} ${values}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, either get, toTable or toColumns'); 
            return false;
        }
    }

    validateInsert(){
        const queryMap = this.queryMap;
        if(
            queryMap.values === '' ||
            queryMap.values === null ||
            queryMap.values === undefined ||

            queryMap.table === '' ||
            queryMap.table === null ||
            queryMap.table === undefined ||

            queryMap.columnNames === undefined ||
            queryMap.columnNames === null 
        ){
            return false;
        }
        else{
            return true;
        }
    }

    prepareUpdateQuery(){
        const updateOK = this.validateUpdate();
        if(updateOK){
            let queryString = '';
            const set = this.prepareSetClause();
            const update = `UPDATE ${this.queryMap.table}`;
            const where = this.queryMap.where === '' ? '' :`WHERE ${this.queryMap.where}`;
            queryString = `${update} ${set} ${where}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, either update, data, toColumns, where'); 
            return false;
        }
    }

    validateUpdate(){
        const queryMap = this.queryMap;
        if(
            queryMap.values === '' ||
            queryMap.values === null ||
            queryMap.values === undefined ||

            queryMap.table === '' ||
            queryMap.table === null ||
            queryMap.table === undefined ||

            queryMap.columnNames === undefined ||
            queryMap.columnNames === null ||
            queryMap.columnNames === '' ||

            queryMap.where === null || 
            queryMap.where === undefined            
        ){
            return false;
        }
        else{
            return true;
        }
    }

    prepareSetClause(){
        const values = `${this.queryMap.values}`.split(',');
        const columnNames = `${this.queryMap.columnNames}`.split(',');
        let setClause = 'SET ';
        
        columnNames.forEach((value, index)=>{
            if(index === columnNames.length - 1){
                setClause += `${value} = ${values[index]}`;
            }
            else{
                setClause += `${value} = ${values[index]},`;
            }
        });

        return setClause;
    }

    prepareDeleteQuery(){
        const deleteOK = this.validateDelete();
        if(deleteOK){
            let queryString = '';
            const deleteFrom = `DELETE FROM ${this.queryMap.table}`;
            const where = this.queryMap.where === '' ? '' :`WHERE ${this.queryMap.where}`;
            queryString = `${deleteFrom} ${where}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, either deleteFrom, where'); 
            return false;
        }
    }

    validateDelete(){
        const queryMap = this.queryMap;
        if(
            queryMap.table === '' ||
            queryMap.table === null ||
            queryMap.table === undefined ||

            queryMap.where === null || 
            queryMap.where === undefined
        ){
            return false;
        }
        else{
            return true;
        }
    }

    prepareDropQuery(){
        const dropOK = this.validateDrop();
        if(dropOK){
            let queryString = '';
            const drop = `DROP TABLE ${this.queryMap.table}`;
            queryString = `${drop}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, deleteTable()'); 
            return false;
        }
    }

    validateDrop(){
        const queryMap = this.queryMap;
        if(
            queryMap.table === '' ||
            queryMap.table === null ||
            queryMap.table === undefined

        ){
            return false;
        }
        else{
            return true;
        }
    }

    prepareQuery(){
        const queryOK = this.validateQuery();
        if(queryOK){;
            const queryString = `${this.queryMap.query}`;
            return queryString;
        }
        else{
            console.log('Missing data in one of the functions, query()'); 
            return false;
        }
    }

    validateQuery(){
        const queryMap = this.queryMap;
        if(
            queryMap.query === '' ||
            queryMap.query === null ||
            queryMap.query === undefined

        ){
            return false;
        }
        else{
            return true;
        }
    }

    executeQuery(queryString){
        const pool = this.queryMap.pool;
        return new Promise(resolve=>{
            pool.query(queryString,
            (err, response)=>{
                if(err){
                    const result = {success:false, data: err};
                    console.log(err);
                    resolve(result);
                }
                else{
                    //console.log(response);
                    const result = {success: true, data:response};
                    resolve(result);
                }
            });
        });
    }
}

module.exports = SubmitQuery;