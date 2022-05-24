import { postEvent, upload } from "./api";

const uploadFile: (slug: string, eventCover: any) => any = async (
  slug,
  eventCover,
) => {
  const body = new FormData();

  eventCover.forEach((fileItem: any) => {
    body.append("file", fileItem.file);
  });

  if (eventCover.length > 0) {
    const res = await upload(slug, body);
    return res.key;
  } else return "no key";
};

export default uploadFile;
