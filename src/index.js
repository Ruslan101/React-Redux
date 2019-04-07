import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

const rootReducer = (state = { value: '' }, action) => { // Функция обрабатывающая события
	switch (action.type) {
		case 'CHANGE VALUE': return { ...state, value:action.payload }
	}
	return state;
};

const store = createStore(rootReducer); // Создание базы данных где хранятся состояния

class MainComponent extends React.Component {
	render() {
		return (
			<div>
				<input onChange = { (event) => this.props.dispatch( { type: 'CHANGE VALUE', payload: event.target.value } ) } />
				<p>{ this.props.value }</p>
			</div>
		);
	}
}

const putStateToProps = (state) => { // Записывает данные из state в props
	console.log(state);
	return {
		value: state.value
	};
};

const WrapperMainComponent = connect (putStateToProps)(MainComponent); // Обёртка для обьекта

ReactDOM.render(<Provider store={store}><WrapperMainComponent /></Provider>, document.querySelector("#root"));











serviceWorker.unregister();
