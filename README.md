# dcycle_homework

A React + TypeScript project built with Vite and styled using Tailwind CSS. This project implements two exercises as part of a front-end homework assignment, integrating with a Node.js backend API for data retrieval.

## Project Overview

This project demonstrates:

- **Exercise 1: Name Information**

  - A form where the user can enter their name.
  - API calls to fetch:
    - The most likely gender (`/api/genderize/:name`)
    - Probable nationalities (`/api/nationalize/:name`)
    - The predicted age (`/api/agify/:name`)
  - A clean, user-friendly display of the fetched data.

- **Exercise 2: COVID Historical Data**
  - Fetches historical COVID data for the United States from `/api/covid/historical`.
  - Displays daily data on cases, tests, and deaths.

A sidebar navigation allows users to switch between these two exercises. By default, the COVID Historical Data (Exercise 2) is displayed first.

## Technology Stack

- **React** with **TypeScript** for building the UI.
- **Vite** for fast development and build processes.
- **Tailwind CSS** for utility-first styling.
- **Node.js/Express** backend (provided via an external repository) running on port 3200 for API endpoints.

## Setup & Installation

### 1. Frontend Setup

Clone the project repository and install dependencies:

```bash
git clone <your-frontend-repository-url>
cd dcycle_homework
npm install
```
