/* eslint-disable import/default */
import bent from "bent";
import FormData from "form-data";

export async function post(file: Buffer) {
  const request = bent("https://ipfs.infura.io:5001", "json", "POST", 200);
  const form = new FormData();

  form.append("file", file);
  
  const response = await request(
    `/api/v0/add?pin=true`,
    form,
    form.getHeaders()
  );

  return response;
}

export async function get(hash: string) {
   const request = bent("https://cloudflare-ipfs.com/ipfs", "GET", 200);
   let response: any;

   try {
     response = await request(`/${hash}`);
   } catch (e) {
     return new Error(e);
   }

   return response;
}