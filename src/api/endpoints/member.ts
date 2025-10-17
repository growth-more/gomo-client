export const member = {
  profile: '/members',
  create: '/members',
  update: '/members',
  delete: '/members',

  createEmailCode: '/auth/codes/generate/emails',
  verifyEmailCode: '/auth/codes/verify',
  checkHandleDuplicate: '/members/handles/duplicate',

  updateHandle: '/members/handles',
  updateProfileImage: '/members/images/profiles',
  updatePassword: '/members/passwords',

  getQuestProperty: '/members/properties/quests',
  updateQuestProperty: '/members/properties/quests',

  getWidget: '/members/widgets',
  updateWidget: '/members/widgets',
}
