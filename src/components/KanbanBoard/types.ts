export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
export interface Task {
  id: string
  title: string
  description?: string
  priority?: TaskPriority
  assignee?: string
  tags?: string[]
  dueDate?: string
}

export interface Column {
  id: string
  title: string
  taskIds: string[]
  maxTasks?: number
  collapsed?: boolean
}
