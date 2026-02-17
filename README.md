# 🚀 btc-price-guess

A real-time Bitcoin price prediction challenge. Players guess whether the price of BTC will rise or fall within a 60-second window, with scores persisted globally via a serverless AWS backend.

**[View Live Project](https://arunramachandran.github.io/btc-price-guess/)**

---

## Tech Stack
- **Framework:** React 18 (Vite + TypeScript)
- **State Management:** Zustand
- **Styling:** CSS Modules (Atomic UI approach)
- **Testing:** Vitest + React Testing Library + JSDOM
- **API:** Binance (REST API)

---

## Features Checklist
- [x] **Real-time Data:** Fetches live BTC/USD prices via the Binance Public API.
- [x] **Game Logic:** 60-second "lock-in" period for price predictions.
- [x] **Cloud Sync:** Automatic score persistence to AWS DynamoDB.
- [x] **Persistent Progress:** Scores and usernames are saved to `localStorage` using Zustand persistence.

---

## Architecture & Design Decisions

This project is built using a **Serverless Full-Stack** approach. Here is why the tech stack was chosen:

### 1. Frontend: React + Vite + Zustand
* **Vite:** Chosen for its extremely fast Hot Module Replacement (HMR) and optimized build process compared to Create React App.
* **Zustand:** Used for state management to handle the game loop (timer, active guesses, and scoring). It was selected over Redux for its simplicity and significantly lower boilerplate, allowing for a more reactive and readable codebase.
* **Persistence:** We use the Zustand `persist` middleware. This ensures that even if the user refreshes their browser mid-game, their username and score remain intact via `localStorage`.

### 2. Backend: AWS (Serverless Architecture)
* **Amazon DynamoDB:** A NoSQL Key-Value store used to persist player scores. It was chosen because it provides single-digit millisecond latency and handles high concurrency effortlessly.
* **AWS Lambda (Node.js 20.x):** Acts as the "compute" layer. It processes incoming score updates and communicates with DynamoDB. This is "Serverless," meaning it only runs when an API call is made, making it highly cost-effective.
* **Amazon API Gateway:** Provides a secure HTTPS endpoint for the frontend. It handles CORS (Cross-Origin Resource Sharing) headers to allow requests from the GitHub Pages domain.

### 3. CI/CD: GitHub Actions
* The project uses a custom GitHub Action workflow to build the React app and deploy it to GitHub Pages automatically upon every push to the `main` branch.

---

## Local Development Setup

Follow these instructions to get the project running on your local machine.

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** (comes with Node)

### Step-by-Step Setup
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/ArunRamachandran/btc-price-guess.git)
    cd btc-price-guess
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add AWS API endpoint:
    ```bash
    VITE_AWS_API_URL=https://w8aaag9np1.execute-api.eu-north-1.amazonaws.com/update-score
    ```

4.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

5.  **Execute tests:**
    ```bash
    npm run test
    ```

---

## How to Access the Live Project

The production version of the app is hosted on **GitHub Pages**.

1.  **URL:** `https://arunramachandran.github.io/btc-price-guess/`
2.  **Deployment Note:** The live version uses GitHub Secrets to securely inject the `VITE_AWS_API_URL` during the build process, ensuring the backend endpoint is never hardcoded in the source history.

---

## Design Trade-offs

This project focuses on core game mechanics and architectural organization. Below are the key trade-offs made during development:

### 1. Identity & Session Management
The app uses a "Unique Username" model for simplicity. Users can join the game and **log out** to clear their local session.
* **Current State:** While logout is implemented to reset the local UI, the app does not yet support "logging back in" to retrieve a previous score from the database. I prioritized the initial onboarding flow and real-time logic for this version.

### 2. Price Synchronization
The Bitcoin price is fetched every 5 seconds from the Binance Public API.
* **Decision:** This interval was chosen to provide a "real-time" feel while staying well within API rate limits and reducing unnecessary network traffic.
* **Impact:** There is a maximum 5-second latency compared to live market movements, which is acceptable for a 60-second guess window.

### 3. Guess Resolution
Guesses are resolved on the client side, with the final result then synced to the AWS backend.
* **Decision:** This allows for instant user feedback and a simpler backend setup.
* **Impact:** For a production-level competitive game, it might be a better idea to move this to server side to avoid the data manipulation in the client side.

### 4. Guess Commitment
Once a guess is placed, it cannot be canceled or reset until the 60-second resolution period ends.
* **Decision:** I chose to lock the user into their guess for the full duration without a cancel/reset guess.
* **Impact:** This maintains the integrity of the scoring system by preventing users from resetting a guess if the market moves against them. 

### 5. UI Frameworks
I chose to use native CSS Modules and custom components instead of a UI library like MUI or Tailwind.
* **Decision:** This keeps the bundle size small and provides full control over the styling, demonstrating foundational CSS and React patterns.

### 6. Testing Scope
Testing is focused on the core business logic within the application store (Zustand).
* **Decision:** I prioritized unit tests for the scoring and guess-resolution engine over broad UI component testing. I need to expand the test coverage to other part of the main guess page where the certain actions will be triggered. It is currently limitted around the core business logic.