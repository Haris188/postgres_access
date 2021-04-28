# postgres_access
Entry: database.js

A small library that provides a JS interface to Postgresql. This Library makes use of chained commands, hence makes your sql pretty. eg.
```
const Pg = new Database()

pg.get('name, email')
.from('users')
.where({id:'2'})
```
