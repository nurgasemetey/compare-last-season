import React from 'react';
import { Row, Col, Card, PageHeader, Avatar } from 'antd';

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

const THIS_SEASON = "2020-21";

export class LeagueContainer extends React.Component<IProps, IState> {

  state = {
    teams: []
  }

  componentDidMount = async () => {
    console.log(this.props.match.params.leagueId);
    const data = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.clubs.json`);
    const clubSorted = data.clubs.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1)

    this.setState({ teams: clubSorted })
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
