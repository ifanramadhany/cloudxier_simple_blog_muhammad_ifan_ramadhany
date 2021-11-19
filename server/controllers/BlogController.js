const { Blog } = require('../models');

class BlogController {
  static async createBlog(req, res, next) {
    const { title, content, author, imgUrl } = req.body;
    try {
      const blogData = await Blog.create({
        title,
        content,
        author,
        imgUrl
      })
      res.status(201).json(blogData)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async getAllBlog(req, res, next) {
    try {
      const blogData = await Blog.findAll({
        order: [["updatedAt" || "createdAt", "DESC"]]
      })
      res.status(200).json(blogData)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async getBlogById(req, res, next) {
    const { id } = req.params
    try {
      const blogData = await Blog.findByPk(id)
      if(!blogData) {
        throw {name: 'blogNotFound'}
      }
      res.status(200).json(blogData)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async updateBlog(req, res, next) {
    const { id } = req.params
    const { title, content, author, imgUrl } = req.body;
    try {
      const blogData = await Blog.findByPk(id)
      if(!blogData) {
        throw {name: 'blogNotFound'}
      }
      const updateBlog = await Blog.update(
        {
          title,
          content,
          author,
          imgUrl
        },
        { where: {id}, returning: true }
      )
      res.status(200).json({message: `Blog with id ${updateBlog[1][0].id} has been updated`})
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async deleteBlog(req, res, next) {
    const { id } = req.params
    try {
      const blogData = await Blog.findByPk(id)
      if(!blogData) {
        throw {name: 'blogNotFound'}
      }
      await Blog.destroy(
        {
          where: { id }
        }
      )
      res.status(200).json({message: `Blog data with ${id} has been deleted`})
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = BlogController