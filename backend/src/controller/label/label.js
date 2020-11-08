import labelService from '../../service/label'
import resMessage from '../../util/resMessage'
import statusCode from '../../util/statusCode'
import errorResponse from '../../util/error-response'

const read = async (req, res) => {
  try {
    const { code, success, data, message } = await labelService.getLabel()
    return res.status(code).json({ success, data, message })
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  }
}

const create = async (req, res) => {
  const newLabelData = req.body
  try {
    const newLabelId = await labelService.postLabel(newLabelData)
    return res
      .status(statusCode.CREATED)
      .json({ success: true, data: { id: newLabelId } })
  } catch (err) {
    console.log(err)
    errorResponse(err, res)
  }
}

const erase = async (req, res) => {
  const labelId = req.params.labelId
  try {
    await labelService.deleteLabel(labelId)
    return res.status(statusCode.OK).json({ success: true })
  } catch (err) {
    console.log(err)
    errorResponse(err, res)
  }
}

export default {
  read,
  create,
  erase,
}
