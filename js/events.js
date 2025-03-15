document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get("city");
    const categoryParam = urlParams.get("category");
    const dateParam = urlParams.get("date");
  
    // Set filter form values from URL parameters
    if (cityParam) document.getElementById("cityFilter").value = cityParam;
    if (categoryParam)
      document.getElementById("categoryFilter").value = categoryParam;
    if (dateParam) document.getElementById("dateFilter").value = dateParam;
  
    // Update page title based on search
    updateResultsTitle(cityParam, categoryParam, dateParam);
  
    // Load events based on filters
    loadFilteredEvents(cityParam, categoryParam, dateParam);
  
    // Setup filter button click handler
    document
      .getElementById("filterButton")
      .addEventListener("click", function () {
        const city = document.getElementById("cityFilter").value;
        const category = document.getElementById("categoryFilter").value;
        const date = document.getElementById("dateFilter").value;
  
        // Update URL with new filters
        let url = new URL(window.location);
        if (city) url.searchParams.set("city", city);
        else url.searchParams.delete("city");
  
        if (category) url.searchParams.set("category", category);
        else url.searchParams.delete("category");
  
        if (date) url.searchParams.set("date", date);
        else url.searchParams.delete("date");
  
        window.history.pushState({}, "", url);
  
        // Update page title
        updateResultsTitle(city, category, date);
  
        // Reload events with new filters
        loadFilteredEvents(city, category, date);
      });
  });
  
  // Function to update the results title based on filters
  function updateResultsTitle(city, category, date) {
    let title = "Events";
  
    if (category) {
      title = `${category.charAt(0).toUpperCase() + category.slice(1)} Events`;
    }
  
    if (city) {
      title += ` in ${city}`;
    }
  
    if (date) {
      const formattedDate = formatDate(date);
      title += ` on ${formattedDate}`;
    }
  
    document.getElementById("resultsTitle").textContent = title;
  }
  
  // Function to load filtered events
  function loadFilteredEvents(city, category, date) {
    const eventsListContainer = document.getElementById("eventsList");
    const noEventsMessage = document.getElementById("noEvents");
  
    // Clear previous events
    eventsListContainer.innerHTML = "";
  
    // Filter events based on parameters
    let filteredEvents = [...eventsData];
  
    if (city) {
      filteredEvents = filteredEvents.filter((event) =>
        event.city.toLowerCase().includes(city.toLowerCase())
      );
    }
  
    if (category) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === category
      );
    }
  
    if (date) {
      filteredEvents = filteredEvents.filter((event) => event.date === date);
    }
  
    // Display events or no events message
    if (filteredEvents.length === 0) {
      eventsListContainer.innerHTML = "";
      noEventsMessage.classList.remove("d-none");
    } else {
      noEventsMessage.classList.add("d-none");
  
      // Create event cards
      filteredEvents.forEach((event) => {
        const eventCard = createEventCard(event);
        eventsListContainer.appendChild(eventCard);
      });
    }
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
                  <p class="card-text">${event.description.substring(
                    0,
                    100
                  )}...</p>
                  <a href="event-details.html?id=${
                    event.id
                  }" class="btn btn-outline-primary">View Details</a>
              </div>
          </div>
      `;
  
    return col;
  }
  