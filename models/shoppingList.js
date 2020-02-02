module.exports = (sequelize, DataTypes) => {
    const ShoppingList = sequelize.define("ShoppingList", {
        item: {
            type: DataTypes.STRING,

        },
        UserId: {
            type: DataTypes.STRING
        },
    });

    ShoppingList.associate = models => {
        ShoppingList.belongsTo(models.Users, {
            foreignKey: "UserId"
        });
    };

    return ShoppingList;
};