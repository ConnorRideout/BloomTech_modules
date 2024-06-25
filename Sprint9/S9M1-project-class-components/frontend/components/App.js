import React from 'react'
import TodoList from './TodoList'
import Form from './Form'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            showCompleted: true,
            formValue: ""
        }
    }
    addTodoItem = e => {
        e.preventDefault()
        let id = Date.now()
        this.setState({ todos: [...this.state.todos, { name: this.state.formValue, id, completed: false }], formValue: "" })
    }
    toggleTodoItemCompleted = itemId => {
        let updatedTodos = this.state.todos.map(({ name, id, completed }) => {
            return { name, id, completed: (id == itemId ? !completed : completed) }
        })
        this.setState({ todos: updatedTodos })
    }
    toggleShowCompleted = () => {
        this.setState({ showCompleted: !this.state.showCompleted })
    }
    handleFormChange = (e) => {
        this.setState({ formValue: e.target.value })
    }
    render() {
        return (
            <div>
                <TodoList
                    todos={this.state.todos}
                    showCompleted={this.state.showCompleted}
                    toggleTodoItemCompleted={this.toggleTodoItemCompleted}
                    toggleShowCompleted={this.toggleShowCompleted}
                />
                <Form
                    addTodoItem={this.addTodoItem}
                    handleFormChange={this.handleFormChange}
                    formValue={this.state.formValue}
                />
                <button onClick={this.toggleShowCompleted}>{this.state.showCompleted ? "Hide" : "Show"} Completed</button>
            </div>
        )
    }
}
