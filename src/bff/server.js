// Прокси обеспечивает авторизацию пользователя, регистрацию и текущию сессию авторезованного пользователя
// Запросы которые зависят от роли пользователя
import { getUser } from './get-user';
import { addUser } from './add-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	//Авторизация
	async authorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		//Если не найден то возвращаем ошибку
		if (!user) {
			return {
				error: 'Такой пользователь не найден',
				res: null,
			};
		}
		//Выдаем ошибку если пароль не соответствует
		if (authPassword !== user.password) {
			return {
				error: 'Неверный пароль',
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	//Регистрация
	async register(regLogin, regPassword) {
		const user = getUser(regLogin);

		//Если найден то возвращаем ошибку
		if (user) {
			return {
				error: 'Такой логин уже занят',
				res: null,
			};
		}
		//Создание пользователя
		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
