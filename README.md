# <img src="images/cafe-icon.png" alt="Brews & Bites Logo" width="50" /> Brews & Bites Cafe Website


## Overview

Brews & Bites is a responsive, feature-rich website for a modern coffee shop and cafe. Built with HTML, CSS, and JavaScript, this project provides a complete online presence for a cafe business, featuring menu exploration, cart functionality, and a seamless checkout experience. A standout feature is the innovative weather-based drink suggestion system that uses the Open-Meteo API and browser geolocation to recommend personalized beverage choices based on local weather conditions, temperature, and time of day.


![Brews & Bites](assets/images/readme-Images/main-screen.png)

## 🚀 Deployment

### Deployed via GitHub Pages

The site is live at: [📌 Brews & Bites Cafe](https://dimplektech.github.io/Brews-Bites-Cafe/)

## Live Demo

[▶️ Watch the Brews & Bites Demo on YouTube](https://youtu.be/NIk5p8uIxEQ)



## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Home Page](#home-page)
  - [Menu Page](#menu-page)
  - [Cart System](#cart-system)
  - [Checkout Process](#checkout-process)
  - [Weather-Based Drink Suggestions](#weather-based-drink-suggestions)
  - [Responsive Design](#responsive-design)
- [Performance Optimizations](#performance-optimizations)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [Credits](#credits)

## Features

### Weather-Based Drink Suggestions

- Real-time weather detection using geolocation
- Personalized drink recommendations based on:
  - Current temperature (hot/cold weather options)
  - Weather conditions (rainy, sunny, cloudy, etc.)
  - Time of day (morning, afternoon, evening options)
- Direct links to recommended items in the menu
- Graceful fallbacks when geolocation is unavailable

git push -f origin maingit push -f origin maingit push -f origin main### Theme Toggle

- Dark and light mode options for user preference
- Persistent theme selection using localStorage
- Automatic color scheme adjustments for all UI elements
- Toggle button with animated sun/moon icon transition
- System preference detection for initial theme setting

### Home Page

- Responsive hero section with captivating imagery
- Featured items section highlighting special menu offerings
- Contact information with location details
- Weather-based drink recommendations

### Menu Page

- Categorized menu items (Coffee, Tea, Pastries, Sandwiches, Desserts)
- Navigation tabs for easy category switching
- Search functionality to find specific items
- Item cards with images, descriptions, and prices
- Add to cart functionality with visual confirmation
- Dark/Light mode toggle for improved user experience

### Cart System

- Real-time cart updates with localStorage persistence
- Add, increase, decrease, and remove items
- Quantity controls with dynamic price calculation
- Subtotal, tax, and total price calculations
- Empty cart handling with redirect to menu

### Checkout Process

- Customer information collection
- Payment form (simulated)
- Order summary and confirmation
- Detailed receipt generation with:
  - Customer details
  - Itemized purchase list
  - Price breakdown
  - Print receipt functionality

### Responsive Design
![Responsive Design](assets/images/readme-Images/responsive-images.png)

- Mobile-first approach
- Works on all device sizes (phones, tablets, desktops)
- Hamburger menu for mobile navigation
- Flexible layouts using CSS Grid and Flexbox

## Performance Optimizations

### Loading Speed

- **Image Optimization**: All images compressed and served in appropriate sizes for different devices
- **Responsive Images**: Multiple resolution variants for hero banners to reduce bandwidth on mobile devices
- **Lazy Loading**: Images below the fold load only when needed to improve initial page load time

### Progressive Enhancement

- **Weather-Based Recommendations**: Falls back gracefully when geolocation is unavailable
- **Custom Font Loading**: Uses system fonts during loading to prevent text flicker

### Accessibility

- **Semantic HTML**: Properly structured content for screen readers
- **Keyboard Navigation**: Full site navigation possible using only keyboard
- **Color Contrast**: All text meets minimum contrast ratios for readability

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with variables for theming, animations, and responsive design
- **JavaScript**: Interactive features, cart functionality, form handling
- **LocalStorage API**: Client-side data persistence for cart
- **Font Awesome**: Icons for enhanced UI elements
- **Open-Meteo API**: Weather data for personalized drink suggestions
- **Geolocation API**: User location detection for weather-based features

## Testing

### ✅ HTML Validation

![HTML validation](assets/images/readme-Images/html-validation.png)

### ✅ CSS Validation

![CSS validation](assets/images/readme-Images/css-validation.png)

### ✅ JavaScript Debugging – Console logging & error fixing.

### ✅ Lighthouse Performance

    Performance testing with Google Lighthouse:

![Lighthouse Performance Score](assets/images/readme-Images/lighthouse-score.png)

### ✅ Responsive Testing- Tested on mobile, tablet, and desktop.



## Setup and Installation

1. Clone the repository or download the ZIP file
2. Extract the files to your desired location
3. Open `index.html` in your web browser

No server or build process is required as this is a static website.

## Future Enhancements

- User accounts and login system
- Order history tracking
- Online ordering with real payment processing
- Admin panel for menu management
- Customer reviews and ratings
- Newsletter subscription
- Expanded weather API integration with seasonal specials

## Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: Google Fonts
- Weather Data: [Open-Meteo API](https://open-meteo.com)# Brews-Bites-Website
