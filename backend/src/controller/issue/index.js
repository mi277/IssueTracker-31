import express from 'express'
import issueController from './issue'

const router = express.Router()

router.get('/', issueController.getIssues)

module.exports = router
