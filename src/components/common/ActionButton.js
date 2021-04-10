import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { buttonStyles } from "../../helpers/styling";
import { Ionicons } from '@expo/vector-icons';

const ActionButton = function

	({
		 text, icon, fontSize = 18, iconSize = null,
		 bgcolor = "#80BB50", color = "#FFFFFF",
		 iconRight = false, onPress
	}) {

	const colorStyle = StyleSheet.create({ bg: { backgroundColor: bgcolor }, text: { color } });
	return (
		<TouchableOpacity
			style={[buttonStyles.footerActionButton, colorStyle.bg]}
			onPress={onPress}
		>
			{!iconRight &&
				<Ionicons name={icon} size={fontSize + 4}
									color={color} style={{ marginRight: 8 }}
				/>}
			<Text style={[{ fontSize }, colorStyle.text]}>{text}</Text>
			{iconRight &&
				<Ionicons name={icon} size={iconSize || fontSize + 4}
									color={color} style={{ marginLeft: 8 }}
				/>}
		</TouchableOpacity>
	);
};

export { ActionButton };
export default ActionButton;