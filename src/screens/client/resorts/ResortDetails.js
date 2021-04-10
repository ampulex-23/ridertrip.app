import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Button, Dimensions } from 'react-native';

export default function ResortDetails({ route }) {
	const { resort } = route.params;
	return (
		<View>
			<Text
				style={{
					fontSize: 28,
					fontWeight: 'bold',
					paddingVertical: 15,
					paddingHorizontal: 10 }}>
				{resort.name}
			</Text>
			<Image
				source={{uri: "http://46.101.215.195" + resort.logo.url}}
				style={{
					width: Dimensions.get('screen').width - 20,
					height: Dimensions.get('screen').height / 2,
					resizeMode: 'contain', margin: 10
				}}
			/>
		</View>
	);
}