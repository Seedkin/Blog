import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Comment } from './components/comment/comment'
import { Icon } from '../../../../components'
import { selectUserId, selectUserRole } from '../../../../selectors'
import { useServerRequest } from '../../../../hooks'
import { addCommentAsync } from '../../../../actions'
import { ROLE } from '../../../../constants'
import styled from 'styled-components'

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('')
	const userRole = useSelector(selectUserRole)
	const userId = useSelector(selectUserId)
	const requestServer = useServerRequest()
	const dispatch = useDispatch()

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content))
		setNewComment('')
	}

	const isGuest = userRole === ROLE.GUEST

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комминтарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						size="18px"
						onClick={() => onNewCommentAdd(userId, postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						postId={postId}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	)
}

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 580px;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 550px;
		resize: none;
		height: 120px;
		font-size: 18px;
	}
`
