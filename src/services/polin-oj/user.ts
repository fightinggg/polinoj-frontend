import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';

export async function currentUser(options?: { [key: string]: any }) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/user', {
      method: 'GET',
      ...(options || {}),
    });
  })
}


export async function updateUser(body: any, options?: { [key: string]: any }) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/user', {
      method: 'POST',
      data: body,
      ...(options || {}),
    });
  })
}




