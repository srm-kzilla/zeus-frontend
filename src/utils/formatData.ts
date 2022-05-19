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
      let moddedKey = key;
      if (key.includes("_id")) {
        moddedKey = key.replace("_", "");
      }

      let currKey = moddedKey.split("_")[1];
      if (currKey == "id") currKey = "_id";
      const currIdx: number = parseInt(moddedKey.split("_")[2]);

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

export function unFormatData(data: Event) {
  const timeline: any[] = data.timeline;
  const speaker: any[] = data.speakers;
  const prizes: any[] = data.prizes;

  const newData: any = data;

  timeline.forEach((event, id) => {
    Object.keys(event).map((key) => {
      newData[`timeline_${key}_${id + 1}`] = event[key];
    });
  });

  speaker.forEach((speaker, id) => {
    Object.keys(speaker).map((key) => {
      newData[`speaker_${key}_${id + 1}`] = speaker[key];
    });
  });

  prizes.forEach((prize, id) => {
    Object.keys(prize).map((key) => {
      newData[`prizes_${key}_${id + 1}`] = prize[key];
    });
  });
  return newData;
}
