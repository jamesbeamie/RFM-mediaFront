import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './componentFiles/home';
import About from './componentFiles/about';
import Header from './common/header';
import AuthPage from './componentFiles/signUp';
import LoginPage from './componentFiles/login';
import ResetRequest from './componentFiles/requestPwdReset';
import PwdReset from './componentFiles/pwdReset';
import CreateBlog from './containers/createBlog';
import PageNotFound from './common/PageNotFound';
import CreateEngagement from './containers/createEngagement';
import CreateBump from './containers/createBump';
import CreateChildren from './containers/createChildren';
import CreateFamily from './containers/createFamily';
import CreatePotrait from './containers/createPotrait';

const App = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={About} />
				<Route path="/signup" component={AuthPage} />
				<Route path="/signin" component={LoginPage} />
				<Route path="/link-to-reset" component={ResetRequest} />
				<Route path="/authenticate-reset" component={PwdReset} />
				<Route path="/blog" component={CreateBlog} />
				<Route path="/engagements" component={CreateEngagement} />
				<Route path="/bumps" component={CreateBump} />
				<Route path="/kids" component={CreateChildren} />
				<Route path="/family" component={CreateFamily} />
				<Route path="/potraits" component={CreatePotrait} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default App;
