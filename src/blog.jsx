import { useLayoutEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Header, Footer } from './components'
import { Authorization, Registration, Users, Post } from './pages'
import { setUser } from './actions'
import styled from 'styled-components'

//npx json-server@0.17.4 --watch db.json
//npx json-server@0.17.4 --watch src/db.json --port 3005

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
					<Route path="/" element={<div>Гланая страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья </div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="*" element={<div>Ошибка </div>} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	)
}
