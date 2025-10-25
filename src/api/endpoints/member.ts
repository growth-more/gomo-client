export const member = {
  profile: '/members',
  create: '/members',
  update: '/members',
  delete: '/members',

  createSignUpEmailCode: '/members/emails/codes/signup',
  createResetPasswordEmailCode: '/members/emails/codes/passwords/reset',
  verifyEmailCode: '/members/emails/codes/verify',
  checkHandleDuplicate: '/members/handles/duplicate',

  updateHandle: '/members/handles',
  updateProfileImage: '/members/images/profiles',
  updatePassword: '/members/passwords',

  getQuestProperty: '/members/properties/quests',
  updateQuestProperty: '/members/properties/quests',

  getWidget: '/members/widgets',
  updateWidget: '/members/widgets',
}
