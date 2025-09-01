# Movie Explorer App [![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/pick-ur-movie/deploys)

A modern **React-based web application** for discovering and exploring movies using data from **The Movie Database (TMDB) API**.
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=netlify)](https://pick-ur-movie.netlify.app/)

## Features

* **Movie Discovery** – Browse popular, top-rated, and now-playing movies
* **Detailed Movie Information** – View cast, genres, runtime, and production companies
* **Genre Filtering** – Explore movies by category
* **Search Functionality** – Find movies by title or keywords
* **User Authentication** – Sign up and log in (powered by Firebase)
* **Favorites System** – Save and manage your favorite movies
* **Responsive Design** – Works seamlessly on desktop, tablet, and mobile

---

## 📸 Screenshots

![Home Page]<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d67883bb-2b96-4e5e-aeb4-1b5ee5a8c892" />
*Browse trending movies with beautiful card layout*

![Movie Details]<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5969e01b-fb92-4dfc-bb41-263ad54b02f1" />
*Detailed movie information with cast and description*

![User Authentication]<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b670d1a6-1689-4c85-8c17-8d8e380ff02a" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1a0d03c7-2267-496c-9faa-0ede40f8f40b" />
*Secure user login/signup with Firebase authentication*

![Favorites ]<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b76ee82d-c441-46bd-9eb0-a048ad042539" />
*Save and manage your favorite movies with heart icons*
---

## Tech Stack

* **Frontend:** React 18, React Router v6
* **State Management:** Context API
* **Styling:** Tailwind CSS
* **Authentication:** Firebase Auth
* **API:** TMDB API
* **Icons:** React Icons
* **Build Tool:** Create React App

---

## Project Structure

```
movie-explorer/
├── public/
│   ├── icon.png
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api/
│   │   └── tmdb.js
│   ├── components/
│   │   ├── BookmarkButton.js
│   │   ├── MovieCard.js
│   │   ├── MovieGrid.js
│   │   ├── Navbar.js
│   │   └── SearchBar.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   └── FavoritesContext.js
│   ├── firebase/
│   │   └── config.js
│   ├── pages/
│   │   ├── Favorites.js
│   │   ├── Home.js
│   │   ├── login.js          
│   │   ├── MovieDetail.js
│   │   ├── SearchResults.js
│   │   └── Signup.js
│   ├── styles/
│   │   ├── global.css
│   │   └── index.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .env.local
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v14 or higher)
* npm or yarn
* TMDB API key
* Firebase project

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder and add:

   ```env
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server:

   ```bash
   npm start
   ```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Configuration

### TMDB API Setup

* Create an account on [TMDB](https://www.themoviedb.org/)
* Request an API key
* Add it to `.env`

### Firebase Setup

* Create a Firebase project in [Firebase Console](https://console.firebase.google.com/)
* Enable **Authentication → Email/Password**
* Copy project config into `.env`

---

## Usage

* Browse movies by category
* Search by title or keyword
* Filter by genre
* Save favorites (requires login)
* View details including overview, rating, and runtime

---

## License

This project is licensed under the **MIT License** 

---

## Acknowledgments

* [The Movie Database (TMDB)](https://www.themoviedb.org/) for the movie data
* [Firebase](https://firebase.google.com/) for authentication
* [Tailwind CSS](https://tailwindcss.com/) for styling

---
