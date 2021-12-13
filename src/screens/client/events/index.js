import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EventsList from './EventsList';
import EventDetails from './EventDetails';
import { TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';


const { Navigator, Screen } = createStackNavigator();

class EventsScreen extends Component {

	state = {
    events: []
	};

	componentDidMount = () => {
		const { route } = this.props;
		const { params: state } = route;
	};

	render () {
		const { user } = this.state;
		const { navigation, route } = this.props;
		const { params = {} } = route;
		const { title = null } = params;
		return (
			<Navigator mode='modal'>
				<Screen
					name="EventsList"
					options={{
						title: 'События',
						headerStyle: {
							backgroundColor: '#E5E5E5',
							height: 160
						},
						headerTitleStyle: {
							justifyContent: 'center',
							alignItems: 'baseline',
							marginLeft: -20,
							marginTop: -15,
							position: 'absolute',
							fontWeight: 'bold',
							fontSize: 25,
							lineHeight: 32,
							textAlign: 'center',
							color: '#0D1F3C',
							width: '90%'
						},
						headerLeft: () => {
							return (
								<TouchableOpacity onPress={() => navigation.navigate({ name: 'Notifications' })}
									style={{ width: 12, height: 32, marginLeft: 10, padding: 3 }}>
									<SvgUri uri='https://unpkg.com/ionicons@5.5.2/dist/svg/chevron-back-outline.svg'
										width='24' height='24' stroke={'#000000'} color={'#000000'} />
								</TouchableOpacity>
							)
						}
					}}
					component={EventsList}
					initialParams={this.state}
				/>
				<Screen
					name="LessonScreen"
					options={{
						title: title || 'Подробности',
						headerStyle: {
							backgroundColor: '#E5E5E5',
							height: 160
						},
						headerTitleStyle: {
							justifyContent: 'center',
							alignItems: 'baseline',
							marginLeft: -20,
							marginTop: -15,
							position: 'absolute',
							fontWeight: 'bold',
							fontSize: 25,
							lineHeight: 32,
							textAlign: 'center',
							color: '#0D1F3C',
							width: '90%'
						},
						headerLeft: () => {
							return (
								<TouchableOpacity onPress={() => navigation.navigate({ name: 'Events' })}
									style={{ width: 12, height: 32, marginLeft: 10, padding: 3 }}>
									<SvgUri uri='https://unpkg.com/ionicons@5.5.2/dist/svg/chevron-back-outline.svg'
										width='24' height='24' stroke={'#000000'} color={'#000000'} />
								</TouchableOpacity>
							)
						}
					}}
					component={EventDetails}
					initialParams={this.state}
				/>
			</Navigator>
		)
	}
}
const ClientEventsScreen = EventsScreen;
export default ClientEventsScreen;
export { ClientEventsScreen }