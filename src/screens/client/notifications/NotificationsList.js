import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	SafeAreaView, TouchableOpacity,
	Text, View, FlatList
} from 'react-native';
import { Container } from 'native-base';
import { containerStyles } from "../../../helpers/styling";

class NotificationsListContainer extends Component {

	constructor(props, ctx) {
		super(props, ctx);
	}

	state = {};

	componentDidMount = () => { };

	render() {
		return (
			<View style={[containerStyles.container, { borderRadius: 20, overflow: 'hidden', marginTop: -20, zIndex: 1 }]}>
			</View>
		);
	}
}

export default connect(state => ({
	...state
}))(NotificationsListContainer);