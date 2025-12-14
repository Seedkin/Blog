import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useServerRequest } from '../../../../hooks'
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions'
import { Icon } from '../../../../components'
import styled from 'styled-components'

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch()
	const requestServer = useServerRequest()
	const navigate = useNavigate()

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConferm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		)
	}

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						id="fa-calendar-o"
						margin="0 7px 0 0"
						size="18px"
						inactive={true}
					/>
				)}
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				{publishedAt && (
					<Icon
						id="fa-trash-o"
						size="20px"
						margin="0 0 0 10px"
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>
		</div>
	)
}

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .published-at {
		display: flex;
		font-size: 18px;
	}

	& .buttons {
		display: flex;
	}
`
