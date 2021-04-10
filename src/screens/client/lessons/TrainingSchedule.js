import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { containerStyles, textStyles } from "../../../helpers/styling";
import { InvoiceCard } from '../../../components';

class TrainingScheduleCpntainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		const { invoices: lessons, navigation } = this.props;
		return (
			<View stle={[ containerStyles.flexCenter, containerStyles.flexCol ]}>
				{lessons.length === 0 &&
				<View>
					<Text style={textStyles.listEmptyText}>
						Your have no upcoming
						{"\n"}
						trainings in your schedule.
					</Text>
				</View>}
				{lessons.length > 0 &&
				<ScrollView style={{
					marginBottom: 10,
					marginTop: 10,
					paddingHorizontal: 10
				}}>
					{lessons.filter(training => training.type !== 'Invoice').map(invoice => {
						return <InvoiceCard invoice={invoice} key={invoice.id} navigation={navigation}/>
					})}
				</ScrollView>
				}
			</View>
		);
	}
}

export default connect(
	state => ({
		...state.lessons
	})
)(TrainingScheduleCpntainer);