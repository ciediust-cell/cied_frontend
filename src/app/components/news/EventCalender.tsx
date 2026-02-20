import { useEffect, useMemo, useState } from "react";
import type { NewsItem } from "src/types/news";

interface EventCalendarProps {
  events: NewsItem[];
  onEventClick: (event: NewsItem) => void;
}

const getEventDate = (event: NewsItem) => {
  const raw = event.eventDate ?? event.date;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getPriorityEventDate = (events: NewsItem[]) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const dates = events
    .map(getEventDate)
    .filter((date): date is Date => date !== null)
    .sort((a, b) => a.getTime() - b.getTime());

  if (dates.length === 0) {
    return now;
  }

  const upcoming = dates.find((date) => date.getTime() >= today.getTime());
  if (upcoming) {
    return upcoming;
  }

  return dates[dates.length - 1];
};

export function EventCalendar({ events, onEventClick }: EventCalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const seed = getPriorityEventDate(events);
    return new Date(seed.getFullYear(), seed.getMonth(), 1);
  });
  const [hasAutoFocusedMonth, setHasAutoFocusedMonth] = useState(false);

  useEffect(() => {
    if (events.length === 0 || hasAutoFocusedMonth) return;
    const target = getPriorityEventDate(events);
    setCurrentMonth(new Date(target.getFullYear(), target.getMonth(), 1));
    setHasAutoFocusedMonth(true);
  }, [events, hasAutoFocusedMonth]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const eventMap = useMemo(() => {
    const map: Record<number, NewsItem[]> = {};
    events.forEach((event) => {
      const eventDate = getEventDate(event);
      if (!eventDate) return;
      if (eventDate.getMonth() === month && eventDate.getFullYear() === year) {
        const day = eventDate.getDate();
        map[day] = map[day] ? [...map[day], event] : [event];
      }
    });
    return map;
  }, [events, month, year]);

  const goPrev = () => {
    setHasAutoFocusedMonth(true);
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goNext = () => {
    setHasAutoFocusedMonth(true);
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="bg-white rounded-xl border p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            onClick={goPrev}
            className="text-sm sm:text-base text-primary px-2 py-1"
          >
            Prev
          </button>

          <h3 className="text-lg sm:text-xl font-semibold text-primary text-center">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <button
            onClick={goNext}
            className="text-sm sm:text-base text-primary px-2 py-1"
          >
            Next
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-medium text-muted-foreground">
                {d}
              </div>
            ))}

            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <div
                  key={day}
                  className={`border rounded-lg p-1.5 sm:p-2 min-h-[56px] sm:min-h-[70px] hover:bg-primary/5 ${
                    isToday ? "border-primary" : ""
                  }`}
                >
                  <div className="text-xs sm:text-sm font-medium">{day}</div>

                  {eventMap[day]?.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="mt-1 cursor-pointer text-[10px] sm:text-xs bg-primary/10 text-primary rounded px-1 py-0.5 truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
