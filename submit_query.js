class SubmitQuery{
    constructor(queryMap){
        this.queryMap = queryMap;
    }

    submitQuery(){
        console.log(this.queryMap);
        let queryString = '';
        const select = this.queryMap.select;
        const from = this.queryMap.from;
        const where = this.queryMap.where;
        queryString = `${select} ${from} ${where}`;
        return queryString;
    }
}

module.exports = SubmitQuery;