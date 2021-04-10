import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import SchoolTabs from './lessons/SchoolTabs';
import RezortoHeader from '../../components/common/RezortoHeader';
import CreateInvoice from './lessons/CreateInvoice';

const SchoolStack = createStackNavigator();

class ClientLessonsScreenContainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		const { auth: { user } } = this.props;
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
			<SchoolStack.Navigator
				initialRouteName="School"
			>
				<SchoolStack.Screen
					name="School"
					component={SchoolTabs}
					options={options('Trainings invoices and schedule')}
				/>
				<SchoolStack.Screen
					name="CreateInvoice"
					component={CreateInvoice}
					options={options('Create invoice for training')}
				/>
			</SchoolStack.Navigator>
		);
	}
}
export default connect(state => ({ auth: state.auth }))(ClientLessonsScreenContainer);