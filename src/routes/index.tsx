import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { TodosContainer } from 'containers/todos';
import { TeamContainer } from 'containers/team';

interface RoutesProps {}

export const Routes: React.FunctionComponent<RoutesProps> = () => (
  <Switch>
    <Route path="/todo" exact={true} component={TodosContainer} />
    <Route path="/" exact={true} component={TeamContainer} />
  </Switch>
);
