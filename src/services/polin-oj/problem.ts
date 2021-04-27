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


export async function createProblem(problem: any) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/problem', {
      method: 'POST',
      data: problem
    });
  })
}

export async function pageProblem(params:any) {
  return await dealWithHttpResult(async () => {
      params = {
          source: params.source,
          pageIndex: params.current,
          pageSize: params.pageSize,
      }
      var result = await request('/api/problem/page', {
          method: 'POST',
          data: params,
      })
      if(result.success){
        result.data={
          data: result.data.list,
          pageSize: result.data.pageSize,
          current: result.data.pageIndex,
          total: result.data.total
        }
      }
      return result;
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

