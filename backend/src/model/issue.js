import db from './index'
import query from './query/issue'

const getIssues = async filterValues => {
  const sql = query.getIssuesQueryString(filterValues)
  try {
    const [rows] = await db.query(sql)
    return rows
  } catch (err) {
    throw new Error('DB')
  }
}

const postIssue = async (connection, { title, userId, milestoneId }) => {
  try {
    const [result] = await connection.query(query.postIssueQueryString, {
      title,
      userId,
      milestoneId,
    })
    return result.insertId
  } catch (err) {
    throw new Error('DB')
  }
}

const getIssueDetail = async (issueId, connection) => {
  connection = connection ? connection : db
  try {
    const [rows] = await connection.query(
      query.getIssueDetailQueryString,
      issueId,
    )
    return rows
  } catch (err) {
    throw new Error('DB')
  }
}

const setIssueRelations = async (
  connection,
  table,
  firstColumn,
  secondColumn,
  relations,
) => {
  try {
    await connection.query(
      query.setIssueRelationQueryString(table, firstColumn, secondColumn),
      [relations],
    )
  } catch (err) {
    throw new Error('DB')
  }
}

const updateIssueState = async (connection, { issueId, isOpen }) => {
  try {
    await connection.query(query.updateIssueState, [isOpen, issueId])
  } catch (err) {
    throw new Error('DB')
  }
}

const updateIssue = async (issueId, issueData, connection = db) => {
  try {
    await connection.query(query.updateIssueQueryString, [issueData, issueId])
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

export default {
  getIssues,
  postIssue,
  setIssueRelations,
  updateIssueState,
  getIssueDetail,
  updateIssue,
}
