module.exports = (sequlize, DataTypes) => {
    const Recipe = sequlize.define("Recipe", {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        recipeId: {
            type: DataTypes.INTEGER,
            // autoIncrement: true,
            // primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 50]
            }
        },
        majorIngr: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        ingredients: {
            type: DataTypes.TEXT,
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
        UserId: {
            type: DataTypes.STRING
        }
    })

    Recipe.associate = models => {
        Recipe.belongsTo(models.Users, {
            foreignKey: "UserId"
        });
    }

    Recipe.associate = models => {
        Recipe.hasMany(models.Comments, {
            foreignKey: "recipeId",
            onDelete: "cascade"
        });
    };

    Recipe.associate = models => {
        Recipe.hasMany(models.Favorite, {
            foreignKey: "recipeId"
        });
    };

    return Recipe;
}