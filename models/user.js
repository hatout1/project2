module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.TEXT,
        },
        password: {
            type: DataTypes.TEXT,
        },
        username: {
            type: DataTypes.TEXT,
        },
        diet: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [3, 50]
            // }
        },
        adress: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.TEXT,
        },
        state: {
            type: DataTypes.TEXT,
        },
        zipcode: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [1, 5]
            // }
        },
        country: {
            type: DataTypes.STRING,
        }
    })


    return Users;
}