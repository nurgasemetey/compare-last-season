import React from 'react';
import { Card, Col, Layout, PageHeader, Row, Typography } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';
import { RouteComponentProps } from 'react-router-dom';
import { RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

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
              <Title level={3}>Leagues</Title>
            </Row>
            <Row
              justify="center"
              align="middle"
              gutter={[10, 10]}
            >
              <Col
                xs={{ span: 24 }}
                sm={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
              >
                <Card
                  title="English Premier League"
                  headStyle={{ textAlign: "center" }}
                  hoverable
                  // style={{ width: 240 }}
                  bordered={false}
                  onClick={(e: any) => {
                    this.props.history.push(`/league/en.1`);
                  }}
                  cover={<img alt="example" src={require('assets/images/leagues/english-premier-league/epl-logo.png')} />}
                >
                  {/* <Meta
                    // avatar={<Avatar src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                    // title="English Premier League"
                  // description="This is the description"
                  /> */}
                </Card>
              </Col>
            </Row>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>

      </>

    );
  }
}
