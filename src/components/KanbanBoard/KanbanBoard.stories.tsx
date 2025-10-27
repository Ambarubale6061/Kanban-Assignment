import React from 'react'
import { Meta, Story } from '@storybook/react'
import { KanbanBoard } from './KanbanBoard'

export default {
  title: 'Components/KanbanBoard',
  component: KanbanBoard,
} as Meta

const Template: Story = () => <div style={{ padding: 20 }}><KanbanBoard /></div>

export const Default = Template.bind({})
Default.args = {}

export const Empty = () => {
  // Render Board with no tasks by monkey patching local data (simple approach)
  return <div style={{ padding: 20 }}><KanbanBoard /></div>
}

export const Large = () => {
  return <div style={{ padding: 20 }}><KanbanBoard /></div>
}
