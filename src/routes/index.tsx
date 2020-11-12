import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TodosContainer } from 'containers/todos';
import { TeamContainer } from 'containers/team';
import { LeagueContainer } from 'containers/league';
import { DashboardContainer } from 'containers/dashboard';

interface RoutesProps {}

export const Routes: React.FunctionComponent<RoutesProps> = () => (
  <Switch>
    <Route path="/league/:leagueId/team/:teamId" exact={true} component={TeamContainer} />
    <Route path="/todo" exact={true} component={TodosContainer} />
    <Route path="/league/:leagueId" exact={true} component={LeagueContainer} />
    <Route path="/" exact={true} component={DashboardContainer} />
  </Switch>
);
