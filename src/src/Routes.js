import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ReportCard from '../Report Card';


const reportCardRoute = () => (
  <Switch>
    <Route path="*" component={ReportCard} />
    <Route path="*/:account" component={ReportCard} />
  </Switch>
);


function Routes() {
  return reportCardRoute();
}

export default Routes;
