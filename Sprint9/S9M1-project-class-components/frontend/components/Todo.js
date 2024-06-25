import React from 'react'

export default class Todo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p
                    style={{ cursor: "pointer", display: (this.props.showCompleted ? "block" : this.props.item.completed ? "none" : "block") }}
                    onClick={() => this.props.toggleTodoItemCompleted(this.props.item.id)}
                >{this.props.item.name}{this.props.item.completed ? " ✔" : ""}</p>
            </div >
        )
    }
}
