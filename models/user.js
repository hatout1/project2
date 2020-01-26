module.exports = (sequlize, DataTypes) => {
    const Users = sequlize.define("Users", {
        UserId: {
            type: DataTypes.STRING,
            primaryKey: true,
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
        },
        country: {
            type: DataTypes.STRING,
        }
    })

    Users.associate = models => {
        Users.hasMany(models.Comments, {
            foreignKey: 'UserId',
            onDelete: "cascade"
        });
        Users.hasMany(models.Recipe, {
            foreignKey: 'UserId',
            onDelete: "cascade"
        });
        Users.hasMany(models.ShoppingList, {
            foreignKey: 'UserId',
            onDelete: "cascade"
        });
        Users.hasMany(models.Favorite, {
            foreignKey: 'UserId',
            onDelete: "cascade"
        });
    };


    return Users;
}