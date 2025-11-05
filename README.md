# Motel Room - Customer Portal

A modern, responsive customer-facing website for motel room browsing and services. Built with React.js, this application provides customers with an intuitive interface to browse rooms, and contact the host.

## 🌟 Features

- **Room Browsing**: View available rooms with detailed information and images
- **User Registration**: Customer account creation and profile management
- **Search & Filter**: Find rooms by date, price, amenities, and room type
- **Real-time Availability**: Live updates on room availability

## 🚀 Live Demo

**Live Website**: [motel.junnio.xyz](https://motel.junnio.xyz)

## 📋 Prerequisites

Before running this application, ensure you have:

- Node.js (v14 or higher) - for development tools
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Access to the Motel API backend (see [API Repository](https://github.com/Junn1o/motelapi))

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Junn1o/motel-room.git
   cd motel-room
   ```

2. **Install development dependencies (optional)**
   ```bash
   npm install
   ```

3. **Configure environment settings**
   Create a `.env` file in the root directory:
   ```bash
   REACT_APP_API_URL="yourapiurl"
   REACT_APP_API="yourapiurl"
   ```

5. **Serve the application**
   ```bash
   npm start
   ```
   
6. **Or using Docker (Recommended)**
   ```bash
   # Build and run with Docker
   docker build -t motel-room .
   docker run -p 3000:80 motel-room
   ```
The website will be find as http://localhost:3000
## 🔗 Related Services

This customer portal works with:

- **API Backend**: [Motel API](https://github.com/Junn1o/motelapi) - ASP.NET Core 8 REST API
- **Admin Dashboard**: [Motel Admin Dashboard](https://github.com/Junn1o/MotelDB) - Management interface

## 🛠️ Technology Stack

- **Frontend**: React.js
- **UI Library**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **HTTP Client**: fetch
- **Deployment**: Docker containerization, Cloudflared tunnel port expose
