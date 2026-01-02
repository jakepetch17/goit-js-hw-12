# JavaScript Homework: Pixabay Image Search Engine (with Pagination)

This project is an advanced web application developed using the **Pixabay API**. It allows users to search for high-quality images and browse through large datasets using a "Load More" pagination feature. The application utilizes **Axios** for HTTP requests and ensures a seamless user experience with smooth scrolling and dynamic UI updates.

## 🚀 Overview

The application demonstrates proficiency in:

- **Asynchronous JavaScript:** Managing complex async flows using `async/await` syntax.
- **HTTP Requests:** Using the **Axios** library for cleaner and more efficient API calls compared to the native Fetch API.
- **Pagination Logic:** Implementing a "Load More" mechanism to fetch and append subsequent pages of results without refreshing the page.
- **UX Enhancements:** Features automatic smooth scrolling, loading spinners, and interactive notifications.

## 🛠 Tech Stack

- **Bundler:** Vite
- **HTTP Client:** Axios
- **Libraries:**
  - `iziToast` (Customized alerts for errors and end-of-results notifications)
  - `SimpleLightbox` (Full-screen image gallery with zoom and captions)
- **Styling:** Custom CSS, CSS Grid, Flexbox, and CSS Animations (Spinners).
- **API:** Pixabay API

## 📂 Project Structure

```text
├── index.html           # Main entry point, search form, and load-more button
├── src/
│   ├── main.js          # Logic: Axios requests, Pagination, DOM manipulation, Scroll logic
│   ├── style.css        # Styling for gallery, buttons, loaders, and library overrides
│   └── img/             # Static assets (icons)
├── package.json         # Project dependencies (Axios, SimpleLightbox, iziToast)
└── vite.config.js       # Vite configuration

```

## 🕒 Features & Technical Highlights

### 🔍 Efficient Data Fetching

Unlike the Fetch API, this project uses **Axios** to handle HTTP requests, offering automatic JSON transformation and better error handling.

### 📄 Pagination (Load More)

- **State Management:** Tracks `currentPage` and `searchKeyword` globally.

- **Dynamic Button:** The "Load More" button only appears when there are more images to fetch (i.e., when the current batch returns the full 40 images). It hides automatically when the end of the collection is reached.

- **UX:** The button shows a loading spinner while fetching the next page.

### 🖼 Smooth Scrolling & Gallery

- **Smooth Scroll:** After loading a new batch of images, the browser automatically scrolls down by twice the height of a gallery card using `window.scrollBy` and `getBoundingClientRect`.

- **SimpleLightbox:** The gallery instance is refreshed (`lightbox.refresh()`) after every API call to ensure new images are clickable.

### 🎨 Error Handling & Notifications

- **Input Validation:** Prevents empty searches with an `iziToast` warning.

- **Empty Results:** Displays a specific error if the search query returns no hits.

- **End of Results:** Informs the user when they have reached the end of the available images.

### ⚙️ Installation & Development

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

4. **Build for production:**

```bash
npm run build
```

## Author

**Halenur Gürel** _Homework Project - Asynchronous JavaScript, Axios & Pagination 🚀_

**[Live Demo](https://halenurgurel.github.io/goit-js-hw-12/)** 📍

**Tech Stack:** HTML5 · CSS3 · JavaScript (ES6+) · Vite · Axios · iziToast · SimpleLightbox

🔗 [GitHub Profile](https://github.com/halenurgurel)

🎯 _"This project focuses on handling large datasets via pagination, mastering external libraries like Axios, and refining the user interface with smooth transitions and robust error management."_
