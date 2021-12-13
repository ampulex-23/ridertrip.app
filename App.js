import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Root, Header } from 'native-base';
import MainStack from './src/screens/client';

import {
	access, me,	resorts, services, skills, enums, theme
} from './src/api';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import moment from 'moment';

moment.updateLocale('en', {
	monthsShort : [
			"Янв", "Фев", "Мар", "Апр", "Мая", "Июн",
			"Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
	]
});

const PERSISTENCE_KEY = "REZ.STATE";
const RootStack = createStackNavigator();
const usedFonts = {
	"Montserat": 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
};

const OS_APP_ID = "68ad93e6-c2ab-42df-9f8b-57dd99c6240b";
const USER_ID = process.env.USER_ID || 8;
class App extends Component {

	static initialState = {
		...store.getState(),
		appIsReady: false,
		routes: []
	};
	state = App.initialState;
	stack = RootStack;

	constructor (props, ctx) {
		super(props, ctx);
	}

	componentDidMount = async () => {
		await Font.loadAsync(usedFonts);
		await SplashScreen.preventAutoHideAsync();
		const auth = await access({ id: USER_ID });
		const { jwt } = auth;
		const user = await me();
		const invoices = [
			...(user.client && user.client.lessons ? user.client.lessons : []),
			...(user.instructor && user.instructor.lessons ? user.instructor.lessons : [])
		];
		const _resorts = await resorts();
		const _theme = await theme();
		await services();
		await skills();
		await enums();
		await SplashScreen.hideAsync();
		this.setState({
			...this.state,
			user, jwt, invoices, lessons: invoices,
			resorts: _resorts, theme: _theme, appIsReady: true
		});
		OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
		OneSignal.setLogLevel(6, 0);
		OneSignal.setAppId(OS_APP_ID);
		OneSignal.promptForPushNotificationsWithUserResponse(response => {
    	console.warn("Prompt response:", response);
    });
	};
	restoreState = async () => {
		try {
			const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
			if (!savedStateString) {
				return false;
			} else {
				const state = savedStateString ? JSON.parse(savedStateString) : false;
				return state && state.jwt ? state.jwt : false;
			}
		} catch (e) {
			console.warn("Error", e);
			return false;
		}
	};

	render () {
		const { auth: { user }, appIsReady, navigation } = this.state;
		if (!appIsReady) { return null; }
		const options = title => ({
			headerTitle: props => (
				<Header {...props} navigation={navigation} user={user} title={title} />)
		});
		return (
			<Provider store={store}>
				<Root>
					<NavigationContainer
						initialState={App.initialState}
						onStateChange={async (state) => (
							await AsyncStorage.
								setItem(
									PERSISTENCE_KEY, 
									JSON.stringify(state)
								)
						)}
					>
						<RootStack.Navigator 
							initialRouteName="Main" 
							mode="modal"
						>
							<RootStack.Screen
								name="Main"
								options={{ headerShown: false }}
								component={MainStack}
							/>
						</RootStack.Navigator>
					</NavigationContainer>
				</Root>
			</Provider>
		);
	}
}

export default App;