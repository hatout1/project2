module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
        date: {
            type: DataTypes.STRING,
            // allowNull: false,
            // validate: {
            //     len: [1, 140]
            // }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Favorite.associate = models => {
        Favorite.belongsTo(models.Users, {
            foreignKey: 'UserId'
            // foreignKey: {
            //     // allowNull: false
            // }
        });
        Favorite.belongsTo(models.Recipe, {
            foreignKey:
            {
                // allowNull: false
            }
        })
    };

    return Favorite;
};