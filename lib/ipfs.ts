/* eslint-disable import/default */
import bent from "bent";
import FormData from "form-data";

export default async function upload(file: Buffer, shouldPin = false) {
  const request = bent("https://ipfs.infura.io:5001", "json", "POST", 200);
  const form = new FormData();

  form.append("file", file);

  const response = await request(
    `/api/v0/add?pin=${shouldPin}`,
    form,
    form.getHeaders()
  );

  return response;
}
