export const sessions = {
	list: {},
	//Создаем сессию 'Залогинелись'
	create(user) {
		const hash = Math.random().toFixed(50);

		this.list[hash] = user;

		return hash;
	},
	//Удаляем сессию 'разлогинелись'
	remove(hash) {
		delete this.list[hash];
	},
	access(hash, accessRoles) {
		const user = this.list[hash];
		//Проверка наличия пользователя и его роль
		return !!user && accessRoles.includes(user.roleId);
	},
};
