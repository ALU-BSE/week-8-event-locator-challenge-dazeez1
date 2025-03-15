document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedEvents();
  
    // Setup search form submission
    const searchForm = document.getElementById("searchForm");
    if (searchForm) {
      searchForm.addEventListener("submit", handleSearchSubmit);
    }
  });
  
  // Function to load featured events
  function loadFeaturedEvents() {
    const featuredEventsContainer = document.getElementById("featuredEvents");
    if (!featuredEventsContainer) return;
  
    // Filter featured events
    const featured = eventsData.filter((event) => event.featured);
  
    // If no featured events, hide the section
    if (featured.length === 0) {
      document.querySelector(".featured-events").style.display = "none";
      return;
    }
  
    // Create event cards for featured events
    featured.forEach((event) => {
      const eventCard = createEventCard(event);
      featuredEventsContainer.appendChild(eventCard);
    });
  }
  
  // Function to create an event card
  function createEventCard(event) {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";
  
    col.innerHTML = `
          <div class="card event-card">
              <img src="${event.image}" class="card-img-top" alt="${event.name}">
              <div class="card-body">
                  <span class="badge bg-${getCategoryColor(
                    event.category
                  )} category-badge mb-2">${event.category}</span>
                  <h5 class="card-title">${event.name}</h5>
                  <p class="event-date mb-1"><i class="bi bi-calendar"></i> ${formatDate(
                    event.date
                  )}</p>
                  <p class="event-location mb-2"><i class="bi bi-geo-alt"></i> ${
                    event.location
                  }, ${event.city}</p>
                  <a href="event-details.html?id=${
                    event.id
                  }" class="btn btn-outline-primary btn-sm">View Details</a>
              </div>
          </div>
      `;
  
    return col;
  }
  
  // Function to handle search form submission
  function handleSearchSubmit(e) {
    e.preventDefault();
  
    // Get search parameters
    const city = document.getElementById("cityInput").value;
    const category = document.getElementById("categorySelect").value;
    const date = document.getElementById("dateInput").value;
  
    // Build query string
    let queryString = "?";
    if (city) queryString += `city=${encodeURIComponent(city)}&`;
    if (category) queryString += `category=${encodeURIComponent(category)}&`;
    if (date) queryString += `date=${encodeURIComponent(date)}&`;
  
    // Redirect to events page with search parameters
    window.location.href = `events.html${queryString}`;
  }
  