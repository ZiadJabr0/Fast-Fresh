# Fast & Fresh - Lifestyle Dashboard

A lightweight, responsive web app for managing shopping lists and discovering recipes. Built with vanilla HTML, CSS, JavaScript, and Bootstrap. No backend required.

## Features
- **Shopping List**: Add, remove, clear items. Persists in browser localStorage.
- **Recipe Finder**: Search by name, category, area, or ingredient using TheMealDB API. View details and add ingredients to shopping list.
- **Responsive Design**: Desktop sidebar + mobile navbar.
- **Preloader & Smooth Animations**: Modern loading experience.

## Pages
- `index.html` - Home (overview)
- `shopeList.html` - Shopping List
- `recipes.html` - Recipe Search

## Tech Stack
- **Frontend**: HTML5, CSS3 (custom + Bootstrap 5), Vanilla JS
- **API**: [TheMealDB](https://www.themealdb.com/api.php) (free)
- **Storage**: Browser localStorage
- **Fonts**: Google Fonts (Roboto)

## Quick Start
1. Open `index.html` in any modern browser.
2. No installation needed - works offline (except recipe search).
3. Add items to shopping list or search recipes.

## File Structure
```
final api project/
├── index.html       # Home page
├── shopeList.html   # Shopping list
├── recipes.html     # Recipes
├── shopList.js      # Shopping list logic
├── recipes.js       # Recipe search & modal
├── main.js          # Preloader
├── styles.css       # Custom styles
└── README.md        # This file
```

## Customization
- Edit `styles.css` for colors (`--primary` var).
- Replace TheMealDB API calls in `recipes.js`.
- Add dark/light mode toggle in `main.js`.

## Known Issues
- Typo: `shopeList.html` (should be `shopList.html`).
- Navbar brand still "Fit and Fresh" (legacy).

© 2026 Fast & Fresh

