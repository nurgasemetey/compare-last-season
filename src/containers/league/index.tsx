import React from 'react';
import { Row, Col, Card, PageHeader, Avatar, Layout, Spin, Alert } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';

import { RouteComponentProps } from 'react-router-dom';
import { LEAGUES } from 'configs/LeagueConstants';
import { RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;


interface RouterProps {
  leagueId: string
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface IState {
  teams: any[],
  loading:boolean
}

const THIS_SEASON = "2020-21";

export class LeagueContainer extends React.Component<IProps, IState> {

  state = {
    teams: [],
    loading: false
  }

  componentDidMount = async () => {
    this.setState({loading: true});
    console.log(this.props.match.params.leagueId);
    const response = await fetch(`https://raw.githubusercontent.com/openfootball/football.json/master/${THIS_SEASON}/${this.props.match.params.leagueId}.clubs.json`);
    const data = await response.json();
    // const data = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.clubs.json`);
    const clubSorted = data.clubs.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
    this.setState({ teams: clubSorted, loading: false })
  }

  render() {
    const { teams, loading} = this.state;
    if(loading) {
      return(
        <div
            // style={{
            //     "text-align": "center",
            //     "background": "rgba(0, 0, 0, 0.05)",
            //     "border-radius": "4px",
            //     "margin-bottom": "20px",
            //     "padding": "30px 50px",
            //     "margin": "20px 0",
            // }}
            >
                <Row justify="center" align="middle"
                    style={{ minHeight: '100vh' }}
                >
                    <Spin
                    size="large"
                    // style={{ height: '50%' }}
                    />
                </Row>

            </div>
      )
    }
    return (
      <>
        <Layout>
          {/* <Header>Header</Header> */}
          <Content>
            <PageHeader
              title={LEAGUES.filter(a => a.code === this.props.match.params.leagueId)[0].name}
              // subTitle="Comparison of last and this season. Last match added: Chelsea-Sheffield 2020-11-07"
              // avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
              breadcrumb={{
                routes: [{
                  path: '/',
                  breadcrumbName: 'Home',
                },
                {
                  path: `/league/${this.props.match.params.leagueId}`,
                  breadcrumbName: LEAGUES.filter(a => a.code === this.props.match.params.leagueId)[0].name,
                },
                ]
              }}
              extra={[
                <TwitterShareButton
                  url="https://compare-last-season.netlify.app"
                  title="Compare team's last season and this season"
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>,
                <RedditShareButton
                  url="https://compare-last-season.netlify.app"
                  title="Compare team's last season and this season"
                  windowWidth={660}
                  windowHeight={460}
                  className="Demo__some-network__share-button"
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>,
                <TelegramShareButton
                  url="https://compare-last-season.netlify.app"
                  title="Compare team's last season and this season"
                  className="Demo__some-network__share-button"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              ]}
            />
            <Row
              justify="center"
              align="middle"
              // style={{ marginTop: 20 }}
              gutter={[20, 20]}
            >
              <Alert style={{marginBottom:20}} 
                message="Warning" 
                // description="This fetches data from https://github.com/openfootball/football.json \\n. Ideally data on that source are updated each day." 
                description={(
                  <code>
                    This app fetches data from https://github.com/openfootball/football.json. Issue link: https://github.com/openfootball/football.json/issues/30
                    <br />
                    Ideally, data on that source are updated each day but it seems that there is some minor issue with update. I hope it will be resolved quickly.
                    <br />
                    Update on 2020-12-02:
                    <br />
                    Issue still persists. Sorry for this. Link: https://github.com/openfootball/england/issues/45
                  </code>
                )}
                type="warning" 
                />
            </Row>
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
          <Footer>
            <Row
              justify="center"
              align="middle"
              gutter={[10, 10]}
            >
              <a
                href="https://github.com/nurgasemetey/compare-last-season"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "16px" }}
              >
                <GithubFilled /> Source code on Github
                </a>
                  -
              <a
                href="https://twitter.com/nurgasemetey"
                rel="noopener noreferrer"
                target="_blank"
                style={{ fontSize: "16px" }}
              >
                <TwitterSquareFilled /> Follow me on Twitter
                </a>
            </Row>

          </Footer>
        </Layout>

      </>

    );
  }
}
