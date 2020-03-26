const fetchJsonp = require('fetch-jsonp');

// let mainServerUrl = '/method/';

let mainServerUrl = 'https://api.vk.com/method/';

export default function makeRequest(url, options = {}, baseUrl = mainServerUrl) {
	return fetchJsonp(baseUrl + url, options).then((response) => {
		if (!response.ok) {
			return response.text().then(function (text) {
				throw new Error(text);
			});
		}
		return response.json();
	});
}
