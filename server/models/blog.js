'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Blog.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'title is required'},
        notNull: {msg: 'title is required'}
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'content is required'},
        notNull: {msg: 'content is required'}
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'author is required'},
        notNull: {msg: 'author is required'}
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'imgUrl is required'},
        notNull: {msg: 'imgUrl is required'},
        isUrl : {msg: 'imgUrl should be an url format'}
      }
    },
    comment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'comment is required'},
        notNull: {msg: 'comment is required'}
      },
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};