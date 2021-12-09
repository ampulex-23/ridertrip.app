import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Right, Content } from 'native-base';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL as apiUrl } from '../../api/headers';

class RezortoHeaderContainer extends Component {

	_menu = null;

	constructor (props, ctx) {
		super(props, ctx);
	}

	setMenuRef = ref => {
		this._menu = ref;
	};

	hideMenu = () => {
		this._menu.hide();
	};

	showMenu = () => {
		this._menu.show();
	};

	render () {
		const { user, title, navigation } = this.props;
		//alert("USER = " + JSON.stringify(user.userpic));
		const userpicFormats = user?.userpic?.formats;
		const userpicUrl = userpicFormats 
			? (apiUrl + Object.values(userpicFormats)[0].url) 
			: 'https://www.gravatar.com/avatar/1556dbd9a7903cc5e91ea09f3fa3b645?d=mm';
		const userpic = user && userpicUrl ?
			<TouchableOpacity
				style={{
					width: 36, height: 36,
					borderRadius: 140,
					borderWidth: 1,
					borderColor: '#000000',
					overflow: 'hidden'
				}}
				onPress={this.showMenu}
			>
				<Image source={{ uri: userpicUrl }}
					style={{
						width: 36, height: 36,
						resizeMode: 'cover'
					}}
				/>
			</TouchableOpacity> :
			<Ionicons
				name='person-circle'
				color='#000000'
				size={32}
			/>;
		return (
			<Content>
				<Text style={{
					fontSize: 20,
					paddingVertical: 6,
					backgroundColor: '#FFFFFF',
					fontFamily: 'sans-serif-medium'
				}}>
					{title}
				</Text>
				<Right style={{ position: 'absolute', right: 4 }}>
					{userpic}
					<Menu
						ref={this.setMenuRef}
						style={{ marginTop: 10 }}
					>
						<MenuItem
							onPress={() => {
								this.hideMenu();
								navigation.navigate('Profile');
							}}
						>
							Profile
						</MenuItem>
						<MenuDivider/>
						<MenuItem>Settings</MenuItem>
					</Menu>
				</Right>
			</Content>
		)
	}
}

export default RezortoHeaderContainer;