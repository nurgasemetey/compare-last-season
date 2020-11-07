import { TODO_CONSTANTS } from 'store/todo/constants';
import { Todo } from 'store/todo/models/todo.model';

interface AddTodoAction {
  type: typeof TODO_CONSTANTS.ADD_TODO_SUCCESS;
  payload: Todo;
}

interface ToggleTodoAction {
  type: typeof TODO_CONSTANTS.TOGGLE_TODO_SUCCESS;
  payload: Todo;
}

interface RemoveTodoAction {
  type: typeof TODO_CONSTANTS.REMOVE_TODO_SUCCESS;
  payload: Todo;
}

export type TodoActionTypes =
  | AddTodoAction
  | RemoveTodoAction
  | ToggleTodoAction;
