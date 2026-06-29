# Lumina - AI App Builder 🦄

**Lumina** is an AI-powered app builder designed for the **AMD Developer Hackathon: ACT II** (Track 3 - Unicorn Track).

It provides a sleek, modern, split-screen developer environment where users can describe an interface they want, and a fast language model (running on Fireworks AI via AMD hardware) streams a live, interactive UI preview using Tailwind CSS.

## Features ✨
- **Real-Time Generation:** Describe a component and watch the HTML/Tailwind CSS render instantly.
- **Split-Screen Design:** Chat with the AI on the left, view the live rendered preview on the right.
- **Glassmorphic UI:** A premium dark-mode aesthetic with an animated gradient background and noise textures.
- **Containerized:** Fully containerized using a multi-stage Docker build with Nginx for fast edge deployment.

## Tech Stack 🛠
- **Frontend:** HTML, CSS, Vanilla JS, Vite
- **AI Backend:** Llama 3 (via Fireworks AI API)
- **Deployment:** Docker, Nginx

## Setup Instructions 🚀

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/DavidDeez/Lumina.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`.
5. Click on **Settings** in the navbar and input your Fireworks AI API Key.

### Docker Containerization
To build and run the production-ready container:
```bash
docker build -t lumina-app .
docker run -p 8080:80 lumina-app
```
Then visit `http://localhost:8080` in your browser.

## Submission Details
Submitted for the AMD Developer Hackathon: ACT II by DavidDeez.
