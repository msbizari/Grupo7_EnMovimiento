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
        birthdate: DataTypes.DATE,
        address: DataTypes.STRING(100),
        email:DataTypes.STRING(50),
        password:DataTypes.STRING(15),
        Password_confirm:DataTypes.STRING(15),
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