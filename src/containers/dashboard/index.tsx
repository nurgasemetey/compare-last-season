import React from 'react';
import { Alert, Card, Col, Layout, PageHeader, Row, Typography } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import { LEAGUES } from 'configs/LeagueConstants';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

interface RouterProps {
}

interface IProps extends RouteComponentProps<RouterProps> {
}

interface IState {
}

export class DashboardContainer extends React.Component<IProps, IState> {

  state = {
  }

  componentDidMount = async () => {

  }

  render() {
    return (
      <>
        <Layout>
          {/* <Header>Header</Header> */}
          <Content>
            <PageHeader
              title="Home"
              subTitle="Compare team's last season and this season"
              // avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
              // breadcrumb={{
              //   routes: [{
              //     path: '/',
              //     breadcrumbName: 'Home',
              //   },
              //   ]
              // }}
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
              // style={{ marginTop: 20 }}
              gutter={[20, 20]}
            >
              <Title level={3}>Leagues</Title>
            </Row>
            <Row
              justify="center"
              align="middle"
              gutter={[10, 10]}
            >
              {LEAGUES.map((team: any) => {
                return (
                  <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 6 }}
                lg={{ span: 4 }}
                xl={{ span: 4 }}
              >
                
                <Card
                  // title={team.name}
                  // headStyle={{ textAlign: "center" }}
                  hoverable
                  // style={{ width: 400, height:400 }}
                  bordered={false}
                  onClick={(e: any) => {
                    this.props.history.push(`/league/${team.code}`);
                  }}
                  // cover={<img alt="example" src={require(`assets/images/leagues/${team.code}.png`)} />}
                >
                  {/* <Meta
                    // avatar={<Avatar src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                    // title="English Premier League"
                  // description="This is the description"
                  /> */}
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
