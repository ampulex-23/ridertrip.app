import React, { Component } from "react";
import { connect } from "react-redux";
import {
	ScrollView,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	TouchableHighlight,
} from "react-native";
import { Card, Col, List, ListItem, Row } from "native-base";
import { containerStyles } from "../../../helpers/styling";
import { BASE_URL as apiUrl } from "../../../api/headers";
import { RatingMeter } from "../../../components/rating";
import moment from "moment";

class EventsListContainer extends Component {
	constructor(props, ctx) {
		super(props, ctx);
	}

	state = {};

	createFeed = () => {
		const {
			auth: { user, jwt },
		} = this.props;
		const { client = null, instructor = null } = user;
		if (user.role.name === "Client" && client) {
			const feed = [...client.lessons, ...client.events];
			feed.sort((a, b) => {
				const ac = Date.parse(a.created_at);
				const bc = Date.parse(b.created_at);
				return ac > bc ? 1 : ac < bc ? -1 : 0;
			});
			return feed;
		} else if (user.role.name === "Instructor" && instructor) {
			const feed = [...instructor.lessons, ...instructor.events];
			feed.sort((a, b) => {
				const ac = Date.parse(a.created_at);
				const bc = Date.parse(b.created_at);
				return ac > bc ? 1 : ac < bc ? -1 : 0;
			});
			return feed;
		} else {
			return [];
		}
	};

	getRating = (instr) => {
		const _instructor = instr;
		const { reviews = [] } = _instructor;
		const meanv = reviews.map((r) => r.rating).reduce((sum, r) => sum + r, 0);
		return meanv / (reviews.length || 1);
	};

	statusText = (lesson) => {
		if (["finished", "success"].includes(lesson.status)) {
			return { text: "Урок закончен", color: "#FF007A" };
		}
		if (["active", "started"].includes(lesson.status)) {
			return { text: "Урок начался", color: "#FF007A" };
		}
		if (
			["chosemade", "waitpayment", "payed", "scheduled"].includes(lesson.status)
		) {
			const {
				lists: { resorts = [] },
			} = this.props;
			const resortsDict = resorts.reduce(
				(dict, resort) => ({ ...dict, [resort.id]: resort }),
				{}
			);
			const _day = moment(lesson.date);
			const _now = moment();
			const timeLeft = _now.to(_day);
			return {
				text:
					timeLeft +
					" в " +
					lesson.time +
					" на курорте " +
					resortsDict[lesson.resort].name,
				color: "#347AF0",
			};
		}
	};

	render() {
		const { navigation } = this.props;
		const feed = this.createFeed();
		const cardStyle = {
			borderRadius: 20,
			overflow: "hidden",
			backgroundColor: "#EDF1F9",
			paddingVertical: 10,
			paddingHorizontal: 17,
			minHeight: 80,
			elevation: 0,
			marginTop: 18,
			width: Dimensions.get("screen").width - 48,
			marginHorizontal: 24,
		};
		return (
			<View
				style={[
					containerStyles.container,
					{
						borderRadius: 20,
						overflow: "hidden",
						marginTop: -20,
						zIndex: 1,
						paddingTop: 16,
					},
				]}
			>
				{feed.length && (
					<ScrollView contentOffset={20} showsVerticalScrollIndicator={false}>
						{feed.map((item, index) => {
							const isEvent = !!item.name;
							const statusText = isEvent ? false : this.statusText(item);
							const _t1 = item.stuff === "skis"
								? "Урок по горным\nлыжам"
								: "Урок по сноуборду";
							return !isEvent ? (
								<Card style={cardStyle} key={"feed" + index}>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate({
												name: "LessonScreen",
												params: { lesson: item, title: _t1 }
											})}
									>
										<View style={{ height: 20 }}>
											<Row>
												<Text
													lineBreakMode="head"
													style={{
														fontSize: 17,
														lineHeight: 18,
														fontWeight: "600",
														color: "#0D1F3C",
														height:
															["invoice", "new"].includes(item.status) ||
																item.stuff === "skis"
																? 36
																: 18,
													}}
												>
													{["invoice", "new"].includes(item.status) ? (
														<Text>
															{item.stuff === "skis"
																? "Заявка на урок\nпо горным лыжам"
																: "Заявка на урок\nпо сноуборду"}
														</Text>
													) : (
														<Text>
															{item.stuff === "skis"
																? "Урок по горным\nлыжам"
																: "Урок по сноуборду"}
														</Text>
													)}
												</Text>
												<Text
													style={{
														backgroundColor: "#FF007A",
														width: 16,
														height: 16,
														opacity:
															item.answers &&
																item.answers.length > 0 &&
																!item.instructor
																? 1
																: 0,
														color: "#FFFFFF",
														fontSize: 11,
														fontWeight: "bold",
														lineHeight: 16,
														borderRadius: 8,
														overflow: "hidden",
														marginLeft: 10,
														textAlign: "center",
														textAlignVertical: "center",
													}}
												>
													{item.answers ? item.answers.length : 0}
												</Text>
												<View style={{ flexGrow: 1 }} />
												<Col>
													<Text
														style={{
															fontSize: 13,
															fontWeight: "500",
															color: "#5E627B",
															width: 160,
															paddingRight: 10,
														}}
													>
														{item.persons} чел / {item.duration} час
													</Text>
													{item.totaldue && (
														<Text
															style={{
																fontWeight: "bold",
																fontSize: 19,
																lineHeight: 56,
																color: "#0D1F3C",
																textAlign: "right",
															}}
														>
															{item.totaldue} ₽
														</Text>
													)}
												</Col>
											</Row>
										</View>
										{item.instructor && item.instructor.license && (
											<Text
												style={{
													fontSize: 13,
													lineHeight: 24,
													fontWeight: "500",
													color: "#485068",
													marginTop:
														["invoice", "new"].includes(item.status) ||
															item.stuff === "skis"
															? 15
															: 0,
													marginBottom: 8
												}}
											>
												{item.instructor.license.owner}
											</Text>
										)}
										{item.comment &&
											item.comment.length &&
											!["invoice", "new"].includes(item.status) &&
											<Text
												lineBreakMode="clip"
												style={{
													height: "auto",
													fontWeight: "500",
													fontSize: 13,
													textAlignVertical: "top",
													lineHeight: 17,
													fontStyle: "italic",
													color: "#485068",
													marginTop: 0,
													marginBottom: 10,
													width: 200,
												}}
											>
												{item.comment}
											</Text>
										}
										{item.instructor && item.review && (
											<View style={{ marginTop: 0 }}>
												<RatingMeter
													value={item.review.rating}
													readonly
													showNumeric={false}
													size="normal"
												/>
											</View>
										)}
										{//item.status === "finished" && !item.review && 
											/*<TouchableOpacity>
												<Text
													style={{
														textAlign: "left",
														fontSize: 14,
														lineHeight: 24,
														fontWeight: "500",
														color: "#347AF0",
														paddingTop: 5,
														paddingBottom: 10,
													}}
												>
													Оставить отзыв
												</Text>
											</TouchableOpacity>*/
										}
										<View style={{ flexGrow: 1 }} />
										{statusText && (
											<Text
												style={{
													color: statusText.color,
													fontSize: 13,
													lineHeight: 24,
													fontWeight: "500",
													textAlign: "left",
													paddingBottom: 10,
												}}
											>
												{statusText.text}
											</Text>
										)}
									</TouchableOpacity>
								</Card>
							) : (
								<Card style={cardStyle} key={"feed" + index}>
									<Col
										style={{
											justifyContent: "flex-start",
											alignItems: "flex-start",
										}}
									>
										<Text
											style={{
												paddingVertical: 10,
												fontWeight: "bold",
												fontSize: 17,
												color: "#0D1F3C",
											}}
										>
											{item.name}
										</Text>
										{item.pic && item.pic.url && (
											<Row>
												<Image
													style={{
														overflow: "hidden",
														borderRadius: 14,
														borderWidth: 1,
														height: item.pic.height,
														maxHeight: 200,
													}}
													source={{
														uri: `${apiUrl}${item.pic.url}`,
														width: (Dimensions.get("screen").width - 48) * 0.9,
													}}
												/>
											</Row>
										)}
										<Text
											style={{
												fontWeight: "500",
												fontStyle: "italic",
												fontSize: 13,
												lineHeight: 19,
												color: "#485068",
											}}
										>
											{item.about}
										</Text>
									</Col>
								</Card>
							);
						})}
					</ScrollView>
				)}
			</View>
		);
	}
}

export default connect((state) => ({
	...state,
}))(EventsListContainer);
