import makeRequest from './helpers/makeRequest';
export {find, getWall};

let token = 'ea77532eea77532eea77532e70ea070ed9eea77ea77532eb4050153d22b3696dcaabeb1';

function find(params) {
	if(params.token){
		token = params.token;
	}
	return makeRequest(`friends.get?user_id=${params.id}&fields=first_name&access_token=${token}&v=5.103`);
}



function getWall(params) {
	if(params.token){
		token = params.token;
	}
	return makeRequest(`wall.get?owner_id=${params.id}&access_token=${token}&v=5.103`);
}