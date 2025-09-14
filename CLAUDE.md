# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack for fast builds
- `npm run build` - Create production build with static export
- `npm run lint` - Run ESLint validation
- `npm start` - Start production server (for local testing)

### GitHub Pages Deployment
- `npm run deploy` - Build and prepare for GitHub Pages (adds .nojekyll)
- Push to `main` branch triggers automatic GitHub Actions deployment
- Site deploys to: `https://upadhyaysabyasachi.github.io/Vibe-Coding---Task-Manager/`
- **Important**: basePath and assetPrefix are configured for GitHub Pages subdirectory

## Architecture Overview

### Next.js Configuration
This is a **Next.js 15** application using **App Router** with **static export** enabled for GitHub Pages hosting:
- `output: 'export'` in next.config.ts - generates static HTML files
- `basePath: '/Vibe-Coding---Task-Manager'` - GitHub Pages subdirectory path
- `assetPrefix: '/Vibe-Coding---Task-Manager'` - Asset path prefix for GitHub Pages
- `trailingSlash: true` - GitHub Pages compatibility
- `images: { unoptimized: true }` - static image handling
- Build and TypeScript errors ignored during builds for deployment flexibility

### Key Directories
- `/src/app/` - App Router pages and layouts
- `/src/components/` - React components
- `/src/components/ui/` - Shadcn/UI component library (New York variant)
- `/src/components/ai-elements/` - Comprehensive AI chat component library
- `/src/lib/` - Utilities, types, and business logic
- `/out/` - Build output directory for static deployment

### Technology Stack
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **Shadcn/UI** with Radix UI primitives
- **Zod** for runtime type validation
- **Vercel AI SDK** for AI features
- **pnpm** as package manager

## Data Architecture

### Task Management System
- **Storage**: Client-side localStorage with error handling fallbacks
- **Types**: Defined in `/src/lib/types.ts` with Zod schemas
- **CRUD**: Full task lifecycle in `/src/lib/task-storage.ts`
- **State**: Custom hook at `/src/lib/hooks/use-tasks.ts`

### Task Structure
```typescript
Task {
  id: string (UUID)
  title: string
  description?: string
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}
```

## Component Patterns

### Main Application Flow
1. **TaskDashboard** (`/src/components/task-dashboard.tsx`) - Main entry point
2. **TaskForm** - Task creation and editing with Zod validation
3. **TaskList** - Task rendering with filtering and sorting
4. **TaskCard** - Individual task display and interactions

### AI Integration Ready
Complete AI chat component library in `/src/components/ai-elements/`:
- Message handling, code blocks, reasoning display
- Tool integration patterns for AI agents
- Markdown rendering with syntax highlighting
- Mathematical notation support (KaTeX)

### UI Components
Shadcn/UI components configured with:
- **Path alias**: `@/` maps to `./src/`
- **CSS variables**: Custom design tokens in globals.css
- **Accessibility**: Built on Radix UI primitives
- **Styling**: Tailwind CSS with class variance authority

## Development Notes

### Static Export Considerations
- All pages must be statically exportable (no server-side rendering)
- Images require `unoptimized: true` for static hosting
- Client-side routing and state management only
- localStorage used for persistence instead of databases

### GitHub Actions Deployment
- Workflow in `.github/workflows/deploy.yml`
- Builds on Node.js 20, deploys to `gh-pages` environment
- Automatic deployment on every push to main branch
- Uses official GitHub Actions for Pages deployment

### Code Style
- TypeScript with strict mode
- ESLint with Next.js recommended configuration
- Modern React patterns (hooks, context, client components)
- Component composition over inheritance
- Type-safe props with proper TypeScript interfaces

## Task-Specific Guidance

### Adding New Features
1. Create components in appropriate directories
2. Use existing UI components from `/src/components/ui/`
3. Add types to `/src/lib/types.ts` with Zod schemas
4. Implement storage functions in `/src/lib/task-storage.ts`
5. Update hooks in `/src/lib/hooks/` for state management

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow Shadcn/UI component patterns
- Maintain consistent spacing and typography
- Ensure responsive design with mobile-first approach

### AI Feature Development
- Leverage existing AI components in `/src/components/ai-elements/`
- Use Vercel AI SDK for AI integrations
- Follow established patterns for message handling and tool usage