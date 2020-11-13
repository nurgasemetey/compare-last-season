import React from 'react';
import { Row, Col, PageHeader, Table, Typography, Layout } from 'antd';
import { GithubFilled, TwitterSquareFilled } from '@ant-design/icons';

import './styles.less';
import { RouteComponentProps } from 'react-router-dom';
import _ from 'lodash';
import { LEAGUE_MAP } from 'configs/LeagueConstants';

const { Text, Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

interface RouterProps {
  leagueId: string,
  teamId: string
}

interface IProps extends RouteComponentProps<RouterProps> { }


interface IState {
  lastSeasonData: any[],
  thisSeasonData: any[],
  pointChangeData: any[],
  lastSeasonDemotedData: any[],
  thisSeasonPromotedData: any[],
  latestMatch: any
}

const GREEN = "#67AA52";
const RED = "#F92610";
const YELLOW = "#EBC73D";

const isNew = (isNew: boolean) => isNew ? <sup><Text style={{color:"white"}}>New</Text></sup> : null

const matchColumns = [
  {
    title: 'Team',
    dataIndex: 'name',
    key: 'name',
    align: 'center' as "center",
    render(value: any, record: any) {
      return {
        props: {
          // style: { background: color },
          // align: 'center' as "center",
        },
        children: <div>{value}</div>
      };
    }
  },
  {
    title: 'Home',
    dataIndex: 'homeScore',
    key: 'homeScore',
    align: 'center' as "center",
    render(value: any, record: any) {
      if (value.score) {
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
            // align: 'center' as "center",
          },
        children: <div>{score[0]} - {score[1]} {isNew(value.isNew)}</div>
        };
      }
    }
  },
  {
    title: 'Away',
    dataIndex: 'awayScore',
    key: 'awayScore',
    align: 'center' as "center",
    render(value: any, record: any) {
      if (value.score) {
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
            // align: 'center' as "center",
          },
          children: <div>{score[0]} - {score[1]} {isNew(value.isNew)}</div>
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
    align: 'center' as "center",
    render(value: number, record: any) {
      if (value !== NOT_VALID) {
        let color = "white";
        if (value > 0) {
          color = GREEN;
        }
        else if (value < 0) {
          color = RED;
        }
        else {
          color = YELLOW;
        }
        return {
          props: {
            style: { background: color },
            // align: 'center',
          },
          children: <div>{value}</div>
        };
      }
      else {
        return {
          props: {
            style: { background: "white" },
            // align: 'center'
          },
          children: <div>-</div>
        };
      }
    }
  }
];

const LAST_SEASON = "2019-20";
const THIS_SEASON = "2020-21";


const getHomePoint = (score: number[]) => {
  if (score[0] > score[1]) {
    return 3;
  }
  else if (score[0] < score[1]) {
    return 0;
  }
  else {
    return 1;
  }
}

const getAwayPoint = (score: number[]) => {
  if (score[0] < score[1]) {
    return 3;
  }
  else if (score[0] > score[1]) {
    return 0;
  }
  else {
    return 1;
  }
}

const NOT_VALID = -100;
const getPointChange = (lastSeasonData: any[], thisSeasonData: any) => {
  let pointChangeData: any[] = [];
  for (let index = 0; index < lastSeasonData.length; index++) {
    const lastSeason = lastSeasonData[index];
    const thisSeason = thisSeasonData[index];
    if (!thisSeason.homeScore.score && !thisSeason.awayScore.score) {
      pointChangeData.push({
        key: index + 1,
        pointChange: NOT_VALID
      })
      continue;
    }
    let lastSeasonTotalPoint = 0;
    let thisSeasonTotalPoint = 0;
    if (lastSeason.homeScore.score && thisSeason.homeScore.score) {
      lastSeasonTotalPoint += getHomePoint(lastSeason.homeScore.score.ft);
      thisSeasonTotalPoint += getHomePoint(thisSeason.homeScore.score.ft);
    }
    if (lastSeason.awayScore.score && thisSeason.awayScore.score) {
      lastSeasonTotalPoint += getAwayPoint(lastSeason.awayScore.score.ft);
      thisSeasonTotalPoint += getAwayPoint(thisSeason.awayScore.score.ft);
    }
    pointChangeData.push({
      key: index + 1,
      pointChange: thisSeasonTotalPoint - lastSeasonTotalPoint
    })
  }
  return pointChangeData;
}


const getSeasonData = (commonClubs: any[], seasonMatches: any[], teamId: string) => {

  let thisSeasonMatchesMap: Map<string, any[]> = new Map();

  for (let index = 0; index < seasonMatches.length; index++) {
    const element = seasonMatches[index];
    let key = 'team1';
    if (element.team1 === teamId) {
      key = 'team2';
    }
    if (thisSeasonMatchesMap.has(element[key])) {
      let matches: any[] = thisSeasonMatchesMap.get(element[key]) || [];
      matches?.push(element);
      thisSeasonMatchesMap.set(element[key], matches);
    }
    else {
      thisSeasonMatchesMap.set(element[key], [element]);
    }
  }
  let thisSeasonData: any[] = [];
  for (let index = 0; index < commonClubs.length; index++) {
    const element: any = _.cloneDeep(commonClubs[index]);
    let matches: any[] = thisSeasonMatchesMap.get(element.name) || [];
    if (matches[0].team1 === teamId) {
      element.homeScore = matches[0];
      element.awayScore = matches[1];
    }
    else {
      element.homeScore = matches[1];
      element.awayScore = matches[0];
    }
    thisSeasonData.push(element)
  }
  return thisSeasonData;
}


const getMatchTable = (seasonData: any, title: string) => {
  return (
    <Table
      title={(data: any) => title}
      bordered
      columns={matchColumns}
      dataSource={seasonData}
      pagination={false}
      size="small"
      summary={pageData => {
        let totalHome = 0;
        let totalAway = 0;

        pageData.forEach(({ homeScore, awayScore }) => {
          if (homeScore.score) {
            totalHome += getHomePoint(homeScore.score.ft);
          }
          if (awayScore.score) {
            totalAway += getAwayPoint(awayScore.score.ft);
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
  )
}

const getLatestTitle = (latestMatch: any) => {
  return latestMatch ? `Last match added: ${latestMatch.team1} - ${latestMatch.team2} (${latestMatch.date})` : "";
}

export class TeamContainer extends React.Component<IProps, IState> {

  routes = [
    {
      path: 'index',
      breadcrumbName: 'Home',
    },
    {
      path: 'first',
      breadcrumbName: 'English Premier League',
    },
    {
      path: 'second',
      breadcrumbName: 'Chelsea',
    }
  ]

  state = {
    lastSeasonData: [],
    pointChangeData: [],
    thisSeasonData: [],
    lastSeasonDemotedData: [],
    thisSeasonPromotedData: [],
    latestMatch: null
  }

  componentDidMount = async () => {
    try {
      console.log(this.props.match.params.leagueId, this.props.match.params.teamId);

      const teamId = this.props.match.params.teamId;

      const thisSeasonClubs = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.clubs.json`).clubs.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
      const lastSeasonClubs = require(`../../assets/data/${LAST_SEASON}/${this.props.match.params.leagueId}.clubs.json`).clubs.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);

      let commonClubs = _.intersectionBy(lastSeasonClubs, thisSeasonClubs, 'name').filter((element: any) => element.name !== teamId);

      let lastSeasonDemotedTeams = _.differenceBy(lastSeasonClubs, thisSeasonClubs, 'name');
      let thisSeasonPromotedTeams = _.differenceBy(thisSeasonClubs, lastSeasonClubs, 'name');

      const lastSeasonMatches = require(`../../assets/data/${LAST_SEASON}/${this.props.match.params.leagueId}.json`).matches.filter((a: any) => {
        return a.team1 === teamId || a.team2 === teamId;
      });
      const thisSeasonMatches = require(`../../assets/data/${THIS_SEASON}/${this.props.match.params.leagueId}.json`).matches.filter((a: any) => {
        return a.team1 === teamId || a.team2 === teamId;
      });

      let lastSeasonData: any[] = getSeasonData(commonClubs, lastSeasonMatches, teamId);
      this.setState({ lastSeasonData });

      let thisSeasonData: any[] = getSeasonData(commonClubs, thisSeasonMatches, teamId);
      this.setState({ thisSeasonData });

      const pointChangeData = getPointChange(lastSeasonData, thisSeasonData);
      this.setState({ pointChangeData });

      let lastSeasonDemotedData: any[] = getSeasonData(lastSeasonDemotedTeams, lastSeasonMatches, teamId);
      // console.log(lastSeasonDemotedData);
      this.setState({ lastSeasonDemotedData });


      let thisSeasonPromotedData: any[] = getSeasonData(thisSeasonPromotedTeams, thisSeasonMatches, teamId);
      // console.log(thisSeasonPromotedData);
      this.setState({ thisSeasonPromotedData });


      let sortedThisSeasonData: any[] = thisSeasonMatches
        .filter((a: any) => a.score)
        .sort((a: any, b: any) => (a.date > b.date) ? 1 : -1);
      let latestMatch = sortedThisSeasonData[sortedThisSeasonData.length - 1];
      this.setState({ latestMatch });
      let key = 'homeScore';
      let targetTeamKey = 'team2'
      if (latestMatch.team2 == teamId) {
        key = 'awayScore';
        targetTeamKey = 'team1';
      }
      for (let index = 0; index < thisSeasonData.length; index++) {
        const element = thisSeasonData[index];
        if (element.name === latestMatch[targetTeamKey]) {
          element[key]['isNew'] = true;
        }
      }
      // console.log(thisSeasonData);
      this.setState({ thisSeasonData });

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { lastSeasonData, thisSeasonData, pointChangeData, lastSeasonDemotedData, thisSeasonPromotedData, latestMatch } = this.state;

    return (
      <>

        <Layout>
          {/* <Header>Header</Header> */}

          <Content>
            <PageHeader
              title={this.props.match.params.teamId}
              subTitle={getLatestTitle(latestMatch)}
              // avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
              breadcrumb={{
                routes: [{
                  path: '/',
                  breadcrumbName: 'Home',
                },
                {
                  path: `/league/${this.props.match.params.leagueId}`,
                  breadcrumbName: LEAGUE_MAP.get(this.props.match.params.leagueId) || "Default",
                },
                {
                  path: `/league/${this.props.match.params.leagueId}/team/${this.props.match.params.teamId}`,
                  breadcrumbName: this.props.match.params.teamId,
                }]
              }}
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
              // style={{ marginTop: 20 }}
              gutter={[20, 20]}
            >
              <Title level={3}>Common Teams in Both Seasons</Title>
            </Row>
            <Row
              justify="center"
              align="middle"
              gutter={[10, 0]}
            >
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 10 }}
                xl={{ span: 10 }}
              >
                {getMatchTable(lastSeasonData, `Last season ${LAST_SEASON}`)}
              </Col>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 10 }}
                xl={{ span: 10 }}
              >
                {getMatchTable(thisSeasonData, `This season ${THIS_SEASON}`)}
              </Col>

              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 3 }}
                xl={{ span: 3 }}
              >

                <Table
                  title={(data: any) => "Point Change"}
                  bordered
                  columns={pointChangeColumn}
                  dataSource={pointChangeData}
                  pagination={false}
                  size="small"
                  summary={pageData => {
                    let totalChange = 0;

                    pageData.forEach(({ pointChange }) => {
                      if (pointChange !== NOT_VALID) {
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
            <Row
              justify="center"
              align="middle"
              style={{ marginTop: 20 }}
              // gutter={[20, 20]}
            >
              <Title level={3}>Demoted and Promoted Teams</Title>
            </Row>
            <Row
              justify="center"
              align="middle"
              // style={{ marginTop: 20 }}
              gutter={[20, 20]}
            >
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 9 }}
                xl={{ span: 9 }}
              >
                {getMatchTable(lastSeasonDemotedData, `Last season ${LAST_SEASON}`)}
              </Col>
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 9 }}
                xl={{ span: 9 }}
              >
                {getMatchTable(thisSeasonPromotedData, `This season ${THIS_SEASON}`)}
              </Col>
            </Row>

          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>

      </>

    )
  }


}
