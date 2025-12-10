import { getSession, addSession, deleteSession } from './api'

export const sessions = {
	//Создаем сессию 'Залогинелись'
	create(user) {
		const hash = Math.random().toFixed(50)

		addSession(hash, user)

		return hash
	},
	//Удаляем сессию 'разлогинелись'
	async remove(hash) {
		const session = await getSession(hash)

		if (!session) {
			return
		}
		deleteSession(session.id)
	},
	async access(hash, accessRoles) {
		const dbSession = await getSession(hash)

		//Проверка наличия пользователя и его роль
		return !!dbSession.user && accessRoles.includes(dbSession.user.roleId)
	},
}
