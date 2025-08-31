# Movie Explorer App

A modern **React-based web application** for discovering and exploring movies using data from **The Movie Database (TMDB) API**.


## Features

* **Movie Discovery** – Browse popular, top-rated, and now-playing movies
* **Detailed Movie Information** – View cast, genres, runtime, and production companies
* **Genre Filtering** – Explore movies by category
* **Search Functionality** – Find movies by title or keywords
* **User Authentication** – Sign up and log in (powered by Firebase)
* **Favorites System** – Save and manage your favorite movies
* **Responsive Design** – Works seamlessly on desktop, tablet, and mobile

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
src/
├── api/
│   └── tmdb.js               # TMDB API config
├── components/
│   ├── BookmarkButton.js     # Toggle favorite
│   ├── MovieCard.js          # Individual movie card
│   ├── MovieGrid.js          # Movie grid layout
│   ├── Navbar.js             # Navigation bar
│   └── SearchBar.js          # Search input
├── context/
│   ├── AuthContext.js        # Authentication state
│   └── FavoritesContext.js   # Favorites state
├── firebase/
│   └── config.js             # Firebase setup
├── pages/
│   ├── Favorites.js          # Saved movies
│   ├── Home.js               # Homepage
│   ├── Login.js              # User login
│   ├── MovieDetail.js        # Movie details
│   ├── SearchResults.js      # Search results
│   └── Signup.js             # User registration
├── styles/
│   ├── global.css
│   └── index.css
├── App.js
├── App.test.js
└── index.js
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

