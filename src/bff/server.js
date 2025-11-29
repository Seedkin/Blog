// Прокси обеспечивает авторизацию пользователя, регистрацию и текущию сессию авторезованного пользователя
// Запросы которые зависят от роли пользователя
import {
	authorize,
	fetchRoles,
	fetchUsers,
	logout,
	register,
	removeUser,
	updateUserRole,
} from './operation';

export const server = {
	authorize,
	logout,
	register,
	fetchUsers,
	fetchRoles,
	updateUserRole,
	removeUser,
};
