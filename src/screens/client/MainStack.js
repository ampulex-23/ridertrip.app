import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { colorScheme } from '../../helpers/colors';
import ResortsScreen from './Resorts';
import SchoolScreen from './Lessons.js';
import TrackerScreen from './Tracker';
import ProgressScreen from './Progress';

const BottomTabs = createMaterialBottomTabNavigator();
const tabIconNames = {
	Resorts: {
		standart: "md-images-outline",
		focused: "md-images"
	},
	School: {
		standart: "md-school-outline",
		focused: "md-school"
	},
	Tracker: {
		standart: "speedometer-outline",
		focused: "speedometer-sharp"
	},
	Progress: {
		standart: "fitness-outline",
		focused: "fitness-sharp"
	},
};
const tabPress = (nav, screen, sub, params = {}) => ((e) => {
	e.preventDefault();
	let param = {};
	param.screen = sub || undefined;
	param = {...params, ...(sub ? { screen: sub } : {})};
	nav.navigate(...[screen, param]);
});
const screenOptions = ({ route }) => ({
	tabBarIcon: ({ focused, color }) => {
		const icons = tabIconNames[ route.name ];
		const iconName = focused ? icons.focused : icons.standart;
		return (
			<Icon
				type='Ionicons' name={iconName}
				style={{ fontSize: 24, fontWeight: 'bold', color }}
			/>
		)
	}
});

class MainStackContainer extends Component {

	tabs = null;
	constructor (props, ctx) {
		super(props, ctx);
		this.tabs = BottomTabs;
	}

	render () {

		return (
			<BottomTabs.Navigator
				shifting={true}
				screenOptions={screenOptions}
				activeColor={colorScheme.secondary_b_3_color}
				inactiveColor='#FFFFFF'
				initialRouteName="School"
				barStyle={{ backgroundColor: colorScheme.primary_2_color, paddingVertical: 3 }}
			>
				<BottomTabs.Screen
					name="Resorts"
					component={ResortsScreen}
					options={{ title: 'Resorts' }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "Resorts", "ResortsList")
					})}
				/>
				<BottomTabs.Screen
					name="School"
					component={SchoolScreen}
					options={{ title: 'School' }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "School", "Invoices")
					})}
				/>
				<BottomTabs.Screen
					name="Tracker"
					component={TrackerScreen}
					options={{ title: 'Tracker' }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "Tracker", "TrackerControl")
					})}
				/>
				<BottomTabs.Screen
					name="Progress"
					component={ProgressScreen}
					options={{ title: 'Progress' }}
					listeners={({ navigation }) => ({
						tabPress: tabPress(navigation, "Progress", "Stats")
					})}
				/>
			</BottomTabs.Navigator>
		);
	}
}

export default connect(state => ({
	...state.auth,
	...state.resorts,
	...state.lessons
}), {})(MainStackContainer);