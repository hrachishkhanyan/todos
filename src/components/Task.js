import React, { Component } from 'react';
import { List, Checkbox, Segment, Input, Button } from 'semantic-ui-react';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.task.title,
      details: props.task.details,
    }
  }

  handleTitleChange(event) {
    const title = event.target.value;
    this.setState({ title });
  }

  handleDetailsChange(event) {
    const details = event.target.value;
    this.setState({ details })
  }



  render() {
    const { task: { index, title, details, checked, isEditing } } = this.props;
    const classNames = checked ? 'task-checked' : '';
    return (
      <Segment>
        <List.Item className={classNames}>
          {
            isEditing ?
            <List.Content>
              <form onSubmit={(event) => {this.props.handleTaskEdit(event, this.state.title, this.state.details, index)}}>
                <Input onChange={this.handleTitleChange.bind(this)} value={this.state.title} className="input-edit title"/>
                <Button className="button-edit" type="submit">
                  <i aria-hidden="true" className="write icon"></i>
                </Button>
                <Input onChange={this.handleDetailsChange.bind(this)} value={this.state.details} className="input-edit details"/>
              </form>
            </List.Content>
            :
            <List.Content>
              <List.Header>
                {title}
                <i aria-hidden="true" className="trash icon" onClick={() => this.props.handleTaskRemove(index)}></i>
                <i aria-hidden="true" className="edit icon" onClick={() => this.props.setEditingMode(index)}></i>
                <Checkbox onClick={() => this.props.handleTaskCheck(index)}/>
              </List.Header>
              {details}
            </List.Content>
          }
        </List.Item>
      </Segment>
    )
  }
}

export default Task;
