import React, { Component } from "react";
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon } from 'native-base';
import { Instants, TrainingSchedule } from ".";
import InvoicesList from "./InvoicesList";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTabs = createMaterialTopTabNavigator();
const tabPress = (navigation, screen, subscreen) => (async e => {
	e.preventDefault();
	const args = [screen];
	subscreen && args.push({screen: subscreen});
	await navigation.navigate(...args);
});

class SchoolTabsContainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		return (
			<TopTabs.Navigator
				initialRouteName="Invoices"
			>
				<TopTabs.Screen
					name="Invoices"
					component={InvoicesList}
					options={{ title: "Invoices" }}
					initialParams={this.state}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "School", "Invoices")
					})}
				/>
				<TopTabs.Screen
					name="Trainings"
					component={TrainingSchedule}
					options={{ title: "Schedule" }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "School", "Trainings")
					})}
				/>
				<TopTabs.Screen
					name="Instant"
					component={Instants}
					options={{ title: "🔥Instant" }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "School", "Instant")
					})}
				/>
			</TopTabs.Navigator>
		);
	}
}
export default connect(state => ({auth: state.auth}))(SchoolTabsContainer);