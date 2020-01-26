module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.STRING,
        },
        preparation: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 1500]
            }
        },
    });

    Favorite.associate = models => {
        Favorite.belongsTo(models.Users, {
            foreignKey: "UserId"
        });
        Favorite.belongsTo(models.Recipe, {
            foreignKey: "recipeId"
        });
    };

    return Favorite;
};