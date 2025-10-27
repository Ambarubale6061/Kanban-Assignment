import React from 'react'
import { Task } from './types'
import { format } from 'date-fns'

interface Props {
  task: Task
  onEdit: () => void
  onDelete: () => void
}

export const KanbanCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  return (
    <div
      role="listitem"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onEdit()
        if (e.key === 'Delete') onDelete()
      }}
      className="bg-white p-3 rounded shadow-sm border cursor-grab focus:outline focus:outline-2 focus:outline-primary-500"
      aria-label={task.title}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium text-sm">{task.title}</h4>
          {task.tags && <div className="text-xs text-neutral-500">{task.tags.join(', ')}</div>}
        </div>
        <div className="text-xs text-neutral-400">{task.dueDate ? format(new Date(task.dueDate), 'MMM d') : null}</div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button onClick={onEdit} className="text-xs px-2 py-1 rounded bg-neutral-100">Edit</button>
        <button onClick={onDelete} className="text-xs px-2 py-1 rounded bg-red-100">Delete</button>
      </div>
    </div>
  )
}
