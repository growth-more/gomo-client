import { member } from './member'
import { quest } from './quest'
import { interest } from './interest'
import { streak } from './streak'

export const handlers = [...member, ...quest, ...interest, ...streak]
