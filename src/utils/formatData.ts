import { Event } from "../types/global";

export default function formatData(data: Event) {
  const timeline: any[] = [];
  const speaker: any[] = [];
  const prizes: any[] = [];
  for (const [key, value] of Object.entries(data)) {
    //fix timeline
    if (key.includes("timeline")) {
      const currKey = key.split("_")[1];
      const currIdx: number = parseInt(key.split("_")[2]);

      if (timeline[currIdx - 1] == undefined) timeline[currIdx - 1] = {};
      timeline[currIdx - 1][currKey] = value;

      delete (data as any)[key];
    }

    //fix speaker info
    if (key.includes("speaker")) {
      const currKey = key.split("_")[1];
      const currIdx: number = parseInt(key.split("_")[2]);

      if (speaker[currIdx - 1] == undefined) speaker[currIdx - 1] = {};
      speaker[currIdx - 1][currKey] = value;

      delete (data as any)[key];
    }

    //fix prizes
    if (key.includes("prizes")) {
      const currKey = key.split("_")[1];
      const currIdx: number = parseInt(key.split("_")[2]);

      if (prizes[currIdx - 1] == undefined) prizes[currIdx - 1] = {};
      prizes[currIdx - 1][currKey] = value;

      delete (data as any)[key];
    }

    data.timeline = timeline;
    data.speakers = speaker;
    data.prizes = prizes;
  }
  // delete (data as any).eventCoverUpload;
  data.slug = data.title.toLowerCase().replaceAll(" ", "_");
  return data;
}
