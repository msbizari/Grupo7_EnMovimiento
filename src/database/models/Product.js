module.exports = (sequelize, DataTypes) => {
    let alias = 'Product';
    let cols = {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.TEXT('tiny'),
        release_date: DataTypes.DATE,
    };
    // cambiar los nombres de las columnas 
    let options = {
        tableName: 'product',
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,options);
    return Product;
}