import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';

export async function createContext(body: any) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context', {
      method: 'PUT',
      data: body
    });
  })
}



export async function pageContext(params: {}) {
  return await dealWithHttpResult(async () => {
    const result = await request<any>('/api/context/page', {
      method: 'POST',
      data: params
    });
    if (result.success) {
      result.data.current = result.data.pageIndex;
      delete result.data.pageIndex;

      result.data.data = result.data.list;
      delete result.data.list;
    }
    return result;
  })
}

export async function getContext(id: number) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context', {
      method: 'GET',
      params: {
        id
      }
    });
  })
}


export async function getContextRank(id: number) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context/rank', {
      method: 'GET',
      params: {
        contextId: id
      }
    });
  })
}


export async function joinContext(id: number) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context/join', {
      method: 'POST',
      params: {
        contextId: id
      }
    });
  })
}


export async function updateJoinContext(contextId: number, star: boolean) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context/join/update', {
      method: 'POST',
      data: {
        contextId,
        star,
      }
    });
  })
}





