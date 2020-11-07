import React from 'react';
import { Row, Col, PageHeader, Table } from 'antd';

import './styles.less';

interface IProps { }

const matchColumns = [
  {
    title: 'Team',
    dataIndex: 'name',
    key: 'name',
    // render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Home',
    dataIndex: 'homeScore',
    key: 'homeScore',
    render(text: string, record: any) {
      console.log(text);
      const scoreArr: string[] = text.split("-");
      let color = "white";
      if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
        color = "green";
      }
      else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
        color = "red";
      }
      else {
        color = "yellow";
      }
      return {
        props: {
          style: { background: color }
        },
        children: <div>{text}</div>
      };
    }
  },
  {
    title: 'Away',
    dataIndex: 'awayScore',
    key: 'awayScore',
    render(text: string, record: any) {
      if (text) {
        console.log(text);
        const scoreArr: string[] = text.split("-");
        let color = "white";
        if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          color = "green";
        }
        else if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          color = "red";
        }
        else {
          color = "yellow";
        }
        return {
          props: {
            style: { background: color }
          },
          children: <div>{text}</div>
        };
      }

    }
  }
];
const lastSeasonData = [
  {
    key: '1',
    name: 'Liverpool',
    homeScore: '1-2',
    awayScore: '5-3'
  }
];

const thisSeasonData = [
  {
    key: '1',
    name: 'Liverpool',
    homeScore: '0-2'
  }
];


const pointChangeColumn = [
  {
    title: 'Point Change',
    dataIndex: 'name',
    key: 'name',
    // render: (text:any) => <a>{text}</a>,
  }
];


const pointChangeData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

export class TeamContainer extends React.Component<IProps, {}> {

  render() {
    return (
      <Row
        justify="center"
        align="middle"
        gutter={[0, 20]}
        className="todos-container"
      >
        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <PageHeader
            title="Team Overview"
            subTitle="To add a todo, just fill the form below and click in add todo."
          />
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Table columns={matchColumns} dataSource={lastSeasonData} pagination={false} />
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Table columns={matchColumns} dataSource={thisSeasonData} pagination={false} />
        </Col>

        <Col
          xs={{ span: 23 }}
          sm={{ span: 23 }}
          md={{ span: 21 }}
          lg={{ span: 20 }}
          xl={{ span: 18 }}
        >
          <Table columns={pointChangeColumn} dataSource={pointChangeData} pagination={false} />
        </Col>
      </Row>
    )
  }


}
