module.exports = (sequlize, DataTypes) => {
    const User = sequlize.define("User", {
        userID: {
            type: DataTypes.INTEGER
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
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 5]
            }
        }
    })
    return User;
}