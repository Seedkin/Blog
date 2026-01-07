import { sessions } from '../sessions'
import { getUsers } from '../api'
import { ROLE } from '../constants'

// Cетевой запрос ролей
export const fetchUsers = async (hash) => {
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
	const users = await getUsers()
	return {
		error: null,
		res: users,
	}
}
