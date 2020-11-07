import React from 'react';

import { List } from 'antd';

import { Todo } from 'store/todo/models/todo.model';
import { TodoItem } from 'components/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onTodoRemoval: (todo: Todo) => void;
  onTodoToggle: (todo: Todo) => void;
}

export const TodoList: React.StatelessComponent<TodoListProps> = ({
  todos,
  onTodoRemoval,
  onTodoToggle
}) => (
  <List
    locale={{
      emptyText: "There's nothing to do :("
    }}
    dataSource={todos}
    renderItem={todo => (
      <TodoItem
        todo={todo}
        onTodoToggle={onTodoToggle}
        onTodoRemoval={onTodoRemoval}
      />
    )}
    pagination={{
      position: 'bottom',
      pageSize: 10
    }}
  />
);
