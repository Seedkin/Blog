// Прокси обеспечивает авторизацию пользователя, регистрацию и текущию сессию авторезованного пользователя
// Запросы которые зависят от роли пользователя
import { getUser } from './get-user';
import { addUser } from './add-user';
import { createSession } from './create-session';

export const server = {
	//Авторизация
	async authorize(authLogin, authPassword) {
		const user = getUser(authLogin);

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
			res: createSession(user.role_id),
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
			res: createSession(user.role_id),
		};
	},
};
