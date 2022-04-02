import { Request, Response } from "express";
import { CalendarEventModel } from "../Models/Calendar";
import {
  FindDocument,
  CreateDocument,
  UpdateDocument,
  DeleteDocument,
} from "../Database/Queries";
import {
  GenerateCalendar,
  FilterBeforeCurrentMonth,
  FormatDates,
  SortByDate,
} from "../Functions/Calendar";

function EventsFilterFormatSort(events) {
  const filteredEvents = FilterBeforeCurrentMonth(events);
  const formattedDates = FormatDates(filteredEvents);
  const list = SortByDate(formattedDates);

  return list;
}

export const GetCalendarWithEvents = async (req: Request, res: Response) => {
  console.log("Request: Calendar With Events");

  const calendarEventList = await FindDocument(CalendarEventModel, {});
  const events = EventsFilterFormatSort(calendarEventList);
  const calendarWithEvents = GenerateCalendar(events);

  res.json({ calendar: calendarWithEvents });
};
export const GetCalendarEventList = async (req: Request, res: Response) => {
  console.log("Request: Calendar Event List");

  const calendarEventList = await FindDocument(CalendarEventModel, {});
  const events = EventsFilterFormatSort(calendarEventList);

  res.json({ list: events });
};
export const PostCalendarEvent = async (req: Request, res: Response) => {
  console.log("Request: Post Calendar Event");

  const { event } = req.body;
  console.log(event);
  const calendarEventList = await CreateDocument(CalendarEventModel, event);
  const events = EventsFilterFormatSort(calendarEventList);

  res.json({ list: events });
};
export const UpdateCalendarEvent = async (req: Request, res: Response) => {
  console.log("Request: Update Calendar Event");

  const { event } = req.body;
  console.log(event);
  const update = {
    name: event.name,
    timed: event.timed,
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
  };

  const calendarEventList = await UpdateDocument(
    CalendarEventModel,
    event.id,
    update
  );
  const events = EventsFilterFormatSort(calendarEventList);

  res.json({ list: events });
};
export const DeleteCalendarEvent = async (req: Request, res: Response) => {
  console.log("Request: Delete Calendar Event");

  const { id } = req.body;
  const calendarEventList = await DeleteDocument(CalendarEventModel, id);
  const events = EventsFilterFormatSort(calendarEventList);

  res.json({ list: events });
};
