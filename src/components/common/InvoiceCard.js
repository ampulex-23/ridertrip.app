import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text, View, Dimensions, Alert, UIManager, Platform,
	TouchableOpacity, LayoutAnimation, LogBox
} from 'react-native';
import {
	Button, Card, CardItem, Icon, List, Thumbnail, ListItem
} from 'native-base';
import QrCode from 'react-native-qrcode-svg';
import { toggleInvoice, updateInvoice } from '../../store/actions';
import { BASE_URL } from '../../api/headers';
import { hireUser } from '../../api';
import { containerStyles, colorScheme } from "../../helpers/styling";
const {
	flexCol, flexRow, flexStretch,
	flexCenter, bgWhite
} = containerStyles;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}


class InvoiceCardContainer extends Component {

	constructor(props, ctx) {
		super(props, ctx);
	}

	toggle = () => {
		const modal = !!this.props.route?.params?.invoice;
		if (modal) {
			return;
		}
		const { invoice } = this.props;
		invoice.selected = !invoice.selected;
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	};

	hire = async (answer) => {
		const { instructor, price } = answer;
		Alert.alert(
			"Select coach",
			`You are about to hire ${instructor.fullname} 
			 for ${price}руб per human hour.`, [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Hire',
				onPress: async () => {
					const { jwt, invoice } = this.props;
					const lesson = await hireUser({ jwt, invoice, answer });
					lesson.id && this.props.updateInvoice(lesson);
				}
			}
		], { cancelable: true }
		);
	};

	render() {
		const { invoice, navigation	} = this.props;
		const modal = !!this.props.route?.params?.invoice;
		const isSelected = invoice.selected;
		const
			answerItemStyle = {
				flex: 1, justifyContent: 'space-between',
				alignItems: 'center', flexDirection: 'row',
				paddingLeft: 0, paddingTop: 0, paddingRight: 0,
				width: '100%', paddingBottom: 10, marginLeft: -6
			},
			rowStyle = {
				flex: 0,
				flexDirection: 'row',
				justifyContent: 'flex-start',
				alignItems: 'center',
				marginBottom: -6
			},
			iconStyle = {
				fontSize: 18,
				color: "#606060",
				lineHeight: 18,
				marginRight: -8
			},
			iconActionStyle = {
				fontSize: 24,
				color: "#FFFFFF",
				lineHeight: 24,
				marginRight: 8,
				marginLeft: 4
			},
			textStyle = {
				fontSize: 16,
				color: "#303030",
				lineHeight: 16
			},
			hintStyle = {
				fontSize: 14,
				color: "#A0A0A0",
				lineHeight: 16,
				paddingLeft: 6
			},
			dateStyle = {
				fontSize: 14,
				color: "#303030",
				lineHeight: 16,
				alignSelf: "center"
			},
			answerIconStyle = {
				width: 30, height: 30, overflow: 'hidden',
				resizeMode: 'cover',
				backgroundColor: '#FFFFFF',
				borderWidth: 1,
				borderColor: '#606060'
			},
			cardItemStyle = {
				backgroundColor: "#4a71a4",
				justifyContent: 'space-between',
				height: 42,
				paddingRight: 2,
				paddingLeft: 2,
				paddingTop: 2,
				paddingBottom: 2
			},
			statusTextStyle = {
				fontSize: 20,
				color: "#FFFFFF",
				marginLeft: 10,
				marginBottom: 2,
				lineHeight: 20,
			},
			cardStyle = {
				marginLeft: 5, borderRadius: 6,
				width: Dimensions.get('screen').width - 32,
				marginBottom: 10,
				flex: 1,
				justifyContent: 'flex-start'
			};

		const getChoice = (inv) => {
			if (!inv.instructor || !inv.answers.length || 
				inv.status !== 'waitpayment') {
				return null;
			}
			const [choice] = inv.answers
				.filter(a => 
					(a.instructor.id || a.instructor) === 
					(inv.instructor.id || inv.instructor)
				);
			if (!choice) {
				return null;
			}
			return choice;
		};

		return <Card style={cardStyle}>
			{isSelected && !modal &&
				<CardItem first bordered style={[rowStyle, cardItemStyle]}>
					<Text style={statusTextStyle}>{invoice.status}</Text>
					<View style={{ flex: 1 }} />
					{invoice.status === 'invoice' ? (
						<React.Fragment>
							<Button transparent small style={{ marginLeft: 0, marginRight: 0 }}
								onPress={() => navigation.navigate("CreateInvoice", { invoice })}>
								<Icon type={'Ionicons'} name="create-sharp" style={[iconActionStyle]} />
							</Button>
							<Button transparent small style={{ marginLeft: 0, marginRight: 0 }}>
								<Icon type={'Ionicons'} name="trash-sharp" style={[iconActionStyle]} />
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							<Button transparent small style={{ marginLeft: 0, marginRight: 0 }}
								onPress={() => navigation.navigate("Training", { invoice })}>
								<Icon type={'Ionicons'} name="qr-code-sharp" style={[iconActionStyle]} />
							</Button>
						</React.Fragment>
					)}
				</CardItem>
			}

			<CardItem style={[rowStyle]} button onPress={this.toggle}>
				<Icon type={'Ionicons'} name="person-sharp" style={[iconStyle]} />
				<Text style={[hintStyle, { marginLeft: -8 }]}>+ </Text>
				<Text style={[dateStyle]}>{(invoice.services || []).map(s => s.name).join(', ')}</Text>
				<Text style={[dateStyle]}>{(invoice.skills || []).map(s => s.name).join(', ')}</Text>
				<View style={{ flex: 1 }} />
				<Icon type={'Ionicons'} name="stopwatch-sharp" style={[iconStyle]} />
				<Text style={[hintStyle, { marginLeft: -8 }]}>on </Text>
				<Text style={[dateStyle]}>{invoice.date}</Text>
				<Text style={[dateStyle, hintStyle, { marginLeft: -4 }]}>{invoice.time?.substr(0, 5)}</Text>
			</CardItem>
			<CardItem style={[rowStyle]} button onPress={this.toggle}>
				<Icon type={'Ionicons'} name="location-sharp" style={[iconStyle]} />
				<Text style={[hintStyle, { marginLeft: -8 }]}>at </Text>
				<Text style={[textStyle]}>{invoice.resort?.name}</Text>
				{invoice.spot ? (
					<React.Fragment>
						<View style={{ flex: 1 }} />
						<Icon type={'Ionicons'} name="golf-sharp" style={[iconStyle]} />
						<Text style={[hintStyle, { marginLeft: -8 }]}>near spot </Text>
						<Text style={[textStyle, { fontSize: 14 }]}>{invoice.spot.name}</Text>
					</React.Fragment>
				) : (
					<React.Fragment>
						<View style={{ flex: 1 }} />
						<Icon type={'Ionicons'} name="golf-sharp" style={[iconStyle]} />
						<Text style={[hintStyle, { marginLeft: -8 }]}>no spots to chose</Text>
					</React.Fragment>
				)}
			</CardItem>
			<CardItem style={[rowStyle, { marginBottom: 2 }]} button last onPress={this.toggle}>
				<Icon type={'Ionicons'} name="body-sharp" style={[iconStyle]} />
				<Text style={[hintStyle, { marginLeft: -8 }]}>riders ×{" "}</Text>
				<Text
					style={[textStyle, { fontWeight: 'bold', fontSize: 18, marginBottom: -4 }]}>{invoice.persons}</Text>
				<Text style={[hintStyle, { marginLeft: -4 }]}>{" person" + (invoice.persons === 1 ? '' : 's')}</Text>
				<View style={{ flex: 1 }} />
				<Icon type={'Ionicons'} name="hourglass-sharp" style={[iconStyle]} />
				<Text style={[hintStyle, { marginLeft: -8 }]}>duration ×{" "}</Text>
				<Text style={[textStyle, {
					fontWeight: 'bold',
					fontSize: 18,
					marginBottom: -4
				}]}>{invoice.duration}</Text>
				<Text style={[hintStyle, { marginLeft: -4 }]}>{" hour" + (invoice.duration === 1 ? '' : 's')}</Text>
			</CardItem>

			{invoice.comment.length > 0 && (
				<CardItem button last onPress={this.toggle} style={[rowStyle, { marginTop: -8, marginBottom: 0 }]}>
					<Icon type={'Ionicons'} name="reader-sharp" style={[iconStyle]} />
					<Text style={[hintStyle, { fontSize: 14, width: '90%' }]}>{invoice.comment}</Text>
				</CardItem>
			)}

			{modal && (
				<CardItem button last onPress={this.toggle} style={[flexCenter, { marginTop: -8, marginBottom: 6 }]}>
					<QrCode value={invoice.code} style={{ flex: 1 }} size={Dimensions.get('screen').width - 100} />
				</CardItem>
			)}

			{isSelected && invoice.status !== 'invoice' && (
				<CardItem last onPress={this.toggle} style={[rowStyle, { marginTop: -8, marginBottom: 6 }]}>
					<Button danger style={[flexCenter, { marginRight: 8 }]}>
						<Text style={{ color: '#FFFFFF', marginRight: 4 }}>Cancel</Text>
						<Icon type={"Ionicons"} name="close-circle-sharp" color="#FFFFFF" fontSize='18' style={{ marginRight: 0, marginLeft: 0 }} />
					</Button>
					<Button info style={[flexCenter, { marginRight: 8 }]}>
						<Text style={{ color: '#FFFFFF', marginRight: 4 }}>Chat</Text>
						<Icon type={"Ionicons"} name="chatbubbles-sharp" color="#FFFFFF" fontSize='18' style={{ marginRight: 0, marginLeft: 0 }} />
					</Button>
					<Button success style={flexCenter}>
						<Text style={{ color: '#FFFFFF', marginRight: 4 }}>Start</Text>
						<Icon type={"Ionicons"} name="play-circle-sharp" color="#FFFFFF" fontSize='18' style={{ marginRight: 0, marginLeft: 0 }} />
					</Button>
				</CardItem>
			)}

			{invoice.answers?.length === 0 && isSelected && (
				<CardItem footer bordered style={{ backgroundColor: "#EEFDFF" }}>
					<Text style={[textStyle, { width: '100%', textAlign: 'center' }]}>
						No coaches answered your invoice yet
					</Text>
				</CardItem>)}
			{invoice.answers?.length > 0 && invoice.status === 'invoice' && (
				<CardItem footer bordered style={{
					backgroundColor: "#EEFDFF", height: !isSelected ? 48 : 'auto',
					paddingTop: 8, paddingBottom: 0
				}}>
					{!isSelected ?
						<View style={[rowStyle, { alignItems: 'center', marginBottom: 10 }]}>
							<Text stle={[textStyle, { marginRight: 12 }]}>Answers{"      "}</Text>
							{invoice.answers?.map(({ id, instructor }) => (
								<Thumbnail
									key={'' + id} circular
									style={[answerIconStyle, { marginLeft: -6 }]}
									source={{
										uri: instructor.user.userpic && instructor.user.userpic.formats ?
											BASE_URL + Object.values(instructor.user.userpic.formats)[0].url :
											"http://46.101.215.195/uploads/ionicons_com_198b7d674f.png"
									}}
								/>))}
						</View> :
						<List style={{
							paddingLeft: 0, paddingRight: 0, paddingTop: 0,
							paddingBottom: 0, width: '100%'
						}}>
							{invoice.answers?.map(answer => {
								const { id, instructor, price } = answer;
								return (
									<ListItem key={'OP__' + id} style={[answerItemStyle]}>
										<Thumbnail key={'' + id} circular
											style={[answerIconStyle, { marginRight: 8, flexBasis: 32 }]}
											source={{
												uri: instructor.user.userpic && instructor.user.userpic.formats ?
													BASE_URL + Object.values(instructor.user.userpic.formats)[0].url :
													"http://46.101.215.195/uploads/ionicons_com_198b7d674f.png"
											}}
										/>
										<TouchableOpacity style={{ flexGrow: 1, flexBasis: '32%' }}
											onPress={() => navigation.navigate("Coach", { id: instructor.id })}
										>
											<Text>{instructor.user.fullname}</Text>
										</TouchableOpacity>
										<Text style={{ fontWeight: 'bold', marginRight: 0, fontSize: 18, flexGrow: 0.5 }}>{price}р.</Text>
										<Button
											onPress={async () => await this.hire({ id, instructor, price })}
											style={[flexCenter, {
												marginRight: -12, flexGrow: 3,
												justifySelf: 'flex-end', paddingRight: 20, paddingVertical: 4
											}]}
											small success
										>
											<Icon
												type="Ionicons" name="ribbon-sharp"
												style={[iconStyle, { color: "#FFFFFF", marginRight: 8 }]} />
											<Text style={{ color: "#FFFFFF" }}>Hire</Text>
										</Button>
									</ListItem>)
							})}
						</List>}
				</CardItem>)}

			{invoice.answers?.length > 0 && invoice.status !== 'invoice' && invoice.instructor && (
				<CardItem footer bordered style={{ backgroundColor: "#EEFDFF", height: 48 }}>
					<View style={[rowStyle, { alignItems: 'center' }]}>
						<Thumbnail
							circular
							style={{
								width: 32, height: 32, resizeMode: 'cover', backgroundColor: '#FFFFFF',
								borderWidth: 1,
								borderColor: '#CDCDCD',
								marginLeft: -6,
								marginRight: 8
							}}
							source={{
								uri: invoice.instructor.user.userpic && invoice.instructor.user.userpic.formats ?
									BASE_URL + Object.values(invoice.instructor.user.userpic.formats)[0].url :
									"http://46.101.215.195/uploads/ionicons_com_198b7d674f.png"
							}}
						/>
						<TouchableOpacity
							onPress={() => navigation.navigate("Coach", { id: invoice.instructor.id })}
						>
							<Text style={[textStyle, { fontSize: 18 }]}>{invoice.instructor.user.fullname}</Text>
						</TouchableOpacity>
						<View style={{ flex: 1 }} />
						<Text style={[textStyle, { fontSize: 18, fontWeight: 'bold' }]}>{getChoice(invoice).price}руб</Text>
					</View>
				</CardItem>)}
		</Card>
	}
}

const mapStateToProps = state => ({
	...state
});
export default connect(mapStateToProps)(InvoiceCardContainer);
