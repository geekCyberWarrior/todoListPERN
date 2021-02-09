const Pool = require("pg").Pool;

const connectionString = "postgres://civkyftk:6mG4Qa57NPqR7PfoeuYavkD3ct1K7wVH@ziggy.db.elephantsql.com:5432/civkyftk";

const pool = new Pool({
    connectionString
});

module.exports = pool;
