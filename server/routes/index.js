const CategoryController = require('../controllers/category')
const GameController = require('../controllers/game')
const PostController = require('../controllers/post')
const ProfileController = require('../controllers/profile')
const UserController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const { profileAuthorization } = require('../middlewares/authorization')

const router = require('express').Router()

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use(authentication)

router.patch('/upgrade/:userId', UserController.upgradeUser)

router.post('/add-profile' , ProfileController.create)
router.get('/profile/:username', ProfileController.getProfile)
router.put('/profile/:username/edit', profileAuthorization, ProfileController.editProfile)

router.post('/category/add', CategoryController.addCategory)
router.get('/categories', CategoryController.categories)

router.post('/post/add', PostController.addPost)
router.get('/posts', PostController.posts)
router.put('/post/:postId/edit', PostController.editPost)

module.exports = router