import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
	Button, ListItem, Left, Body, Right, Thumbnail, Icon, Content,
} from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Rating from "./Rating";
import { BASE_URL } from "../../api/headers";
import { containerStyles, colorScheme } from "../../helpers/styling";

const {
	flexCol, flexRow, flexStretch,
	flexCenter, bgWhite
} = containerStyles;


class UserListItem extends Component {
	render () {
		const { coach, navigation, place = false } = this.props;
		const fotoUrl = Object.values(coach?.userpic?.formats ||
			{ small: { url: "/uploads/ionicons_com_59a580d9a3.png" } })[ 0 ].url;
		return (
			<ListItem style={{ marginLeft: 0, paddingLeft: 8, justifyContent: 'flex-start' }}>
				<Thumbnail source={{ uri: BASE_URL + fotoUrl }}/>
				<TouchableOpacity style={{flexGrow: 1}}
					onPress={() => navigation.navigate("Coach", { id: coach.id })}
				>
					<View style={[ flexCol, { paddingLeft: 8 } ]}>
						<Text style={{ fontSize: 18 }}>{coach.firstname + ' ' + coach.lastname}</Text>
						<Rating rating={coach.rating} style={{ height: 30 }}/>
					</View>
				</TouchableOpacity>
				<Button {...{ [ this.props.route.name === 'CreateInvoice' ? 'transparent' : 'success' ]: true }}
								onPress={() => this.props.route.name !== 'CreateInvoice' && navigation.navigate("CreateInvoice", { coach })}
								style={{ width: 110, paddingVertical: 8 }}
								iconLeft textStyle={{ fontSize: 16 }}
				>
					{this.props.route.name !== 'CreateInvoice' &&
					<Icon type={"Ionicons"} name={'cash'} fontSize={20} color={'#FFFFFF'}/>}
					<Text style={this.props.route.name !== 'CreateInvoice' ?
						{ color: "#FFFFFF", fontSize: 18, padding: 0, marginRight: 15 } :
						{
							color: "#285e3b", fontSize: 24, fontWeight: 'bold', fontFamily: '',
							padding: 0, marginRight: 15
						}}>{coach.avgPrice + " ₽"}</Text>
				</Button>
			</ListItem>
		);
	}
}

export default function UserItem (props) {
	const navigation = useNavigation();
	const route = useRoute();
	return <UserListItem {...props} navigation={navigation} route={route}/>
}