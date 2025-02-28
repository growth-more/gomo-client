import { InterestGraphResponse, InterestListResponse } from '@/api/types'

const list: InterestListResponse = {
  interests: [
    {
      id: '3bd1b3f7-d7c6-11ef-abb8-a7e09b2a499c',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Backend',
      logoUrl: 'https://mini-cloud/backend-logo.png',
      level: 10,
      score: 45,
      scoreThreshold: 60,
      totalScore: 445,
    },
    {
      id: '90a387a7-d7c5-11ef-b4d7-079c7dc41274',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Spring',
      logoUrl: 'https://mini-cloud/spring-logo.png',
      level: 5,
      score: 20,
      scoreThreshold: 40,
      totalScore: 220,
    },
    {
      id: 'f8c51811-d7c5-11ef-82dc-4322ccc3e338',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Java',
      logoUrl: 'https://mini-cloud/java-logo.png',
      level: 6,
      score: 30,
      scoreThreshold: 40,
      totalScore: 270,
    },
  ],
}

const graph: InterestGraphResponse = {
  interests: [
    {
      id: '3bd1b3f7-d7c6-11ef-abb8-a7e09b2a499c',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Backend',
      logoUrl: 'https://mini-cloud/backend-logo.png',
      level: 10,
      score: 45,
      scoreThreshold: 60,
      totalScore: 445,
    },
    {
      id: '90a387a7-d7c5-11ef-b4d7-079c7dc41274',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Spring',
      logoUrl: 'https://mini-cloud/spring-logo.png',
      level: 5,
      score: 20,
      scoreThreshold: 40,
      totalScore: 220,
    },
    {
      id: 'f8c51811-d7c5-11ef-82dc-4322ccc3e338',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      name: 'Java',
      logoUrl: 'https://mini-cloud/java-logo.png',
      level: 6,
      score: 30,
      scoreThreshold: 40,
      totalScore: 270,
    },
  ],
  relations: [
    {
      id: '80ac5a74-d7eb-11ef-a2bd-1f5e37eb89a8',
      registrantId: 'a10581ce-d721-11ef-a8a5-2508e2a6438b',
      parentInterestId: '3bd1b3f7-d7c6-11ef-abb8-a7e09b2a499c',
      childInterestId: 'f8c51811-d7c5-11ef-82dc-4322ccc3e338',
    },
  ],
}

export const interest = {
  list,
  graph,
}
