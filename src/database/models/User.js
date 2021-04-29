module.exports = (sequelize, DataTypes) => {
    let alias = 'User';
    let cols = {
         id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: DataTypes.STRING(100),
        last_name: DataTypes.STRING(100),
        birthdate: DataTypes.DECIMAL(10,2),
        address: DataTypes.INTEGER,
        email:DataTypes.STRING(100),
        password:DataTypes.STRING(100),
        Password_confirm:DataTypes.STRING(100),
        newsletter: DataTypes.BOOLEAN,
        image:DataTypes.STRING(100),
    };
    // cambiar los nombres de las columnas 
    let options = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias,cols,options);
    return User;
}