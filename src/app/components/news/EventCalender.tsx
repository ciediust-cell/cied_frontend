import { useMemo, useState } from "react";
import type { NewsItem } from "src/pages/NewsEventsPage";

const STATIC_TODAY = new Date("December 10, 2025");

interface EventCalendarProps {
  events: NewsItem[];
  onEventClick: (event: NewsItem) => void;
}

export function EventCalendar({ events, onEventClick }: EventCalendarProps) {
  const today = STATIC_TODAY;
  const [currentMonth, setCurrentMonth] = useState(today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const eventMap = useMemo(() => {
    const map: Record<number, NewsItem[]> = {};
    events.forEach((event) => {
      const d = new Date(event.date);
      if (d.getMonth() === month && d.getFullYear() === year) {
        const day = d.getDate();
        map[day] = map[day] ? [...map[day], event] : [event];
      }
    });
    return map;
  }, [events, month, year]);

  const goPrev = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goNext = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={goPrev} className="text-sm text-primary">
            ← Prev
          </button>

          <h3 className="text-xl font-semibold text-primary">
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <button onClick={goNext} className="text-sm text-primary">
            Next →
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm">
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
                className={`border rounded-lg p-2 min-h-[70px] hover:bg-primary/5 ${
                  isToday ? "border-primary" : ""
                }`}
              >
                <div className="text-sm font-medium">{day}</div>

                {eventMap[day]?.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => onEventClick(event)}
                    className="mt-1 cursor-pointer text-xs bg-primary/10 text-primary rounded px-1 py-0.5 truncate"
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
