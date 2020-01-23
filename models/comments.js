module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
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

    Comment.associate = models => {
        Comment.belongsTo(models.Users, {
            foreignKey: 'userId'
            // foreignKey: {
            //     // allowNull: false
            // }
        });
        Comment.belongsTo(models.Recipe, {
            foreignKey:
            {
                // allowNull: false
            }
        })
    };

    return Comment;
};
