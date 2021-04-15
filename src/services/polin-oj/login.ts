import { request } from 'umi';
import { sha256 }  from 'js-sha256';

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  const slatResult = await request<any>("/api/status/slat",{
    method: "GET",
    params:{
      username: body.username
    }
  });
  if(!slatResult.success){
    return slatResult.msg;
  }
  body.password = sha256(body.password+slatResult.data.slat);

  const loginResult = await request<any>("/api/status/login",{
    method: "POST",
    data:{
      username: body.username,
      password: body.password
    }
  });

  if(!loginResult.success){
    return loginResult.msg;
  }


  const res = loginResult.data;
  res.status="ok"
  return res
  
}

export async function logout() {
  return request<Record<string, any>>('/api/status/logout', {
    method: 'POST',
  });
}






