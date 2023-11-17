const CategoryController = require('../controllers/category')
const CommentController = require('../controllers/comment')
const PostController = require('../controllers/post')
const ProfileController = require('../controllers/profile')
const UserController = require('../controllers/user')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { profileAuthorization, postAuthorization, statusAuthorization, commentAuthorization } = require('../middlewares/authorization')

const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/login/google', UserController.loginOAuth)
router.get('/pub/posts', PostController.posts)

router.use(authentication)

router.patch('/upgrade/:userId', UserController.upgradeUser)
router.get('/payment/:userId', UserController.payment)
router.get('/profile/:username', ProfileController.getProfile)
router.put('/profile/:username/edit', profileAuthorization, ProfileController.editProfile)

router.post('/category/add', CategoryController.addCategory)
router.get('/categories', CategoryController.categories)

router.get('/posts', PostController.posts)
router.get('/post/:postId', statusAuthorization, PostController.detailPost)
router.post('/post/add', PostController.addPost)
router.put('/post/:postId/edit',postAuthorization, PostController.editPost)

router.post('/post/:postId/comment', CommentController.addComment)
router.delete('/post/:postId/comment/:commentId', commentAuthorization, CommentController.destroyComment)

router.use(errorHandler)

module.exports = router