# Backend – Aumne Assignment (Node.js + Express)

This is the backend for the form generation system. It receives a `.txt` file, uses Gemini AI to generate multiple-choice questions, and returns them to the frontend for preview and sharing.

---

## ⚙️ Setup Instructions

### 📦 Requirements

* Node.js v18+
* MongoDB (for storing survey metadata)

### 🔧 Installation

```bash
cd backend
npm install
```

### ▶️ Start the Server

```bash
node server.js
```

Runs at: `http://localhost:3000`

---

## 📁 File Structure

```
backend/
├── server.js                   # Entry point
├── controllers/
│   └── surveyController.js     # Gemini + form logic
├── models/
│   └── surveyModel.js          # MongoDB schema
├── routes/
│   └── surveyRoutes.js         # Upload route
```

---

## 🔌 API Endpoint

### `POST /surveys/upload`

* Accepts: `.txt` file (form-data, field name: `file`)
* Uses Gemini to parse and extract questions
* Returns JSON:

```json
{
  "surveyId": "abc123",
  "status": "draft",
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"]
    }
  ]
}
```

---

## 🔑 Config

* Replace the hardcoded `GEMINI_API_KEY` with your own Gemini API key.
* Optionally integrate Google Apps Script for Google Form creation.

---

## 🧪 Features

* Parses `.txt` files into structured question JSON
* Optionally generates Google Form (not used in frontend-only flow)
* MongoDB model included but not required for preview-only use

---

## 📦 Dependencies

* Express
* Multer
* Axios
* UUID
* Mongoose
* @google/generative-ai

---

## 🔒 Environment Consideration

* Avoid committing `.env` or keys
* Use Vercel environment variables in production (if hosted)

---

## 🔧 Future Enhancements

* Add route to generate Google Form via Apps Script
* Add real email integration (Gmail API or EmailJS)
* Store preview links or submissions persistently
