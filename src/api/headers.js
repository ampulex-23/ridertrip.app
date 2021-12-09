const BASE_URL = process.env.BASE_URL || 'https://app.ridertrip.ru';
const EXPO_URL = process.env.EXPO_URL || 'exp://10.32.110.208:19000';
const getHeaders = (jwt = false, json = false) => {
	const h = {
		'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': EXPO_URL
	};
	return jwt ? { ...h, 'Authorization': `Bearer ${jwt}` } : h;
};
export { getHeaders, BASE_URL }