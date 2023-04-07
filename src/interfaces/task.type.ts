import award from '@/interfaces/award.type';

type task = {
  id: string,
  title: string,
  purpose: string,
  featureUrl: string,
  type: string,
  links: string[],
  endsOn: string,
  startedOn: string,
  status: string,
  assignee?: string,
  percentCompleted: number,
  dependsOn: string[],
  participants?: string[],
  completionAward: award,
  lossRate: award,
  isNoteworthy: boolean,
  createdBy: string
};

enum Tab {
  ASSIGNED = 'ASSIGNED',
  COMPLETED = 'COMPLETED',
  AVAILABLE = 'AVAILABLE',
  IN_PROGRESS = "IN_PROGRESS",
  NEEDS_REVIEW = 'NEEDS_REVIEW',
  IN_REVIEW = 'IN_REVIEW',
  VERIFIED = 'VERIFIED',
  MERGED = 'MERGED',
}

export type FilteredTasks = {
  [Tab.ASSIGNED]: task[],
  [Tab.COMPLETED]: task[],
  [Tab.AVAILABLE]: task[],
  [Tab.IN_PROGRESS]: task[],
  [Tab.NEEDS_REVIEW]: task[],
  [Tab.IN_REVIEW]: task[],
  [Tab.VERIFIED]: task[],
  [Tab.MERGED]: task[],
};

export type TabState = Tab.ASSIGNED | Tab.COMPLETED | Tab.AVAILABLE | Tab.IN_PROGRESS | Tab.NEEDS_REVIEW | Tab.IN_REVIEW | Tab.VERIFIED | Tab.MERGED;

const TABS = Object.values(Tab);

export { TABS, Tab };


export default task;
