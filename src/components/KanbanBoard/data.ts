import { Task, Column } from './types'
import { v4 as uuid } from '../../utils/uuid'

export const sampleTasks: Record<string, Task> = {
  't-1': { id: 't-1', title: 'Design landing page', priority: 'high', tags: ['design'] },
  't-2': { id: 't-2', title: 'Set up backend', priority: 'urgent', tags: ['api'] },
  't-3': { id: 't-3', title: 'Write tests', priority: 'medium', tags: ['testing'] },
  't-4': { id: 't-4', title: 'Prepare presentation', priority: 'low', tags: ['docs'] },
}

export const sampleColumns: Column[] = [
  { id: 'col-1', title: 'Backlog', taskIds: ['t-1', 't-3'], maxTasks: 0 },
  { id: 'col-2', title: 'In Progress', taskIds: ['t-2'] },
  { id: 'col-3', title: 'Done', taskIds: ['t-4'] },
]
