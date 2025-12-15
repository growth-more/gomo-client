export const member = {
  profile: '/members',
  create: '/auth/signup',
  update: '/members',
  delete: '/members',

  createSignUpEmailCode: '/auth/codes/emails/signup',
  createResetPasswordEmailCode: '/auth/codes/emails/passwords/reset',
  verifyEmailCode: '/auth/codes/emails/verify',
  checkHandleDuplicate: '/members/handles/duplicate',

  updateHandle: '/members/handles',
  updateProfileImage: '/members/images/profiles',
  updatePassword: '/members/passwords',

  getQuestProperty: '/members/properties/quests',
  updateQuestProperty: '/members/properties/quests',

  updateWidget: '/members/widgets',
}
