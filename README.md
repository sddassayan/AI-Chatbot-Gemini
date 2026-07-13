# AI Chatbot Gemini

An AI-powered chatbot built with **Next.js**, **React**, **TypeScript**, and the **Google Gemini API**. The application delivers intelligent, context-aware conversations and enables users to upload a PDF document for AI-assisted question answering.

Designed with a modern and responsive interface, the chatbot maintains conversational context across multiple prompts, allowing users to ask natural follow-up questions without repeating previous information.

---

##  Features

*  AI-powered conversations using Google Gemini
*  Multi-turn conversational context for natural follow-up interactions
*  Upload and analyze a PDF document using AI
*  Ask questions directly about the uploaded document
*  Fast, responsive, and intuitive user interface
*  Responsive design optimized for desktop and mobile
*  Secure API configuration using environment variables

---

#  Media

## Demo Video

A complete walkthrough of the application is available below.

> **Demo:** *(public/assets/My AI Chatbot Review.mp4)*

---

## Sample PDF

A sample document is included to help you explore the PDF chat functionality immediately.

```text
public/assets/sample_indian_profile.pdf
```

Simply upload the provided PDF and start asking questions about its content.

---

##  Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* HTML5
* CSS3

### AI

* Google Gemini API

### PDF Processing

* PDF.js

---

## Project Structure

```text
AI-Chatbot-Gemini
│
├── app/
├── components/
├── public/
│
├── demo/
│   ├── demo.mp4
│   └── sample.pdf
│
├── lib/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone https://github.com/sddassayan/AI-Chatbot-Gemini.git
```

Navigate to the project directory.

```bash
cd AI-Chatbot-Gemini
```

Install dependencies.

```bash
npm install
```

Create an environment file.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Start the development server.

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```

---

## How It Works

1. Launch the application.
2. Upload the provided sample PDF or your own document.
3. Ask questions about the uploaded document.
4. Continue the conversation naturally using follow-up questions.
5. The chatbot preserves conversational context throughout the session to provide more coherent and relevant responses.

---

## Future Enhancements

* Support multiple PDF documents
* Support DOCX and TXT files
* Voice input and speech synthesis
* Conversation export
* User authentication
* Persistent chat history
* Retrieval-Augmented Generation (RAG)
* Cloud deployment with Vercel

---

## Contributing

Contributions, feature requests, and suggestions are welcome. Feel free to fork the repository, open an issue, or submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Author

**Sayandeep Das**

GitHub: https://github.com/sddassayan

LinkedIn: https://www.linkedin.com/in/sayandeepdas26
