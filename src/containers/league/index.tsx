import React from 'react';
import { Row, Col, Card, PageHeader, Avatar, Layout } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';

import { RouteComponentProps } from 'react-router-dom';
import { LEAGUE_MAP } from 'configs/LeagueConstants';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;


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
    const clubSorted = data.clubs.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
    this.setState({ teams: clubSorted })
  }

  render() {
    const { teams } = this.state;
    return (
      <>
        <Layout>
          {/* <Header>Header</Header> */}
          <Content>
          <PageHeader
              title={LEAGUE_MAP.get(this.props.match.params.leagueId) || "Default"}
              // subTitle="Comparison of last and this season. Last match added: Chelsea-Sheffield 2020-11-07"
              // avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
              breadcrumb={{
                routes: [{
                  path: '/',
                  breadcrumbName: 'Home',
                },
                {
                  path: `/league/${this.props.match.params.leagueId}`,
                  breadcrumbName: LEAGUE_MAP.get(this.props.match.params.leagueId) || "Default",
                },
                ]
              }}
              extra={[
                <a
                  href="https://github.com/nurgasemetey/compare-last-season"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "16px" }}
                >
                  Star on Github <GithubFilled />
                </a>,
                <a
                  href="https://twitter.com/nurgasemetey"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ fontSize: "16px" }}
                >
                  Follow on Twitter <TwitterSquareFilled />
                </a>
              ]}
            />
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
                        this.props.history.push(`/league/${this.props.match.params.leagueId}/team/${team.name}`);
                      }}
                    // cover={<img alt="example" src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                    >
                      <Meta
                        // avatar={<Avatar src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                        title={team.name}
                      // description="This is the description"
                      />
                    </Card>
                  </Col>

                )
              })
              }
            </Row>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>

      </>

    );
  }
}
