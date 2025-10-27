import React from 'react'
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard'

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Kanban Board — Assignment</h1>
        <KanbanBoard />
      </div>
    </div>
  )
}
