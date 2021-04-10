import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Container } from 'native-base';
import { containerStyles, textStyles } from "../../../helpers/styling";
import UserItem from '../../../components/common/UserListItem.js';

class InstantsContainer extends Component {

	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		const { lessons: { coaches } } = this.props;

		return (
			<Container>
				{coaches.length === 0 &&
				<View>
					<Text style={textStyles.listEmptyText}>
						Your have no upcoming
						{"\n"}
						trainings in your schedule.
					</Text>
				</View>}
				{coaches.length > 0 &&
				<ScrollView style={{
					marginBottom: 10,
					marginTop: 10,
					paddingHorizontal: 0
				}}>
					{coaches.filter(({hotMode}) => hotMode)
						.map(coach => <UserItem coach={coach} key={coach.id}/>)}
				</ScrollView>
				}
			</Container>
		);
	}
}

export default connect(state => ({
	...state
}))(InstantsContainer);