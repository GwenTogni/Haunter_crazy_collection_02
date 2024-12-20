(function () {

	// vars
	let list = document.querySelector("#list");
	let search = document.querySelector("#search");
	let response;

	// insert content
	getRequest('src/json/data.json');

	// function get json
	function getRequest(file) {
		const xhr = new XMLHttpRequest();
		xhr.open("GET", file);
		xhr.send();
		xhr.onload = function (e) {
			// Check if the request was a success
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Get and convert the responseText into JSON
				response = JSON.parse(xhr.responseText);

				// if we have a response then insert content into the list and add event listener to each list item
				insertContent(response);
				setTagsButton();
				setSearchButton();
				setYearsButton();
			}
		}
	}

	function insertContent(response) {
		// delete all
		list.innerHTML = "";

		// loop through list items from json
		for (var i = 0; i < response.length; i++) {
			// create list item
			let node = document.createElement("li");
			node.classList.add("list-item");

			// very import to add the id to the list item and the data attributes
			// without these we can't get the correct item when we filters or order the list
			node.setAttribute("data-title", response[i].title);
			node.setAttribute("data-tag", response[i].tag);
			node.setAttribute("data-colors", response[i].colors);
			node.setAttribute("data-year", response[i].year);
			node.setAttribute("data-how", response[i].how);
			node.id = i;

			let child = document.createElement("div");
			child.classList.add("item");
			child.innerHTML = `<img src='src/img/${response[i].image}'
			alt='img'/>`

			// fade in img
			setTimeout(() => {
				child.classList.add("show");
			}, 100 * i);

			// append child
			node.appendChild(child);


			// append event to list item
			node.addEventListener("click", (e) => {
				selectItem(e.target);
			})

			// append list item to list into DOM
			list.appendChild(node);
		}
	}

	// enter in the preview
	function selectItem(item) {
		console.log(item)
		if (!item.classList.contains("active")) {
			console.log("add Active")
			item.classList.add("active")
			child.innerHTML = `${response[i].title}`;
		}
		else {
			item.classList.remove("active");
		}
	}

	document.getElementById("search").style.display = "none"
	document.getElementById("filters").style.display = "none"
	document.getElementById("years").style.display = "none"
	document.getElementById("how").style.display = "none"

	function setTagsButton() {
		let buttonTag = document.querySelectorAll('.button-buttons-filters');
		buttonTag.forEach((button) => {
			// attach event to button
			button.addEventListener('click', (e) => {
				if (!button.classList.contains("active")) {
					document.getElementById("filters").style.display = "block";
					button.classList.add("active");
				}
				else {
					document.getElementById("filters").style.display = "none";
					button.classList.remove("active");
				}
			})
		})
		let buttonYear = document.querySelectorAll('.button-buttons-years');
		buttonYear.forEach((button) => {
			button.addEventListener('click', (e) => {
				if (!button.classList.contains("active")) {
					document.getElementById("years").style.display = "block";
					button.classList.add("active");
				}
				else {
					document.getElementById("years").style.display = "none";
					button.classList.remove("active");
				}
			})
		})
		let buttonHow = document.querySelectorAll('.button-buttons-how');
		buttonHow.forEach((button) => {
			button.addEventListener('click', (e) => {
				if (!button.classList.contains("active")) {
					document.getElementById("how").style.display = "block";
					button.classList.add("active");
				}
				else {
					document.getElementById("how").style.display = "none";
					button.classList.remove("active");
				}
			})
		})

		// get all tags from json
		let buttons = document.querySelectorAll('.button-filter');
		// loop through buttons
		buttons.forEach((button) => {
			// attach event to button
			button.addEventListener('click', (e) => {

				// get tag value from button
				let tag = e.target.dataset.tag;

				// show all items
				if (tag == 'all') {
					insertContent(response);
				}
				else {
					// insert all content
					insertContent(response);
					// remove all items that don't have the tag
					let items = document.querySelectorAll('.list-item');
					// loop all items
					items.forEach((item) => {
						// check if item has the tag
						if (!item.dataset.tag.includes(tag) && !item.dataset.colors.includes(tag)) {
							list.removeChild(item);
						}
					})
				}
			})
		})
		
		let buttons2 = document.querySelectorAll('.button-year');
		buttons2.forEach((button) => {
			// attach event to button
			button.addEventListener('click', (e) => {
				let year = e.target.dataset.year;
				if (year == 'all') {
					insertContent(response);
				}
				else {
					// insert all content
					insertContent(response);
					// remove all items that don't have the tag
					let items = document.querySelectorAll('.list-item');
					// loop all items
					items.forEach((item) => {
						// check if item has the tag
						if (!item.dataset.year.includes(year) && !item.dataset.colors.includes(year)) {
							list.removeChild(item);
						}
					})
				}
			})
		})

		let buttons3 = document.querySelectorAll('.button-how');
		buttons3.forEach((button) => {
			// attach event to button
			button.addEventListener('click', (e) => {
				let how = e.target.dataset.how;
				if (how == 'all') {
					insertContent(response);
				}
				else {
					// insert all content
					insertContent(response);
					// remove all items that don't have the tag
					let items = document.querySelectorAll('.list-item');
					// loop all items
					items.forEach((item) => {
						// check if item has the tag
						if (!item.dataset.how.includes(how) && !item.dataset.colors.includes(how)) {
							list.removeChild(item);
						}
					})
				}
			})
		})
	}

	function setSearchButton() {
		let buttonSearch = document.querySelectorAll('.button-button-search');
		buttonSearch.forEach((input) => {
			// attach event to button
			input.addEventListener('click', (e) => {
				if (!input.classList.contains("active")) {
					document.getElementById("search").style.display = "block";
					input.classList.add("active")
				}
				else {
					document.getElementById("search").style.display = "none";
					input.classList.remove("active");
				}
			})
		})

		// on key press search
		let timeout = null;
		search.addEventListener('keyup', (e) => {
			// wait 1000ms after user stops typing
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				// insert all content
				insertContent(response);
				// get search value
				let search = e.target.value.toLowerCase();
				// get all items
				let items = document.querySelectorAll('.list-item');
				items.forEach((item) => {
					// if item doesn't have the search value remove it
					if (!item.dataset.title.toLowerCase().includes(search.toLowerCase())) {
						list.removeChild(item);
					}
				})
			}, 1000);
		})
	}

	// speed of next image
	let timer = false;
	setInterval(() => {
		if (timer) {
			timer = false;
		}
		else {
			timer = true;
		}
	}, 10);

})();
