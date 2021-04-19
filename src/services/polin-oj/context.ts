import { request } from 'umi';
import { dealWithHttpResult } from '@/utils/request';



export async function pageContext(params:{}) {
  return await dealWithHttpResult(async () => {
    const result = await request<any>('/api/context/page', {
      method: 'POST',
      data: params
    });
    if(result.success){
        result.data.current = result.data.pageIndex;
        delete result.data.pageIndex ;

        result.data.data = result.data.list;
        delete result.data.list;
    }
    return result;
  })
}

export async function getContext(id:number) {
  return await dealWithHttpResult(async () => {
    return await request<any>('/api/context', {
      method: 'GET',
      params:{
        id
      }
    });
  })
}







