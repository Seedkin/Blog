import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { H2, PrivateContent } from '../../components'
import { TableRow, UserRow } from './components'
import { useServerRequest } from '../../hooks'
import { checkAcces } from '../../utils'
import { selectUserRole } from '../../selectors'
import { ROLE } from '../../bff/constants'
import styled from 'styled-components'

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([])
	const [roles, setRoles] = useState([])
	const [errorMessage, setErrorMessage] = useState()
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const userRole = useSelector(selectUserRole)

	const requestServer = useServerRequest()

	useEffect(() => {
		if (!checkAcces([ROLE.ADMIN], userRole)) {
			return
		}
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return
				}
				setUsers(usersRes.res)
				setRoles(rolesRes.res)
			},
		)
	}, [requestServer, shouldUpdateUserList, userRole])

	const onUserRemove = (userId) => {
		if (!checkAcces([ROLE.ADMIN], userRole)) {
			return
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList)
		})
	}

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registed-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => {
						return (
							<UserRow
								key={id}
								id={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
								onUserRemove={() => onUserRemove(id)}
							/>
						)
					})}
				</div>
			</div>
		</PrivateContent>
	)
}

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`
