import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './App.css';

//Importing React components
import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import InProgressTaskList from './components/InProgressTaskList';


const INITIAL_LIST = [{title: 'Worry all day', details: 'Everyday', checked: false, isEditing: false},
                      {title: 'Day by day', details: 'Worry all day', checked: false, isEditing: false}];

const IN_PROGRESS_LIST = [{title: 'Yesterday when I was', details: 'Young', checked: false, isEditing: true},
                      {title: 'Eat more hamster', details: 'Slice it', checked: false, isEditing: true}];
//Do this onDragEnd
const rearrangeTasks = function(taskList, startIndex, endIndex) {
  const result = [...taskList];

  const removed = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: INITIAL_LIST,
      //inProgressTasks: IN_PROGRESS_LIST
    }
  }

  onDragStart = () => {
    console.log('dragging');
  };
  
  onDragEnd = (result) => {
    if(!result.destination) {
      return;
    }
    const newTasks = rearrangeTasks(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({ tasks: newTasks });
  };

  handleEditing(index) {
    const newTasks = [...this.state.tasks];
    newTasks[index].isEditing = true;
    this.setState({ tasks: newTasks})
  }

  handleTaskEdit(event, title, details, index) {
    event.preventDefault();
    const newTasks = [...this.state.tasks];
    if(!title || !details) { return; }

    newTasks[index] = { title, details, checked: false, isEditing: false};
    this.setState({ tasks: newTasks})
  }

  handleTaskRemove(index) {
    const newTasks = [...this.state.tasks];
    newTasks.splice(index, 1);

    this.setState({ tasks: newTasks })
  }

  handleTaskCheck(index) {
    const newTasks = [...this.state.tasks];
    newTasks[index].checked = !newTasks[index].checked;
    this.setState({ tasks: newTasks })
  }

  handleNewTaskAdd(newTask) {
    this.setState({tasks: [...this.state.tasks, {...newTask, checked: false}]});
  }

  render() {
    return (
      <DragDropContext
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}>
        <Grid columns={3} divided>
          <Grid.Column>
            <NewTask
              handleNewTaskAdd={this.handleNewTaskAdd.bind(this)}
              />
            <Droppable droppableId="task-list-1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  <TaskList
                    handleTaskRemove={this.handleTaskRemove.bind(this)}
                    handleTaskEdit={this.handleTaskEdit.bind(this)}
                    handleTaskCheck={this.handleTaskCheck.bind(this)}
                    handleEditing={this.handleEditing.bind(this)}
                    tasks={this.state.tasks}
                    />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid.Column>
          <Grid.Column>
            <InProgressTaskList

              />
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </DragDropContext>
    )
  }
}
export default App;
