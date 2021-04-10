import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Container, Icon, Button, Toast, Header, Label, List, Separator, Tabs, Tab,
	Thumbnail, Footer, Content, H3, ListItem, FooterTab, TabHeading
} from "native-base";
import { Text, Dimensions, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { containerStyles, mapStyle } from "../../../helpers/styling";
import { fetchCoach } from "../../../api";
import { BASE_URL } from "../../../api/headers";
import Rating from "../../../components/common/Rating";

const {
	flexCol, flexRow, flexStretch,
	flexCenter, bgWhite
} = containerStyles;

class CoachScreenContainer extends Component {

	state = {
		coach: null
	};

	constructor (props, ctx) {
		super(props, ctx);
	};

	componentDidMount = async () => {
		const { route, jwt } = this.props;
		const { params: { id } } = route;
		const coach = await fetchCoach(jwt, id);
		coach.id && this.setState({ ...this.state, coach });
	};

	render () {
		const { navigation } = this.props;
		const { coach } = this.state;
		if (!coach) {
			return null;
		}
		const user = { ...coach.user, ...coach };
		delete user[ 'user' ];
		delete user[ 'coach' ];
		const { firstname, lastname } = user;
		const fotoUrl = Object.values(user?.photo?.formats || { small: { url: "/" } })[ 0 ].url;
		const fotoSize = Dimensions.get('screen').width * 0.4;
		const fotoStyle = {
			width: fotoSize, height: fotoSize,
			overflow: 'hidden', borderRadius: 10,
			borderWidth: 1,
			borderColor: '#444859'
		};
		const sectionStyle = {
			width: '100%',
			paddingHorizontal: 16, paddingVertical: 15,
			justifyContent: 'space-between',
			alignItems: 'flex-start'
		};
		const labelStyle = (fs = 20, fw = '700', ff = 'Exo 2') => ({
			lineHeight: 22,
			fontFamily: ff,
			fontWeight: fw,
			fontSize: fs,
			flexGrow: 0.2
		});
		return (
			<Container>
				<Content>
					<ScrollView>
						<View style={[ flexRow, sectionStyle ]}>
							<Thumbnail
								style={fotoStyle}
								source={{
									uri: user.userpic && user.userpic.formats ?
										BASE_URL + Object.values(user.userpic.formats)[ 0 ].url :
										"http://46.101.215.195/uploads/ionicons_com_198b7d674f.png"
								}}
							/>
							<View
								style={[
									flexCol,
									{ justifyContent: 'flex-start', alignItems: 'flex-start' }
								]}>
								<H3 style={{ fontWeight: 'bold', lineHeight: 32 }}>{firstname} {lastname}</H3>
								<H3 style={{ lineHeight: 32 }}>
									{{ board: 'Snowboard', skis: 'Mountain ski' }[ coach.equipment ]} coach
								</H3>
								<H3 style={{ lineHeight: 32 }}>
									{user.age} years old
								</H3>
								<H3 style={{ lineHeight: 32 }}>
									{user.workStage} years of stage
								</H3>
								<H3 style={{ lineHeight: 32 }}>
									from {user.city}
								</H3>
								<Rating rating={user.rating}/>
							</View>
						</View>

						<Separator bordered
											 style={{ width: '100%', height: 36 }}>
							<Text style={labelStyle(20, 'bold', 'Roboto')}>INSTRUCTOR'S LICENSE</Text>
						</Separator>
						<View style={[ flexRow, sectionStyle, { marginTop: 0 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Number</Label>
							<H3 style={{ lineHeight: 22, textAlign: 'right' }}>
								{user.license?.number || 'unknown'}
							</H3>
						</View>
						<View style={[ flexRow, sectionStyle, { marginTop: -16 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Origin</Label>
							<H3 style={{ lineHeight: 22, textAlign: 'right' }}>
								{user.license?.origin || 'unknown'}
							</H3>
						</View>
						<View style={[ flexRow, sectionStyle, { marginTop: -16 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Expiration date</Label>
							<H3 style={{ lineHeight: 22, textAlign: 'right' }}>
								{user.license?.expires_at || 'unknown'}
							</H3>
						</View>

						<View style={[ flexRow, sectionStyle, { marginTop: -16 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Category</Label>
							<H3 style={{ lineHeight: 22, textAlign: 'right' }}>
								{user.category || 'unknown'}
							</H3>
						</View>

						<Separator bordered
											 style={{ width: '100%', height: 36 }}>
							<Text  style={labelStyle(20, 'bold', 'Roboto')}>WORKS AS</Text>
						</Separator>
						<View style={[ flexRow, sectionStyle, { marginTop: 0 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Riding instructor</Label>
							<Icon type={'Ionicons'}
										style={{fontSize: 24, color: user.isCoach ? '#03899c' : '#A0A0A0'}}
										name={user.isCoach ? 'checkmark-circle-sharp' : 'close-circle-sharp'}/>
						</View>
						<View style={[ flexRow, sectionStyle, { marginTop: -16 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Resort guide</Label>
							<Icon type={'Ionicons'}
										style={{fontSize: 24, color: user.isGuide ? '#03899c' : '#A0A0A0'}}
										name={user.isGuide ? 'checkmark-circle-sharp' : 'close-circle-sharp'}/>
						</View>
						<View style={[ flexRow, sectionStyle, { marginTop: -16 } ]}>
							<Label style={[labelStyle(20, '700', 'Exo 2'), {color: '#909090'}]}>Freeride guide</Label>
							<Icon type={'Ionicons'}
										style={{fontSize: 24, color: user.isFreerider ? '#03899c' : '#A0A0A0'}}
										name={user.isFreerider ? 'checkmark-circle-sharp' : 'close-circle-sharp'}/>
						</View>
						<Separator bordered
											 style={{ width: '100%', height: 36 }}>
							<Text  style={labelStyle(20, 'bold', 'Roboto')}>WORKS ON RESORTS</Text>
						</Separator>
						<List>
							{user.resorts.map(item =>
								<ListItem
									style={[ {
										flex: 1,
										height: 44, width: '100%', paddingVertical: 0, paddingHorizontal: 0, marginLeft: 0
									} ]}>
									<TouchableOpacity
										style={[ mapStyle.item, { height: 44, paddingVertical: 8, paddingHorizontal: 16 } ]}
										key={'' + item.id}
										onPress={() => navigation.navigate('Resort', { resort: item })}>
										<Text style={mapStyle.title}>{item.name}</Text>
										<Icon type="Ionicons" name='chevron-forward' color='gray' style={{ fontSize: 16 }}/>
									</TouchableOpacity>
								</ListItem>)}
						</List>
						<Separator bordered
											 style={{ width: '100%', height: 36 }}>
							<Text  style={labelStyle(20, 'bold', 'Roboto')}>FEW WORDS ABOUT...</Text>
						</Separator>
						<View style={[ flexRow, sectionStyle, { paddingVertical: 8, paddingHorizontal: 16 } ]}>
							<Text style={{
								lineHeight: 22, fontSize: 18, color: "#606060",
								textAlign: 'left', fontFamily: 'Exo 2'
							}}>
								{user.about}
							</Text>
						</View>
					</ScrollView>
				</Content>
				<Footer
					style={[
						flexRow, bgWhite, {
						height: 60,
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingHorizontal: 10,
						paddingVertical: 5
					}]}
				>
					<Button iconRight success primary
									style={[ flexRow, flexCenter,
										{flex: 0.5, height: 50, marginRight: 2, backgroundColor: "#1f6b75" }]} >
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>
							To chat{"  "}
						</Text>
						<Icon type="Ionicons" name="chatbubbles-sharp"
							style={{ fontSize: 24, color: "#FFFFFF" }}/>
					</Button>
					<Button iconRight success primary
									style={[ flexRow, flexCenter,
										{flex: 0.5, height: 50, marginLeft: 2, backgroundColor: "#1f6b75" }]} >
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>
							Review{"  "}
						</Text>
						<Icon type="Ionicons" name="receipt-sharp"
							style={{ fontSize: 24, color: "#FFFFFF" }}/>
					</Button>
				</Footer>
			</Container>
		);
	}
}

export default connect(state => ({
	...state.auth,
	...state.resorts,
	...state.lessons
}))(CoachScreenContainer);