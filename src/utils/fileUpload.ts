export default async function uploadFile(eventCover: any) {
  const body = new FormData();
  eventCover.forEach((fileItem: any) => {
    body.append("cover", fileItem.file);
  });

  const res = await fetch(
    "https://events-api.srmkzilla.net/api/event/upload/cover?slug=mozo2",
    {
      method: "POST",
      body: body,
    },
  );
  return res;
}
