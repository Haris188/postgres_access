
let data = { select: 'SELECT users', from: 'FROM db', where: '' }
queryString = `${data.select} ${data.from} ${data.where}`;
console.log(queryString);

