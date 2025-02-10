export const interest = {
  get: '/interests',
  create: '/interests',
  getWithId: (id: string) => `/interests/${id}`,
  updateWithId: (id: string) => `/interests/${id}`,
  deleteWithId: (id: string) => `/interests/${id}`,
  updateLogoWithId: (id: string) => `/interests/${id}/logos`,

  getGraph: 'interests/graphs',
  createEdge: 'interests/graphs/edges',
  deleteEdgeWithId: (id: string) => `interests/graphs/edges/${id}`,

  getMajorInterest: 'interests/majors',
  createMajorIntrestWithId: (id: string) => `/interests/${id}/majors`,
  deleteMajorIntrestWithId: (id: string) => `/interests/majors/${id}`,
  updateMajorIntrestOrder: 'interests/majors/orders',

  getRocommend: 'interests/recommended',
}
