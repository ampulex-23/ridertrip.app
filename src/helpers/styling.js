import { Dimensions, StyleSheet } from 'react-native';
import { colorScheme } from './colors';

const buttonStyles = StyleSheet.create({
	footerActionButton: {
		position: 'absolute',
		bottom: 0,
		height: 80,
		width: Dimensions.get('screen').width - 16,
		margin: 8,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const textStyles = StyleSheet.create({
	listEmptyText: {
		width: Dimensions.get('screen').width,
		height: '100%',
		paddingBottom: 60,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 18,
		color: '#808080'
	},
	fontExo2: {
		fontFamily: 'Exo 2',
		fontSize: 18
	},
	fontRoboto: {
		fontFamily: 'Roboto',
		fontSize: 18
	}
});

const containerStyles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center',
		backgroundColor: '#FFF'
	},

	bgWhite: {
		backgroundColor: '#FFF'
	},

	flexCenter: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	flexStretch: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-between',
	},
	flexCol: {
		flexDirection: 'column'
	},
	flexRow: {
		flexDirection: 'row'
	}
});
const mapStyle = StyleSheet.create({
	map: {
		width: Dimensions.get('screen').width - 20,
		height: Dimensions.get('screen').height * 0.4 - 20,
		paddingHorizontal: 10,
		marginVertical: 10,
		flex: 1
	},
	item: {
		width: Dimensions.get('screen').width,
		paddingVertical: 14,
		paddingHorizontal: 14,
		margin: 0,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		borderBottomWidth: 1,
		borderBottomColor: '#DEDEDE'
	},
	title: {
		fontSize: 18,
		flex: 1
	}
});

export { containerStyles, mapStyle, buttonStyles, textStyles, colorScheme }