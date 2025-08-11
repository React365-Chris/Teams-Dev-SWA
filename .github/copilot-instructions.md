# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a React application using Vite for fast development/builds and Tailwind CSS for styling.
- The main entry point is `src/main.tsx`, which renders the root `App` component from `src/App.tsx`.
- Components are organized in `src/components/`, custom hooks in `src/hooks/`, and shared types in `src/types/`.

## Architecture & Data Flow
- UI is composed of modular components: `ChatInterface`, `MessageBubble`, `Sidebar`, `SuggestionChips`, and `TypingIndicator`.
- State and chat logic are managed via the custom hook `useChat` in `src/hooks/useChat.ts`.
- Data types for chat messages and related structures are defined in `src/types/chat.ts`.
- The app is designed for extensibility: new UI features should be added as components in `src/components/` and new logic as hooks in `src/hooks/`.

## Developer Workflows
- **Install dependencies:** `npm install`
- **Start development server:** `npm run dev` (Vite)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Linting:** Project uses ESLint; config in `eslint.config.js`. Run `npx eslint .` to check code quality.
- **Type checking:** Uses TypeScript. Run `npx tsc --noEmit` for type checks.

## Project-Specific Patterns
- **Styling:** Use Tailwind utility classes in JSX. Global styles are in `src/index.css`.
- **Component conventions:**
  - Prefer functional components and hooks.
  - Props and state types should be defined in `src/types/` when reused.
  - Example: `MessageBubble` receives a `message` prop typed from `chat.ts`.
- **State management:** Use custom hooks for non-trivial state logic (see `useChat`).
- **File organization:**
  - UI components: `src/components/`
  - Hooks: `src/hooks/`
  - Types/interfaces: `src/types/`

## Integration Points
- No backend or API integration is present by default; add API logic in hooks or context providers.
- External dependencies are managed via `package.json`.
- Vite config is in `vite.config.ts`; Tailwind config in `tailwind.config.js`.

## Examples
- To add a new chat feature:
  1. Create a component in `src/components/`
  2. Add supporting logic in a hook in `src/hooks/`
  3. Define new types in `src/types/chat.ts`
  4. Integrate in `App.tsx` or `ChatInterface.tsx`

---

If any section is unclear or missing important details, please provide feedback so I can iterate and improve these instructions.
