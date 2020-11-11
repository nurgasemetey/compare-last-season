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
  leagueId: string
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface IState {
  teams: any[]
}

const THIS_SEASON = "2020-2021";

export class LeagueContainer extends React.Component<IProps, IState> {

  state = {
    teams: []
  }

  componentDidMount = async () => {
    console.log(this.props.match.params.leagueId);
    let teams: any[] = [];
    const data = require(`../../assets/data/leagues/premier-league/${THIS_SEASON}/teams.json`);
    // teams.push({
    //   name:"ee"
    // })
    // console.log(data);
    this.setState({ teams: data })
  }

  render() {
    const { teams } = this.state;
    return (
      <Row
        justify="center"
        align="middle"
        gutter={[10, 10]}
        className="todos-container"
      >
        {teams.map((team: any) => {
          return (
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
            >
              <Card
                // title={team.name}
                // headStyle={{ textAlign: "center" }}
                hoverable
                // style={{ width: 240 }}
                bordered={false}
                onClick={(e: any) => {
                  this.props.history.push(`/league/${this.props.match.params.leagueId}/team/chelsea`);
                }}
              // cover={<img alt="example" src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
              >
                <Meta
                  avatar={<Avatar src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                  title={team.name}
                // description="This is the description"
                />
              </Card>
            </Col>

          )
        })
        }
      </Row>
    );
  }
}
