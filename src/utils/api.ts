import { Event, User } from "../types/global";
import axios, { AxiosInstance } from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTI5Nzc3NDYsImlzcyI6ImVzaEBtYWlsLmNvbSJ9._nyWdht5UQ33XjZn8FxJ1nJ9bs2HfJv9W7I-7OpC0kg";
const instance: AxiosInstance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_BASE_URL,
  // baseURL: "https://75c2-2409-4072-691-80d7-19a1-f549-1de7-2c66.ngrok.io/api/",
  headers: {
    "X-Access-Token": token,
  },
});

export const fetchEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await instance.get("events");
    return res.data;
  } catch (err) {
    return null;
  }
};

export const postEvent = async (payload: Event): Promise<any> => {
  try {
    const res = await instance.post("event", payload);

    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));
      const speakerRes = await postSpeaker(payload.speakers as any);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const putEvent = async (payload: Event): Promise<any> => {
  try {
    const res = await instance.put("event", payload);
    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));
      console.log(payload.speakers[0]._id);

      const speakerRes = await putSpeaker(payload.speakers as any);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postSpeaker = async (payload: any): Promise<any> => {
  try {
    const res = await instance.post("event/speaker", payload[0]);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const putSpeaker = async (payload: any): Promise<any> => {
  try {
    const res = await instance.put("event/speaker", payload[0]);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchSingleEvent = async (
  slug: string,
): Promise<Event[] | null> => {
  try {
    if (slug) {
      const res = await instance.get(`event/${slug}`);
      return res.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const fetchUserByEvent = async (
  slug: string,
): Promise<User[] | null> => {
  try {
    if (slug) {
      const res = await instance.get("users", { params: { slug } });
      return res.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const sendMails = async (payload: string[]): Promise<any> => {
  try {
    console.log("email to", payload);
  } catch (err) {
    console.log(err);
  }
};

export const upload = async (slug: string, payload: any) => {
  const res = await instance.post(`/upload?slug=${slug}`, payload, {
    headers: {
      "accept": "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data;`,
      "X-Access-Token": token,
    },
  });
  console.log(res);

  return res.data;
};

export const updateEvent = async (
  slug: string,
  payload: Event,
): Promise<any> => {
  try {
    const res = await instance.put(`event/upload/cover?slug=${slug}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateSpeaker = async (payload: Event): Promise<any> => {
  try {
    const res = await instance.put("event", payload);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
