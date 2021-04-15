import { request } from 'umi';


export async function currentUser(options?: { [key: string]: any }) {
    return request<any>('/api/user', {
      method: 'GET',
      ...(options || {}),
    });
  }