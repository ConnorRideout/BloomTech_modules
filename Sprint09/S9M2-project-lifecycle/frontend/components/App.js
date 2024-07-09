import React from 'react'
import TodoList from './TodoList'
import Form from './Form'
import Axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            showCompleted: true,
            formValue: ""
        }
    }
    componentDidMount() {
        Axios.get(URL)
            .then(res => this.setState({ todos: res.data.data }))
            .catch(err => console.log(err))
    }
    addTodoItem = e => {
        e.preventDefault()
        Axios.post(URL, { name: this.state.formValue })
            .then(res => this.setState({ todos: [...this.state.todos, res.data.data], formValue: "" }))
            .catch(err => console.log(err))
    }
    toggleTodoItemCompleted = itemId => {
        let updatedTodos = this.state.todos.map(({ name, id, completed }) => {
            return { name, id, completed: (id == itemId ? !completed : completed) }
        })
        this.setState({ todos: updatedTodos })
        Axios.patch(`${URL}/${itemId}`)
            .catch(err => console.log(err))
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
