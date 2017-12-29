import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      details: '',
      isBlank: false,
    };
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title, isBlank: false });
  }

  handleDetailsChange(event) {
    const details = event.target.value;
    this.setState({ details });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, details } = this.state;
    if (title) {
      this.props.handleNewTaskAdd({ title, details });
      this.setState({ title: '', details: '' });
    } else {
      this.setState({ isBlank: true });
    }
  }

  render() {
    const classNames = `ui input ${this.state.isBlank ? 'error' : 'input-add'}`;

    return (
      <div className="form">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <Input className={classNames} onChange={this.handleTitleChange.bind(this)} value={this.state.title} type="text" placeholder="Enter new task name" />
            <label>{this.state.message}</label>
            <Input className='input-add' onChange={this.handleDetailsChange.bind(this)} value={this.state.details} type="text" placeholder="Enter task details"/>
          <div className="button">
            <Button color="blue">Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTask;
