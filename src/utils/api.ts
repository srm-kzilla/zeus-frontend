import { Event, User } from "@/types/global";
import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: `http://localhost:2000/api`,
});

// export const instance: AxiosInstance = axios.create({
//   baseURL: `http://localhost:5000/`,
// });

export const fetchEvents = async (): Promise<Event[] | null> => {
  try {
    const res = await instance.get("events");
    return res.data;
  } catch (err) {
    return null;
  }
};

export const postEvent = async (payload: Event): Promise<Event | null> => {
  try {
    const res = await instance.post("event", payload);
    return res.data;
  } catch (err) {
    console.log("Error");
    return null;
  }
};

export const fetchSingleEvent = async (id: string): Promise<Event | null> => {
  try {
    if (id) {
      const res = await instance.get("event", { params: { id } });
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
    console.log("Error");
  }
};
