import React from 'react';
import { Row, Col, PageHeader, Table} from 'antd';

import './styles.less';

interface TeamContainerProps {}

const columns = [
  {
    title: 'Team',
    dataIndex: 'name',
    key: 'name',
    // render: (text:any) => <a>{text}</a>,
  },
  {
    title: 'Home',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Away',
    dataIndex: 'address',
    key: 'address',
  }
];

const data = [
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

export const TeamContainer: React.FunctionComponent<TeamContainerProps> = () => {


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
        <Table columns={columns} dataSource={data} pagination={false}  />
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Table columns={columns} dataSource={data} pagination={false} />
      </Col>

      <Col
        xs={{ span: 23 }}
        sm={{ span: 23 }}
        md={{ span: 21 }}
        lg={{ span: 20 }}
        xl={{ span: 18 }}
      >
        <Table columns={columns} dataSource={data} pagination={false} />
      </Col>
    </Row>
  );
};
