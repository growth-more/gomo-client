export const quest = {
  getAssignQuest: `/quests/assigns`,
  createAssignQuest: '/quests/assigns',
  updateAssignQuest: '/quests/assigns/:id',
  updateAssignQuestWithId: (id: string) => `/quests/assigns/${id}`,
  deleteAssignQuest: '/quests/assigns/:id',
  deleteAssignQuestWithId: (id: string) => `/quests/assigns/${id}`,
  updateAssignQuestOrder: '/quests/assigns/orders',

  getHistoryAssignQuest: `/quests/assigns/histories`,
  confirmAssignQuest: `/quests/assigns/:id/confirm`,
  confirmAssignQuestWithId: (id: string) => `/quests/assigns/${id}/confirm`,
  completeAssignQuest: `/quests/assigns/:id/complete`,
  completeAssignQuestWithId: (id: string) => `/quests/assigns/${id}/complete`,

  createRepeatQuest: '/quests/repeats',
  getRepeatQuest: `/quests/repeats`,
  updateRepeatQuest: '/quests/repeats/:id',
  updateRepeatQuestWithId: (id: string) => `/quests/repeats/${id}`,
  deleteRepeatQuest: '/quests/repeats/:id',
  deleteRepeatQuestWithId: (id: string) => `/quests/repeats/${id}`,
  updateRepeatQuestOrder: '/quests/repeats/orders',
}
