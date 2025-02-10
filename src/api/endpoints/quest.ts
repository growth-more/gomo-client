export const quest = {
  getAssignQuest: `/quests/assigns`,
  createAssignQuest: '/quests/assigns',
  updateAssignQuestWithId: (id: string) => `/quests/assigns/${id}`,
  deleteAssignQuestWithId: (id: string) => `/quests/assigns/${id}`,
  updateAssignQuestOrder: '/quests/assigns/orders',

  getHistoryAssignQuest: `/quests/assigns/histories`,
  confirmAssignQuestWithId: (id: string) => `/quests/assigns/${id}/confirm`,
  completeAssignQuestWithId: (id: string) => `/quests/assigns/${id}/complete`,

  createRepeatQuest: '/quests/repeats',
  getRepeatQuest: `/quests/repeats`,
  updateRepeatQuestWithId: (id: string) => `/quests/repeats/${id}`,
  deleteRepeatQuestWithId: (id: string) => `/quests/repeats/${id}`,
  updateRepeatQuestOrder: '/quests/repeats/orders',
}
