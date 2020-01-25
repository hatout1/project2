module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
        date: {
            type: DataTypes.STRING
        },
        UserId: {
            type: DataTypes.STRING
        },
        recipeId: {
            type: DataTypes.INTEGER
        },
        // Id: {
        //     type: DataTypes.INTEGER
        // },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });
    Comments.associate = models => {
        Comments.belongsTo(models.Users, {
            foreignKey: "UserId"
        });
        Comments.belongsTo(models.Recipe, {
            foreignKey: "recipeId"
        });
    };

    return Comments;
};
