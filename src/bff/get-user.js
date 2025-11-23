import { getUsers } from './get-users';

//Ищем пользователя по логину
export const getUser = async (loginToFind) => {
	const users = await getUsers();

	return users.find(({ login }) => login === loginToFind);
};
