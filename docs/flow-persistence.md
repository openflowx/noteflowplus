# Implementation Plan: Persistent Global Flow Selection

This plan outlines the steps to implement a globally stored, persistent "Selected Flow" which allows users to maintain their working context across navigation and sessions.

## 1. Prerequisites
- [ ] Install Zustand for global state management.
  ```bash
  pnpm add zustand
  ```

## 2. Database Layer
- [ ] **Schema Update**: Add a `user_preferences` table to `db/schema.ts` to store the `last_selected_flow_id` for each Clerk user.
- [ ] **Migrations**: 
  - Run `pnpm db:generate` to create the migration.
  - Run `pnpm db:push` to apply changes to the database.

## 3. Server Actions
- [ ] Create `app/actions/preferences.ts` to handle:
  - `getUserPreferences()`: Fetch the stored flow ID for the current authenticated user.
  - `updateSelectedFlow(flowId)`: Upsert the selected flow ID in the `user_preferences` table.

## 4. Global State Layer (Zustand)
- [ ] Create `store/use-flow-store.ts`:
    - State: `selectedFlowId: string | null`
    - Action: `setFlowId(id: string | null)`
    - This store will provide instant reactivity across the UI.

## 5. Synchronization & Hydration
- [ ] **The "Bridge" Component**: Create a client-side component (e.g., `FlowStoreProvider` or `FlowInitializer`) that:
  - Fetches the initial `last_selected_flow_id` from the server on first mount.
  - Hydrates the Zustand store.
  - Wraps the root layout to ensure context is available everywhere.

## 6. UI Implementation
- [ ] **Flow Selection**: Update the Flow selection logic (in Sidebar or Flow list) to:
  - Update Zustand (`store.setFlowId`) for immediate UI feedback.
  - Call the Server Action (`updateSelectedFlow`) for background persistence.
- [ ] **Context Awareness**: 
  - Update `/notes` page to automatically filter or focus on the `selectedFlowId` from the store.
  - Add a "Clear Selection" option to reset the context.

## 7. Edge Case Handling
- [ ] **Flow Deletion**: Add logic to clear the `selectedFlowId` if the referenced flow is deleted.
- [ ] **Loading States**: Implement subtle skeletons or transitions while the initial preference is loading from the DB.
- [ ] **Auth State**: Ensure the store resets or re-fetches when a different user logs in (Clerk handles sessions, but Zustand needs to clear on sign-out).
