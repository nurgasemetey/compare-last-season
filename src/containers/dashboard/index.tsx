import React from 'react';
import { Card, Col, Row } from 'antd';


import { RouteComponentProps } from 'react-router-dom';
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
                // title={team.name}
                // headStyle={{ textAlign: "center" }}
                hoverable
                // style={{ width: 240 }}
                bordered={false}
                onClick={(e: any) => {
                  this.props.history.push(`/league/en.1`);
                }}
              // cover={<img alt="example" src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
              >
                <Meta
                  // avatar={<Avatar src="https://img.icons8.com/color/48/000000/chelsea-fc.png" />}
                  title="English Premier League"
                // description="This is the description"
                />
              </Card>
              </Col>
      </Row>
    );
  }
}
