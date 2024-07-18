const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
    })
    .populate('comments', {
      content: 1
    });

  return response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response
      .status(403)
      .json({ error: 'blog may be deleted only by user who created it' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  const updatedBlogData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  if (blog.user.toString() !== user._id.toString()) {
    if (
      updatedBlogData.title !== blog.title ||
      updatedBlogData.author !== blog.author ||
      updatedBlogData.url !== blog.url
    ) {
      return response.status(403).json({
        error: 'blog may be updated only by user who created it',
      });
    }
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlogData,
    { new: true }
  );
  response.json(updatedBlog);
});

blogsRouter.get('/:id/comments', async (request, response) => {

  const blog = await Blog.findById(request.params.id);

  const comments = await Comment.find({ blog: blog.id }).populate('blog', {
    title: 1
  });

  return response.json(comments);
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const user = request.user;
  const body = request.body;

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    content: body.content,
    blog: blog._id
  })


  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save();
  response.status(201).json(savedComment)
})

module.exports = blogsRouter;
