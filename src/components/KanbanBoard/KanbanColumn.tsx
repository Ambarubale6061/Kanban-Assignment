import React from 'react'
import { Column, Task } from './types'
import { KanbanCard } from './KanbanCard'
import clsx from 'clsx'

interface Props {
  column: Column
  tasks: Task[]
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onDragStart: (e: React.DragEvent, taskId: string) => void
  onDrop: (e: React.DragEvent, index?: number) => void
  onDropAllow: (e: React.DragEvent) => void
  onToggleCollapse: () => void
}

export const KanbanColumn: React.FC<Props> = ({ column, tasks, onAdd, onEdit, onDelete, onDragStart, onDrop, onDropAllow, onToggleCollapse }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{column.title} {column.maxTasks ? `(WIP ${column.maxTasks})` : ''}</h3>
        <div className="flex items-center gap-2">
          <button onClick={onAdd} className="text-sm px-2 py-1 bg-white rounded border">+ Add</button>
          <button onClick={onToggleCollapse} aria-pressed={!!column.collapsed} className="text-sm px-2 py-1 bg-white rounded border">{column.collapsed ? 'Expand' : 'Collapse'}</button>
        </div>
      </div>

      <div
        onDragOver={onDropAllow}
        onDrop={(e) => onDrop(e)}
        role="list"
        aria-label={`${column.title} tasks`}
        className={clsx('space-y-2 min-h-[40px]')}
      >
        {column.collapsed ? (
          <div className="text-sm text-neutral-500">Collapsed</div>
        ) : tasks.length === 0 ? (
          <div className="text-sm text-neutral-500">No tasks</div>
        ) : (
          tasks.map((task, idx) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => onDragStart(e, task.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => onDrop(e, idx)}
            >
              <KanbanCard task={task} onEdit={() => onEdit(task.id)} onDelete={() => onDelete(task.id)} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
