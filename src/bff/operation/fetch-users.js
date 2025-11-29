import { sessions } from '../sessions';
import { getUsers } from '../api';
import { ROLE } from '../constants';

// Cетевой запрос ролей
export const fetchUsers = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];

	//Проверка на наличие доступа
	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	//Запрос ролей
	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
