import { transformPost } from '../transformers'

//Ищем пользователя по логину
export const getPost = async (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost))
