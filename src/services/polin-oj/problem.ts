import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';


export async function getProblem(problemId: number) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/problem', {
      method: 'GET',
      params: {
        problemId
      }
    });
  })
}