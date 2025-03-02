export const interest = {
  getList: '/interests',

  create: '/interests',

  get: 'interests/:id',
  getWithId: (id: string) => `/interests/${id}`,

  update: 'interests/:id',
  updateWithId: (id: string) => `/interests/${id}`,

  delete: 'interests/:id',
  deleteWithId: (id: string) => `/interests/${id}`,

  updateLogo: 'interests/:id/logos',
  updateLogoWithId: (id: string) => `/interests/${id}/logos`,

  getGraph: 'interests/networks',

  createEdge: 'interests/networks/relations',

  deleteEdge: 'interests/networks/relations/:id',
  deleteEdgeWithId: (id: string) => `interests/networks/relations/${id}`,

  getMajorInterest: 'interests/majors',

  createMajorInterest: 'interests/:id/majors',
  createMajorInterestWithId: (id: string) => `/interests/${id}/majors`,

  deleteMajorInterest: 'interests/majors/:id',
  deleteMajorInterestWithId: (id: string) => `/interests/majors/${id}`,

  updateMajorInterestOrder: 'interests/majors/orders',

  getRecommended: 'interests/recommended',
}
