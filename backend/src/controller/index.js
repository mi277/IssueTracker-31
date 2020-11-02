import express from 'express'
import issueController from './issue'
import userController from './user'
import labelController from './label'
import milestoneController from './milestone'

const router = express.Router()

/* GET home page. test용(axios 스크립트) */
router.get('/', function (req, res) {
  res.send(' <script src="https://unpkg.com/axios/dist/axios.min.js"></script>')
})

router.use('/issues', issueController)
router.use('/users', userController)
router.use('/labels', labelController)
router.use('/milestones', milestoneController)

module.exports = router
