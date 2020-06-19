import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import {
  TextFieldDemo,
  InputDemo,
  ChildrenDemo,
  Trainee,
  NotFound,
  WrapLogin,
} from './pages/index';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackbarProvider } from './contexts/index';
import apolloClient from './libs/apollo-client';

function App() {
  return (
    <SnackbarProvider>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            {localStorage.getItem('token') ? (
              <Route exact path="/">
                <Redirect to="/trainee" />
              </Route>
            ) : (
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
            )}
            <AuthRoute exact path="/login" component={WrapLogin} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute exact component={NotFound} />
          </Switch>
        </Router>
      </ApolloProvider>
    </SnackbarProvider>
  );
}

export default App;
