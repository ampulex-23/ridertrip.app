import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHeaders, BASE_URL as apiUrl } from '../../../api/headers';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsList from './NotificationsList';
import { Button } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import { Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';

const { Navigator, Screen } = createStackNavigator();

class NotificationsScreen extends Component {

	state = {
    notifications: []
	};

	componentDidMount = () => {
		const { route } = this.props;
		const { params: state } = route;
	};

	render () {
		const { auth: { user }, navigation, lists: { theme: [theme] } } = this.props;
		if (!theme) { return null; }
		return (
			<Navigator>
				<Screen
					name="NotificationsList"
					options={{
						title: 'Уведомления',
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
					component={NotificationsList}
					initialParams={this.state}
				/>
			</Navigator>
		)
	}
}

export default connect(state => ({
	...state
}))(NotificationsScreen);
export { NotificationsScreen as ClientNotificationsScreen }