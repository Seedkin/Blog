import { sessions } from '../sessions'
import { getRoles } from '../api'
import { ROLE } from '../constants'

// Cетевой запрос ролей
export const fetchRoles = async (hash) => {
	const accessRoles = [ROLE.ADMIN]

	const access = await sessions.access(hash, accessRoles)

	//Проверка на наличие доступа
	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		}
	}
	//Запрос ролей
	const roles = await getRoles()

	return {
		error: null,
		res: roles,
	}
}
