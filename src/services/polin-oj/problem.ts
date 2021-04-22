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



export async function pullProblem(source: string, sourceId: string) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/problem/pull', {
      method: 'POST',
      data: {
        source,
        sourceId,
      }
    });
  })
}

