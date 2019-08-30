import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './componentFiles/home';
import About from './componentFiles/about';
import Header from './common/header';
import AuthPage from './componentFiles/signUp';
import LoginPage from './componentFiles/login';
import CreateBlog from './containers/createBlog';
// import Footer from './common/footer';
import PageNotFound from './common/PageNotFound';

const App = () => {
	return (
		<div>
			<Header />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route path="/about" component={About} />
				<Route path="/signup" component={AuthPage} />
				<Route path="/sigin" component={LoginPage} />
				<Route path="/blog" component={CreateBlog} />
				<Route component={PageNotFound} />
			</Switch>
		</div>
	);
};
export default App;
