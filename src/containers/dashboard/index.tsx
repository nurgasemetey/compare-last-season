import React from 'react';
import { Card, Col, Layout, PageHeader, Row } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';


import { RouteComponentProps } from 'react-router-dom';

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
                <a
                  href="https://github.com/nurgasemetey/compare-last-season"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "24px" }}
                >
                  <GithubFilled />
                </a>,
                <a
                  href="https://twitter.com/nurgasemetey"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ fontSize: "24px" }}
                >
                  <TwitterSquareFilled />
                </a>
              ]}
            />
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
