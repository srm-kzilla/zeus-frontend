import { Event, User } from "../types/global";
import axios, { AxiosInstance } from "axios";
import { updateLoading } from "./toggleLoading";

const instance: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_BASE_URL,
  headers: {
    "X-Access-Token": (import.meta as any).env.VITE_TOKEN,
  },
});

export const fetchEvents = async (): Promise<Event[] | null> => {
  try {
    updateLoading(true);
    const res = await instance.get("events");
    if (res.data) updateLoading(false);

    return res.data;
  } catch (err) {
    return null;
  }
};

export const postEvent = async (payload: Event): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.post("event", payload);

    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));
      const speakerRes = await postSpeaker(payload.speakers as any);
      if (speakerRes.data) updateLoading(false);
    }
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const putEvent = async (payload: Event): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.put("event", payload);
    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));

      const speakerRes = await putSpeaker(payload.speakers as any);
      if (speakerRes) updateLoading(false);
    }

    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postSpeaker = async (payload: any): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.post("event/speaker", payload[0]);
    if (res.data) updateLoading(false);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const putSpeaker = async (payload: any): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.put("event/speaker", payload[0]);
    if (res.data) updateLoading(false);

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
      updateLoading(true);
      const res = await instance.get(`event/${slug}`);
      if (res.data) updateLoading(false);
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
      updateLoading(true);
      const res = await instance.get("users", { params: { slug } });
      if (res.data) updateLoading(false);
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
  try {
    updateLoading(true);
    const res = await instance.post(`/upload?slug=${slug}`, payload, {
      headers: {
        "accept": "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data;`,
        "X-Access-Token": (import.meta as any).env.VITE_TOKEN,
      },
    });
    if (res.data) updateLoading(false);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
