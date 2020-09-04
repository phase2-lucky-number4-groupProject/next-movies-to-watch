'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: 
    {
      type : DataTypes.STRING,
      validate :
      {
        isEmail :
        {
          args : true,
          msg : `Format email salah`
        },
        notEmpty:
        {
          args : true,
          msg : 'email tidak boleh kosong'
        }
      },
      unique : true
    },
    password:
    {
      type : DataTypes.STRING,
      validate : 
      {
        len: 
        {
          args: [6, 20],
          msg: 'jumlah minimal karakter sebanyak 6 karakter'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:
    {
      beforeCreate: (user, opt) =>
      {
        user.password = hashPass(user.password);
      }
    }
  });
  return User;
};