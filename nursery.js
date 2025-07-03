// Get nursery data from the main app
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
    image: "https://images.unsplash.com/photo-1526634332515-d56c5fd16991?w=600&q=80",
    description: "Sunshine Nursery is a warm and welcoming environment where children can learn and grow. Our experienced staff provides personalized attention to each child's development needs.",
    contact: {
      phone: "+1 234-567-8900",
      email: "info@sunshinenursery.com",
      address: "123 Downtown Street"
    },
    hours: "Monday - Friday: 7:00 AM - 6:00 PM",
    reviews: [
      { author: "Sarah M.", rating: 5, text: "Excellent facility with caring staff!" },
      { author: "John D.", rating: 4, text: "Great environment for kids to learn and play." }
    ]
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
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=600&q=80",
    description: "Little Stars is dedicated to providing high-quality early childhood education. Our bilingual program helps children develop strong language skills from an early age.",
    contact: {
      phone: "+1 234-567-8901",
      email: "hello@littlestars.com",
      address: "456 Suburb Avenue"
    },
    hours: "Monday - Friday: 7:30 AM - 6:30 PM",
    reviews: [
      { author: "Emma L.", rating: 5, text: "The bilingual program is amazing!" },
      { author: "Michael R.", rating: 5, text: "Outstanding facilities and professional staff." }
    ]
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
    image: "https://images.unsplash.com/photo-1576877138403-8ec2f82cb1f3?w=600&q=80",
    description: "Happy Kids provides affordable, quality childcare with a focus on multicultural education. We celebrate diversity and foster inclusive learning environments.",
    contact: {
      phone: "+1 234-567-8902",
      email: "contact@happykids.com",
      address: "789 East Side Boulevard"
    },
    hours: "Monday - Friday: 8:00 AM - 5:30 PM",
    reviews: [
      { author: "Ali H.", rating: 4, text: "Great multicultural environment!" },
      { author: "Marie C.", rating: 4, text: "Affordable and good quality care." }
    ]
  }
];

// Get the nursery ID from URL parameters
function getNurseryId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'));
}

// Find nursery by ID
function getNurseryById(id) {
  return nurseries.find(nursery => nursery.id === id);
}

// Render star rating
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<span class="material-icons">star</span>';
  }
  if (hasHalfStar) {
    stars += '<span class="material-icons">star_half</span>';
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<span class="material-icons">star_outline</span>';
  }
  
  return stars;
}

// Render nursery details
function renderNurseryDetails(nursery) {
  const detailsContainer = document.getElementById('nurseryDetails');
  
  detailsContainer.innerHTML = `
    <div class="nursery-header">
      <div class="nursery-image">
        <img src="${nursery.image}" alt="${nursery.name}">
      </div>
      <div class="nursery-header-info">
        <h1>${nursery.name}</h1>
        <div class="rating-location-container">
          <div class="rating">
            ${renderStars(nursery.rating)}
            <span class="rating-number">${nursery.rating.toFixed(1)}</span>
          </div>
          <div class="location">
            <span class="material-icons">location_on</span>
            ${nursery.location}
          </div>
        </div>
        <div class="quick-info">
          <div class="quick-info-item">
            <span class="material-icons">schedule</span>
            <div>
              <h4>Hours</h4>
              <p>${nursery.hours}</p>
            </div>
          </div>
          <div class="quick-info-item">
            <span class="material-icons">payments</span>
            <div>
              <h4>Fee Range</h4>
              <p>${nursery.fees}</p>
            </div>
          </div>
          <div class="quick-info-item">
            <span class="material-icons">child_care</span>
            <div>
              <h4>Age Groups</h4>
              <p>${nursery.ageGroups.join(', ')}</p>
            </div>
          </div>
        </div>
        <button class="cta-button">
          <span class="material-icons">phone</span>
          Contact Now
        </button>
      </div>
    </div>

    <div class="tabs-container">
      <div class="tabs">
        <button class="tab-btn active" data-tab="overview">Overview</button>
        <button class="tab-btn" data-tab="facilities">Facilities</button>
        <button class="tab-btn" data-tab="contact">Contact</button>
        <button class="tab-btn" data-tab="reviews">Reviews</button>
      </div>

      <div class="tab-content active" id="overview">
        <div class="content-grid">
          <div class="main-content">
            <section class="about-section">
              <h2>About ${nursery.name}</h2>
              <p>${nursery.description}</p>
            </section>
            
            <section class="highlights-section">
              <h2>Highlights</h2>
              <div class="highlights-grid">
                <div class="highlight-card">
                  <span class="material-icons">translate</span>
                  <h3>Languages</h3>
                  <ul>
                    ${nursery.languages.map(lang => `<li>${lang}</li>`).join('')}
                  </ul>
                </div>
                <div class="highlight-card">
                  <span class="material-icons">groups</span>
                  <h3>Age Groups</h3>
                  <ul>
                    ${nursery.ageGroups.map(age => `<li>${age} years</li>`).join('')}
                  </ul>
                </div>
                <div class="highlight-card">
                  <span class="material-icons">star_rate</span>
                  <h3>Special Features</h3>
                  <ul>
                    <li>Multilingual Staff</li>
                    <li>Certified Teachers</li>
                    <li>Modern Facilities</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          
          <aside class="sidebar">
            <div class="contact-card">
              <h3>Quick Contact</h3>
              <div class="contact-info">
                <p><span class="material-icons">phone</span> ${nursery.contact.phone}</p>
                <p><span class="material-icons">email</span> ${nursery.contact.email}</p>
                <p><span class="material-icons">location_on</span> ${nursery.contact.address}</p>
              </div>
              <button class="cta-button">Schedule a Visit</button>
            </div>
            
            <div class="hours-card">
              <h3>Operating Hours</h3>
              <p class="hours"><span class="material-icons">schedule</span> ${nursery.hours}</p>
            </div>
          </aside>
        </div>
      </div>

      <div class="tab-content" id="facilities">
        <div class="facilities-grid">
          ${nursery.facilities.map(facility => `
            <div class="facility-card">
              <span class="material-icons">${getFacilityIcon(facility)}</span>
              <h3>${facility}</h3>
              <p>${getFacilityDescription(facility)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="tab-content" id="contact">
        <div class="contact-section">
          <div class="contact-details">
            <h2>Get in Touch</h2>
            <div class="contact-grid">
              <div class="contact-item">
                <span class="material-icons">phone</span>
                <div>
                  <h3>Phone</h3>
                  <p>${nursery.contact.phone}</p>
                  <small>Available 8 AM - 6 PM</small>
                </div>
              </div>
              <div class="contact-item">
                <span class="material-icons">email</span>
                <div>
                  <h3>Email</h3>
                  <p>${nursery.contact.email}</p>
                  <small>We reply within 24 hours</small>
                </div>
              </div>
              <div class="contact-item">
                <span class="material-icons">location_on</span>
                <div>
                  <h3>Address</h3>
                  <p>${nursery.contact.address}</p>
                  <small>Visit us for a tour</small>
                </div>
              </div>
              <div class="contact-item">
                <span class="material-icons">schedule</span>
                <div>
                  <h3>Hours</h3>
                  <p>${nursery.hours}</p>
                  <small>Open Monday to Friday</small>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-form">
            <h2>Send us a Message</h2>
            <form id="contactForm">
              <div class="form-group">
                <label for="name">Your Name</label>
                <input type="text" id="name" required>
              </div>
              <div class="form-group">
                <label for="email">Your Email</label>
                <input type="email" id="email" required>
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" rows="4" required></textarea>
              </div>
              <button type="submit" class="cta-button">Send Message</button>
            </form>
          </div>
        </div>
      </div>

      <div class="tab-content" id="reviews">
        <div class="reviews-container">
          <div class="reviews-summary">
            <div class="overall-rating">
              <h2>Overall Rating</h2>
              <div class="rating-large">
                ${renderStars(nursery.rating)}
                <span class="rating-number">${nursery.rating.toFixed(1)}</span>
              </div>
              <p>Based on ${nursery.reviews.length} reviews</p>
            </div>
            <button class="cta-button">Write a Review</button>
          </div>
          <div class="reviews-list">
            ${nursery.reviews.map(review => `
              <div class="review-card">
                <div class="review-header">
                  <div class="review-author">
                    <span class="material-icons">account_circle</span>
                    <span>${review.author}</span>
                  </div>
                  <div class="review-rating">
                    ${renderStars(review.rating)}
                  </div>
                </div>
                <p class="review-text">${review.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Add tab switching functionality
  const tabs = detailsContainer.querySelectorAll('.tab-btn');
  const contents = detailsContainer.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and contents
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active class to clicked tab and corresponding content
      tab.classList.add('active');
      const contentId = tab.getAttribute('data-tab');
      document.getElementById(contentId).classList.add('active');
    });
  });

  // Handle contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Add your form submission logic here
      alert('Thank you for your message. We will get back to you soon!');
      contactForm.reset();
    });
  }
}

// Helper function to get appropriate icon for each facility
function getFacilityIcon(facility) {
  const icons = {
    'Play Area': 'toys',
    'Safety Features': 'security',
    'Outdoor Space': 'nature',
    'Indoor Play Zone': 'home'
  };
  return icons[facility] || 'check_circle';
}

// Helper function to get facility descriptions
function getFacilityDescription(facility) {
  const descriptions = {
    'Play Area': 'Spacious and safe play area with age-appropriate toys and equipment.',
    'Safety Features': 'State-of-the-art security systems including CCTV and secure access.',
    'Outdoor Space': 'Well-maintained outdoor area for physical activities and nature exploration.',
    'Indoor Play Zone': 'Climate-controlled indoor play space with educational toys and activities.'
  };
  return descriptions[facility] || 'Modern facility designed for children\'s development and safety.';
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  const nurseryId = getNurseryId();
  const nursery = getNurseryById(nurseryId);
  
  if (nursery) {
    renderNurseryDetails(nursery);
    document.title = `${nursery.name} - AI-Powered Nursery Search Platform`;
  } else {
    document.getElementById('nurseryDetails').innerHTML = `
      <div class="error-message">
        <h2>Nursery Not Found</h2>
        <p>Sorry, we couldn't find the nursery you're looking for.</p>
        <a href="index.html" class="back-button">
          <span class="material-icons">arrow_back</span>
          Back to Search
        </a>
      </div>
    `;
  }
}); 