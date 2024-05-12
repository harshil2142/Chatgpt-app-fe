import axios from "axios";
import { toast } from "react-toastify";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
export const baseUrl = `${HOST}`;

async function getHeaders(extraHeaders = {}) {
  let token = null;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    accept: "application/json",
    ...extraHeaders,
  };
  try {
    token = localStorage.getItem('token')
  } catch (e) {
    console.log(e);
  }
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;

  //Temporary Code for local setup::
}

export async function getRequest({
  extraHeaders = {},
  url,
  params = {},
  cache = "default",
}: {
  extraHeaders?: object;
  params?: object;
  url: string;
  // eslint-disable-next-line no-undef
  cache?: RequestCache | undefined;
}) {
  const headers = await getHeaders(extraHeaders);

 try{
  const response = await axios.get(`${baseUrl}${url}`, {
    headers,
    params,
});
  return response;
 }
  catch (error:any) {
    toast.error(error?.response?.data?.message)
  }
}

export async function postRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.post(`${baseUrl}${url}`, data || {}, {
      headers,
    });
    return response;
  } catch (error:any) {
    toast.error(error?.response?.data?.message)
  }
}

export async function putRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.patch(`${baseUrl}${url}`, data || {}, {
      headers,
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

export async function deleteRequest({
  data,
  extraHeaders = {},
  url,
}: {
  data?: object;
  extraHeaders?: object;
  url: string;
}) {
  const headers = await getHeaders(extraHeaders);

  try {
    const response = await axios.delete(`${baseUrl}${url}`, {
      headers,
      data: data || {},
    });
    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
