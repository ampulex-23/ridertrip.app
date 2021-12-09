import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	SafeAreaView, Switch, TouchableOpacity,
	Text, View, FlatList
} from 'react-native';
import { Container } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { containerStyles, mapStyle } from "../../../helpers/styling";

class ResortsListContainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	state = {
		geo: {
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922 / 4,
			longitudeDelta: 0.0421 / 4,
		},
		me: false,
		mapShown: true,
	};

	static async getMyLocation () {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			alert('Permission to access location was denied');
			return null;
		}
		let loc = await Location.getCurrentPositionAsync({});
		return {
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
			latitudeDelta: loc.coords.accuracy / 4,
			longitudeDelta: loc.coords.accuracy / 4,
		}
	}

	componentDidMount = () => {
		ResortsListContainer.getMyLocation().then(geo => {
			this.setState({
				...this.state,
				geo: {
					...geo,
					latitudeDelta: geo.latitudeDelta / 200,
					longitudeDelta: geo.longitudeDelta / 200
				},
				me: {...geo}
			});
		});
	};

	prepareMarkers = (json = false) => {
		const { resorts = [] } = this.props;
		const found = resorts.filter(r => !!r.location && r.location !== '');
		return found.map(resort => {
			const { me: { latitude: rlat, longitude: rlon } } = this.state;
			const [ latitude, longitude ] = resort.location.split(",").map(v => +v);
			const distance = ((latitude - rlat)**2 + (longitude - rlon)**2)**0.5;
			return json ? {
				...resort, distance
			} : (
				<Marker
					key={'RESORT__' + resort.id}
					coordinate={{ latitude, longitude }}
					title={resort.name}
					draggable={false}
					pinColor="#FF503B"
				/>
			)
		});
	};

	render () {
		const { geo, mapShown } = this.state;
		const { navigation, resorts } = this.props;
		const found = this.prepareMarkers(true);
		return (
			<View style={containerStyles.container}>
				<SafeAreaView style={{ flex: 1 }}>
					<FlatList
						data={[ ...found, ...(resorts.filter(r => !found.map(({id}) => id).includes(r.id)))]
							.map(resort => ({...resort, onMap: resort.distance > 0}))
							.sort((a, b) => (a.distance - b.distance))}
						renderItem={({ item }) => item ?
							<TouchableOpacity
								key={'' + item.id}
								onLongPress={() =>
									navigation.navigate('ResortDetails', { resort: item })
								}
								onPress={() => {
									if (!item.onMap) {
										return;
									}
									const [ latitude, longitude ] = item.location.split(",").map(v => +v);
									this.setState({...this.state, geo: {...this.state.geo, latitude, longitude}});
								}}
								style={[ mapStyle.item, { flex: 1, backgroundColor: item.onMap ? '#FFFFFF' : '#FFFFFF' } ]}>
								<Text style={mapStyle.title}>{item.name}</Text>
								<Ionicons name='chevron-forward' color='gray' size={20}/>
							</TouchableOpacity> : null
						}
						keyExtractor={item => '' + item.id}
					/>
				</SafeAreaView>
			</View>
		);
	}
}

export default connect(state => ({
	auth: state.auth,
	resorts: state.lists.resorts
}))(ResortsListContainer);