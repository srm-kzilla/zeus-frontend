import { Event, User } from "../types/global";
import axios, { AxiosInstance } from "axios";
import { updateLoading } from "./toggleLoading";
import makeToast from "./createToast";
import { updateAuth } from "./authStore";

const instance: AxiosInstance = axios.create({
  baseURL: (import.meta as any).env.VITE_BASE_URL,
  headers: {
    "X-Access-Token": localStorage.getItem("token")!,
  },
});

export const fetchEvents = async (): Promise<Event[] | unknown> => {
  try {
    updateLoading(true);
    const res = await instance.get("events");
    if (res) updateLoading(false);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const postEvent = async (payload: Event): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.post("event", payload);

    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));
      const speakerRes = await postSpeaker(payload.speakers as any);
      if (speakerRes) updateLoading(false);
    }
    console.log(res);

    return res.data;
  } catch (err) {
    console.log(err);
    makeToast("Error in Adding Event", { type: "danger" });
    updateLoading(false);
    return err;
  }
};

export const putEvent = async (payload: Event): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.put("event", payload);

    if (res.status == 200)
      makeToast("Successfully Updated Event", { type: "success" });

    if (res.data) {
      payload.speakers.forEach((speaker) => (speaker.slug = payload.slug));
      const toUpdateSpeaker = payload.speakers.filter((speaker) => speaker._id);
      const newSpeakers = payload.speakers.filter((speaker) => !speaker._id);

      if (toUpdateSpeaker.length > 0) {
        const speakerRes = await putSpeaker(toUpdateSpeaker as any);
        if (speakerRes) updateLoading(false);
      }
      if (newSpeakers.length > 0) {
        const speakerRes = await postSpeaker(newSpeakers as any);
        if (speakerRes) updateLoading(false);
      }
    }

    return res.data;
  } catch (err) {
    console.log(err);
    makeToast("Error in Updating Event", { type: "danger" });
    updateLoading(false);
    return err;
  }
};

export const postSpeaker = async (payload: any): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.post("event/speaker", payload[0]);
    if (res) updateLoading(false);

    if (res.status == 200)
      makeToast("Successfully Added Speaker", { type: "success" });
    return res;
  } catch (err) {
    console.log(err);
    makeToast("Error in Adding Speaker", { type: "danger" });
    updateLoading(false);
    return err;
  }
};

export const putSpeaker = async (payload: any): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.put("event/speaker", payload[0]);
    if (res) updateLoading(false);

    if (res.status == 200)
      makeToast("Successfully Updated Speaker", { type: "success" });

    return res;
  } catch (err) {
    console.log(err);
    makeToast("Error in Updating Speaker", { type: "danger" });
    updateLoading(false);
    return err;
  }
};

export const fetchSingleEvent = async (
  slug: string,
): Promise<Event[] | unknown> => {
  try {
    if (slug) {
      updateLoading(true);
      const res = await instance.get(`event/${slug}`);
      if (res) updateLoading(false);
      return res.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    makeToast("Error in Getting Event Details", { type: "danger" });
    updateLoading(false);
    return err;
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
  } catch (err: any) {
    makeToast("Error in Getting users", { type: "danger" });
    updateLoading(false);
    return err;
  }
};

export const sendMails = async (payload: string[]): Promise<any> => {
  try {
    console.log("email to", payload);
  } catch (err) {
    console.log(err);
    makeToast("Error in Sending mails", { type: "danger" });
    updateLoading(false);
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
        "X-Access-Token": localStorage.getItem("token")!,
      },
    });
    if (res.data) updateLoading(false);

    if (res.status == 200)
      makeToast("Successfully Uploaded Image", { type: "success" });

    return res.data;
  } catch (err) {
    console.log(err);
    makeToast("Error in Uploading image", { type: "danger" });
    updateLoading(false);
  }
};

export const login = async (payload: string[]): Promise<any> => {
  try {
    updateLoading(true);
    const res = await instance.post("admin/login", payload);
    console.log("login", res);
    if (res.data.token) {
      updateLoading(false);
      localStorage.setItem("token", res.data.token);
      updateAuth(true);
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
    makeToast("Error in Logging in", { type: "danger" });
    updateLoading(false);
  }
};
