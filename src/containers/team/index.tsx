import React from 'react';
import { Row, Col, PageHeader, Table, Typography } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';

import './styles.less';
import { RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';

const { Text } = Typography;
interface RouterProps {
  leagueId: string,
  teamId: string
}

interface IProps extends RouteComponentProps<RouterProps> { }


interface IState {
  lastSeasonData: any[],
  thisSeasonData: any[],
  pointChangeData: any[],
}

const GREEN = "#67AA52";
const RED = "#F92610";
const YELLOW = "#EBC73D";

const isNew = (isNew: boolean) => isNew ? <sup><Text type="danger">New</Text></sup> : null

const matchColumns = [
  {
    title: 'Team',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Home',
    dataIndex: 'homeScore',
    key: 'homeScore',
    render(value: any, record: any) {
      if (value.score && value.score.ft) {
        // console.log(value);
        const score = value.score.ft;
        let color = "white";
        if (score[0] > score[1]) {
          color = GREEN;
        }
        else if (score[0] < score[1]) {
          color = RED;
        }
        else {
          color = YELLOW;
        }
        return {
          props: {
            style: { background: color },
            align: 'center'
          },
          children: <div>{score[0]} - {score[1]}{isNew(record.isNew)}</div>
        };
      }
    }
  },
  {
    title: 'Away',
    dataIndex: 'awayScore',
    key: 'awayScore',
    render(value: any, record: any) {
      if (value.score && value.score.ft) {
        // console.log(value);
        const score = value.score.ft;
        let color = "white";
        if (score[0] < score[1]) {
          color = GREEN;
        }
        else if (score[0] > score[1]) {
          color = RED;
        }
        else {
          color = YELLOW;
        }
        return {
          props: {
            style: { background: color },
            align: 'center'
          },
          children: <div>{score[0]} - {score[1]}{isNew(record.isNew)}</div>
        };
      }
    }
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
// const routes = [
//   {
//     path: 'index',
//     breadcrumbName: 'Home',
//   },
//   {
//     path: 'first',
//     breadcrumbName: 'English Premier League',
//   },
//   {
//     path: 'second',
//     breadcrumbName: 'Chelsea',
//   },
// ];

const LAST_SEASON = "2019-20";
const THIS_SEASON = "2020-21";

export class TeamContainer extends React.Component<IProps, IState> {

  state = {
    lastSeasonData: [],
    pointChangeData: [],
    thisSeasonData: []
  }

  componentDidMount = async () => { 
    try {
      console.log(this.props.match.params.leagueId, this.props.match.params.teamId);

      const teamId = this.props.match.params.teamId;
  
      const thisSeasonClubs = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.clubs.json`).clubs.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1);
      const lastSeasonClubs = require(`../../assets/data/${LAST_SEASON}/${this.props.match.params.leagueId}.clubs.json`).clubs.sort((a:any, b:any) => (a.name > b.name) ? 1 : -1);
  
      // console.log(thisSeasonsClubs);
  
      let commonClubs = _.intersectionBy(lastSeasonClubs, thisSeasonClubs, 'name').filter((element:any) => element.name !== teamId);
  
      let lastSeasonDemotedTeams = _.differenceBy(lastSeasonClubs, thisSeasonClubs, 'name');
      // console.log(lastSeasonDemotedTeams);
  
      let thisSeasonPromotedTeams = _.differenceBy(thisSeasonClubs, lastSeasonClubs, 'name');
      // console.log(thisSeasonPromotedTeams);
  
      const lastSeasonMatches = require(`../../assets/data/${LAST_SEASON}/${this.props.match.params.leagueId}.json`).matches.filter((a:any)=> {
        return a.team1 === teamId || a.team2 === teamId;
      });
  
      let lastSeasonMatchesMap: Map<string, any[]> = new Map();
      // console.log(lastSeasonMatches);
  
      for (let index = 0; index < lastSeasonMatches.length; index++) {
        const element = lastSeasonMatches[index];
        let key = 'team1';
        if(element.team1 === teamId) {
          key = 'team2';
        } 
        if(lastSeasonMatchesMap.has(element[key])) {
          let matches:any[] = lastSeasonMatchesMap.get(element[key]) || [];
          matches?.push(element);
          lastSeasonMatchesMap.set(element[key], matches);
        }
        else {
          lastSeasonMatchesMap.set(element[key], [element]);
        }
      }
      let lastSeasonData: any[] = [];
      // console.log(lastSeasonMatchesMap);
      for (let index = 0; index < commonClubs.length; index++) {
        const element:any = _.cloneDeep(commonClubs[index]);
        // console.log(element.name);
        let matches:any[] = lastSeasonMatchesMap.get(element.name) || [];
        // console.log(matches);
        if(matches[0].team1 === teamId) {
          element.homeScore = matches[0];
          element.awayScore = matches[1];
        }
        else {
          element.homeScore = matches[1];
          element.awayScore = matches[0];
        }
        lastSeasonData.push(element)
      }
      this.setState({ lastSeasonData });
  
      //---------
      const thisSeasonMatches = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.json`).matches.filter((a:any)=> {
        return a.team1 === teamId || a.team2 === teamId;
      });
  
      // console.log(thisSeasonMatches);
      
      let thisSeasonMatchesMap: Map<string, any[]> = new Map();
      // console.log(lastSeasonMatches);
  
      for (let index = 0; index < thisSeasonMatches.length; index++) {
        const element = thisSeasonMatches[index];
        let key = 'team1';
        if(element.team1 === teamId) {
          key = 'team2';
        } 
        if(thisSeasonMatchesMap.has(element[key])) {
          let matches:any[] = thisSeasonMatchesMap.get(element[key]) || [];
          matches?.push(element);
          thisSeasonMatchesMap.set(element[key], matches);
        }
        else {
          thisSeasonMatchesMap.set(element[key], [element]);
        }
      }
      let thisSeasonData: any[] = [];
      // console.log(lastSeasonMatchesMap);
      for (let index = 0; index < commonClubs.length; index++) {
        const element:any = _.cloneDeep(commonClubs[index]);
        // console.log(element.name);
        let matches:any[] = thisSeasonMatchesMap.get(element.name) || [];
        // console.log(matches);
        if(matches[0].team1 === teamId) {
          element.homeScore = matches[0];
          element.awayScore = matches[1];
        }
        else {
          element.homeScore = matches[1];
          element.awayScore = matches[0];
        }
        thisSeasonData.push(element)
      }
      console.log("thisSEason", thisSeasonData);

      this.setState({ thisSeasonData });

    } catch(err) {
      console.log(err);
    }
    


    //--------------------------

    // let pointChangeData: any[] = [];
    // for (let index = 0; index < lastSeasonData.length; index++) {
    //   const lastSeason = lastSeasonData[index];
    //   const thisSeason = thisSeasonData[index];
    //   if (!thisSeason.homeScore && !thisSeason.awayScore) {
    //     pointChangeData.push({
    //       key: index + 1,
    //       pointChange: -1
    //     })
    //     continue;
    //   }
    //   let lastSeasonTotalPoint = 0;
    //   let thisSeasonTotalPoint = 0;
    //   if (lastSeason.homeScore && thisSeason.homeScore) {
    //     const lastSeasonScoreArr: string[] = lastSeason.homeScore.split("-");
    //     if (parseInt(lastSeasonScoreArr[0]) > parseInt(lastSeasonScoreArr[1])) {
    //       lastSeasonTotalPoint += 3;
    //     }
    //     else if (parseInt(lastSeasonScoreArr[0]) < parseInt(lastSeasonScoreArr[1])) {
    //       lastSeasonTotalPoint += 0;
    //     }
    //     else {
    //       lastSeasonTotalPoint += 1;
    //     }

    //     const thisSeasonScoreArr: string[] = thisSeason.homeScore.split("-");
    //     if (parseInt(thisSeasonScoreArr[0]) > parseInt(thisSeasonScoreArr[1])) {
    //       thisSeasonTotalPoint += 3;
    //     }
    //     else if (parseInt(thisSeasonScoreArr[0]) < parseInt(thisSeasonScoreArr[1])) {
    //       thisSeasonTotalPoint += 0;
    //     }
    //     else {
    //       thisSeasonTotalPoint += 1;
    //     }
    //   }
    //   if (lastSeason.awayScore && thisSeason.awayScore) {
    //     const lastSeasonScoreArr: string[] = lastSeason.awayScore.split("-");
    //     if (parseInt(lastSeasonScoreArr[0]) > parseInt(lastSeasonScoreArr[1])) {
    //       lastSeasonTotalPoint += 0;
    //     }
    //     else if (parseInt(lastSeasonScoreArr[0]) < parseInt(lastSeasonScoreArr[1])) {
    //       lastSeasonTotalPoint += 3;
    //     }
    //     else {
    //       lastSeasonTotalPoint += 1;
    //     }

    //     const thisSeasonScoreArr: string[] = thisSeason.awayScore.split("-");
    //     if (parseInt(thisSeasonScoreArr[0]) > parseInt(thisSeasonScoreArr[1])) {
    //       thisSeasonTotalPoint += 0;
    //     }
    //     else if (parseInt(thisSeasonScoreArr[0]) < parseInt(thisSeasonScoreArr[1])) {
    //       thisSeasonTotalPoint += 3;
    //     }
    //     else {
    //       thisSeasonTotalPoint += 1;
    //     }
    //   }
    //   pointChangeData.push({
    //     key: index + 1,
    //     pointChange: thisSeasonTotalPoint - lastSeasonTotalPoint
    //   })

    // }
    // this.setState({ pointChangeData })
  }

  render() {
    const { lastSeasonData, thisSeasonData, pointChangeData } = this.state;
    return (
      <>
        <PageHeader
          title={this.props.match.params.teamId}
          subTitle="Comparison of last and this season. Last match added: Chelsea-Sheffield 2020-11-07"
          // avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
          // breadcrumb={{ routes }}
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
          gutter={[10,0]}
          className="todos-container"
        >
          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 9 }}
            xl={{ span: 9 }}
          >
            
            <Table 
              title={(data:any)=> `Last season ${LAST_SEASON}`} 
              bordered 
              columns={matchColumns} 
              dataSource={lastSeasonData} 
              pagination={false} 
              size="small"
              // summary={pageData => {
              //   let totalHome = 0;
              //   let totalAway = 0;
        
              //   pageData.forEach(({ homeScore, awayScore }) => {
              //     const homeScoreArr: string[] = homeScore.split("-");
              //     if (parseInt(homeScoreArr[0]) > parseInt(homeScoreArr[1])) {
              //       totalHome += 3;
              //     }
              //     else if (parseInt(homeScoreArr[0]) < parseInt(homeScoreArr[1])) {
              //       totalHome += 0;
              //     }
              //     else {
              //       totalHome += 1;
              //     }

              //     const awayScoreArr: string[] = awayScore.split("-");
              //     if (parseInt(awayScoreArr[0]) > parseInt(awayScoreArr[1])) {
              //       totalAway += 0;
              //     }
              //     else if (parseInt(awayScoreArr[0]) < parseInt(awayScoreArr[1])) {
              //       totalAway += 3;
              //     }
              //     else {
              //       totalAway += 1;
              //     }
              //   });
        
              //   return (
              //     <>
              //       <Table.Summary.Row>
              //         <Table.Summary.Cell align="center" index={0}>
              //           <Text strong>Total</Text>
              //         </Table.Summary.Cell>
              //         <Table.Summary.Cell align="center" index={1}>
              //           <Text strong>{totalHome}</Text>
              //         </Table.Summary.Cell>
              //         <Table.Summary.Cell align="center" index={2}>
              //           <Text strong>{totalAway}</Text>
              //         </Table.Summary.Cell>
              //       </Table.Summary.Row>
              //     </>
              //   );
              // }}
              />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 9 }}
            xl={{ span: 9 }}
          >
            <Table 
              title={(data:any)=> `This season ${THIS_SEASON}`} 
              bordered 
              columns={matchColumns} 
              dataSource={thisSeasonData} 
              pagination={false} 
              size="small"
              // summary={pageData => {
              //   let totalHome = 0;
              //   let totalAway = 0;
        
              //   pageData.forEach(({ homeScore, awayScore }) => {
              //     if(homeScore) {
              //       const homeScoreArr: string[] = homeScore.split("-");
              //       if (parseInt(homeScoreArr[0]) > parseInt(homeScoreArr[1])) {
              //         totalHome += 3;
              //       }
              //       else if (parseInt(homeScoreArr[0]) < parseInt(homeScoreArr[1])) {
              //         totalHome += 0;
              //       }
              //       else {
              //         totalHome += 1;
              //       }
              //     }
                  
              //     if(awayScore) {
              //       const awayScoreArr: string[] = awayScore.split("-");
              //       if (parseInt(awayScoreArr[0]) > parseInt(awayScoreArr[1])) {
              //         totalAway += 0;
              //       }
              //       else if (parseInt(awayScoreArr[0]) < parseInt(awayScoreArr[1])) {
              //         totalAway += 3;
              //       }
              //       else {
              //         totalAway += 1;
              //       }
              //     }
                  
              //   });
        
              //   return (
              //     <>
              //       <Table.Summary.Row>
              //         <Table.Summary.Cell align="center" index={0}>
              //           <Text strong>Total</Text>
              //         </Table.Summary.Cell>
              //         <Table.Summary.Cell align="center" index={1}>
              //           <Text strong>{totalHome}<Text type="danger">(+3)</Text></Text>
              //         </Table.Summary.Cell>
              //         <Table.Summary.Cell align="center" index={2}>
              //           <Text strong>{totalAway}</Text>
              //         </Table.Summary.Cell>
              //       </Table.Summary.Row>
              //     </>
              //   );
              // }}
            />
          </Col>

          <Col
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 12 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
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
                        <Text strong>{totalChange}<Text type="danger">(+2)</Text></Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />
          </Col>
        </Row>
      </>

    )
  }


}
