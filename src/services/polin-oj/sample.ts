
import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';




export async function previewTestSample(problem: any) {
    return await dealWithHttpResult(async () => {
      return await request<any>('/api/cos/preview/sample/'+problem, {
        method: 'GET'
      });
    })
  }