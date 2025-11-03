//npx json-server@0.17.4 --watch db.json

import styled from 'styled-components';

const Div = styled.div`
	text-align: center;
`;

export const App = () => {
	return (
		<Div>
			<i class="fa fa-user-circle-o" aria-hidden="true"></i>
			<div>Блог о веб-разработке</div>
		</Div>
	);
};
