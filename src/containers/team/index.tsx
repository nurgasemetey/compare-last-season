import React from 'react';
import { Row, Col, PageHeader, Table } from 'antd';

import './styles.less';

interface IProps { }


interface IState {
  pointChangeData:any[]
}

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
      // console.log(text);
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
        // console.log(text);
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
    homeScore: '0-2',
    awayScore: ''
  }
];


const pointChangeColumn = [
  {
    title: 'Point Change',
    dataIndex: 'pointChange',
    key: 'pointChange',
    render(value: number, record: any) {
      if (value !== -1) {
        let color = "white";
        if (value > 0) {
          color = "green";
        }
        else if (value < 0) {
          color = "red";
        }
        else {
          color = "yellow";
        }
        return {
          props: {
            style: { background: color }
          },
          children: <div>{value}</div>
        };
      }
      else {
        console.log("null", value)
      }
    }
  }
];

const pointChangeDataNew = [
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

export class TeamContainer extends React.Component<IProps, IState> {

  state = {
    pointChangeData: []
  }
  
  componentDidMount = async () => {
    let pointChangeData:any[] = [];
    for (let index = 0; index < lastSeasonData.length; index++) {
      const lastSeason = lastSeasonData[index];
      const thisSeason = thisSeasonData[index];
      if(!lastSeason.homeScore && !lastSeason.awayScore && !thisSeason.homeScore && !thisSeason.awayScore) {
        pointChangeData.push({
          key: index+1,
          pointChange: -1
        })
        continue;
      }
      let lastSeasonTotalPoint = 0;
      let thisSeasonTotalPoint = 0;
      if(lastSeason.homeScore) {
        const scoreArr: string[] = lastSeason.homeScore.split("-");
        if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          lastSeasonTotalPoint += 3;
        }
        else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          lastSeasonTotalPoint += 0;
        }
        else {
          lastSeasonTotalPoint += 1;
        }
      }
      if(lastSeason.awayScore) {
        const scoreArr: string[] = lastSeason.awayScore.split("-");
        if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          lastSeasonTotalPoint += 0;
        }
        else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          lastSeasonTotalPoint += 3;
        }
        else {
          lastSeasonTotalPoint += 1;
        }
      }

      if(thisSeason.homeScore) {
        const scoreArr: string[] = thisSeason.homeScore.split("-");
        if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          thisSeasonTotalPoint += 3;
        }
        else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          thisSeasonTotalPoint += 0;
        }
        else {
          thisSeasonTotalPoint += 1;
        }
      }
      if(thisSeason.awayScore) {
        const scoreArr: string[] = thisSeason.awayScore.split("-");
        if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          thisSeasonTotalPoint += 0;
        }
        else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          thisSeasonTotalPoint += 3;
        }
        else {
          thisSeasonTotalPoint += 1;
        }
      }
      pointChangeData.push({
        key: index+1,
        pointChange: thisSeasonTotalPoint - lastSeasonTotalPoint
      })
      
    }
    this.setState({pointChangeData})
  }

  render() {
    const { pointChangeData } = this.state;
    return (
      <div>
         <PageHeader
            title="Chelsea"
            subTitle="Comparison of last and this season"
          />
          <Row
        justify="center"
        align="middle"
        gutter={[20, 20]}
        className="todos-container"
      >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Table columns={matchColumns} dataSource={lastSeasonData} pagination={false} />
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Table columns={matchColumns} dataSource={thisSeasonData} pagination={false} />
        </Col>

        <Col
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
        >
          <Table columns={pointChangeColumn} dataSource={pointChangeData} pagination={false} />
        </Col>
      </Row>
      </div>
      
    )
  }


}
