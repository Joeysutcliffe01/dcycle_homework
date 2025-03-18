# dcycle_homework

A React + TypeScript project built with **Vite** and styled using **Tailwind CSS**. This project implements two front-end exercises, integrating with a **Node.js/Express backend API** for data retrieval.

---

## Project Overview

This project demonstrates:

### 1. **Name Information**
- A form to enter a name and retrieve:
  - The most likely **gender** (`/api/genderize/:name`)
  - Probable **nationalities** (`/api/nationalize/:name`)
  - Predicted **age** (`/api/agify/:name`)
- Results are displayed in a clean, user-friendly UI.
- Users can **save** and **delete** cards for multiple names.

### 2. **COVID Historical Data**
- Fetches US COVID-19 data from `/api/covid/historical`.
- Visualizes **total** and **daily metrics**:
  - Cases, Tests, and Deaths
- Features:
  - Chart type toggle (Line, Bar, Area)
  - 7-Day moving average toggle
  - Date range selection (30, 90, 180 days)
  - Download chart as PNG
  - Lottie animation during loading

The app includes a **sidebar navigation**, with **COVID Data** as the default view.

---

## Technology Stack

- **Frontend:**
  - React + TypeScript
  - Vite
  - Tailwind CSS
  - Recharts (data visualization)
  - html2canvas (chart export)
  - react-tooltip (tooltips)
  - Lottie (animations)

- **Backend:**
  - Node.js + Express API
  - Runs on **port 3200** (external repo required)

---

### Clone the Frontend Repository

```bash
git clone https://github.com/Joeysutcliffe01/dcycle_homework.git
cd dcycle_homework
npm install




