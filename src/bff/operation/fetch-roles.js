import { sessions } from '../sessions';
import { getRoles } from '../api';
import { ROLE } from '../constants';

// Cетевой запрос ролей
export const fetchRoles = async (userSession) => {
	const accessRoles = [ROLE.ADMIN];
	//Проверка на наличие доступа
	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}
	//Запрос ролей
	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
