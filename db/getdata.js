const con = require('./dbconnect');

let data;
con.query("SELECT * FROM room", (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    data = result;
});

con.end();

module.exports = data;