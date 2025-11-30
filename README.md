# HoloX FireOS WebApp

A simple, TV-friendly web application designed for FireOS devices and Amazon Fire TV. Built with HTML, CSS, and JavaScript, it is installable as a PWA and provides a smooth remote (D-pad) navigation experience.

---

## Features

- **D-pad Friendly Navigation**: Navigate between buttons using arrow keys and activate selections with Enter.  
- **Single-Page Application (SPA)**: Switch screens without page reloads.  
- **Offline Support**: Service Worker caching enables offline functionality.  
- **Accessible UI**: Large buttons, clear focus indicators, and TV-optimized layout.  
- **GitHub Integration**: Direct link to star the project.  
- **PWA Ready**: Includes a manifest file for installable standalone experience.  

---

## File Structure

```
/index.html
/styles.css
/app.js
/service-worker.js
/manifest.json

```


- `index.html` – Main entry point of the web app  
- `styles.css` – TV-friendly CSS for layout and focus  
- `app.js` – Handles D-pad navigation, button actions, and SPA logic  
- `service-worker.js` – Enables offline caching for the app  
- `manifest.json` – PWA configuration (name, theme, start_url)  

---

## Installation & Usage

1. **Deploy to a Web Server** (HTTPS required for PWA features).  
2. Open the web app URL on a FireOS device (Fire TV, Fire Tablet, or Fire Cube).  
3. Navigate using the remote control:
   - Arrow keys for moving focus  
   - Enter/Select for activating buttons  
   - Back/Escape to return from About screen  

---

## PWA Installation

- When visiting the web app on FireOS, you can install it as a standalone app using the browser’s "Add to Home Screen" or "Install" option.  
- The app will run fullscreen without browser UI.

---

## Customization

- **Colors & Branding**: Modify `styles.css` and `manifest.json` for your brand colors.  
- **Screens & Navigation**: Add more SPA screens in `index.html` and wire them in `app.js`.  
- **Offline Content**: Add assets to `service-worker.js` cache for offline availability.  

---

## Links

- [HoloX Official Website](https://holox-co.github.io/)  
- [HoloX Project Docs](https://holox-co.github.io/project-docs/)  
