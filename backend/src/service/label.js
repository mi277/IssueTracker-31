import db from '../model/label'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const getLabel = async () => {
  try {
    const labels = await db.getLabel()
    return {
      code: statusCode.OK,
      success: true,
      data: labels,
    }
  } catch (e) {
    console.log(e)
    return {
      code: statusCode.DB_ERROR,
      success: false,
      message: resMessage.DB_ERROR,
    }
  }
}


const isValidNewLabelData = ({ name, description, color }) => {
  if (!name || !color) return false
  if (typeof name !== 'string') return false
  if (typeof color !== 'string' && color[0] !== '#') return false
  if (description && typeof description !== 'string') return false
  const rgb = color.substr(1)
  if (rgb.length !== 6) return false
  for (const digit of rgb) {
    if (
      (digit < '0' || digit > '9') &&
      (digit < 'a' || digit > 'f') &&
      (digit < 'A' || digit > 'F')
    )
      return false
  }
  return true
}

export default {
  getLabel,
}
