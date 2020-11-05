import React, { useContext, useEffect } from 'react'
import Label from '../common/Label'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import { getTimePassedFromNow } from '../../util/util'

const Issue = ({
  id,
  title,
  createdAt,
  label = [],
  milestone,
  assignee = [],
  checkedIssues,
  setCheckedIssues,
}) => {
  const selectIssue = id => {
    if (checkedIssues.includes(id))
      setCheckedIssues(checkedIssues.filter(v => v !== id))
    else setCheckedIssues([...checkedIssues, id])
  }
  const handleChange = () => selectIssue(id)

  return (
    <StyledRow>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={checkedIssues.includes(id)}
      />
      <StyledArticle>
        <StyledLink to={`/issues/${id}`}>{title}</StyledLink>
        <StyledLabels>
          {label.map((item, i) => (
            <Label key={item.name + i} {...item} />
          ))}
        </StyledLabels>
        <StyledIssueInfo>
          {`#${id} opened ${getTimePassedFromNow(createdAt)} `}
          {milestone}
        </StyledIssueInfo>
      </StyledArticle>
      <StyledAssignees>
        {assignee.map(user => (
          <img src={user.profileUrl}></img>
        ))}
      </StyledAssignees>
    </StyledRow>
  )
}
const StyledRow = styled.div`
  display: flex;
  &:hover {
    background-color: #f6f8fa;
  }
  border-top: 1px solid #ededed;
  padding: 16px;
`
const StyledArticle = styled.article`
  flex: auto;
`
const StyledIssueInfo = styled.div`
  color: #586069;
  font-size: 12px;
`
const StyledLabels = styled.div`
  display: inline;
`
const StyledAssignees = styled.div`
  width: 25%;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  font-size: 16px;
  font-weight: 600;
`

export default Issue
