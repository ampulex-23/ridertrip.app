import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, Container } from 'native-base';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { colorScheme } from '../../helpers/colors';
import ResortsScreen from './Resorts';
import SchoolScreen from './Lessons.js';
import TrackerScreen from './Tracker';
import ProgressScreen from './Progress';
import { getHeaders, BASE_URL as apiUrl } from '../../api/headers';
import { SvgUri } from 'react-native-svg';
import { View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';

const BottomTabs = createBottomTabNavigator();

class MainStackContainer extends Component {

	constructor(props, ctx) {
		super(props, ctx);
	};

	screenOptions = ({ route }) => {
		const { lists: { theme: [theme] } } = this.props;
		return {

			tabBarIcon: ({ focused }) => {
				const icons = {
					Notifications: focused
						? theme.NOTIFICATIONS_ACTIVE_ICON.url
						: theme.NOTIFICATIONS_ICON.url,
					Invoice: theme.BIG_PLUS_ICON.url,
					Events: focused
						? theme.EVENTS_ACTIVE_ICON.url
						: theme.EVENTS_ICON.url
				};
				const titles = {
					Notifications: 'Уведомления', Invoice: 'Создать заявку', Events: 'События'
				};
				const uri = icons[route.name];
				return (
					//<View style={{
					//}}>
					<SvgUri uri={`${apiUrl}${uri}`}
						style={{
							top: route.name !== 'Invoice' ? 20 : 0,
							marginRight: route.name === 'Events' ? 38 : 0
						}}
					/>
					//</View>
				)
			}
		}
	};

	render() {
		const { lists: { theme: [theme] } } = this.props;
		if (!theme) { return null; }
		const navigatorConfig = {
			initialRouteName: 'Notifications',
			tabBar: (props) => (
				<View style={{position: 'relative', backgroundColor: "#ffffff", height: 89}}>	
					<SvgUri 
						uri={apiUrl + theme.FOOTER_FRAME.url}
						width={Dimensions.get('screen').width}
						height={89}
						style={{
							zIndex: 0,
							position: 'absolute', left: 0,
							shadowRadius: 0, top: 0, bottom: 0
						}}
					/>
					<BottomTabBar {...props} 
						style={{
							opacity: 1,
							height: 89,
							backgroundColor: '#FFFFFF00',
							padding: 0,
							elevation: 0
						}}
						tabStyle={{
							position: 'relative', left: 0,
							right: 0, top: 0, bottom: 0,
							height:89,
							borderWidth: 0,
							backgroundColor: '#ffffff00',
							opacity: 1,
							borderColor: 'transparent'
						}}

						showLabel={false}
						inactiveTintColor={'transparent'}
						activeTintColor={'transparent'}
						activeBackgroundColor={'transparent'}
						inactiveBackgroundColor={'transparent'} 
					/>
				</View>
			),
			tabBarOptions: {
				showLabel: false
			}
		};
		const routeConfigs = {
			Notifications: {
				name: 'Notifications',
				screen: ResortsScreen,
				path: "/notifications",
				navigationOptions: ({ navigation }) => ({
					title: 'Уведомления',
					tabBarIcon: ({ focused }) => {
						return true //focused || route && route.name === 'Notifications' || true
						? <SvgUri uri={`${apiUrl}${theme.NOTIFICATIONS_ACTIVE_ICON.url}`} />
						:	<SvgUri uri={`${apiUrl}${theme.NOTIFICATIONS_ICON.url}`} />
					},
					tabBarButtonComponent: () => (
						<TouchableOpacity style={{}}
							onPress={() => navigation.navigate('Notifications')}
						/>
					)
				})
			},
			Invoice: {
				name: 'Invoice',
				screen: SchoolScreen,
				path: "/invoice",
				navigationOptions: ({ navigation }) => ({
					title: 'Создать заявку',
					tabBarIcon: () => (
						<SvgUri uri={`${apiUrl}${theme.BIG_PLUS_ICON.url}`}
							style={{bottom: 24}}
						/>
					),
					tabBarButtonComponent: () => (
						<TouchableOpacity style={{}}
							onPress={() => navigation.navigate('/invoice')} 
						/>
					)
				})
			},
			Events: {
				name: 'Events',
				screen: TrackerScreen,
				path: "/events",
				navigationOptions: ({ navigation }) => ({
					title: 'События',
					tabBarIcon: ({ focused }) => (
						<SvgUri uri={`${apiUrl}${focused 
							? theme.EVENTS_ACTIVE_ICON.url 
							: theme.EVENTS_ICON.url}`}
							style={{}}
						/>
					),
					tabBarButtonComponent: () => (
						<TouchableOpacity style={{paddingHorizontal: 8}}
							onPress={() => navigation.navigate('/events')} 
						/>
					)
				})
			}
		}
		
		return (
			<BottomTabs.Navigator {...navigatorConfig}>
				{Object.keys(routeConfigs).map(name => {
					return (
						<BottomTabs.Screen name={name} key={name}
							component={routeConfigs[name].screen}
							options={routeConfigs[name].navigationOptions}
						/>
					)
				})}
			</BottomTabs.Navigator>
		)
	}
}

export default connect(state => ({
	...state
}), {})(MainStackContainer);