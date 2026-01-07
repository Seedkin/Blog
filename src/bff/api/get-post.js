import { transformPost } from '../transformers'

//Ищем пользователя по логину
export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) {
				return res
			}
			const error =
				res.status === 404
					? 'Такой страница не существует'
					: 'Что-то пошло не так. Попробуйте позднее'

			return Promise.reject(error)
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
