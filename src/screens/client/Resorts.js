import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ResortDetails from './resorts/ResortDetails';
import ResortsList from './resorts/ResortsList';
import RezortoHeader from '../../components/common/RezortoHeader';

const { Navigator, Screen } = createStackNavigator();

class ClientResortsScreen extends Component {

	state = {
		user: null,
		jwt: null,
		resorts: []
	};

	componentDidMount = () => {
		const { route } = this.props;
		const { params: state } = route;
		this.setState(state);
	};

	render () {
		const { user } = this.state;
		const { navigation } = this.props;
		const options = title => ({
			headerTitle: props =>
				<RezortoHeader {...props} navigation={navigation} user={user} title={title} />
		});
		return (
			<Navigator>
				<Screen
					name="ResortsList"
					options={options('Explore resorts')}
					component={ResortsList}
					initialParams={this.state}
				/>
				<Screen
					name="ResortDetails"
					component={ResortDetails}
					options={options("Resort details")}
					initialParams={this.state}
				/>
			</Navigator>
		)
	}
}

export default ClientResortsScreen;
export { ClientResortsScreen }