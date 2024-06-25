import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Todos:</h2>
                {this.props.todos.map((item) => (
                    <Todo
                        key={item.id}
                        item={item}
                        showCompleted={this.props.showCompleted}
                        toggleTodoItemCompleted={this.props.toggleTodoItemCompleted}
                    />
                ))}
                {this.props.todos.length ? "" : <p>No todo list items. Please add one below!</p>}
            </div>
        )
    }
}
