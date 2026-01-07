# NoteFlow+

NoteFlow+ is a modern, AI-powered note-taking and workflow management application designed to help you organize your thoughts, study effectively, and track your progress.

## 🚀 Key Features

- **Dynamic Flows**: Organize notes, quizzes, and events into logical streams of work.
- **AI-Powered Insights**: Ask questions about your notes and get instant answers.
- **Smart Quizzes**: Generate and take quizzes based on your content to reinforce learning.
- **Interactive Calendar**: Visualize your deadlines and study sessions.
- **Rich Text Editing**: Full-featured editor powered by TipTap.
- **Clerk Authentication**: Secure and seamless sign-in experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org) with [Drizzle ORM](https://orm.drizzle.team)
- **Authentication**: [Clerk](https://clerk.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) & [Shadcn UI](https://ui.shadcn.com)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (Planned)
- **Editor**: [TipTap](https://tiptap.dev)

## 📈 Implementation Progress

### Completed
- [x] Initial Project Setup & Architecture
- [x] Database Schema Design (Drizzle)
- [x] Clerk Auth Integration
- [x] Dashboard Layout & Sidebar
- [x] Flow Management UI (Create/List)
- [x] Note Editor Implementation (TipTap)
- [x] Responsive UI with Modern Aesthetics

### In Progress / Planned
- [ ] **Persistent Global Flow Selection**: Maintaining user context across pages. 
    - [View Implementation Plan](./docs/flow-persistence.md)
- [ ] AI Integration for Note Question & Answering
- [ ] Quiz Generation Engine
- [ ] Calendar Event Synchronization

## 🛠️ Getting Started

First, install dependencies:
```bash
pnpm install
```

Second, run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 Documentation

- [Flow Persistence Architecture](./docs/flow-persistence.md)
- [Database Schema](./db/README.md)

