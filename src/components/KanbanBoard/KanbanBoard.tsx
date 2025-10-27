import React, { useState, useCallback } from 'react'
import { Task, Column } from './types'
import { sampleTasks, sampleColumns } from './data'
import { KanbanColumn } from './KanbanColumn'
import { TaskModal } from './TaskModal'
import { v4 as uuid } from '../../utils/uuid'

export const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>(sampleTasks)
  const [columns, setColumns] = useState<Column[]>(sampleColumns)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)

  const onAddTask = useCallback((columnId: string) => {
    const id = 't-' + uuid().slice(0,8)
    const newTask: Task = { id, title: 'New task' }
    setTasks(t => ({ ...t, [id]: newTask }))
    setColumns(c => c.map(col => col.id === columnId ? { ...col, taskIds: [id, ...col.taskIds] } : col))
  }, [])

  const onUpdateTask = useCallback((id: string, patch: Partial<Task>) => {
    setTasks(t => ({ ...t, [id]: { ...t[id], ...patch } }))
    setEditingTaskId(null)
  }, [])

  const onDeleteTask = useCallback((id: string) => {
    setTasks(t => {
      const copy = { ...t }
      delete copy[id]
      return copy
    })
    setColumns(c => c.map(col => ({ ...col, taskIds: col.taskIds.filter(x => x !== id) })))
    setEditingTaskId(null)
  }, [])

  const onDragStart = useCallback((e: React.DragEvent, taskId: string, fromColumnId: string) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId, fromColumnId }))
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const onDrop = useCallback((e: React.DragEvent, toColumnId: string, index?: number) => {
    e.preventDefault()
    try {
      const payload = JSON.parse(e.dataTransfer.getData('text/plain'))
      const { taskId, fromColumnId } = payload as { taskId: string, fromColumnId: string }
      if (!taskId) return
      setColumns(cols => {
        let next = cols.map(col => ({ ...col }))
        // remove from source
        next = next.map(col => col.id === fromColumnId ? { ...col, taskIds: col.taskIds.filter(id => id !== taskId) } : col)
        // insert into target
        next = next.map(col => {
          if (col.id !== toColumnId) return col
          const newTaskIds = [...col.taskIds]
          if (typeof index === 'number') newTaskIds.splice(index, 0, taskId)
          else newTaskIds.unshift(taskId)
          return { ...col, taskIds: newTaskIds }
        })
        return next
      })
    } catch (err) {
      // ignore
    }
  }, [])

  const onDropAllow = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const onToggleCollapse = useCallback((colId: string) => {
    setColumns(cols => cols.map(c => c.id === colId ? { ...c, collapsed: !c.collapsed } : c))
  }, [])

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(col => (
        <div key={col.id} className="min-w-[260px] bg-neutral-100 rounded p-3 shadow-sm">
          <KanbanColumn
            column={col}
            tasks={col.taskIds.map(id => tasks[id]).filter(Boolean)}
            onAdd={() => onAddTask(col.id)}
            onEdit={(id) => setEditingTaskId(id)}
            onDelete={onDeleteTask}
            onDragStart={(e, tid) => onDragStart(e, tid, col.id)}
            onDrop={(e, idx) => onDrop(e, col.id, idx)}
            onDropAllow={onDropAllow}
            onToggleCollapse={() => onToggleCollapse(col.id)}
          />
        </div>
      ))}
      {editingTaskId && tasks[editingTaskId] && (
        <TaskModal
          task={tasks[editingTaskId]}
          onClose={() => setEditingTaskId(null)}
          onSave={(patch) => onUpdateTask(editingTaskId, patch)}
          onDelete={() => onDeleteTask(editingTaskId)}
        />
      )}
    </div>
  )
}
