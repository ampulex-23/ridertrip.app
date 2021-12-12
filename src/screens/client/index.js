import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'native-base';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import { BASE_URL as apiUrl } from '../../api/headers';
import { SvgUri } from 'react-native-svg';
import { View, Dimensions, TouchableOpacity } from 'react-native';

import NotificationsScreen from './notifications';
import EventsScreen from './events';
import InvoiceScreen from './invoice';

const BottomTabs = createBottomTabNavigator();

class MainStackContainer extends Component {

	constructor(props, ctx) {
		super(props, ctx);
	};

	render() {
		const { lists: { theme: [theme] }, route } = this.props;
		if (!theme) { return null; }
		const navigatorConfig = {
			initialRouteName: 'Notifications',
			tabBar: (props) => (
				getFocusedRouteNameFromRoute(route) !== 'Invoice' ?
					<View style={{ position: 'relative', backgroundColor: "#ffffff", height: 89 }}>
						<SvgUri
							uri={apiUrl + theme.FOOTER_FRAME.url}
							width={Dimensions.get('screen').width}
							height={89}
							style={{
								zIndex: 0,
								position: 'absolute', left: 0,
								shadowRadius: 0, top: 0, bottom: 5
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
								right: 0, top: 0, bottom: 8,
								height: 89,
								borderWidth: 0,
								backgroundColor: '#ffffff00',
								opacity: 1,
								borderColor: 'transparent'
							}}
							showLabel={false}
						/>
					</View> : null
			),
			tabBarOptions: {
				showLabel: true,
				showIcon: true,
				labelPosition: 'below-icon'
			}
		};
		const labelStyle = {
			fontStyle: 'normal',
			fontWeight: '500',
			fontSize: 10,
			lineHeight: 24,
			textAlign: 'center',
			color: '#78839C',
			position: 'absolute',
			bottom: -6,
			left: 6
		};
		const routeConfigs = {
			Notifications: {
				name: 'Notifications',
				screen: NotificationsScreen,
				path: "/notifications",
				navigationOptions: ({ navigation }) => ({
					title: 'Уведомления',
					tabBarIcon: () => {
						const rn = getFocusedRouteNameFromRoute(route);
						const focused = rn === 'Notifications';
						return (focused
							? <View key={2}>
								<SvgUri uri={`${apiUrl}${theme.NOTIFICATIONS_ACTIVE_ICON.url}`} stroke={'#3783F5'} />
								<Text style={labelStyle}>Уведомления</Text>
							</View>
							: <View key={2}>
								<SvgUri uri={`${apiUrl}${theme.NOTIFICATIONS_ICON.url}`} />
								<Text style={labelStyle}>Уведомления</Text>
							</View>
						)
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
				screen: InvoiceScreen,
				path: "/invoice",
				navigationOptions: ({ navigation }) => ({
					title: 'Создать заявку',
					tabBarVisible: false,
					tabBarIcon: () => (
						<SvgUri uri={`${apiUrl}${theme.BIG_PLUS_ICON.url}`} fill='#FFFFFF' color='#FFFFFF'
							style={{ bottom: 20 }}
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
				screen: EventsScreen,
				path: "/events",
				navigationOptions: ({ navigation }) => ({
					title: 'События',
					tabBarIcon: () => {
						const rn = getFocusedRouteNameFromRoute(route);
						const focused = rn === 'Events';
						return (focused
							? <View key={2}>
								<SvgUri uri={`${apiUrl}${theme.EVENTS_ICON.url}`} stroke={'#3783F5'} />
								<Text style={labelStyle}>События</Text>
							</View>
							: <View key={2}>
								<SvgUri uri={`${apiUrl}${theme.EVENTS_ICON.url}`} />
								<Text style={labelStyle}>События</Text>
							</View>
						)
					},
					tabBarButtonComponent: () => (
						<TouchableOpacity style={{ paddingHorizontal: 8 }}
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