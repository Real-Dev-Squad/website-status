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
  createdBy: string,
  github?: {
    issue: {
      assignee?: string,
      status: string,
      id: number,
      closedAt?: string,
      assigneeRdsInfo?: {
        firstName: string | null | undefined,
        lastName: string | null | undefined,
        username: string
      }
    }
  } 
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

const TABS = Object.values(Tab);

export { TABS, Tab };


export default task;
