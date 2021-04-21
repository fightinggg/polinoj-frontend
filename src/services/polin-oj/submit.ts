import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';

export async function getSubmit(id: number) {
  return request<any>('/api/submit', {
    params: {
      id
    }
  });
}


export async function submitProblems(body: any) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...({}),
    });
  })
}





export async function pageStatus(params: any) {
  return await dealWithHttpResult(async () => {
    params.source = 'hdu'
    var result = await request('/api/submit/status', {
      params,
    })
    if (result.success) {
      result.data = {
        data: result.data.list,
        pageSize: result.data.pageSize,
        current: result.data.pageIndex,
      }
    }
    return result;
  })
}

