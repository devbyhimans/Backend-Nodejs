
<div align="center">

# 🚀 Backend with Node.js

### A complete, hands-on journey through backend development with Node.js & Express

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![ImageKit](https://img.shields.io/badge/ImageKit-03A9F4?style=for-the-badge&logo=imagekit&logoColor=white)](https://imagekit.io/)

</div>

---

## 📖 About This Repository

This repository is a **structured learning journey** through backend development using **Node.js**. Starting from the very basics of how Node.js works under the hood, all the way up to building a real-world **Spotify-like backend** with JWT authentication, role-based access control, and cloud file uploads.

Each folder represents a milestone — a new concept learned, a new skill unlocked. 🎯

---

## 🗂️ Folder Structure

```
Backend/
│
├── 📁 Basic/                    → Node.js fundamentals (modules, fs, CommonJS)
│   ├── hello.js                 → First Node.js script, require() & destructuring
│   ├── math.js                  → Creating & exporting custom modules
│   ├── file.js                  → File System (fs) — sync vs async operations
│   ├── contact.txt              → Sample file used in fs read/write demos
│   └── test.txt                 → Output file for appendFileSync demo
│
├── 📁 server/                   → Raw HTTP server (no frameworks!)
│   ├── index.js                 → http.createServer(), URL parsing, routing, logging
│   ├── log.txt                  → Auto-generated request log
│   └── url_data.txt             → Parsed URL query data
│
├── 📁 Express/                  → Introduction to Express.js
│   └── index.js                 → Routes, query parameters, req/res lifecycle
│
├── 📁 HTTP_methods(api)/        → REST HTTP methods with Express (in-memory)
│   └── src/
│       └── app.js               → GET, POST, DELETE routes with dynamic params
│
├── 📁 Rest_api/                 → Full REST API with file-based persistence
│   ├── index.js                 → CRUD operations, middleware, routing patterns
│   └── MOCK_DATA.json           → 1000+ mock user records (seed data)
│
├── 📁 Mongodb/                  → MongoDB + Mongoose integration
│   ├── server.js                → Entry point — connects DB and starts server
│   ├── models/
│   │   └── note.model.js        → Mongoose schema & model definition
│   ├── database/
│   │   └── db.js                → MongoDB connection using Mongoose
│   └── src/
│       └── app.js               → Notes CRUD API with async/await + error handling
│
├── 📁 Authenciation/            → JWT Authentication from scratch
│   ├── server.js                → Entry point
│   └── src/
│       ├── app.js               → App setup with routes and cookie-parser
│       ├── db/db.js             → DB connection
│       ├── model/
│       │   └── user.model.js    → User schema (username, email, password)
│       ├── controllers/
│       │   └── auth.controller.js  → Register user + JWT token in cookie
│       └── routes/
│           ├── auth.route.js    → /api/auth routes
│           └── post.route.js    → Protected route — cookie/token verification
│
├── 📁 spotify_backend/          → 🎵 Capstone Project — Spotify-like Backend
│   ├── server.js                → Entry point with dotenv validation
│   └── src/
│       ├── app.js               → Express app with auth & music routes
│       ├── db/db.js             → MongoDB connection
│       ├── models/
│       │   ├── user.model.js    → User with role (user | artist)
│       │   ├── music.model.js   → Music with audioUrl, title, artist ref
│       │   └── album.model.js   → Album with title, artist, music refs
│       ├── controllers/
│       │   ├── auth.controller.js   → Register, Login, Logout with bcrypt
│       │   └── music.controller.js  → Upload music, create album, fetch all
│       ├── middlewares/
│       │   └── auth.middleware.js   → authArtist & authUser JWT middleware
│       ├── routes/
│       │   ├── auth.route.js    → /api/auth routes
│       │   └── music.route.js   → /api/music routes (protected)
│       └── services/
│           └── storage.service.js   → ImageKit cloud upload service
│
└── 📁 Project1/                 → Additional project workspace
    ├── Backend/
    └── Frontend/
```

---

## ⚡ Concepts Covered

### 🟢 Chapter 1 — Node.js Basics (`Basic/`)
| Concept | What You Learned |
|---|---|
| **CommonJS Modules** | `require()`, `module.exports`, `exports.` shorthand |
| **Module Destructuring** | `const { add, sub } = require('./math')` |
| **File System (fs)** | Sync vs Async — `readFileSync`, `readFile`, `writeFile`, `appendFileSync` |
| **Callbacks** | How async `fs` methods use `(err, result)` callbacks |

---

### 🌐 Chapter 2 — Raw HTTP Server (`server/`)
| Concept | What You Learned |
|---|---|
| **http module** | `http.createServer()`, handler functions |
| **URL Parsing** | `url.parse(req.url, true)` — extracting pathname & query params |
| **Manual Routing** | `switch/case` on `myurl.pathname` |
| **HTTP Methods** | Checking `req.method` (GET vs POST) on same route |
| **Request Logging** | Appending timestamps + URLs to a log file asynchronously |

---

### 🚂 Chapter 3 — Express.js (`Express/`)
| Concept | What You Learned |
|---|---|
| **Express App** | `const app = express()` — how it wraps the `http` module |
| **Route Handlers** | `app.get(path, handler)` — cleaner routing |
| **Query Parameters** | `req.query.name`, `req.query.age` |
| **Sending Responses** | `res.send()`, dynamic string responses |

---

### 🔧 Chapter 4 — HTTP Methods & REST (`HTTP_methods(api)/` & `Rest_api/`)
| Concept | What You Learned |
|---|---|
| **GET** | Fetch all or a single resource |
| **POST** | Create a new resource via `req.body` |
| **PATCH** | Partially update an existing resource |
| **DELETE** | Remove a resource by ID or index |
| **Dynamic Route Params** | `app.get('/users/:id')` → `req.params.id` |
| **Middleware** | `app.use()`, `express.json()`, `express.urlencoded()`, custom middleware |
| **Middleware Chain** | `next()` — how middleware passes control down the chain |
| **File Persistence** | Writing updated JSON data back to disk with `fs.writeFileSync` |
| **`app.route()`** | Chaining `.get().patch().delete()` on the same path |

---

### 🍃 Chapter 5 — MongoDB & Mongoose (`Mongodb/`)
| Concept | What You Learned |
|---|---|
| **MongoDB Connection** | `mongoose.connect()` with async/await |
| **Schema Definition** | `new mongoose.Schema({ title: String, description: String })` |
| **Model Creation** | `mongoose.model('note', noteSchema)` |
| **CRUD with Mongoose** | `.create()`, `.find()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()` |
| **Async/Await + Try/Catch** | Clean async error handling in route handlers |
| **HTTP Status Codes** | `201`, `200`, `404`, `500` — using them correctly |

---

### 🔐 Chapter 6 — JWT Authentication (`Authenciation/`)
| Concept | What You Learned |
|---|---|
| **JWT Signing** | `JWT.sign({ id: user._id }, process.env.JWT_SECRET)` |
| **Cookies** | `res.cookie('token', token)` — storing JWT in HTTP cookie |
| **Cookie Parser** | `cookie-parser` middleware — `req.cookies.token` |
| **Protected Routes** | Verifying JWT before allowing access to a route |
| **JWT Verify** | `JWT.verify(token, secret)` — decoding and validating the token |
| **Environment Variables** | `dotenv` — keeping secrets out of code with `.env` files |
| **MVC Pattern** | Splitting routes → controllers → models into separate files |

---

### 🎵 Chapter 7 — Capstone: Spotify Backend (`spotify_backend/`)
| Concept | What You Learned |
|---|---|
| **bcryptjs** | Hashing passwords with `bcrypt.hash()` before saving to DB |
| **Password Comparison** | `bcrypt.compare(plain, hashed)` — safe login verification |
| **Role-Based Access Control** | User roles (`user`, `artist`) enforced via JWT payload |
| **Auth Middleware** | `authArtist` & `authUser` — role-check before route execution |
| **Req Mutation** | Setting `req.user = decoded` in middleware for downstream use |
| **Mongoose Population** | `.populate('artist', 'username email')` — joining documents |
| **Mongoose `.select()`** | Returning only specific fields from a query |
| **Pagination/Limiting** | `.limit(20)` — preventing memory overload |
| **File Uploads (Multer)** | Handling `multipart/form-data` for audio file upload |
| **Cloud Storage (ImageKit)** | Uploading audio buffers to ImageKit CDN |
| **Mongoose Refs** | Linking models with `type: mongoose.Schema.Types.ObjectId, ref: 'User'` |
| **Logout** | `res.clearCookie('token')` — invalidating session |
| **$or Query Operator** | Checking multiple fields in one MongoDB query |

---

## 🛠️ Setup & Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) — local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) (VS Code extension) — for testing APIs

---

### 🚀 Running Any Module

Each subfolder is its own mini-project. Navigate to the folder and install dependencies:

```bash
# Example: Running the Express server
cd Express
npm install
node index.js
```

```bash
# Example: Running the REST API
cd Rest_api
npm install
node index.js
```

```bash
# Example: Running MongoDB project
cd Mongodb
npm install
node server.js
```

---

### 🔑 Environment Variables Setup

For modules that use MongoDB, JWT, or ImageKit, create a `.env` file in the respective folder:

#### `Authenciation/.env`
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/authDB
JWT_SECRET=your_super_secret_key_here
PORT=3000
```

#### `Mongodb/.env`
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/notesDB
```

#### `spotify_backend/.env`
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/spotifyDB
JWT_SECRET=your_super_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
PORT=3000
```

> ⚠️ **Never commit your `.env` file to Git!** The `.gitignore` in this repo already excludes it.

---

### 🎵 Running the Spotify Backend (Capstone Project)

```bash
cd spotify_backend
npm install
# Make sure your .env file is configured
node server.js
```

**API Endpoints:**

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/api/auth/register` | Public | Register a new user or artist |
| `POST` | `/api/auth/login` | Public | Login and receive JWT cookie |
| `POST` | `/api/auth/logout` | Public | Clear JWT cookie |
| `POST` | `/api/music/upload` | Artist only | Upload a music track |
| `POST` | `/api/music/album` | Artist only | Create a new album |
| `GET` | `/api/music/all` | User + Artist | Fetch all music (limit 20) |
| `GET` | `/api/music/albums` | User + Artist | Fetch all albums |
| `GET` | `/api/music/albums/:albumId` | User + Artist | Get album by ID |

---

## 📦 Key Dependencies Used

| Package | Purpose |
|---|---|
| `express` | Web framework — routing, middleware |
| `mongoose` | MongoDB ODM — schemas, models, queries |
| `jsonwebtoken` | JWT creation and verification |
| `bcryptjs` | Secure password hashing |
| `cookie-parser` | Parse HTTP cookies from `req.cookies` |
| `dotenv` | Load environment variables from `.env` |
| `multer` | Handle multipart file uploads |
| `@imagekit/nodejs` | Upload files to ImageKit CDN |

---

## 💡 Learning Path

```
Node.js Basics  →  Raw HTTP Server  →  Express.js  →  REST API  →  MongoDB  →  JWT Auth  →  Spotify Backend
     📦                  🌐               🚂              🔧           🍃          🔐              🎵
```

---

## 👨‍💻 Author

**Himanshu** — Learning backend development, one concept at a time. 🚀

---

<div align="center">

*Built with ❤️ and lots of `console.log()` 😄*

</div>
