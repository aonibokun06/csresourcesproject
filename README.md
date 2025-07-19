# CS Resources Hub

A curated directory of computer science learning resources, built with Next.js, Convex, and Clerk authentication. Browse hand-picked resources organized by topic, bookmark your favorites, and track your learning progress.

## 🚀 Features

- **Curated Resource Directory**: Browse hand-picked CS resources organized by topic
- **User Authentication**: Sign up/sign in with Clerk authentication
- **Bookmark System**: Save resources you want to learn from
- **Progress Tracking**: Mark resources as completed and track your learning journey
- **Topic Organization**: Resources organized by CS topics (Web Development, DSA, AI/ML, etc.)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Powered by Convex for real-time updates and data persistence

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Backend**: Convex (database, real-time queries, mutations)
- **Authentication**: Clerk
- **UI Components**: Headless UI, Heroicons, Lucide React
- **Package Manager**: pnpm

## 📁 Project Structure

```
csresources/
├── apps/
│   └── web/                    # Next.js frontend application
│       ├── src/
│       │   ├── app/           # App Router pages
│       │   ├── components/    # React components
│       │   └── lib/          # Utilities and helpers
│       └── public/           # Static assets
├── packages/
│   └── backend/              # Convex backend
│       └── convex/          # Database schema and functions
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Convex account
- Clerk account

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/csresources.git
cd csresources
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### 4. Set Up Convex

1. Create a new Convex project at [convex.dev](https://convex.dev)
2. Get your deployment URL from the Convex dashboard
3. Add the URL to your `.env.local` file
4. Deploy your Convex functions:

```bash
cd packages/backend
npx convex dev
```

### 5. Set Up Clerk

1. Create a new Clerk application at [clerk.com](https://clerk.com)
2. Get your publishable key and secret key
3. Add them to your `.env.local` file
4. Configure your Clerk application settings (domains, redirect URLs, etc.)

### 6. Run the Development Server

```bash
# From the root directory
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📚 Available Topics

The application includes curated resources for the following CS topics:

- **Web Development**: HTML, CSS, JavaScript, React, modern web technologies
- **Data Structures & Algorithms**: Fundamental algorithms and data structures
- **Machine Learning & AI**: AI concepts, ML algorithms, deep learning
- **Computer Science Fundamentals**: Core CS concepts and theory
- **Databases**: SQL, NoSQL, data modeling
- **Cloud Computing**: AWS, Azure, Google Cloud
- **Cybersecurity**: Network security, cryptography, ethical hacking
- **Systems Programming**: Operating systems, low-level programming

## 🔧 Development

### Adding New Topics

1. Update the topic data in `apps/web/src/app/topics/page.tsx`
2. Add topic icons and colors in the `topicIcons` and `topicColors` objects
3. Update the topic detail page in `apps/web/src/app/topics/[slug]/page.tsx`

### Adding Resources

Resources are managed through the Convex backend. You can add resources by:

1. **Through Convex Dashboard**:
   - Go to your Convex dashboard
   - Navigate to the "Data" tab
   - Add new documents to the `resources` table

2. **Through Convex Functions**:
   - Create a new mutation in `packages/backend/convex/notes.ts`
   - Add a function to insert resources programmatically

3. **Example Resource Structure**:
   ```json
   {
     "title": "React Tutorial for Beginners",
     "description": "Learn React fundamentals with hands-on examples",
     "url": "https://example.com/react-tutorial",
     "type": "video",
     "difficulty": "beginner",
     "topicId": "web-development",
     "tags": ["react", "javascript", "frontend"]
   }
   ```

### Database Schema

The application uses the following main data models:

- **Topics**: CS topics with metadata (name, description, slug, featured status)
- **Resources**: Learning resources with metadata (title, description, URL, type, difficulty, topicId)
- **UserResources**: User interactions with resources (bookmarks, completion status, userId, resourceId)

### Resource Types

Supported resource types:
- `video` - Video tutorials and courses
- `article` - Blog posts and documentation
- `course` - Online courses and tutorials
- `book` - Books and e-books
- `tool` - Development tools and software
- `practice` - Practice problems and exercises

### Difficulty Levels

Supported difficulty levels:
- `beginner` - Suitable for newcomers
- `intermediate` - Requires some background knowledge
- `advanced` - For experienced developers



