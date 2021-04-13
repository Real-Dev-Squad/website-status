export type award = {
  dinero: number,
  neelam: number
}

export type task = {
  id: string,
  title: string,
  purpose: string,
  featureUrl: string,
  type: string,
  links: string[],
  endsOn: string,
  startedOn: string,
  status: string,
  assignee: string,
  percentCompleted: number,
  dependsOn: string[],
  participants: string,
  completionAward: award,
  lossRate: award,
  isNoteworthy: boolean
}
