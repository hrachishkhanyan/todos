import React from 'react';
import { Segment } from 'semantic-ui-react';
import reverse from 'lodash/reverse';
import { Draggable } from 'react-beautiful-dnd';
// Importing react components
import Task from './Task';

export default ({ tasks: stateTasks, handleTaskEdit, handleTaskCheck, handleTaskRemove, handleEditing}) => {
  const indexedTasks = stateTasks.map((task, index) => ({ ...task, index }));
  const tasks = reverse(indexedTasks).map((task, index) => {
    return (
      <Draggable key={`${task.title}-${index}`} draggableId={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}>
              <Task
                index={index}
                task={task}
                handleTaskEdit={handleTaskEdit}
                handleTaskCheck={handleTaskCheck}
                handleTaskRemove={handleTaskRemove}
                setEditingMode={handleEditing}
                />
                {provided.placeholder}
            </div>
            )
          }
        </Draggable>
      )
  })

  return (
    <Segment.Group stacked>
        {tasks}
    </Segment.Group>
  );
}
