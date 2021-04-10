import React from "react";
import {
	Icon, Segment, Container
} from 'native-base';

export default function Rating ({rating, style = {}}) {
	const full = Math.floor(rating);
	const containerStyle = {
		width: 140, height: 40,
		flex: 1, flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		...style
	};
	const starStyle = {
		fontSize: 24,
		color: '#FFAE00'
	};
		return (
		<Container style={[containerStyle]}>
			{full >= 1 && <Icon type='Ionicons' name='star-sharp' style={starStyle} />}
			{full >= 2 && <Icon type='Ionicons' name='star-sharp' style={starStyle} />}
			{full >= 3 && <Icon type='Ionicons' name='star-sharp' style={starStyle} />}
			{full >= 4 && <Icon type='Ionicons' name='star-sharp' style={starStyle} />}
			{full === 5 && <Icon type='Ionicons' name='star-sharp' style={starStyle} />}
			{rating - full >= 0.2 &&<Icon type='Ionicons' name='star-half-sharp' style={starStyle} />}
		</Container>
	);
}