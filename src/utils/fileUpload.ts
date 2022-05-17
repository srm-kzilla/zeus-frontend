import { postEvent, upload } from "./api";

const uploadFile: (slug: string, eventCover: any) => any = async (
  slug,
  eventCover,
) => {
  const body = new FormData();
  eventCover.forEach((fileItem: any) => {
    body.append("cover", fileItem.file);
  });

  const res = await upload(slug, body);
  return res.key;
};

export default uploadFile;
