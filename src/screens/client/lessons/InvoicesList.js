import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { Container, Content, Footer, Icon, Button } from 'native-base';
import { containerStyles, textStyles } from "../../../helpers/styling";
import { InvoiceCard } from '../../../components';

const {
	flexCol, flexRow, flexStretch,
	flexCenter, bgWhite
} = containerStyles;

class InvoicesListContainer extends Component {


	constructor (props, ctx) {
		super(props, ctx);
	}

	render () {
		const { auth: { user }, navigation } = this.props;
		const { role: { name: r }, [r.toLowerCase()]: { lessons = [] } } = user;
		const invoices = lessons.filter(l => 
			l.status === 'invoice' || 
			l.status === 'hascoach'
		);
		return (
			<Container stle={[ containerStyles.flexCenter, containerStyles.flexCol ]}>
				{invoices.length === 0 ?
					<Content>
						<Text style={textStyles.listEmptyText}>
							You have no active
							{"\n"}
							invoices for training.
						</Text>
					</Content> :
					<Content>
						<ScrollView style={{
							marginBottom: 64,
							marginTop: 10,
							paddingHorizontal: 10
						}}>
							{invoices.map(invoice => {
								return <InvoiceCard invoice={invoice} key={invoice.id} navigation={navigation}/>
							})}
						</ScrollView>
					</Content>}
				<Footer style={[ bgWhite, { height: 60, paddingHorizontal: 10, paddingVertical: 5 } ]}>
					<Button
						iconRight onPress={() => navigation.navigate('CreateInvoice')}
						style={[ flexRow, flexCenter, {
							width: '100%', height: 50, backgroundColor: "#476bd6" } ]}>
						<Text style={{ color: "#FFFFFF", fontSize: 20 }}>Create invoice{"   "}</Text>
						<Icon
							type="Ionicons" name="notifications-circle-sharp"
							style={{ fontSize: 28, color: "#FFFFFF" }}/>
					</Button>
				</Footer>
			</Container>
		)
	}
}

export default connect(state => ({
	...state
}))(InvoicesListContainer);