import { message } from 'antd';

export async function dealWithHttpResult(func:Function){
    const result = await func();

    if(result.success){
        return result.data;
    }else{
        message.error('错误代码:'+result.code+"\n"+result.msg)
        return null;
  }
}