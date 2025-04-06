import { member } from './member'
import { quest } from './quest'
import { interest } from './interest'
import { streak } from './streak'
import { auth } from './auth'

export const handlers = [...member, ...quest, ...interest, ...streak, ...auth]
