import React from 'react';
import { Row, Col, PageHeader, Table, Typography } from 'antd';

import './styles.less';

const { Text } = Typography;


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
          color = "#67AA52";
        }
        else if (parseInt(scoreArr[0]) < parseInt(scoreArr[1])) {
          color = "#F92610";
        }
        else {
          color = "#EBC73D";
        }
        return {
          props: {
            style: { background: color },
            align: 'center'
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
          color = "#67AA52";
        }
        else if (parseInt(scoreArr[0]) > parseInt(scoreArr[1])) {
          color = "#F92610";
        }
        else {
          color = "#EBC73D";
        }
        return {
          props: {
            style: { background: color },
            align: 'center'
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
  },
  {
    key: '11',
    name: 'Everton',
    homeScore: '4-0',
    awayScore: '3-1'
  },
  {
    key: '12',
    name: 'Newcastle',
    homeScore: '1-0',
    awayScore: '1-0'
  },
  {
    key: '13',
    name: 'Crystal Palace',
    homeScore: '2-0',
    awayScore: '2-3'
  },
  {
    key: '14',
    name: 'Brighton',
    homeScore: '2-0',
    awayScore: '1-1'
  },
  {
    key: '15',
    name: 'Westham',
    homeScore: '0-1',
    awayScore: '3-2'
  },
  {
    key: '16',
    name: 'Aston Villa',
    homeScore: '2-1',
    awayScore: '1-2'
  },
  {
    key: '17',
    name: 'Bournemouth',
    homeScore: '0-1',
    awayScore: '2-2'
  },
  {
    key: '18',
    name: 'Watford',
    homeScore: '3-0',
    awayScore: '1-2'
  },
  {
    key: '19',
    name: 'Norvich',
    homeScore: '3-0',
    awayScore: '1-2'
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
    awayScore: '0-3'
  },
  {
    key: '10',
    name: 'Southampton',
    homeScore: '3-3',
    awayScore: ''
  },
  {
    key: '11',
    name: 'Everton',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '12',
    name: 'Newcastle',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '13',
    name: 'Crystal Palace',
    homeScore: '4-0',
    awayScore: ''
  },
  {
    key: '14',
    name: 'Brighton',
    homeScore: '',
    awayScore: '1-3'
  },
  {
    key: '15',
    name: 'Westham',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '16',
    name: 'Aston Villa',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '17',
    name: 'Leeds',
    homeScore: '',
    awayScore: ''
  },
  {
    key: '18',
    name: 'West Brom',
    homeScore: '',
    awayScore: '3-3'
  },
  {
    key: '19',
    name: 'Fulham',
    homeScore: '',
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
          color = "#67AA52";
        }
        else if (value < 0) {
          color = "#F92610";
        }
        else {
          color = "#EBC73D";
        }
        return {
          props: {
            style: { background: color },
            align: 'center',
          },
          children: <div>{value}</div>
        };
      }
      else {
        return {
          props: {
            style: { background: "white" },
            align: 'center'
          },
          children: <div>-</div>
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
          subTitle="Comparison of last and this season. Last match added: Burnley-Chelsea 2020-10-31"
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
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            
            <Table 
              title={(data:any)=> "This season 19-20"} 
              bordered 
              columns={matchColumns} 
              dataSource={lastSeasonData} 
              pagination={false} 
              size="small"
              summary={pageData => {
                let totalHome = 0;
                let totalAway = 0;
        
                pageData.forEach(({ homeScore, awayScore }) => {
                  const homeScoreArr: string[] = homeScore.split("-");
                  if (parseInt(homeScoreArr[0]) > parseInt(homeScoreArr[1])) {
                    totalHome += 3;
                  }
                  else if (parseInt(homeScoreArr[0]) < parseInt(homeScoreArr[1])) {
                    totalHome += 0;
                  }
                  else {
                    totalHome += 1;
                  }

                  const awayScoreArr: string[] = awayScore.split("-");
                  if (parseInt(awayScoreArr[0]) > parseInt(awayScoreArr[1])) {
                    totalAway += 0;
                  }
                  else if (parseInt(awayScoreArr[0]) < parseInt(awayScoreArr[1])) {
                    totalAway += 3;
                  }
                  else {
                    totalAway += 1;
                  }
                });
        
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align="center" index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center" index={1}>
                        <Text strong>{totalHome}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center" index={2}>
                        <Text strong>{totalAway}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
              />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            <Table 
              title={(data:any)=> "Last season 20-21"} 
              bordered 
              columns={matchColumns} 
              dataSource={thisSeasonData} 
              pagination={false} 
              size="small"
              summary={pageData => {
                let totalHome = 0;
                let totalAway = 0;
        
                pageData.forEach(({ homeScore, awayScore }) => {
                  if(homeScore) {
                    const homeScoreArr: string[] = homeScore.split("-");
                    if (parseInt(homeScoreArr[0]) > parseInt(homeScoreArr[1])) {
                      totalHome += 3;
                    }
                    else if (parseInt(homeScoreArr[0]) < parseInt(homeScoreArr[1])) {
                      totalHome += 0;
                    }
                    else {
                      totalHome += 1;
                    }
                  }
                  
                  if(awayScore) {
                    const awayScoreArr: string[] = awayScore.split("-");
                    if (parseInt(awayScoreArr[0]) > parseInt(awayScoreArr[1])) {
                      totalAway += 0;
                    }
                    else if (parseInt(awayScoreArr[0]) < parseInt(awayScoreArr[1])) {
                      totalAway += 3;
                    }
                    else {
                      totalAway += 1;
                    }
                  }
                  
                });
        
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align="center" index={0}>
                        <Text strong>Total</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center" index={1}>
                        <Text strong>{totalHome}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell align="center" index={2}>
                        <Text strong>{totalAway}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 7 }}
            xl={{ span: 7 }}
          >
            
            <Table 
              title={(data:any)=> "Point Change"} 
              bordered 
              columns={pointChangeColumn} 
              dataSource={pointChangeData} 
              pagination={false} 
              size="small"
              summary={pageData => {
                let totalChange = 0;
        
                pageData.forEach(({ pointChange }) => {
                  if(pointChange !== -1) {
                    totalChange += pointChange
                    
                  }
                  
                });
        
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell align="center" index={1}>
                        <Text strong>{totalChange}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Col>
        </Row>
      </div>

    )
  }


}
