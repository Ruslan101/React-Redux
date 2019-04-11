import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const onclick = 'ONCLICK'; // Деиствие (Action)
/* Действия — это структуры, которые передают данные из приложения в хранилище.
Они являются единственными источниками информации для хранилища.
Отправляются в хранилище, используя метод store.dispatch(). 
P.S Их можно и не определять. */

function actionCreator (bool) { // Генератор действия (Action Creator)
	return {
		type: onclick,
		bool
	};
}
/* Генераторы действий (Action Creators) — не что иное, как функции, которые создают действия.
Действия (Actions) описывают тот факт, что что-то совершилось. */

function reducer (state = { bool: false }, action) { // Редюсер (Reducer)
	if (action.type == onclick)
		return ({ bool: action.bool });
	else
		return state;
}
/*  Редюсер (reducer) — это чистая функция, которая принимает предыдущее состояние и действие (state и action)
и возвращает следующее состояние (новую версию предыдущего). */

/* Действия (actions), представляют факт того, что "что-то случилось" а редюсеры, обновляют состояние (state)
в соответствии с этими действиями. */

const store = createStore(reducer); // Хранилище (Store)
/* Хранилище (Store) — это объект, который соединяет все части вместе.
Хранилище берет на себя следующие задачи:
    Содержит состояние приложения (application state);
    Предоставляет доступ к состоянию с помощью getState();
    Предоставляет возможность обновления состояния с помощью dispatch(action);
    Регистрирует слушателей (listeners) c помощью subscribe(listener). */

console.log(store.getState()); // Вывод в консоль начальное состояние (Output in console initial state)

var unSubscribe = store.subscribe(() => console.log(store.getState())); // Декларация слушателя
/* Метод subscribe() Привязывает функцию слушатель которая будет вызыватся всякий раз когда состояние обновляется. */

store.dispatch(actionCreator(!store.getState().bool)); // Изменение состояния

// npm i -S react-redux *Для добавления реакта в Redux приложения или Redux в реакт приложение :D

class Main extends React.Component {
	render () {
		return (<input 
					type='submit' 
					value={ this.props.bool } 
					onClick={ () => this.props.dispatch(actionCreator(!this.props.bool)) } />);
	}
}

function mapStateToProps (state) { // Специальный контейнер для компонента
	return { bool: state.bool };
}
/* mapStateToProps говорит, как трансформировать текущее Redux-состояние хранилища в props
которые вы хотите передать в оборачиваемое (контейнером) представление. 
Если говорить кратко то эта функция записывает данные из state в props компонента (и организует логику обновления)*/

const WrapMainComponent = connect(mapStateToProps)(Main); // Связываем компонент Main через обёртку 

ReactDOM.render(<Provider store={ store }><WrapMainComponent /></Provider>, document.getElementById("root"));

//unSubscribe(); // Прекращяем слушать события


serviceWorker.unregister();
