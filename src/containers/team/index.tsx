import React from 'react';
import { Row, Col, PageHeader, Table } from 'antd';

import './styles.less';

interface IProps { }


interface IState {
  pointChangeData: any[]
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
      if (text) {
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
  },
  {
    key: '2',
    name: 'City',
    homeScore: '2-1',
    awayScore: '2-1'
  },
  {
    key: '3',
    name: 'United',
    homeScore: '0-2',
    awayScore: '4-0'
  },
  {
    key: '4',
    name: 'Leicester',
    homeScore: '1-1',
    awayScore: '2-2'
  },
  {
    key: '5',
    name: 'Spurs',
    homeScore: '2-1',
    awayScore: '0-2'
  },
  {
    key: '6',
    name: 'Wolves',
    homeScore: '2-0',
    awayScore: '2-5'
  },
  {
    key: '7',
    name: 'Arsenal',
    homeScore: '2-2',
    awayScore: '1-2'
  },
  {
    key: '8',
    name: 'Sheffield',
    homeScore: '2-2',
    awayScore: '3-0'
  },
  {
    key: '9',
    name: 'Burnley',
    homeScore: '3-0',
    awayScore: '2-4'
  },
  {
    key: '10',
    name: 'Southampton',
    homeScore: '0-2',
    awayScore: '1-4'
  }
];
const thisSeasonData = [
  {
    key: '1',
    name: 'Liverpool',
    homeScore: '0-2',
    awayScore: ''
  },
  {
    key: '2',
    name: 'City',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '3',
    name: 'United',
    homeScore: '',
    awayScore: '0-0'
  },
  {
    key: '4',
    name: 'Leicester',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '5',
    name: 'Spurs',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '6',
    name: 'Wolves',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '7',
    name: 'Arsenal',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '8',
    name: 'Sheffield',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '9',
    name: 'Burnley',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '10',
    name: 'Southampton',
    homeScore: '3-3',
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
        return {
          props: {
            style: { background: "white" }
          },
          children: <div>Not Played</div>
        };
      }
    }
  }
];


export class TeamContainer extends React.Component<IProps, IState> {

  state = {
    pointChangeData: []
  }

  componentDidMount = async () => {
    let pointChangeData: any[] = [];
    for (let index = 0; index < lastSeasonData.length; index++) {
      const lastSeason = lastSeasonData[index];
      const thisSeason = thisSeasonData[index];
      if (!thisSeason.homeScore && !thisSeason.awayScore) {
        pointChangeData.push({
          key: index + 1,
          pointChange: -1
        })
        continue;
      }
      let lastSeasonTotalPoint = 0;
      let thisSeasonTotalPoint = 0;
      if (lastSeason.homeScore && thisSeason.homeScore) {
        const lastSeasonScoreArr: string[] = lastSeason.homeScore.split("-");
        if (parseInt(lastSeasonScoreArr[0]) > parseInt(lastSeasonScoreArr[1])) {
          lastSeasonTotalPoint += 3;
        }
        else if (parseInt(lastSeasonScoreArr[0]) < parseInt(lastSeasonScoreArr[1])) {
          lastSeasonTotalPoint += 0;
        }
        else {
          lastSeasonTotalPoint += 1;
        }

        const thisSeasonScoreArr: string[] = thisSeason.homeScore.split("-");
        if (parseInt(thisSeasonScoreArr[0]) > parseInt(thisSeasonScoreArr[1])) {
          thisSeasonTotalPoint += 3;
        }
        else if (parseInt(thisSeasonScoreArr[0]) < parseInt(thisSeasonScoreArr[1])) {
          thisSeasonTotalPoint += 0;
        }
        else {
          thisSeasonTotalPoint += 1;
        }
      }
      if (lastSeason.awayScore && thisSeason.awayScore) {
        const lastSeasonScoreArr: string[] = lastSeason.awayScore.split("-");
        if (parseInt(lastSeasonScoreArr[0]) > parseInt(lastSeasonScoreArr[1])) {
          lastSeasonTotalPoint += 0;
        }
        else if (parseInt(lastSeasonScoreArr[0]) < parseInt(lastSeasonScoreArr[1])) {
          lastSeasonTotalPoint += 3;
        }
        else {
          lastSeasonTotalPoint += 1;
        }

        const thisSeasonScoreArr: string[] = thisSeason.awayScore.split("-");
        if (parseInt(thisSeasonScoreArr[0]) > parseInt(thisSeasonScoreArr[1])) {
          thisSeasonTotalPoint += 0;
        }
        else if (parseInt(thisSeasonScoreArr[0]) < parseInt(thisSeasonScoreArr[1])) {
          thisSeasonTotalPoint += 3;
        }
        else {
          thisSeasonTotalPoint += 1;
        }
      }
      pointChangeData.push({
        key: index + 1,
        pointChange: thisSeasonTotalPoint - lastSeasonTotalPoint
      })

    }
    this.setState({ pointChangeData })
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
          gutter={20}
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
