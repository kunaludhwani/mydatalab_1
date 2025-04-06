import usersdb from './usersdb';

module.exports.getUser = (req, res) => {
    usersdb.getUser()
        .then((data) => {
            return res.status(200).send({success: true, data: data});
        });
}
