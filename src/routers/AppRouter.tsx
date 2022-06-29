import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import Login from '../views/login';
import NoMatch from '../views/noMatch';
import Employees from '../views/employees';
import Upload from '../views/upload';
import { GlobalContext, GlobalProvider } from '../context/global';
import { useContext } from 'react';
// import { HeaderComponent } from '../components/header-component';

export const AppRouter = () => {
    return (
        <HashRouter>
            <GlobalProvider>
                <Switch>
                    <Route path={['/']}>

                        <Switch>
                            <Route exact path='/' component={Login} />
                            <PrivateRoute exact path='/employees'>
                                <Employees></Employees> 
                            </PrivateRoute>
                            <PrivateRoute exact path='/upload'>
                                <Upload></Upload>
                            </PrivateRoute>
                            <Route path="*"  component={NoMatch}/>
                        </Switch>
 
                    </Route>
                </Switch>
            </GlobalProvider>
        </HashRouter>
    )
}

function PrivateRoute({ children, ...rest }:any) {
    let token = window.localStorage.getItem('token');
    let global = useContext(GlobalContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
        global.user !== undefined || token !== null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
