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
};
