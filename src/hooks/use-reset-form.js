import { useStore } from 'react-redux';
import { useEffect } from 'react';

export const useResetForm = (reset) => {
	const store = useStore();

	useEffect(() => {
		//Сброс формы при Логауте
		//Устанавливается текущее значение при монтировани компонента
		let currentWasLogout = store.getState().app.wasLogout;
		//Подписка и отписка
		return store.subscribe(() => {
			let prevWasLogout = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== prevWasLogout) {
				reset();
			}
		});
	}, [store, reset]);
};
