import { ACTION_TYPE } from '../actions'

const initialUserState = {
	id: '',
	title: '',
	imageUrl: '',
	content: '',
	publishedAt: '',
	comments: [],
}

export const postReduser = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
			}
		default:
			return state
	}
}
