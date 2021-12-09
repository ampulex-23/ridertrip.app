import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Root, Container, Content, Body } from 'native-base';

import MainStack from './src/screens/client/MainStack';
import MyProfile from './src/screens/client/unstacked/UserProfileForm';
import ResortDetails from './src/screens/client/resorts/ResortDetails';
import { InvoiceCard } from './src/components';
import CoachScreen from './src/screens/client/unstacked/CoachScreen';
import RezortoHeader from './src/components/common/RezortoHeader';

import {
	access, me,	resorts, services, skills, enums, theme
} from './src/api';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';
import * as Application from 'expo-application';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

const PERSISTENCE_KEY = "REZ.STATE";
const RootStack = createStackNavigator();
const usedFonts = {
	"Exo 2": 'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
	"Roboto": 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
};

const Training = function (props) {
	return (
		<Container style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
			<InvoiceCard {...props}/>
		</Container>
	)
};

const OS_APP_ID = "68ad93e6-c2ab-42df-9f8b-57dd99c6240b";
const USER_ID = process.env.USER_ID || 8;
class App extends Component {

	static initialState = {
		appIsReady: false,
		jwt: null,
		user: null,
		resorts: null,
		invoices: null,
		lessons: null,
		routes: [],
		requiresPrivacyConsent: false,
		theme: null
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
			...(user.client ? user.client.lessons : []),
			...(user.instructor ? user.instructor.lessons : [])
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
    	console.log("Prompt response:", response);
    });
		
		/*const auth = await this.checkAppCredsAndroid();
		if (auth) {
			const invoices = await fetchInvoices(auth.jwt);
			const coaches = await fetchCoaches(auth.jwt);
			store.dispatch({ type: "LOGIN", user: auth.user, jwt: auth.jwt, auth });
			store.dispatch({ type: "STORE_RESORTS", resorts });
			store.dispatch({ type: "STORE_INVOICES", invoices });
			store.dispatch({ type: "STORE_COACHES", coaches });
			
			this.setState({
				...this.state, ...auth, invoices, resorts,
				appIsReady: true
			});
			await SplashScreen.hideAsync();
		}*/
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
	checkAppCredsAndroid = async () => {
		const storedJwt = await this.restoreState();
		const myAuth = storedJwt ? await me(storedJwt) : await (async () => false)();
		if (!myAuth || !myAuth.user || !myAuth.user.id) {
			const identifier = Application.androidId + '@rezorto.app';
			const authLogin =
				await login({
					email: identifier,
					password: "ZxCvBnAsDf777#"
				});
			return authLogin ? authLogin :
				await register({
					email: identifier,
					username: Application.androidId,
					password: "ZxCvBnAsDf777#"
				});
		} else {
			return myAuth;
		}
	};

	render () {
		const { user, appIsReady } = this.state;
		if (!appIsReady) {
			return null;
		}
		const { navigation } = this.props;
		const options = title => ({
			headerTitle: props => (
			<RezortoHeader {...props} navigation={navigation} user={user} title={title} />)
		});
		return (
			<Provider store={store}>
				<Root>
					<NavigationContainer
						initialState={App.initialState}
						onStateChange={async (state) => (
							await AsyncStorage.
							setItem(PERSISTENCE_KEY, JSON.stringify(state))
						)}
					>
						<RootStack.Navigator initialRouteName="Main" mode="modal">
							<RootStack.Screen
								name="Main"
								options={{ headerShown: false }}
								component={MainStack}
							/>
							<RootStack.Screen
								name="Profile"
								user={user}
								options={options("My profile data")}
								component={MyProfile}
							/>
							<RootStack.Screen
								name="Coach"
								options={options("Coaches personal info")}
								component={CoachScreen}
							/>
							<RootStack.Screen
								name="Resort"
								options={options("Resort details")}
								component={ResortDetails}
							/>
							<RootStack.Screen
								name="Training"
								options={options("Training card")}
								component={Training}
							/>
						</RootStack.Navigator>
					</NavigationContainer>
				</Root>
			</Provider>
		);
	}
}

export default App;