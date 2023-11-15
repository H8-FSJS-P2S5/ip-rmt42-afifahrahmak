const CategoryController = require('../controllers/category')
const CommentController = require('../controllers/comment')
const PostController = require('../controllers/post')
const ProfileController = require('../controllers/profile')
const UserController = require('../controllers/user')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/authentication')
const { profileAuthorization, postAuthorization } = require('../middlewares/authorization')

const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/login/google', UserController.loginOAuth)
router.get('/posts', PostController.posts)

router.use(authentication)

router.patch('/upgrade/:userId', UserController.upgradeUser)

router.post('/add-profile' , ProfileController.create)
router.get('/profile/:username', ProfileController.getProfile)
router.put('/profile/:username/edit', profileAuthorization, ProfileController.editProfile)

router.post('/category/add', CategoryController.addCategory)
router.get('/categories', CategoryController.categories)

router.post('/post/add', PostController.addPost)
router.put('/post/:postId/edit',postAuthorization, PostController.editPost)

router.post('/post/:postId/comment', CommentController.addComment)

router.use(errorHandler)

module.exports = router