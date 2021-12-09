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
		const { auth: { user }, navigation } = this.props;
		const { role: { name: r }, [r.toLowerCase()]: { lessons: _list = [] } } = user;
		const lessons = _list.filter(l => 
			l.status === 'waitpaiment' ||
			l.status === 'payed' || 
			l.status === 'active'
		);
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
					{lessons.map(invoice => {
						return <InvoiceCard invoice={invoice} key={invoice.id} navigation={navigation}/>
					})}
				</ScrollView>
				}
			</View>
		);
	}
}

export default connect(
	state => ({	...state })
)(TrainingScheduleCpntainer);