import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Container, Form, Item, Input, Content, Footer,
	Label, Picker, Icon, Button, Toast
} from "native-base";
import { Text, Dimensions, Image, View, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { containerStyles } from "../../../helpers/styling";
import { BASE_URL, getHeaders } from '../../../api/headers';
import { updateProfile } from '../../../store/actions/index';

const { flexCol, flexRow, flexStretch, flexCenter, bgWhite } = containerStyles;

class UserProfileFormContainer extends Component {

	state = {
		user: null,
		age: null,
		gender: 'male',
		minlevel: 'novice'
	};

	constructor (props, ctx) {
		super(props, ctx);
	}

	saveProfile = async () => {
		const { auth: { jwt, user } } = this.props;
		if (!jwt || !user) {
			return false;
		}
		delete user[ 'userpic' ];
		const body = JSON.stringify({ ...user, client: user.client?.id });
		const headers = getHeaders(jwt, true);
		const response = await fetch(`${BASE_URL}/users/${user.id}`, {
			method: "PUT", mode: 'cors', headers, body
		}).then(data => data.json());
		if ('id' in response) {
			this.setState({
				...this.state,
				user: response
			});
			Toast.show({
				style: { marginTop: 0 }, text: "Changes saved.",
				buttonText: "Ok", type: "success", position: "bottom", duration: 1000
			});
		} else {
			Toast.show({
				text: "Error (" + response.code + ") " + response.message,
				buttonText: 'Ok', type: 'error', position: 'center', duration: 50000
			});
		}
	};

	loadUserpic = async () => {
		const doc = await DocumentPicker.getDocumentAsync({ type: "image/*" });
		const { user } = this.props;
		this.props.updateProfile({
			...user,
			userpic: doc
		});
	};

	render () {
		const labelStyle = {
			flex: 0.4
		};
		const inputStyle = {
			paddingLeft: 10,
			paddingRight: 0,
			marginRight: -4
		};
		if (!this.props.auth.user) {
			return null;
		}
		const { userpic = false } = this.props.auth.user;
		const picPickerStyle = [ {
			alignSelf: userpic ? 'center' : 'center',
			justifyContent: 'center',
			alignItems: 'center',
			height: 240,
			width: '100%',
			padding: 20,
			borderRadius: 0,
			borderWidth: 0,
			borderColor: '#A4A8B925',
			backgroundColor: '#A4A8B925',
			marginTop: 0,
			marginBottom: 4,
			marginLeft: 15,
			elevation: 0
		} ];
		const imageUrl = userpic && userpic.formats
			? Object.values(userpic.formats)[0].url
			: 'https://www.gravatar.com/avatar/1556dbd9a7903cc5e91ea09f3fa3b645?d=mm';

		return (
			<Container>
				<Content>
					<Form style={[ flexCol, flexStretch, { flexBasis: Dimensions.get('screen').height - 180 } ]}>
						<Button
							color={"#a4a8b9"}
							transparent
							style={[ picPickerStyle ]}
							onPress={async () => await this.loadUserpic()}
							hasText={false}
						>
							{!imageUrl ?
								<Icon
									type={"Ionicons"} name={'camera-sharp'}
									style={{ fontSize: 68, color: "#FFFFFF" }}
								/> :
								<Image
									source={{ uri: BASE_URL + imageUrl }}
									style={{
										width: 200, height: 200, overflow: 'hidden',
										borderWidth: 2, borderColor: '#A4A8B975',
										borderRadius: 20, alignSelf: 'center'
									}}
								/>}
						</Button>
						<ScrollView style={[ flexCol, { flex: 1 } ]}>
							<Item inlineLabel>
								<Label style={labelStyle}>Firstname</Label>
								<Input
									style={inputStyle} value={this.props.auth.user?.firstname || ''}
									onChangeText={(firstname) =>
										this.setState({
											...this.state,
											user: {
												...this.props.auth.user,
												firstname
											}
										})
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Lastname</Label>
								<Input
									style={inputStyle} value={this.props.auth.user?.lastname || ''}
									onChangeText={(lastname) =>
										this.setState({
											...this.state,
											user: {
												...this.props.auth.user,
												lastname
											}
										})
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Email</Label>
								<Input
									style={inputStyle}
									value={this.state.client?.email || this.props.auth.user?.email}
									onChangeText={(email) =>
										this.setState({
											...this.state,
											user: {
												...this.props.auth.user,
												email
											}
										})
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>City</Label>
								<Input
									style={inputStyle}
									value={ this.props.auth.user?.city || '' }
									onChangeText={(email) =>
										this.setState({
											...this.state,
											user: { ...this.props.auth.user, city }
										})
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Your age</Label>
								<Input
									style={inputStyle}
									keyboardType="decimal-pad"
									value={'' + this.props.auth.user?.age}
									onChange={(age) =>
										this.setState({ ...this.state, age })
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Set gender</Label>
								<Picker
									mode="dropdown"
									style={{ width: undefined }}
									selectedValue={this.props.auth.user?.gender}
									onValueChange={(gender) =>
										this.setState({ ...this.state, gender })
									}
								>
									<Picker.Item label="Male" value={'male'}/>
									<Picker.Item label="Female" value={'female'}/>
								</Picker>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Equipment</Label>
								<Picker
									mode="dropdown"
									style={{ width: undefined }}
									selectedValue={this.props.auth.user?.client?.stuff}
									onValueChange={(stuff) =>
										this.setState({ ...this.state, stuff })
									}
								>
									<Picker.Item label="Mountain ski" value={'Skiing'}/>
									<Picker.Item label="Snowboard" value={'Boarding'}/>
								</Picker>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Riding stage</Label>
								<Input
									style={inputStyle}
									keyboardType="decimal-pad"
									value={'' + this.props.auth.user?.client?.stage}
									onChange={(stage) =>
										this.setState({ ...this.state, stage })
									}
								/>
							</Item>
							<Item inlineLabel>
								<Label style={labelStyle}>Initial level</Label>
								<Picker
									mode="dropdown"
									style={{ width: undefined }}
									selectedValue={this.state.level || this.props.auth.user?.client?.minlevel || 'novice'}
									onValueChange={(minlevel) =>
										this.setState({ ...this.state, minlevel })
									}
								>
									<Picker.Item label="Novice" value={'novice'}/>
									<Picker.Item label="Basic" value={'basic'}/>
									<Picker.Item label="Advanced" value={'advanced'}/>
									<Picker.Item label="Expert" value={'expert'}/>
									<Picker.Item label="Pro" value={'pro'}/>
								</Picker>
							</Item>
						</ScrollView>
					</Form>
				</Content>
				<Footer style={[ bgWhite, { height: 60, paddingHorizontal: 10, paddingVertical: 5 } ]}>
					<Button
						iconRight success onPress={() => this.saveProfile()}
						style={[ flexRow, flexCenter, { width: '100%', height: 50 } ]}>
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>Save changes{"   "}</Text>
						<Icon
							type="Ionicons" name="save-sharp"
							style={{ fontSize: 24, color: "#FFFFFF" }}/>
					</Button>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => ({ ...state });
export default connect(mapStateToProps)(UserProfileFormContainer);