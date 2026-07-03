"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input, TextArea } from "@heroui/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  calendarService,
  type UserEvent,
  type CreateEventInput,
} from "../../../services/calendarService";

// ── Constants ─────────────────────────────────────────────────────────────────

const DAY_HEADERS = ["Lun", "Mar", "Mi\u00E9", "Jue", "Vie", "S\u00E1b", "Dom"];

const EVENT_COLORS: Record<string, string> = {
  "#3b82f6": "bg-blue-500",
  "#ef4444": "bg-red-500",
  "#10b981": "bg-emerald-500",
  "#f59e0b": "bg-amber-500",
  "#8b5cf6": "bg-violet-500",
  "#ec4899": "bg-pink-500",
  "#06b6d4": "bg-cyan-500",
  "#6366f1": "bg-indigo-500",
};

const COLOR_OPTIONS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#6366f1",
];

// ── Component ─────────────────────────────────────────────────────────────────

export function UserCalendarSection() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UserEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formColor, setFormColor] = useState("#3b82f6");

  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // ── Month helpers ─────────────────────────────────────────────────────────

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = useMemo(
    () => eachDayOfInterval({ start: calStart, end: calEnd }),
    [calStart, calEnd],
  );

  const monthLabel = format(currentMonth, "MMMM yyyy", { locale: es });

  const dateFrom = format(calStart, "yyyy-MM-dd");
  const dateTo = format(calEnd, "yyyy-MM-dd");

  // ── Data fetching ─────────────────────────────────────────────────────────

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await calendarService.listEvents(dateFrom, dateTo);
      setEvents(data);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar eventos");
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const prevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const nextMonth = () => setCurrentMonth((m) => addMonths(m, 1));
  const goToday = () => setCurrentMonth(today);

  // ── Events for a specific day ─────────────────────────────────────────────

  const eventsForDay = (day: Date): UserEvent[] =>
    events.filter(
      (e) =>
        isSameDay(parseISO(e.event_date), day) ||
        (e.end_date &&
          day >= parseISO(e.event_date) &&
          day <= parseISO(e.end_date)),
    );

  // ── Form helpers ──────────────────────────────────────────────────────────

  const openCreate = (dateStr: string) => {
    setEditingEvent(null);
    setSelectedDate(dateStr);
    setFormTitle("");
    setFormDesc("");
    setFormDate(dateStr);
    setFormEndDate("");
    setFormTime("");
    setFormColor("#3b82f6");
    setShowModal(true);
  };

  const openEdit = (event: UserEvent) => {
    setEditingEvent(event);
    setSelectedDate(null);
    setFormTitle(event.title);
    setFormDesc(event.description);
    setFormDate(event.event_date);
    setFormEndDate(event.end_date ?? "");
    setFormTime(event.event_time ?? "");
    setFormColor(event.color);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formTitle.trim() || !formDate) return;
    setSubmitting(true);
    try {
      const payload: CreateEventInput = {
        title: formTitle.trim(),
        description: formDesc,
        event_date: formDate,
        end_date: formEndDate || null,
        event_time: formTime || null,
        color: formColor,
      };
      if (editingEvent) {
        await calendarService.updateEvent(editingEvent.id, payload);
      } else {
        await calendarService.createEvent(payload);
      }
      setShowModal(false);
      setEditingEvent(null);
      await fetchEvents();
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar evento");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await calendarService.deleteEvent(confirmDelete);
      setConfirmDelete(null);
      await fetchEvents();
    } catch {
      // ignore
    }
  };

  // ── Render helpers ────────────────────────────────────────────────────────

  const renderEventsInCell = (day: Date) => {
    const dayEvents = eventsForDay(day);
    if (dayEvents.length === 0) return null;

    const visible = dayEvents.slice(0, 3);
    const remaining = dayEvents.length - 3;

    return (
      <div className="mt-0.5 space-y-0.5">
        {visible.map((e) => (
          <button
            key={e.id}
            onClick={(ev) => {
              ev.stopPropagation();
              openEdit(e);
            }}
            className={`w-full text-left text-[10px] leading-tight truncate rounded px-1 py-0.5 text-white ${
              EVENT_COLORS[e.color] ?? "bg-blue-500"
            }`}
          >
            {e.event_time && `${e.event_time} `}
            {e.title}
          </button>
        ))}
        {remaining > 0 && (
          <div className="text-[10px] text-[#6e6e73] dark:text-[#86868b] px-1">
            +{remaining} m\u00E1s
          </div>
        )}
      </div>
    );
  };

  // ── Loading / Error ───────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-5 h-5 rounded-full border-2 border-blue-600/30 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-3">{error}</p>
        <button onClick={fetchEvents} className="apple-btn-primary text-sm py-2 px-4">
          Reintentar
        </button>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Calendario
        </h2>
      </div>

      {/* ── Navigation ────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          >
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 16 16" width="16">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>
          <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white min-w-[180px] text-center capitalize">
            {monthLabel}
          </h3>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          >
            <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 16 16" width="16">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>
        <button
          onClick={goToday}
          className="apple-btn-secondary text-sm py-1.5 px-3"
        >
          Hoy
        </button>
      </div>

      {/* ── Day headers ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* ── Calendar grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-7 border-t border-l border-black/8 dark:border-white/8 rounded-2xl overflow-hidden bg-white dark:bg-[#111116]">
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentMonth);
          const dayEvents = eventsForDay(day);
          const dateStr = format(day, "yyyy-MM-dd");

          return (
            <button
              key={dateStr}
              onClick={() => openCreate(dateStr)}
              className={`min-h-[100px] p-1.5 border-r border-b border-black/8 dark:border-white/8 text-left transition-colors ${
                inMonth
                  ? "bg-white dark:bg-[#111116]"
                  : "bg-gray-50/50 dark:bg-[#0d0d11]"
              } hover:bg-blue-50/40 dark:hover:bg-blue-950/10`}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  isToday(day)
                    ? "bg-blue-600 text-white"
                    : inMonth
                      ? "text-[#1d1d1f] dark:text-white"
                      : "text-[#aeaeb2] dark:text-[#636366]"
                }`}
              >
                {format(day, "d")}
              </span>
              {renderEventsInCell(day)}
            </button>
          );
        })}
      </div>

      {/* ── Event legend ──────────────────────────────────────────────────── */}
      {events.length > 0 && (
        <div className="mt-4 text-xs text-[#6e6e73] dark:text-[#86868b] text-center">
          {events.length} evento{events.length !== 1 ? "s" : ""} este mes
        </div>
      )}

      {/* ── Create/Edit Modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-md mx-4 shadow-2xl w-full">
            <h3 className="text-lg font-semibold text-[#1d1d1f] dark:text-white mb-4">
              {editingEvent ? "Editar evento" : "Nuevo evento"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  T\u00EDtulo
                </label>
                <Input
                  placeholder="Ej: Reuni\u00F3n equipo"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Descripci\u00F3n
                </label>
                <TextArea
                  placeholder="A\u00F1adir detalles..."
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={2}
                  disabled={submitting}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                    Fecha
                  </label>
                  <Input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    disabled={submitting}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                    Hora
                  </label>
                  <Input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    disabled={submitting}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Fecha fin (opcional)
                </label>
                <Input
                  type="date"
                  value={formEndDate}
                  onChange={(e) => setFormEndDate(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#aeaeb2] dark:text-[#636366] mb-1">
                  Color
                </label>
                <div className="flex gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setFormColor(c)}
                      className={`w-7 h-7 rounded-full transition-all ${
                        formColor === c
                          ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#1a1a1f] ring-[#1d1d1f] dark:ring-white"
                          : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingEvent(null);
                }}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              {editingEvent && (
                <button
                  onClick={() => {
                    setShowModal(false);
                    setConfirmDelete(editingEvent.id);
                  }}
                  className="apple-btn-secondary text-sm py-2 px-4 !text-red-500"
                >
                  Eliminar
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={submitting || !formTitle.trim() || !formDate}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                {submitting
                  ? "Guardando..."
                  : editingEvent
                    ? "Guardar cambios"
                    : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm delete ────────────────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
            <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
              Eliminar este evento?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="apple-btn-secondary text-sm py-2 px-4"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="apple-btn-primary text-sm py-2 px-4 !bg-red-500 hover:!bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
