"use strict";

document.addEventListener("DOMContentLoaded", function () {
	// Your JavaScript code here

	var tinderContainer = document.querySelector(".tinder");
	var allCards = document.querySelectorAll(".tinder--card");
	var nope = document.getElementById("nope");
	var love = document.getElementById("love");
	var documentElement = document.getElementById("document"); // Update this with the actual element ID where you want to display the document content

	// Function to initialize cards
	function initCards(card, index) {
		var newCards = document.querySelectorAll(".tinder--card:not(.removed)");

		newCards.forEach(function (card, index) {
			card.style.zIndex = allCards.length - index;
			card.style.transform =
				"scale(" + (20 - index) / 20 + ") translateY(-" + 30 * index + "px)";
			card.style.opacity = (10 - index) / 10;
		});

		tinderContainer.classList.add("loaded");
	}

	// Function to fetch the next document
	function fetchNextDocument() {
		fetch("/api/next-document", {
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				documentElement.textContent = data.document; // Update the document on the card
			})
			.catch((error) => {
				console.error("Error fetching document:", error);
			});
	}

	// Function to handle swipe actions (left or right)
	function handleSwipe(love) {
		fetch(love ? "/api/swipe-right" : "/api/swipe-left", {
			method: "POST",
		})
			.then(() => {
				fetchNextDocument(); // Fetch the next document
			})
			.catch((error) => {
				console.error("Error recording swipe:", error);
			});
	}

	// Event listeners for left and right swipes using keyboard shortcuts
	document.addEventListener("keydown", function (event) {
		if (event.key === "n") {
			// 'n' key for left swipe
			handleSwipe(false);
		} else if (event.key === "k") {
			// 'k' key for right swipe
			handleSwipe(true);
		}
	});

	// Event listeners for left and right swipes
	nope.addEventListener("click", function () {
		handleSwipe(false);
	});

	love.addEventListener("click", function () {
		handleSwipe(true);
	});

	// Initial fetch to load the first document
	fetchNextDocument();
});
