import usersdb from './usersdb';



module.exports.usersdb = (req, res) => {
    employeedb.usersdb()
        .then((data) => {
            return res.status(200).send({success: true, data: data});
        });
}
