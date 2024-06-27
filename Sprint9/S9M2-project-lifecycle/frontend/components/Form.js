import React from 'react'

export default class Form extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <form onSubmit={this.props.addTodoItem}>
                <input type="text" placeholder="Type todo" value={this.props.formValue} onChange={this.props.handleFormChange} />
                <input type="submit" />
            </form>
        )
    }
}
