import { request } from 'umi';

export async function getSubmit(id:number) {
  return request<any>('/api/submit', {
    params: {
        id
    }
  });
}
