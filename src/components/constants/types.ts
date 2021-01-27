export type award = {
  gold: number,
  silver: number,
  bronze: number
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
  ownerId: string,
  percentCompleted: number,
  dependsOn: string[],
  participants: string,
  completionAward: award,
  lossRate: award,
  isNoteworthy: boolean
}
