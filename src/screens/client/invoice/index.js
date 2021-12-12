import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import InvoiceForm from './Form';
import InvoicePreview from './Preview';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { BASE_URL as apiUrl } from '../../../api/headers';
const { Navigator, Screen } = createStackNavigator();

class InvoiceScreen extends Component {

	state = {
		events: []
	};

	constructor(props) {
		super(props);
		this._styles = StyleSheet.create({
			headerTitleStyle: {
				marginTop: -15,
				position: 'absolute',
				width: 48 + Dimensions.get('screen').width / 2,
				fontWeight: 'bold',
				fontSize: 25,
				lineHeight: 32,
				textAlign: 'center',
				color: '#0D1F3C'
			},
			headerStyle: {
				backgroundColor: '#E5E5E5',
				height: 160
			},
			touchableStyle: { 
				width: 24, 
				height: 32, 
				left: 10, 
				padding: 3, 
				position: 'absolute', 
				zIndex: 1 
			},
		});
	}

	renderBack = () => {
		const { navigation: { navigate } } = this.props;
		const { _styles: styles = null } = this;
		return (
			<TouchableOpacity
				onPress={() => navigate({ name: 'InvoiceForm' })}
				style={styles.touchableStyle}>
				<SvgUri
					uri='https://unpkg.com/ionicons@5.5.2/dist/svg/chevron-back-outline.svg'
					width='24' height='24' stroke={'#000000'} color={'#000000'}
				/>
			</TouchableOpacity>
		)
	};

	renderClose = () => {
		const { navigation: { navigate } } = this.props;
		const { _styles: styles = null } = this;
		const { lists: { theme: [theme] } } = this.props;
		return (
			<TouchableOpacity
				onPress={() => navigate({ name: 'Events' })}
				style={styles.touchableStyle}>
				<SvgUri	uri={apiUrl + theme.CLOSE_ICON.url}
					width='20' height='20' 
					stroke={'#000000'} color={'#000000'}
				/>
			</TouchableOpacity>
		)
	};

	render() {
		const { _styles: styles = null } = this;
		const formScreenOptions = {
			title: 'Создать заявку',
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerLeft: this.renderClose
		};
		const previewScreenOptions = {
			title: 'Разместить заявку',
			headerStyle: styles.headerStyle,
			headerTitleStyle: styles.headerTitleStyle,
			headerLeft: this.renderBack
		};
		return styles && (
			<Navigator initialRouteName='InvoiceForm'>
				<Screen
					name="InvoiceForm"
					options={formScreenOptions}
					component={InvoiceForm}
				/>
				<Screen
					name="InvoicePreview"
					component={InvoicePreview}
					options={previewScreenOptions}
				/>
			</Navigator>
		)
	}
};
const _InvoiceScreen =
	connect((props, state) => ({
		...props, 
		...state
	}))(InvoiceScreen);
export default _InvoiceScreen;
export { _InvoiceScreen as InvoiceScreen }