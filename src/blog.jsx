import { useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Authorization, Registration, Users, Post, Main } from './pages'
import { Error, Header, Footer, Modal } from './components'
import { setUser } from './actions'
import { ERROR } from './constants'
import styled from 'styled-components'

//npx json-server@0.17.4 --watch src/db.json --port 3005

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`

const Page = styled.div`
	padding: 120px 0 20px;
`

export const Blog = () => {
	const dispatch = useDispatch()
	//Срабатывает до отрисовки компонентов
	useLayoutEffect(() => {
		//Читаем текущую сессию из sessionStorage
		const currentUserDataJSON = sessionStorage.getItem('userData')
		if (!currentUserDataJSON) {
			return
		}

		const currentUserData = JSON.parse(currentUserDataJSON)

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		)
	}, [dispatch])

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColumn>
	)
}
