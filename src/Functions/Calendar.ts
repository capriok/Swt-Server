import { compareAsc, isBefore, isSameDay } from 'date-fns'
import { FindDocument } from '../Database/Queries'
import { ScheduleModel } from '../Models/Schedule'
import { ServerDate } from './Index'
import { WorkSchedules } from './Schedule'
import { TimezoneDate } from './Time'

interface CalendarDay {
  number: number
  events: Array<CalendarEvent>
  classNames: {
    number: string
    day: string
  }
}

interface CalendarEvent {
  _id?: string
  name: string
  timed: boolean
  date: string
  startTime: string
  endTime: string
}

export function SortByDate(arr: Array<any>) {
  return arr.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
}

export function FormatDates(arr: Array<any>) {
  return arr.map((x: any) => {
    x.date = TimezoneDate(x.date).toJSON()
    return x
  })
}

export function FilterBeforeCurrentMonth(events) {
  return events.filter((e) => {
    const eventDate = new Date(e.date).getTime()
    const lastDayofLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getTime()

    return eventDate > lastDayofLastMonth && e
  })
}

export async function GenerateCalendar(ces: Array<CalendarEvent>): Promise<Array<CalendarDay>> {
  const days: Array<CalendarDay> = new Array()
  const day = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const weekday = day.getDay()

  const scheduleConfig = await FindDocument(ScheduleModel, {}).then((res) => {
    return res[0]
  })
  const schedules = await WorkSchedules(scheduleConfig)

  const mayoPaydays: Array<CalendarEvent> = schedules.mayo
    .filter((pd) => pd.progress === 100)
    .map((pd) => {
      return {
        _id: '',
        name: 'Mayo Payday',
        timed: false,
        date: pd.date.toJSON(),
        startTime: '',
        endTime: '',
      }
    })
  const ingallsPaydays: Array<CalendarEvent> = schedules.ingalls
    .filter((pd) => pd.progress === 100)
    .map((pd) => {
      return {
        _id: '',
        name: 'Ingalls Payday',
        timed: false,
        date: pd.date.toJSON(),
        startTime: '',
        endTime: '',
      }
    })

  MapDays(day)

  function MapDays(day: Date, d = 0) {
    const isToday = isSameDay(day, ServerDate)
    const inPast = isBefore(day, ServerDate)

    d === 0 && weekday === 0
      ? day.setDate(day.getDate() - 7)
      : d === 0
      ? day.setDate(day.getDate() + (d - weekday))
      : day.setDate(day.getDate() + 1)

    let dayEvents = ces.filter((ce) => {
      return isSameDay(new Date(ce.date), day)
    })

    const mayoPayday = mayoPaydays.find((pd) => isSameDay(TimezoneDate(new Date(pd.date)), day))
    const ingallsPayday = ingallsPaydays.find((pd) => isSameDay(TimezoneDate(new Date(pd.date)), day))
    if (mayoPayday) dayEvents = [mayoPayday, ...dayEvents]
    if (ingallsPayday) dayEvents = [ingallsPayday, ...dayEvents]

    const numberClassName = `number${isToday ? ' today' : ''}`
    const dayClassName = `day${inPast && !isToday ? ' blur' : ''}`

    let calendarDay: CalendarDay = {
      number: day.getDate(),
      events: dayEvents,
      classNames: {
        number: numberClassName,
        day: dayClassName,
      },
    }
    days.push(calendarDay)

    d < 41 && MapDays(day, (d = d + 1))
  }

  return days
}
