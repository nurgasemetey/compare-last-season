import React from 'react';
import { Row, Col, Card, PageHeader, Avatar } from 'antd';

import { Todo } from 'store/todo/models/todo.model';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from 'store/todo/actions';
import { RootState } from 'store/todo/reducers';
import { AddTodoForm } from 'components/AddTodoForm';
import { TodoList } from 'components/TodoList';
import { message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta';


interface RouterProps {
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface IState {
}

const THIS_SEASON = "2020-2021";

export class DashboardContainer extends React.Component<IProps, IState> {

  state = {
  }

  componentDidMount = async () => {

  }

  render() {
    return (
      <Row
        justify="center"
        align="middle"
        gutter={[10, 10]}
      >
        Home
      </Row>
    );
  }
}
