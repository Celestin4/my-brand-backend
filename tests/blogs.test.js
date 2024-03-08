const httpMocks = require('node-mocks-http');
const {
    createPost,
    deletePost,
    updatePost,
    getAllPosts,
    getSinglePost,
    likeBlogPost,
    shareBlogPost,
    updateViews,
    addCommentToPost
} = require('../controllers/blogsControllers');
const BlogPost = require('../models/blogsModel');

jest.mock('../models/blogsModel');

describe('Blog Controllers', () => {
    it('should create a new blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                title: 'Test Title',
                headlineText: 'Test Headline',
                content: 'Test Content',
                author: 'Test Author'
            },
            file: { filename: 'test_image.jpg' }
        });
        const res = httpMocks.createResponse();
        await createPost(req, res);
        expect(res.statusCode).toBe(204);
        expect(BlogPost.create).toHaveBeenCalled();
    });

    // Mock deletePost controller
    it('should delete a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'DELETE',
            params: {
                blogPostId: 'testId'
            }
        });
        const res = httpMocks.createResponse();
        await deletePost(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findByIdAndDelete).toHaveBeenCalledWith('testId');
    });

    // Mock updatePost controller
    it('should update a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'PUT',
            params: {
                blogPostId: 'testId'
            },
            body: {
                title: 'Updated Title',
                headlineText: 'Updated Headline',
                author: 'Updated Author',
                content: 'Updated Content',
                date: '2024-03-07'
            },
            file: { filename: 'updated_image.jpg' }
        });
        const res = httpMocks.createResponse();
        await updatePost(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findByIdAndUpdate).toHaveBeenCalledWith(
            'testId',
            expect.objectContaining({
                title: 'Updated Title',
                headlineText: 'Updated Headline',
                author: 'Updated Author',
                content: 'Updated Content',
                imageUrl: 'updated_image.jpg'
            }),
            expect.objectContaining({ new: true, runValidators: true })
        );
    });

    // Mock getAllPosts controller
    it('should get all blog posts', async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        await getAllPosts(req, res);
        expect(res.statusCode).toBe(201);
        expect(BlogPost.find).toHaveBeenCalled();
    });

    // Mock getSinglePost controller
    it('should get a single blog post', async () => {
        const req = httpMocks.createRequest({
            params: {
                blogPostId: 'testId'
            }
        });
        const res = httpMocks.createResponse();
        await getSinglePost(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findById).toHaveBeenCalledWith('testId');
    });

    // Mock likeBlogPost controller
    it('should like/unlike a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                userId: 'testUserId',
                blogId: 'testBlogId'
            }
        });
        const res = httpMocks.createResponse();
        await likeBlogPost(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findById).toHaveBeenCalledWith('testBlogId');
    });

    // Mock shareBlogPost controller
    it('should share a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                userId: 'testUserId',
                blogId: 'testBlogId'
            }
        });
        const res = httpMocks.createResponse();
        await shareBlogPost(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findById).toHaveBeenCalledWith('testBlogId');
    });

    // Mock updateViews controller
    it('should update views for a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
                userId: 'testUserId',
                blogId: 'testBlogId'
            }
        });
        const res = httpMocks.createResponse();
        await updateViews(req, res);
        expect(res.statusCode).toBe(200);
        expect(BlogPost.findById).toHaveBeenCalledWith('testBlogId');
    });

    // Mock addCommentToPost controller
    it('should add a comment to a blog post', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            params: {
                postId: 'testPostId'
            },
            body: {
                author: 'Test Author',
                content: 'Test Comment Content'
            }
        });
        const res = httpMocks.createResponse();
        await addCommentToPost(req, res);
        expect(res.statusCode).toBe(201);
        expect(BlogPost.findById).toHaveBeenCalledWith('testPostId');
    });
});
