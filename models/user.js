module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define("Users", {
        userId: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
        },
        diet: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [3, 50]
            // }
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 5]
            }
        }
    })


    return Users;
}