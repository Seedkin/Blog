import { removeComment } from './session';
import { ROLE } from '../constants/role';

//Добавляем сессии согласно роли
export const createSession = (roleId) => {
	const session = {
		logout() {
			//Если пользователь разлогинелся то проходимся по сессии и удаляем методы
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};

	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {
			break;
		}
		default:
		//Ничего
	}
};
