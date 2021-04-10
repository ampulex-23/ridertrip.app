const BASE_URL = process.env.BASE_URL || 'http://46.101.215.195';
const getHeaders = (jwt = false, json = false) => {
	const h = {
		'Content-Type': json ? 'application/json' : 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': 'exp://10.32.110.208:19000',
	};
	return jwt ? { ...h, 'Authorization': `Bearer ${jwt}` } : h;
};
export { getHeaders, BASE_URL }