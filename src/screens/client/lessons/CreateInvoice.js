import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, Text, View } from 'react-native';
import {
	Container, Content, Form, Item, Input, Footer,
	Picker, Textarea, Button, Icon, Label,
} from 'native-base';
import DatePicker from '@react-native-community/datetimepicker';
import {
	putUser, createInvoice, createClient, putInvoice
} from '../../../api';
import { addInvoice, updateProfile, updateInvoice } from '../../../store/actions';
import { containerStyles } from "../../../helpers/styling";
import UserItem from "../../../components/common/UserListItem";

const {
	flexCol, flexRow, flexStretch,
	flexCenter, bgWhite
} = containerStyles;

class CreateInvoiceContainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	static TIMES = [
		"09:00", "09:30", "10:00", "10:30", "11:00",
		"11:30", "12:00", "12:30", "13:00", "13:30",
		"14:00", "14:30", "15:00", "15:30", "16:00",
	];

	static GOALS = {
		Guide: [ "Freeride", "Resort", "Queues" ],
		Coach: [
			"Basics", "Advanced", "Carving",
			"Freeride", "Freestyle", "Jibbing", "Jumping"
		]
	};

	state = {
		fio: false,
		invoice: {
			need: 'Coach',
			totrain: 'Basics',
			tolead: "Notset",
			resort: { id: 1 },
			spot: null,
			date: new Date(Date.now()),
			time: '09:00',
			clients: 1,
			hours: 3,
			comment: ""
		}
	};

	componentDidMount = () => {
		const edit = this.props.route?.params?.invoice || false;
		if (edit) {
			const { invoice } = this.props.route.params;
			this.setState({
				...this.state,
				invoice: {
					...invoice,
					date: invoice?.lessonDate,
					time: invoice?.lessonTime.substr(0, 5),
					hours: invoice?.lessonDuration,
					clients: invoice?.clientsCount
				}
			});
		} else {
			this.setDate(new Date());
		}
	};

	selectNeed (need) {
		this.setState({
			...this.state,
			invoice: { ...this.state.invoice, need }
		});
	}
	selectToDo (todo) {
		this.setState({
			...this.state,
			invoice: {
				...this.state.invoice,
				totrain: todo,
				tolead: todo
			}
		});
	}
	selectResort (id) {
		const resorts = this.props.resorts?.reduce((obj, resort) => ({ ...obj, [resort.id]: resort }), {}) || {};
		const resort = resorts[id];

		this.setState({
			...this.state,
			invoice: {
				...this.state.invoice,
				resort
			}
		});

	}
	selectSpot (id) {
		const resorts = this.props.resorts?.reduce((obj, r) => ({ ...obj, [r.id]: r }), {}) || {};
		const spots = resorts[this.state.invoice?.resort?.id]?.spots?.reduce((obj, spot) =>
			({ ...obj, [spot.id]: spot }), {}) || {};
		const spot = spots[id];
		this.setState({
			...this.state,
			invoice: { ...this.state.invoice, spot }
		});
	}
	setDate (date) {
		this.setState({
			...this.state,
			showDatepicker: false,
			invoice: { ...this.state.invoice, date }
		});
	}
	setTime (time) {
		this.setState({
			...this.state,
			invoice: { ...this.state.invoice, time }
		});
	}
	setClients (clients) {
		this.setState({
			...this.state,
			invoice: { ...this.state.invoice, clients }
		});
	}
	setHours (hours) {
		this.setState({
			...this.state,
			invoice: { ...this.state.invoice, hours }
		});
	}
	setComment (comment) {
		this.setState({
			...this.state,
			invoice: {
				...this.state.invoice,
				comment
			}
		})
	}

	submitInvoice = async () => {
		const { navigation, jwt, user } = this.props;
		const edit = this.props.route?.params?.invoice || false;
		const { fio, invoice } = this.state;
		if (!edit) {
			if (fio) {
				await this.addUserFullname(fio);
			}
			const newInvoice = await createInvoice({ jwt, user, invoice });
			newInvoice?.id && this.props.addInvoice(newInvoice);
			navigation.navigate("School");
		} else {
			const updatedInvoice = await putInvoice({ jwt, user, invoice });
			updatedInvoice?.id && this.props.updateInvoice(updatedInvoice);
		}
	};

	addUserFullname = async (fio) => {
		const { jwt, user } = this.state;
		const updatedUser = await putUser({ jwt, user, data: { ...fio } });
		updatedUser.id && this.setState({ ...this.state, user: { ...this.state.user, ...fio } });
		return updatedUser.id ? updatedUser : false;
	};
	createMissingClient = async (stuff) => {
		const { jwt, user } = this.state;
		const client = await createClient({ jwt, user, data: { stuff }, notify: true });
		client.id && this.setState({ ...this.state, user: { ...this.state.user, client } });
		return true;
	};

	render () {
		const edit = this.props.route?.params?.invoice || false;
		const resorts = this.props.resorts?.reduce((obj, resort) => ({ ...obj, [resort.id]: resort }), {}) || {};
		const { invoice, user } = this.state;
		const { resort, spot } = invoice;
		const spots = resorts['' + resort?.id]?.spots?.reduce((obj, spot) => ({ ...obj, [spot?.id]: spot }), {}) || {};
		const coach = this.state.invoice?.instructor || this.props.route?.params?.coach || false;

		const labelStyle = {
			fontSize: 18,
			color: "#909090"
		};
		const labelWidthStyle = {
			width: 0.5 * Dimensions.get('screen').width
		};
		const labelQuarterWidthStyle = {
			width: 0.25 * Dimensions.get('screen').width
		};
		const itemStyle = {
			flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 8,
		};
		const inputStyle = {
			paddingLeft: 10,
			paddingRight: 0,
			marginRight: -10
		};
		const infoViewStyle = {
			height: 100, width: "100%", flex: 0,
			borderBottomWidth: 1, backgroundColor: '#ffd37340',
			borderBottomColor: "#9ca252"
		};

		return (
			<Container style={{ backgroundColor: "#ffffff" }}>
				<Content style={{ backgroundColor: "#ffffff" }}>

					{!coach ?
						<View style={[ flexCenter, flexCol, infoViewStyle ]}>
							<Text style={{ width: "100%", paddingHorizontal: 8, paddingVertical: 6, fontSize: 17, color: "#606060" }}>
								Publish your invoice for training on resort you like
								{"\n"}
								at any future date and any start time you like.
								{"\n"}
								Set how many persons will join this training and how
								{"\n"}
								long training will continue in hours.
							</Text>
						</View> :
						<UserItem coach={coach} place={'invoice'}/>
					}

					<Form>

						{user && (!user.firstname || !user.lastname || !user.client) &&
							<React.Fragment>
								<Item picker key={'firstname'}
											error={!this.state.user || !this.state.user.firstname || !this.state.user.firstname.length}>
									<Label
										style={[ labelStyle, labelWidthStyle, {
											marginLeft: 10,
											...(!this.state.user || !this.state.user.firstname || !this.state.user.firstname.length ?
												{ color: "#FFA0A0" } : {})
										} ]}
									>
										Your firstname
									</Label>
									<Input
										style={inputStyle} value={this.state.fio ? this.state.fio.firstname : ''}
										onChangeText={(firstname) =>
											this.setState({ ...this.state, fio: { ...this.state.fio, firstname } })}
									/>
								</Item>
								<Item picker key={'lastname'}
											error={!this.state.user || !this.state.user.lastname || !this.state.user.lastname.length}>
									<Label
										style={[ labelStyle, labelWidthStyle, {
											marginLeft: 10,
											...(!this.state.user || !this.state.user.lastname || !this.state.user.lastname.length ?
												{ color: "#FFA0A0" } : {})
										} ]}
									>
										Your lastname
									</Label>
									<Input value={this.state.fio ? this.state.fio.lastname : ''}
												 style={inputStyle}
												 onChangeText={(lastname) =>
													 this.setState({ ...this.state, fio: { ...this.state.fio, lastname } })}
									/>
								</Item>
								<Item picker key={'stuff'}
											error={!this.state.user || !this.state.user.client || !this.state.user.client.stuff}>
									<Text
										style={[ labelStyle, labelWidthStyle, {
											marginLeft: 10,
											...(!this.state.user || !this.state.user.client || !this.state.user.client.stuff ?
												{ color: "#FFA0A0" } : {})
										} ]}
									>
										Training equipment
									</Text>
									<Picker
										mode="dropdown"
										style={{ width: undefined }}
										selectedValue={!!this.state.user && !!this.state.user.client && !!this.state.user.client.stuff ?
											this.state.user.client.stuff : null}
										placeholder="unset"
										onValueChange={async (stuff) => {
											this.setState({ ...this.state, user: { ...this.state.user, client: { stuff } } });
											stuff && await this.createMissingClient(stuff);
										}}
									>
										<Picker.Item label="Mountain ski" value={'Skiing'} key={'a1'}/>
										<Picker.Item label="Snowboard" value={'Boarding'} key={'a2'}/>
									</Picker>
								</Item>
							</React.Fragment>
						}

						<Item picker style={itemStyle} key={'specialist'}>
							<Text style={[ labelStyle, labelWidthStyle ]}>
								Who do you need
							</Text>
							<Picker mode="dropdown" style={{ width: '50%' }}
											onValueChange={this.selectNeed.bind(this)}
											selectedValue={invoice?.need || null}
							>
								<Picker.Item label="Coach" value="Coach" key={'b1'}/>
								<Picker.Item label="Guide" value="Guide" key={'b2'}/>
							</Picker>
						</Item>

						<Item picker style={itemStyle} key={'goal'}>
							<Text style={[ labelStyle, labelWidthStyle ]}>
								To guide or train
							</Text>
							<Picker mode="dropdown" style={{ width: '50%' }}
											onValueChange={this.selectToDo.bind(this)}
											selectedValue={invoice?.need === 'Coach' ? invoice?.totrain : invoice?.tolead}
							>
								{CreateInvoiceContainer.GOALS[ invoice?.need || 'Coach' ].map(v =>
									<Picker.Item label={v} value={v} key={'__' + v}/>)
								}
							</Picker>
						</Item>

						<Item picker style={itemStyle} key={'resort'}>
							<Text style={[ labelStyle, labelWidthStyle ]}>
								Choose training resort
							</Text>
							<Picker mode="dialog" style={{ width: '50%' }}
								onValueChange={this.selectResort.bind(this)}
								selectedValue={resort?.id || null}
							>
								{Object.values(resorts).map(r =>
									<Picker.Item label={r.name} value={r.id} key={'resort:' + r.id}/>
								)}
							</Picker>
						</Item>

						<Item key={'spot'}
							picker style={[ itemStyle, spots !== {} ? {} : { display: 'none' } ]}>
							<Text style={[ labelStyle, labelWidthStyle ]}>
								Choose meeting spot
							</Text>
							<Picker mode="dropdown" style={{ width: '50%' }}
								onValueChange={this.selectSpot.bind(this)}
								selectedValue={spot?.id || null}
							>
								{Object.values(spots).map(s =>
									<Picker.Item label={s.name} value={s.id} key={'spot:' + s.id}/>)
								}
							</Picker>
						</Item>

						<Item picker style={itemStyle} key={'date'}>
							<Text style={[ labelStyle, labelWidthStyle ]}>Select training date</Text>
							<View style={[ { width: '50%', paddingLeft: 6 }, flexRow, flexStretch ]}>
								<Button
									style={[ { width: '100%' }, flexRow, flexStretch ]}
									transparent
									onPress={() =>
										this.setState({ ...this.state, showDatepicker: true })
									}
									full
									block
								>
									<Text style={{ fontSize: 16, paddingVertical: 6 }}>
										{this.state.invoice.date ?
											(this.state.invoice.date.toDateString ?
													this.state.invoice.date.toDateString().split(' ').splice(1).join(' ') :
													this.state.invoice.date
											) :
											"Not set"
										}
									</Text>
									<Icon
										name="calendar"
										style={{ color: "#000000", fontSize: 18, paddingVertical: 6 }}
										fontSize={16}
										color="#000000"
										type={"Ionicons"}
									/>
								</Button>
								{this.state.showDatepicker && (
									<DatePicker
										value={invoice?.date}
										mode={'date'}
										display="default"
										onChange={(event, date) => this.setDate(date)}
									/>)}
							</View>
						</Item>
						<Item picker style={itemStyle} key={'time'}>
							<Text style={[ labelStyle, labelWidthStyle ]}>Set training start time</Text>
							<Picker
								mode="dialog"
								style={{ width: '50%' }}
								placeholder="Chose time"
								placeholderStyle={{ color: "#bfc6ea" }}
								placeholderIconColor="#007aff"
								onValueChange={this.setTime.bind(this)}
								selectedValue={invoice?.time}
							>
								{CreateInvoiceContainer.TIMES.map((time, index) =>
									<Picker.Item label={time} value={time} key={'___' + index}/>)}
							</Picker>
						</Item>
						<Item picker inlineLabel style={[ itemStyle, { marginLeft: 0 } ]} key={'membersnhours'}>
							<Text style={[ labelStyle, labelQuarterWidthStyle, { width: '15%' } ]}>
								<Icon
									type={'Ionicons'} name={'body-outline'}
									style={{ fontSize: 22, color: '#000000' }}/>
								{"  "}
								×
							</Text>
							<Picker
								mode="dropdown" placeholder="Clients"
								style={{ width: '30%', paddingVertical: 8, textAlign: 'center' }}
								itemTextStyle={{ width: '100%', flex: 1, backgroundColor: '#FF503B' }}
								onValueChange={this.setClients.bind(this)}
								selectedValue={this.state.invoice.clients}
							>
								<Picker.Item label="1 rider" value={1} key={'__A_' + 1}/>
								<Picker.Item label="2 riders" value={2} key={'__A_' + 2}/>
								<Picker.Item label="3 riders" value={3} key={'__A_' + 3}/>
								<Picker.Item label="4 riders" value={4} key={'__A_' + 4}/>
								<Picker.Item label="5 riders" value={5} key={'__A_' + 5}/>
							</Picker>

							<Text style={[ labelStyle, labelQuarterWidthStyle,
								{
									paddingLeft: 16, paddingVertical: 14, marginVertical: 0,
									width: '17%',
									borderColor: '#DCDCDC', borderLeftWidth: 1, borderStyle: 'solid'
								} ]}>
								<Icon
									type={'Ionicons'} name={'hourglass-outline'}
									style={{ fontSize: 22, color: '#000000' }}/>
								{"  "}
								×
							</Text>
							<Picker
								mode="dropdown" placeholder="Clients"
								style={{ width: '28%', paddingVertical: 8, paddingLeft: 0, textAlign: 'right' }}
								textStyle={{ textAlign: 'right' }}
								onValueChange={this.setHours.bind(this)}
								selectedValue={this.state.invoice.hours}
							>
								<Picker.Item label="90 min" value={1} key={'A__' + 1}/>
								<Picker.Item label="2 hours" value={2} key={'A__' + 2}/>
								<Picker.Item label="3 hours" value={3} key={'A__' + 3}/>
								<Picker.Item label="4 hours" value={4} key={'A__' + 4}/>
								<Picker.Item label="5 hours" value={5} key={'A__' + 5}/>
								<Picker.Item label="6 hours" value={6} key={'A__' + 6}/>
								<Picker.Item label="Full day" value={7} key={'A__' + 7}/>
							</Picker>
						</Item>
						<Item style={{
							paddingHorizontal: 0, borderColor: "#EFEFEF", borderBottomWidth: 1,
							marginLeft: 0, borderTopWidth: 0, marginBottom: 40
						}} regular key={'notes'}>
								<Textarea
									bordered={false} rowSpan={4} value={invoice.comment} onChanged={this.setComment.bind(this)}
									placeholderTextColor="#CCCCCC" placeholder="Leave comment"
									style={{
										backgroundColor: "transparent", paddingHorizontal: 0,
										paddingVertical: 8, fontSize: 18, width: '100%'
									}}
								/>
						</Item>
					</Form>
				</Content>
				<Footer style={[ bgWhite, { height: 64, paddingHorizontal: 10, paddingVertical: 7 } ]}>
					<Button
						iconRight success onPress={() => this.submitInvoice && this.submitInvoice()}
						style={[ flexRow, flexCenter, { width: '100%', height: 50, backgroundColor: "#476bd6" } ]}>
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>{edit ? "Save changes   " : "Create invoice   "}</Text>
						<Icon
							type="Ionicons" name="push-sharp"
							style={{ fontSize: 24, color: "#FFFFFF" }}/>
					</Button>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	jwt: state.auth.jwt,
	user: state.auth.user,
	resorts: state.lists.resorts,
	current: state.lists.currentResort || null,
	invoices: state.auth.user.client?.lessons || [],
	lessons: state.auth.user.client?.lessons || []
});

export default connect(
	mapStateToProps,
	null
)(CreateInvoiceContainer);