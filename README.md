# 🚀 btc-price-guess

A real-time Bitcoin price prediction challenge. Players guess whether the price of BTC will rise or fall within a 60-second window, with scores persisted globally via a serverless AWS backend.

**[View Live Project](https://arunramachandran.github.io/btc-price-guess/)**

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

## 🛠 Local Development Setup

Follow these instructions to get the project running on your local machine.

### Prerequisites
* **Node.js** (v18.x or higher)
* **npm** (comes with Node)

### Step-by-Step Setup
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)ArunRamachandran/btc-price-guess.git
    cd btc-price-guess
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your AWS API endpoint:
    ```bash
    VITE_AWS_API_URL=[https://w8aaag9np1.execute-api.eu-north-1.amazonaws.com/update-score](https://w8aaag9np1.execute-api.eu-north-1.amazonaws.com/update-score)
    ```

4.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 How to Access the Live Project

The production version of the app is hosted on **GitHub Pages**.

1.  **URL:** `https://arunramachandran.github.io/btc-price-guess/`
2.  **Deployment Note:** The live version uses GitHub Secrets to securely inject the `VITE_AWS_API_URL` during the build process, ensuring the backend endpoint is never hardcoded in the source history.

---

## 📝 Features Checklist
- [x] **Real-time Data:** Fetches live BTC/USD prices via the CoinGecko API.
- [x] **Game Logic:** 60-second "lock-in" period for price predictions.
- [x] **Cloud Sync:** Automatic score persistence to AWS DynamoDB.