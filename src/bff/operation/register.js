import { sessions } from '../sessions'
import { getUser, addUser } from '../api'

//Регистрация
export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin)

	//Если найден то возвращаем ошибку
	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		}
	}
	//Создание пользователя
	const user = await addUser(regLogin, regPassword)
	console.log(user)
	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			roleId: user.role_id,
			session: sessions.create(user),
		},
	}
}
