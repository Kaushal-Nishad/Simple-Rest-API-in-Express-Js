const fs = require('fs');

function logReqRes(file) {
    return (req, res, next) => {
        fs.appendFile(file, `\n [${new Date().toString()}], path - ${req.url}, Request Method - ${req.method} , Ip - ${req.ip}\n`,
        (err, data) => {
            next();
        });
    }
};
module.exports = {
    logReqRes,
}