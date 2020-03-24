let mainServerUrl = '/method/';

export default function makeRequest(url, options = {}, baseUrl = mainServerUrl) {
	return fetch(baseUrl + url, options).then((response) => {
		if (!response.ok) {
			return response.text().then(function (text) {
				throw new Error(text);
			});
		}
		return response.json();
	});
}
