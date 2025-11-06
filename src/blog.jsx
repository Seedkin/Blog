import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import styled from 'styled-components';

//npx json-server@0.17.4 --watch db.json

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Content = styled.div`
	padding: 120px 0;
`;

const H2 = styled.h2`
	text-align: center;
`;

const Footer = () => <div>Футер</div>;

export const Blog = () => {
	return (
		<AppColumn>
			<Header />
			<Content>
				<H2>Контент</H2>
				<Routes>
					<Route path="/" element={<div>Гланая страница</div>} />
					<Route path="/login" element={<div>Авторизация </div>} />
					<Route path="/register" element={<div>Регистрация </div>} />
					<Route path="/users" element={<div>Пользователи </div>} />
					<Route path="/post" element={<div>Новая статья </div>} />
					<Route path="/post/:postId" element={<div>Статья </div>} />
					<Route path="*" element={<div>Ошибка </div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColumn>
	);
};
