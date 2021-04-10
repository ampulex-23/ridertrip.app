import React, { Component, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RezortoHeader from '../../components/common/RezortoHeader';
import { Text, View } from 'react-native';
import { Container } from 'native-base';
import { DeviceMotion } from 'expo-sensors';

const { Navigator, Screen } = createStackNavigator();

function TrackerConrolScreen (props) {
	const [ sequence, addPoint ] = useState([]);
	const [ avalible, setAvalible ] = useState(false);
	useEffect(() => {
		(async () => {
			const avalible = await DeviceMotion.isAvailableAsync();
			setAvalible(avalible);
			if (avalible) {
				DeviceMotion.addListener((
					{ interval, acceleration, rotation,
						rotationRate, orientation }) => {
					addPoint([...sequence, {interval, acceleration, rotation, rotationRate, orientation}]);
				})
				DeviceMotion.setUpdateInterval(500);
			}
		})()
	}, []);

	return (
		<Container>
			<View>
				<Text>{sequence.length}</Text>
			</View>
			<View>
				<Text>{sequence.map(p => Object.values(p.acceleration).join(' - ')).join("\n")}</Text>
			</View>
		</Container>
	)
}

class TrackerScreen extends Component {

	state = {
		user: null,
		jwt: null,
	};

	componentDidMount = () => {
		const { route } = this.props;
		const { params: state } = route;
		this.setState(state);
	};

	render () {
		const { user } = this.state;
		const { navigation } = this.props;
		const options = title => ({
			headerTitle: props =>
				<RezortoHeader {...props} navigation={navigation} user={user} title={title} />
		});
		return (
			<Navigator>
				<Screen
					name="TrackerControl"
					options={options('Ride tracker controls')}
					component={TrackerConrolScreen}
					initialParams={this.state}
				/>
				<Screen
					name="SamplesArchive"
					component={Container}
					options={options("Ride captures archive")}
					initialParams={this.state}
				/>
			</Navigator>
		)
	}
}

export default TrackerScreen;
export { TrackerScreen }