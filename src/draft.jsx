import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import React, { Component } from 'react';

const ITEMS = ['item 0', 'item 1', 'item 2', 'item 3']

const rearrangeItems = function(list, dragStart, dragEnd) {
  const result = Array.from(list);
  const removed = result.splice(dragStart, 1);
  result.splice(dragEnd, 0, removed);

  return result;
}

class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ITEMS,
    }
  }

  renderItems() {
    return (
      this.state.items.map((item) => (
      <Draggable key={item} draggableId={item}>
        {(provided, snapshot) => (
          <div

            ref={provided.innerRef}
            {...provided.dragHandleProps}
            >
            {item}
             {provided.placeholder}
          </div>
        )}
      </Draggable>)
    )
    )
  }

  onDragStart = () => {
    console.log('dragging');
  };
  onDragEnd = (result) => {
    console.log(result);
    if(!result.destination) {
      return;
    }

    const items = rearrangeItems(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({ items })
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Droppable droppableId="droppable-1">
          {(provided, snapshot) => (
            <div
               ref={provided.innerRef}
               >
                {this.renderItems()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

 export default Draft;
