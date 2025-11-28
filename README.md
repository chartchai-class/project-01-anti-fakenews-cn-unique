# Social Anti-Fake News System (Vue 3 + Vite)

## Team Info

- **Team Name:** uniqu
- **Members:**
  - **Student ID:** 20232054, **Name:** wangyuzhe, **Contribution rate:** 40%
  - **Student ID:** 20232081, **Name:** liuwenhao, **Contribution rate:** 30%
  - **Student ID:** 20232097, **Name:** wangpengyue, **Contribution rate:** 30%

## Project Links

- **Video Demo (2–3 min):** Watch Demo (the `the video.mp4` file is in the project folder)
- **Live Site URL (Vercel):**
  - https://vue-final-lab.vercel.app/
  - https://vue-final-lab-git-main-wangyuzhe0s-projects.vercel.app/
- **Presentation:** The `template for presentation.pptx` is in the project folder.
- **Class GitHub Repository:** https://github.com/chartchai-class/project-01-anti-fakenews-cn-unique
- **Personal GitHub Repository:** https://github.com/wangyuzhe0/vue-final-lab

## Features

- **Home:** Displays a list of news articles with filtering options (All/Fake/Not Fake), allows selection of items per page, and includes pagination.
- **Detail:** Shows complete information for a news article, including topic, body, status, reporter, time, and image URL. It also displays voting statistics and paginated comments.
- **Vote Page:** A dedicated page for voting, which supports adding comments and image links (URLs).
- **Decision Rule:** The status of a news item ("Fake" or "Not Fake") is determined by a majority vote. A tie results in a "Pending" status.
- **Storage:** Pinia is used for front-end state management only. There is no data persistence on a server; refreshing the page will clear any newly added comments or votes.

## Tech Stack

- Vue 3 + Vite
- Vue Router for client-side routing
- Pinia for state management
- Vercel for static deployment

## Local Development

1.  Install dependencies:
    ```bash
    npm i
    ```
2.  Run the development server:
    ```bash
    npm run dev
    ```

## Directory Structure

- `src/pages/Home.vue`: Contains the logic for the news list, filtering, and pagination.
- `src/pages/NewsDetail.vue`: Manages the display of news details, comments, and voting statistics.
- `src/pages/Vote.vue`: The standalone page for users to cast votes.
- `src/stores/newsStore.js`: Pinia store for managing application state and actions.
- `src/mock/news.js`: Contains mock data and functions for calculating statistics.
- `src/components/Pagination.vue`: A reusable component for pagination.
- `vercel.json`: Configuration file for Vercel deployments.
