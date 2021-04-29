module.exports = (sequelize, DataTypes) => {
    let alias = 'Color';
    let cols = {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING(100),
    };
    // cambiar los nombres de las columnas 
    let options = {
        tableName: 'colors',
        timestamps: false
    }

    const Color = sequelize.define(alias,cols,options);
    
    Color.associate = function(models){
        Color.belongsToMany(models.Product,{
            as: "products",
            through: 'products_color',
            foreignKey: 'color_id',
            otherKey: 'product_id',
            timestamps: false
        })
    }
    return Color;
}