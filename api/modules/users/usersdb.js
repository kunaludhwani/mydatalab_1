import usersModel from './usersmodel';

/*
module.exports.addEmployee = (input) => {
    return new Promise((resolve, reject) => {
        employeeModel.create(input)
            .then((data) => {
                data = data.get({ plain: true });
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    });
}

module.exports.updateEmployee = (input, callback) => {
    return new Promise((resolve, reject) => {
    employeeModel.update(
        input,
        {
            where: { 'id': input.id },
            individualHooks: true
        }).then( data => {
            employeeModel.findAll({
                where: {
                    id: input.id,
                }
                })
                .then((result) => {
                    resolve(result);
                });
        });
    });
}

module.exports.deleteEmployee = (employeeId) => {
    return new Promise((resolve, reject) =>{
        employeeModel.destroy({ where: { id: employeeId } })
        .then((res) => {
            employeeModel.findAll({
                attributes: ['id','name','age','dob','address','photo','updatedAt'],
                raw: false
            })
            .then((result) => {
                resolve(result);
            });
        }).catch((err) => {
            reject(err);
        });
    })
}

module.exports.listEmployee = () => {
    return new Promise((resolve, reject) =>{
        employeeModel.findAll()
        .then((result) => {
            resolve(result);
        })
        .catch((err) => {
            reject(err);
        })
    });
};
*/

module.exports.getUser = async (input) => {
    try {
        const result = await usersModel.findOne({
            where: {
                email: input.login_id,
                password: input.password
            },
            attributes: ['id', 'email', 'name'] // only return these fields
        });
        return result || false;
    } catch (err) {
        return false;
    }
};
