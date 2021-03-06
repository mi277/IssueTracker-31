import db from '../model/comment'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const updateComment = async (id, userId, content) => {
  if (isNaN(id) || id < 1 || !content)
    return {
      code: statusCode.BAD_REQUEST,
      success: false,
      message: resMessage.OUT_OF_VALUE,
    }
  try {
    await db.updateComment(id, userId, content)
    return {
      code: statusCode.OK,
      success: true,
    }
  } catch (error) {
    if (error.message === 'NOT_EXIST')
      return {
        code: statusCode.BAD_REQUEST,
        success: false,
        message: resMessage.OUT_OF_VALUE,
      }
    if (error.message === 'NOT_MODIFIED')
      return { code: statusCode.NOT_MODIFIED }
    return {
      code: statusCode.DB_ERROR,
      success: false,
      message: resMessage.DB_ERROR,
    }
  }
}

const createComment = async (issueId, userId, content) => {
  if (isNaN(issueId) || issueId < 1 || !content)
    return {
      code: statusCode.BAD_REQUEST,
      success: false,
      message: resMessage.OUT_OF_VALUE,
    }
  try {
    const commentId = await db.postComment(issueId, userId, content, false)
    return {
      code: statusCode.OK,
      success: true,
      data: commentId,
    }
  } catch (error) {
    if (error.message === 'DB')
      return {
        code: statusCode.DB_ERROR,
        success: false,
        message: resMessage.DB_ERROR,
      }
  }
}

export default {
  updateComment,
  createComment,
}
