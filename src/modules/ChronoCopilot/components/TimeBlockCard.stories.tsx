import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimeBlockCard } from './TimeBlockCard';
import { TimeBlock } from '../types/timeblock';

const meta: Meta<typeof TimeBlockCard> = {
  title: 'ChronoCopilot/TimeBlockCard',
  component: TimeBlockCard,
  tags: ['autodocs'],
  argTypes: {
    block: {
      control: 'object',
      description: 'The time block data object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeBlockCard>;

const sampleBlock: TimeBlock = {
  id: '1',
  start: '2024-01-01T09:00:00.000Z',
  end: '2024-01-01T10:30:00.000Z',
  label: 'Morning Deep Work',
  completed: false,
};

export const Default: Story = {
  args: {
    block: sampleBlock,
  },
};

export const Completed: Story = {
    args: {
        block: {
            ...sampleBlock,
            id: '2',
            label: "Review PRs",
            completed: true,
        }
    }
} 