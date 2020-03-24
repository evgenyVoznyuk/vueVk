import makeRequest from './helpers/makeRequest';
export {find, countFriends};

let token = 'ea77532eea77532eea77532e70ea070ed9eea77ea77532eb4050153d22b3696dcaabeb1';

function find(params) {
	if(params.token){
		token = params.token;
	}
	return makeRequest(`users.get?user_ids=${params.id}&fields=sex,bdate&access_token=${token}&v=5.103`);
}

function countFriends(params) {
	if(params.token){
		token = params.token;
	}
  return makeRequest(`friends.get?user_id=${params.id}&access_token=${token}&v=5.103`);
}