import { sessions } from '../sessions'
import { getUser } from '../api'

//Авторизация
export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin)

	//Если не найден то возвращаем ошибку
	if (!user) {
		return {
			error: 'Такой пользователь не найден',
			res: null,
		}
	}

	const { id, login, password, roleId } = user

	//Выдаем ошибку если пароль не соответствует
	if (authPassword !== password) {
		return {
			error: 'Неверный пароль',
			res: null,
		}
	}
	return {
		error: null,
		res: {
			id,
			login,
			roleId,
			session: sessions.create(user),
		},
	}
}
