// Sample nursery data
const nurseries = [
  {
    id: 1,
    name: "Sunshine Nursery",
    location: "Downtown",
    ageGroups: ["0-2", "3-4"],
    facilities: ["Play Area", "Safety Features", "Outdoor Space"],
    languages: ["English", "Arabic"],
    fees: "Moderate",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=600&q=80"
  },
  {
    id: 2,
    name: "Little Stars",
    location: "Suburbs",
    ageGroups: ["3-4", "5-6"],
    facilities: ["Indoor Play Zone", "Safety Features", "Outdoor Space"],
    languages: ["English", "French"],
    fees: "High",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=600&q=80"
  },
  {
    id: 3,
    name: "Happy Kids",
    location: "East Side",
    ageGroups: ["0-2", "3-4", "5-6"],
    facilities: ["Play Area", "Safety Features", "Indoor Play Zone"],
    languages: ["English", "Arabic", "French"],
    fees: "Low",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1576877138403-8ec2f82cb1f3?w=600&q=80"
  }
];

// Render nursery cards
function renderNurseries(nurseryList) {
  const container = document.getElementById('nurseryListings');
  container.innerHTML = '';
  
  if (nurseryList.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <span class="material-icons">search_off</span>
        <p>No nurseries found matching your criteria</p>
      </div>
    `;
    return;
  }
  
  nurseryList.forEach(nursery => {
    const card = document.createElement('div');
    card.className = 'nursery-card';
    // Make the entire card clickable
    card.style.cursor = 'pointer';
    card.onclick = () => {
      window.location.href = `nursery.html?id=${nursery.id}`;
    };
    
    card.innerHTML = `
      <div class="nursery-image">
        <img src="${nursery.image}" alt="${nursery.name}">
        <div class="rating">
          <span class="material-icons">star</span>
          ${nursery.rating}
        </div>
      </div>
      <div class="nursery-info">
        <div class="nursery-header">
          <h3>${nursery.name}</h3>
          <div class="location">
            <span class="material-icons">location_on</span>
            ${nursery.location}
          </div>
        </div>
        <div class="details">
          <div class="detail-item">
            <span class="material-icons">child_care</span>
            <div>
              <label>Age Groups:</label>
              <p>${nursery.ageGroups.join(', ')}</p>
            </div>
          </div>
          <div class="detail-item">
            <span class="material-icons">translate</span>
            <div>
              <label>Languages:</label>
              <p>${nursery.languages.join(', ')}</p>
            </div>
          </div>
          <div class="detail-item">
            <span class="material-icons">widgets</span>
            <div>
              <label>Facilities:</label>
              <p>${nursery.facilities.join(', ')}</p>
            </div>
          </div>
          <div class="detail-item">
            <span class="material-icons">payments</span>
            <div>
              <label>Fees:</label>
              <p>${nursery.fees}</p>
            </div>
          </div>
        </div>
        <button class="contact-btn" onclick="event.stopPropagation()">
          <span class="material-icons">phone</span>
          Contact
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Get current filters from UI elements
function getCurrentFilters() {
  const filters = {};
  
  // Location filter
  const locationValue = document.getElementById('locationFilter').value;
  if (locationValue) filters.location = locationValue;
  
  // Age Groups filter
  const selectedAges = Array.from(document.querySelectorAll('input[name="ageGroup"]:checked'))
    .map(checkbox => checkbox.value);
  if (selectedAges.length > 0) filters.ageGroups = selectedAges;
  
  // Facilities filter
  const selectedFacilities = Array.from(document.querySelectorAll('input[name="facility"]:checked'))
    .map(checkbox => checkbox.value);
  if (selectedFacilities.length > 0) filters.facilities = selectedFacilities;
  
  // Languages filter
  const selectedLanguages = Array.from(document.querySelectorAll('input[name="language"]:checked'))
    .map(checkbox => checkbox.value);
  if (selectedLanguages.length > 0) filters.languages = selectedLanguages;
  
  // Fees filter
  const feesValue = document.getElementById('feesFilter').value;
  if (feesValue) filters.fees = feesValue;
  
  return filters;
}

// Apply filters
function applyFilters(filters) {
  let filtered = [...nurseries];
  
  // Text search
  const searchText = document.getElementById('searchBar').value.toLowerCase();
  if (searchText) {
    filtered = filtered.filter(n => 
      n.name.toLowerCase().includes(searchText) ||
      n.location.toLowerCase().includes(searchText) ||
      n.facilities.some(f => f.toLowerCase().includes(searchText)) ||
      n.languages.some(l => l.toLowerCase().includes(searchText))
    );
  }
  
  // Location filter
  if (filters.location) {
    filtered = filtered.filter(n => n.location === filters.location);
  }
  
  // Age Groups filter
  if (filters.ageGroups && filters.ageGroups.length > 0) {
    filtered = filtered.filter(n => 
      filters.ageGroups.some(age => n.ageGroups.includes(age))
    );
  }
  
  // Facilities filter
  if (filters.facilities && filters.facilities.length > 0) {
    filtered = filtered.filter(n => 
      filters.facilities.every(f => n.facilities.includes(f))
    );
  }
  
  // Languages filter
  if (filters.languages && filters.languages.length > 0) {
    filtered = filtered.filter(n => 
      filters.languages.some(l => n.languages.includes(l))
    );
  }
  
  // Fees filter
  if (filters.fees) {
    filtered = filtered.filter(n => n.fees === filters.fees);
  }
  
  // Apply sorting
  const sortBy = document.getElementById('sortSelect').value;
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'fees':
        const feesOrder = { 'Low': 1, 'Moderate': 2, 'High': 3 };
        return feesOrder[a.fees] - feesOrder[b.fees];
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  renderNurseries(filtered);
  updateResultsCount(filtered.length);
  updateFilterTags(filters);
}

// Update filter tags
function updateFilterTags(filters) {
  const container = document.getElementById('filterTags');
  container.innerHTML = '';
  
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return;
    
    const values = Array.isArray(value) ? value : [value];
    values.forEach(val => {
      const tag = document.createElement('span');
      tag.className = 'filter-tag';
      tag.innerHTML = `
        ${val}
        <button class="remove-tag" data-key="${key}" data-value="${val}">
          <span class="material-icons">close</span>
        </button>
      `;
      container.appendChild(tag);
    });
  });
  
  // Add click handlers for remove buttons
  document.querySelectorAll('.remove-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const value = btn.dataset.value;
      
      // Remove from UI
      if (key === 'location' || key === 'fees') {
        document.getElementById(`${key}Filter`).value = '';
      } else {
        document.querySelector(`input[name="${key.slice(0, -1)}"][value="${value}"]`).checked = false;
      }
      
      // Reapply filters
      const filters = getCurrentFilters();
      applyFilters(filters);
    });
  });
}

// Update results count
function updateResultsCount(count) {
  const container = document.getElementById('resultsCount');
  container.textContent = `${count} nurseries found`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with sample data
  renderNurseries(nurseries);
  updateResultsCount(nurseries.length);
  
  // Filter panel checkboxes
  document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const filters = getCurrentFilters();
      applyFilters(filters);
    });
  });
  
  // Filter dropdowns
  document.querySelectorAll('.filter-group select').forEach(select => {
    select.addEventListener('change', () => {
      const filters = getCurrentFilters();
      applyFilters(filters);
    });
  });
  
  // Search bar
  document.getElementById('searchBar').addEventListener('input', () => {
    const filters = getCurrentFilters();
    applyFilters(filters);
  });
  
  // Sort control
  document.getElementById('sortSelect').addEventListener('change', () => {
    const filters = getCurrentFilters();
    applyFilters(filters);
  });
  
  // Clear all filters
  document.getElementById('clearFilters').addEventListener('click', () => {
    // Reset checkboxes
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset dropdowns
    document.querySelectorAll('.filter-group select').forEach(select => {
      select.value = '';
    });
    
    // Reset search
    document.getElementById('searchBar').value = '';
    
    // Clear filter tags and show all nurseries
    updateFilterTags({});
    applyFilters({});
  });
  
  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#themeToggle .material-icons');
    icon.textContent = document.body.classList.contains('dark-theme') ? 'light_mode' : 'dark_mode';
  });
  
  // View toggle
  document.querySelectorAll('.view-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      document.querySelectorAll('.view-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('nurseryListings').className = `nursery-listings ${view}-view`;
    });
  });
  
  // Check for system dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
    document.querySelector('#themeToggle .material-icons').textContent = 'light_mode';
  }

  // AI Chat functionality
  const aiChatWindow = document.getElementById('aiChatWindow');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const minimizeChat = document.getElementById('minimizeChat');
  const closeChat = document.getElementById('closeChat');
  const aiMicBtn = document.getElementById('aiMicBtn');

  // Chat window controls
  minimizeChat.addEventListener('click', () => {
    aiChatWindow.classList.toggle('minimized');
  });

  closeChat.addEventListener('click', () => {
    aiChatWindow.style.display = 'none';
  });

  // Handle chat form submission
  aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (message) {
      addUserMessage(message);
      processAIQuery(message);
      aiChatInput.value = '';
    }
  });

  // Voice input
  aiMicBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        aiChatInput.value = message;
      };

      recognition.start();
    } else {
      alert('Voice input is not supported in your browser.');
    }
  });

  function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-chat-bubble';
    messageDiv.textContent = message;
    aiChatMessages.appendChild(messageDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function addAIResponse(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'ai-chat-bubble ai';
    messageDiv.textContent = message;
    aiChatMessages.appendChild(messageDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function processAIQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    // Helper function to check if any keyword from a set is present in the query
    function hasKeyword(keywords) {
      return keywords.some(keyword => lowerQuery.includes(keyword));
    }

    // Helper function to find the first matching keyword from a set
    function findMatchingKeyword(keywords) {
      return keywords.find(keyword => lowerQuery.includes(keyword));
    }

    // Extract age
    const ageKeywords = ['year', 'years', 'yr', 'yrs', 'age', 'aged'];
    let age = null;
    const numbers = lowerQuery.match(/\d+/g);
    if (numbers && hasKeyword(ageKeywords)) {
      age = parseInt(numbers[0]);
    }

    // Extract location
    const locationKeywords = {
      'downtown': 'Downtown',
      'suburbs': 'Suburbs',
      'east side': 'East Side',
      'eastside': 'East Side'
    };
    let location = null;
    Object.keys(locationKeywords).forEach(key => {
      if (lowerQuery.includes(key)) {
        location = locationKeywords[key];
      }
    });

    // Extract facilities
    const facilityKeywords = {
      'outdoor': 'Outdoor Space',
      'outside': 'Outdoor Space',
      'playground': 'Play Area',
      'play area': 'Play Area',
      'play zone': 'Indoor Play Zone',
      'indoor': 'Indoor Play Zone',
      'safety': 'Safety Features',
      'secure': 'Safety Features',
      'security': 'Safety Features'
    };
    const facilities = [];
    Object.keys(facilityKeywords).forEach(key => {
      if (lowerQuery.includes(key)) {
        const facility = facilityKeywords[key];
        if (!facilities.includes(facility)) {
          facilities.push(facility);
        }
      }
    });

    // Extract languages
    const languageKeywords = {
      'english': 'English',
      'arabic': 'Arabic',
      'french': 'French'
    };
    const languages = [];
    Object.keys(languageKeywords).forEach(key => {
      if (lowerQuery.includes(key)) {
        languages.push(languageKeywords[key]);
      }
    });

    // Extract fees
    const feeKeywords = {
      'cheap': 'Low',
      'affordable': 'Low',
      'low': 'Low',
      'budget': 'Low',
      'moderate': 'Moderate',
      'medium': 'Moderate',
      'expensive': 'High',
      'high': 'High',
      'premium': 'High'
    };
    let fees = null;
    Object.keys(feeKeywords).forEach(key => {
      if (lowerQuery.includes(key)) {
        fees = feeKeywords[key];
      }
    });

    // Reset all filters
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    document.getElementById('locationFilter').value = '';
    document.getElementById('feesFilter').value = '';
    
    // Apply age filter
    if (age !== null) {
      const ageGroup = age <= 2 ? '0-2' : age <= 4 ? '3-4' : '5-6';
      document.querySelector(`input[name="ageGroup"][value="${ageGroup}"]`).checked = true;
    }
    
    // Apply location filter
    if (location) {
      document.getElementById('locationFilter').value = location;
    }
    
    // Apply facility filters
    facilities.forEach(facility => {
      const checkbox = document.querySelector(`input[name="facility"][value="${facility}"]`);
      if (checkbox) checkbox.checked = true;
    });
    
    // Apply language filters
    languages.forEach(language => {
      const checkbox = document.querySelector(`input[name="language"][value="${language}"]`);
      if (checkbox) checkbox.checked = true;
    });
    
    // Apply fees filter
    if (fees) {
      document.getElementById('feesFilter').value = fees;
    }
    
    // Apply filters and generate response
    const filters = getCurrentFilters();
    applyFilters(filters);
    
    // Generate AI response
    const filteredNurseries = filterNurseries(nurseries);
    let response = '';
    
    // Build a more detailed response based on what was understood
    const understood = [];
    if (age !== null) understood.push(`age ${age} years`);
    if (location) understood.push(`in ${location}`);
    if (facilities.length > 0) understood.push(`with ${facilities.join(' and ')}`);
    if (languages.length > 0) understood.push(`speaking ${languages.join(' and ')}`);
    if (fees) understood.push(`with ${fees.toLowerCase()} fees`);

    if (filteredNurseries.length === 0) {
      response = `I searched for nurseries ${understood.join(', ')}, but couldn't find any matches. Would you like to try with different criteria?`;
    } else {
      response = `I found ${filteredNurseries.length} nurseries ${understood.join(', ')}. `;
      if (filteredNurseries.length <= 3) {
        response += "Here they are:\n\n" + filteredNurseries.map(n => 
          `${n.name} (${n.location}) - ${n.ageGroups.join(', ')} years, ${n.languages.join(', ')}`
        ).join('\n');
      } else {
        response += "I've updated the list below with all matching nurseries. You can use additional filters to narrow down your search.";
      }
    }
    
    addAIResponse(response);
  }

  function filterNurseries(nurseryList) {
    return nurseryList.filter(nursery => {
      const matchesSearch = !searchBar.value || 
                           nursery.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                           nursery.location.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                           nursery.facilities.some(f => f.toLowerCase().includes(searchBar.value.toLowerCase())) ||
                           nursery.languages.some(l => l.toLowerCase().includes(searchBar.value.toLowerCase()));
      
      const filters = getCurrentFilters();
      const matchesLocation = !filters.location || nursery.location === filters.location;
      const matchesFees = !filters.fees || nursery.fees === filters.fees;
      const matchesAgeGroups = !filters.ageGroups || filters.ageGroups.length === 0 ||
                              filters.ageGroups.some(age => nursery.ageGroups.includes(age));
      const matchesFacilities = !filters.facilities || filters.facilities.length === 0 ||
                               filters.facilities.every(facility => nursery.facilities.includes(facility));
      const matchesLanguages = !filters.languages || filters.languages.length === 0 ||
                              filters.languages.some(language => nursery.languages.includes(language));
      
      return matchesSearch && matchesLocation && matchesFees && 
             matchesAgeGroups && matchesFacilities && matchesLanguages;
    });
  }
});