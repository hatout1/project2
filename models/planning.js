module.exports = (sequelize, DataTypes) => {
    const Planning = sequelize.define("Planning", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        preparation: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 1500]
            }
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        meal: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
    });

    Planning.associate = models => {
        Planning.belongsTo(models.Users, {
            foreignKey: "UserId"
        });
        Planning.belongsTo(models.Recipe, {
            foreignKey: "recipeId"
        });
    };

    return Planning;
};