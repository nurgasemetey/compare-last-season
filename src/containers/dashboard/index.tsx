import React from 'react';
import { Row } from 'antd';


import { RouteComponentProps } from 'react-router-dom';

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
