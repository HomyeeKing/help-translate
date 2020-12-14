function request({ type, url, data, success }) {
	const xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onload = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				success(xhr.responseText);
			} else {
				throw new Error(xhr.responseType);
			}
		}
	};
	xhr.send(data);
}
