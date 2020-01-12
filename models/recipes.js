module.exports = (sequlize, DataTypes) => {
    const Recipe = sequlize.define("Recipe", {
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
        Preparation: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 1500]
            }
        }
    })
    return Recipe;
}