
/* SERENDIB JOURNEYS — Destinations Search & Filters */

const searchInput = document.getElementById("destinationSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const destinationCards = document.querySelectorAll(".dest-list-card");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function filterDestinations() {
    // Stop if the required HTML elements are missing
    if (!searchInput || !noResults) {
        console.error("Destination search elements were not found.");
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    destinationCards.forEach((card) => {
        const name = (card.dataset.name || "").toLowerCase();
        const category = card.dataset.category || "";

        // Check search text and selected category
        const matchesSearch = name.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const shouldShow = matchesSearch && matchesCategory;

        // Show or hide the destination card
        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }
    });

    // Show a message if no destinations match
    noResults.hidden = visibleCount > 0;
}


// Search as the user types
if (searchInput) {
    searchInput.addEventListener("input", filterDestinations);
}


// Filter by category
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.filter || "all";

        // Update the active button
        filterButtons.forEach((item) => {
            item.classList.toggle("active", item === button);
        });

        // Filter the destinations
        filterDestinations();
    });
});


// Make sure hidden cards stay hidden
// even when CSS sets their display property
document.querySelectorAll(".dest-list-card[hidden]").forEach((card) => {
    card.style.display = "none";
});
