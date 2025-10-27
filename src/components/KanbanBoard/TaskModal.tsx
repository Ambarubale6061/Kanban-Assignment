import React, { useState } from 'react'
import { Task } from './types'

interface Props {
  task: Task
  onSave: (patch: Partial<Task>) => void
  onDelete: () => void
  onClose: () => void
}

export const TaskModal: React.FC<Props> = ({ task, onSave, onDelete, onClose }) => {
  const [title, setTitle] = useState(task.title)
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <h3 className="font-semibold mb-2">Edit Task</h3>
        <label className="block text-sm mb-2">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full border p-2 rounded mb-4" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button onClick={()=> onSave({ title })} className="px-3 py-1 rounded bg-primary-500 text-white">Save</button>
          <button onClick={onDelete} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}
