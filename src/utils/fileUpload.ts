import { upload } from "./api";

export default async function uploadFile(slug: string, eventCover: any) {
  const body = new FormData();
  eventCover.forEach((fileItem: any) => {
    body.append("cover", fileItem.file);
  });

  const res = await upload(slug, body);
  return res.key;
}
