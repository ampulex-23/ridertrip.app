import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { Content, Form, Item, Text, Input, View } from 'native-base';
import RezortoHeader from '../../components/common/RezortoHeader';

const ProfileStack = createStackNavigator();

class ProgressScreenContainer extends Component {

	stack = ProfileStack;

	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		const { user } = this.props;
		if (!user) {
			return null;
		}
		const { navigation } = this.props;
		const options = title => ({
			headerTitle: props =>
				<RezortoHeader
					navigation={navigation}
					user={user}
					title={title}
					{...props}
				/>
		});
		return (
			<ProfileStack.Navigator initialRoute="Stats">
				<ProfileStack.Screen
					name="Stats"
					options={options("My training progress")}
					component={View}
				/>
			</ProfileStack.Navigator>
		);
	};
}
export default connect(state => ({
	auth: state.auth,
	user: state.auth.user
}))(ProgressScreenContainer);
