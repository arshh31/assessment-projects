# React Assignment – Assessment Project

This project contains the following features:

* User Form with validation and password toggle
* Advanced Countdown Timer system
* Multi Progress Bar component
* Todo App with filtering and priority support

The project is built using **React + Vite**.

---

## Prerequisites

* **Node.js (v18 or above recommended)**

Check your Node version:

```bash
node -v
```

---

## Steps to run the project locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd my-assignment
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Start the development server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Project Structure 

```
src/
 ├─ App.jsx
 ├─ components/
 │   ├─ Forms/
 │   │    └─ UserForm.jsx
 │   ├─ Timer/
 │   │    └─ CountdownTimer.jsx
 │   ├─ MultiProgressBar/
 │   │    ├─ MultiProgressBar.jsx
 │   │    └─ MultiProgressBarApp.jsx
 │   └─ Todo/
 │        ├─ TodoApp.jsx
 │        ├─ TodoItem.jsx
 │        └─ TodoApp.css
```

---

## Assumptions Made

### 1. Countdown Timer

* Uses `setInterval` for countdown updates.
* Timer state and remaining time are persisted using `localStorage`.
* On page refresh, the timer resumes automatically if it was running.

---

### 2. Todo App

* Each task supports a priority level (Low, Medium, High).
* Tasks can be filtered using:

  * All
  * Active
  * Completed
* Filtering is done on the client side using React state.
* Each task can be marked as completed.
* Priority is stored along with the task object.

---

### 3. Form handling

* All fields are mandatory.
* Email validation is done using a simple regular expression.
* Inline error messages are displayed.
* The form is cleared after successful submission.

---

### 4. Multi Progress Bar

* Progress value is limited between 0 and 100.
* Auto increment is used only for demo purposes.

---

##  Limitations / Trade-offs

* No backend or database integration.
* Todo data is persisted after page refresh.
* Timer accuracy depends on browser scheduling.
* UI is intentionally simple and lightweight.

---

##  Start Command

```bash
npm run dev
```

---

