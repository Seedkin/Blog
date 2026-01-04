import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectUserSession } from '../selectors'
import { server } from '../bff'

export const useServerRequest = () => {
	const session = useSelector(selectUserSession)
	return useCallback(
		(operation, ...params) => {
			//Не запрашиваем сессию в регистрации и авторизации
			const request = ['register', 'authorize', 'fetchPost', 'fetchPosts'].includes(
				operation,
			)
				? params
				: [session, ...params]

			return server[operation](...request)
		},
		[session],
	)
}
