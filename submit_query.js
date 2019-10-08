class SubmitQuery{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    submitQuery(){
        console.log(this.queryMap);
        const queryType = this.queryMap.type;
        let queryString = '';
        switch (queryType) {
            case 'SELECT':
                queryString = this.prepareSelectQuery();
                break;

            case 'INSERT':
                queryString = this.prepareInsertQuery();
                break;
        
            default :
                console.log('wrong query type');
                break;
        }
        if(queryString){
            return queryString;
        }
        else{
            console.log('error');
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
}

module.exports = SubmitQuery;