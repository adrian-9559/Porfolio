"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { Input, TextArea } from "@heroui/react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  taskService,
  type Task,
  type TaskList,
  type TaskComment,
  type TaskStatus,
} from "../../../services/taskService";
import {
  tricountService,
  type TricountGroup,
  type TricountMember,
} from "../../../services/tricountService";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_LABELS: Record<TaskStatus, string> = {
  pending: "Pendiente",
  in_progress: "En progreso",
  done: "Completado",
};

const STATUS_COLORS: Record<TaskStatus, string> = {
  pending: "border-t-blue-500 bg-blue-50/40 dark:bg-blue-950/10",
  in_progress: "border-t-amber-500 bg-amber-50/40 dark:bg-amber-950/10",
  done: "border-t-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/10",
};

const STATUS_HEADER: Record<TaskStatus, string> = {
  pending: "text-blue-700 dark:text-blue-400",
  in_progress: "text-amber-700 dark:text-amber-400",
  done: "text-emerald-700 dark:text-emerald-400",
};

const PRIORITY_BADGE: Record<string, string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  urgent: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const PRIORITY_LABEL: Record<string, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  urgent: "Urgente",
};

const VALID_STATUSES: TaskStatus[] = ["pending", "in_progress", "done"];

function fmtDate(dateStr: string | null): string {
  if (!dateStr) return "";
  try {
    return format(parseISO(dateStr), "d MMM", { locale: es });
  } catch {
    return dateStr;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function UserTasksSection() {
  const [groups, setGroups] = useState<TricountGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [personalMode, setPersonalMode] = useState(false);
  const [lists, setLists] = useState<TaskList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [members, setMembers] = useState<TricountMember[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [personalTasks, setPersonalTasks] = useState<Task[]>([]);

  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingLists, setLoadingLists] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [loadingPersonal, setLoadingPersonal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [comments, setComments] = useState<TaskComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "list" | "task";
    id: string;
  } | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAssignedTo, setFormAssignedTo] = useState("");
  const [formPriority, setFormPriority] = useState("medium");
  const [formDueDate, setFormDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId) ?? null;

  const tasksByStatus = (status: TaskStatus) =>
    [...tasks]
      .filter((t) => t.status === status)
      .sort((a, b) => a.sort_order - b.sort_order);

  // ── Data fetching ─────────────────────────────────────────────────────────

  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    setError(null);
    try {
      const data = await tricountService.listGroups();
      setGroups(data);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar grupos");
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const loadGroupData = useCallback(
    async (groupId: string) => {
      setLoadingLists(true);
      try {
        const [listsData, membersData] = await Promise.all([
          taskService.listLists(groupId),
          tricountService.listMembers(groupId),
        ]);
        setLists(listsData);
        setMembers(membersData);
        if (listsData.length > 0) {
          setSelectedListId(listsData[0].id);
        } else {
          setSelectedListId(null);
          setTasks([]);
        }
      } catch (err: any) {
        setError(err?.message ?? "Error al cargar datos del grupo");
      } finally {
        setLoadingLists(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (selectedGroupId) {
      loadGroupData(selectedGroupId);
    }
  }, [selectedGroupId, loadGroupData]);

  const fetchTasks = useCallback(async (listId: string) => {
    setLoadingTasks(true);
    try {
      const data = await taskService.listTasks(listId);
      setTasks(data);
    } catch (err: any) {
      setError(err?.message ?? "Error al cargar tareas");
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  useEffect(() => {
    if (selectedListId) {
      fetchTasks(selectedListId);
    }
  }, [selectedListId, fetchTasks]);

  const fetchPersonalTasks = useCallback(async () => {
    setLoadingPersonal(true);
    try {
      const data = await taskService.listPersonalTasks();
      setPersonalTasks(data);
    } catch {
      // ignore
    } finally {
      setLoadingPersonal(false);
    }
  }, []);

  // ── Create group ─────────────────────────────────────────────────────────

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    setSubmitting(true);
    try {
      const group = await tricountService.createGroup(newGroupName.trim());
      setNewGroupName("");
      setShowNewGroup(false);
      const data = await tricountService.listGroups();
      setGroups(data);
      setSelectedGroupId(group.id);
    } catch (err: any) {
      setError(err?.message ?? "Error al crear grupo");
    } finally {
      setSubmitting(false);
    }
  };

  const enterPersonalMode = () => {
    setPersonalMode(true);
    setSelectedGroupId(null);
    setSelectedListId(null);
    setTasks([]);
    setExpandedTaskId(null);
    fetchPersonalTasks();
  };

  const enterGroupMode = (groupId: string) => {
    setPersonalMode(false);
    setSelectedGroupId(groupId);
  };

  // ── Drag & drop ───────────────────────────────────────────────────────────

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    if (sourceStatus === destStatus && source.index === destination.index) return;

    if (sourceStatus === destStatus) {
      const column = tasksByStatus(sourceStatus);
      const reordered = [...column];
      const [moved] = reordered.splice(source.index, 1);
      reordered.splice(destination.index, 0, moved);
      const newOrder = reordered.map((t) => t.id);

      setTasks((prev) => {
        const others = prev.filter((t) => t.status !== sourceStatus);
        return [
          ...others,
          ...reordered.map((t, i) => ({ ...t, sort_order: i })),
        ];
      });

      try {
        await taskService.reorderTasks(selectedListId!, newOrder);
      } catch {
        fetchTasks(selectedListId!);
      }
      return;
    }

    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggableId ? { ...t, status: destStatus } : t,
      ),
    );

    try {
      await taskService.updateTask(draggableId, { status: destStatus });
    } catch {
      fetchTasks(selectedListId!);
    }
  };

  // ── List operations ───────────────────────────────────────────────────────

  const handleCreateList = async () => {
    if (!newListName.trim() || !selectedGroupId) return;
    setSubmitting(true);
    try {
      await taskService.createList(selectedGroupId, newListName.trim());
      setNewListName("");
      setShowNewList(false);
      await loadGroupData(selectedGroupId);
    } catch (err: any) {
      setError(err?.message ?? "Error al crear lista");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteList = (listId: string) => {
    setConfirmDelete({ type: "list", id: listId });
  };

  // ── Task operations ───────────────────────────────────────────────────────

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setFormAssignedTo("");
    setFormPriority("medium");
    setFormDueDate("");
    setEditingTask(null);
  };

  const openNewTask = () => {
    resetForm();
    setShowTaskModal(true);
  };

  const openEditTask = (task: Task) => {
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormAssignedTo(task.assigned_to ?? "");
    setFormPriority(task.priority);
    setFormDueDate(task.due_date ?? "");
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async () => {
    if (!formTitle.trim()) return;
    if (!selectedListId && !personalMode) return;
    setSubmitting(true);
    try {
      const payload = {
        title: formTitle.trim(),
        description: formDescription,
        assigned_to: formAssignedTo || null,
        priority: formPriority,
        due_date: formDueDate || null,
      };

      if (editingTask) {
        await taskService.updateTask(editingTask.id, payload);
      } else if (personalMode) {
        await taskService.createPersonalTask({
          title: formTitle.trim(),
          description: formDescription,
          priority: formPriority as "low" | "medium" | "high" | "urgent",
          due_date: formDueDate || null,
        });
      } else {
        await taskService.createTask(selectedListId!, payload);
      }

      setShowTaskModal(false);
      resetForm();
      if (personalMode) {
        await fetchPersonalTasks();
      } else {
        await fetchTasks(selectedListId!);
      }
    } catch (err: any) {
      setError(err?.message ?? "Error al guardar tarea");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setConfirmDelete({ type: "task", id: taskId });
  };

  const confirmDeleteTask = async () => {
    if (!confirmDelete) return;
    const { id, type } = confirmDelete;
    setConfirmDelete(null);
    if (type === "list") {
      try {
        await taskService.deleteList(id);
        if (selectedListId === id) {
          setSelectedListId(null);
          setTasks([]);
        }
        await loadGroupData(selectedGroupId!);
      } catch {
        // ignore
      }
    } else {
      try {
        await taskService.deleteTask(id);
        setExpandedTaskId((prev) => (prev === id ? null : prev));
        if (personalMode) {
          await fetchPersonalTasks();
        } else {
          await fetchTasks(selectedListId!);
        }
      } catch {
        // ignore
      }
    }
  };

  // ── Status / inline helpers ───────────────────────────────────────────────

  const handleStatusChange = async (
    taskId: string,
    newStatus: TaskStatus,
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    try {
      await taskService.updateTask(taskId, { status: newStatus });
    } catch {
      fetchTasks(selectedListId!);
    }
  };

  // ── Comments ──────────────────────────────────────────────────────────────

  const openTaskDetail = async (taskId: string) => {
    setExpandedTaskId(taskId);
    setLoadingComments(true);
    try {
      const data = await taskService.listComments(taskId);
      setComments(data);
    } catch {
      setComments([]);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !expandedTaskId) return;
    try {
      await taskService.addComment(expandedTaskId, newComment.trim());
      setNewComment("");
      const data = await taskService.listComments(expandedTaskId);
      setComments(data);
    } catch {
      // ignore
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* ── Group selector ──────────────────────────────────────────────── */}
      {!selectedGroupId && !personalMode && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
              Tareas
            </h2>
            <button
              onClick={() => setShowNewGroup(true)}
              className="apple-btn-primary text-sm py-1.5 px-3"
            >
              + Grupo
            </button>
          </div>

          {/* Create group form */}
          {showNewGroup && (
            <div className="mb-4 flex gap-2 items-center">
              <Input
                placeholder="Nombre del grupo"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="max-w-xs"
                disabled={submitting}
              />
              <button
                onClick={handleCreateGroup}
                disabled={submitting || !newGroupName.trim()}
                className="apple-btn-primary text-sm py-1.5 px-3"
              >
                Crear
              </button>
              <button
                onClick={() => {
                  setShowNewGroup(false);
                  setNewGroupName("");
                }}
                className="apple-btn-secondary text-sm py-1.5 px-3"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Personal tasks card */}
          <div className="mb-4">
            <button
              onClick={enterPersonalMode}
              className="w-full p-5 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-left hover:border-purple-400 dark:hover:border-purple-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 20 20" width="20">
                    <path d="M10 3v14M3 10h14" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-[#1d1d1f] dark:text-white">
                    Tareas personales
                  </div>
                  <div className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    Tareas solo para ti, sin grupo
                  </div>
                </div>
              </div>
            </button>
          </div>

          {loadingGroups ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <p className="text-red-500 mb-3">{error}</p>
              <button
                onClick={fetchGroups}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Reintentar
              </button>
            </div>
          ) : groups.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b] mb-3">
                No tienes grupos. Crea un grupo en Gastos compartidos para
                empezar.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroupId(g.id)}
                  className="p-5 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-left hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="font-semibold text-[#1d1d1f] dark:text-white mb-1">
                    {g.name}
                  </div>
                  <div className="text-xs text-[#6e6e73] dark:text-[#86868b]">
                    {g.member_count ?? 0} miembros
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Personal tasks view ────────────────────────────────────────────── */}
      {personalMode && (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setPersonalMode(false);
                  setExpandedTaskId(null);
                }}
                className="text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M19 12H5m7-7l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                Tareas personales
              </h2>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowTaskModal(true);
              }}
              className="apple-btn-primary text-sm py-1.5 px-3"
            >
              + Tarea
            </button>
          </div>

          {loadingPersonal ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse" />
              ))}
            </div>
          ) : personalTasks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b] mb-3">
                No tienes tareas personales.
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowTaskModal(true);
                }}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Crear primera tarea
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {personalTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    if (expandedTaskId === task.id) {
                      setExpandedTaskId(null);
                    } else {
                      openTaskDetail(task.id);
                    }
                  }}
                  className="w-full p-4 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 text-left hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[#1d1d1f] dark:text-white">
                        {task.title}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority]}`}>
                          {PRIORITY_LABEL[task.priority]}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] rounded border border-black/10 dark:border-white/10 bg-transparent px-1.5 py-0.5 text-[#1d1d1f] dark:text-white"
                      >
                        {VALID_STATUSES.map((s) => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id);
                        }}
                        className="text-[#6e6e73] hover:text-red-500 text-sm px-1.5 py-1"
                      >
                        <svg fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 14 14" width="14">
                          <path d="M2 3.5h10M5 3.5V2a1 1 0 011-1h2a1 1 0 011 1v1.5M11 3.5v8a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 013 11.5v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Board view ──────────────────────────────────────────────────────── */}
      {selectedGroupId && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedGroupId(null);
                  setSelectedListId(null);
                  setTasks([]);
                  setExpandedTaskId(null);
                }}
                className="text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-5 h-5"
                >
                  <path
                    d="M19 12H5m7-7l-7 7 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                {selectedGroup?.name}
              </h2>
            </div>

            <div className="flex gap-2 items-center">
              {lists.length > 0 && (
                <select
                  value={selectedListId ?? ""}
                  onChange={(e) => {
                    setSelectedListId(e.target.value || null);
                    setExpandedTaskId(null);
                  }}
                  className="text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-3 py-1.5 text-[#1d1d1f] dark:text-white"
                >
                  {lists.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={() => setShowNewList(true)}
                className="apple-btn-secondary text-sm py-1.5 px-3"
              >
                + Lista
              </button>
              <button
                onClick={openNewTask}
                className="apple-btn-primary text-sm py-1.5 px-3"
                disabled={!selectedListId}
              >
                + Tarea
              </button>
            </div>
          </div>

          {/* New list inline form */}
          {showNewList && (
            <div className="mb-4 flex gap-2 items-center">
              <Input
                placeholder="Nombre de la lista"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="max-w-xs"
                disabled={submitting}
              />
              <button
                onClick={handleCreateList}
                disabled={submitting || !newListName.trim()}
                className="apple-btn-primary text-sm py-1.5 px-3"
              >
                Crear
              </button>
              <button
                onClick={() => {
                  setShowNewList(false);
                  setNewListName("");
                }}
                className="apple-btn-secondary text-sm py-1.5 px-3"
              >
                Cancelar
              </button>
            </div>
          )}

          {/* Loading lists */}
          {loadingLists && (
            <div className="flex gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-64 rounded-xl bg-gray-100 dark:bg-[#1a1a1f] animate-pulse"
                />
              ))}
            </div>
          )}

          {/* Empty lists */}
          {!loadingLists && lists.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-[#6e6e73] dark:text-[#86868b] mb-3">
                No hay listas de tareas en este grupo.
              </p>
              <button
                onClick={() => setShowNewList(true)}
                className="apple-btn-primary text-sm py-2 px-4"
              >
                Crear primera lista
              </button>
            </div>
          )}

          {/* ── Kanban Board ──────────────────────────────────────────────── */}
          {!loadingLists && lists.length > 0 && selectedListId && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div
                className="flex gap-4 overflow-x-auto pb-4"
                style={{ minHeight: 400 }}
              >
                {VALID_STATUSES.map((status) => {
                  const columnTasks = tasksByStatus(status);
                  return (
                    <div key={status} className="flex-1 min-w-[260px]">
                      <div className="mb-3 flex items-center justify-between px-1">
                        <span
                          className={`text-sm font-semibold ${STATUS_HEADER[status]}`}
                        >
                          {STATUS_LABELS[status]}
                          <span className="ml-2 text-xs font-normal text-[#6e6e73]">
                            {columnTasks.length}
                          </span>
                        </span>
                        {status === "pending" && (
                          <button
                            onClick={openNewTask}
                            className="text-[#6e6e73] hover:text-[#1d1d1f] dark:hover:text-white"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="w-4 h-4"
                            >
                              <path
                                d="M12 5v14m-7-7h14"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      <Droppable droppableId={status}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`rounded-xl border-t-4 p-2 space-y-2 transition-colors ${STATUS_COLORS[status]} ${snapshot.isDraggingOver ? "ring-2 ring-blue-400/50" : ""}`}
                            style={{ minHeight: 120 }}
                          >
                            {loadingTasks ? (
                              <>
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="h-20 rounded-lg bg-white/60 dark:bg-[#1a1a1f]/60 animate-pulse"
                                  />
                                ))}
                              </>
                            ) : (
                              columnTasks.map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      onClick={() => {
                                        if (expandedTaskId === task.id) {
                                          setExpandedTaskId(null);
                                        } else {
                                          openTaskDetail(task.id);
                                        }
                                      }}
                                      className={`p-3 rounded-lg bg-white dark:bg-[#16161a] border border-black/6 dark:border-white/6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 transition-colors ${snapshot.isDragging ? "shadow-lg rotate-2" : "shadow-sm"}`}
                                    >
                                      <div className="flex items-start justify-between gap-2 mb-2">
                                        <span className="text-sm font-medium text-[#1d1d1f] dark:text-white leading-snug">
                                          {task.title}
                                        </span>
                                        <span
                                          className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority]}`}
                                        >
                                          {PRIORITY_LABEL[task.priority]}
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-3 text-[11px] text-[#6e6e73] dark:text-[#86868b]">
                                        {task.assigned_member && (
                                          <span className="flex items-center gap-1">
                                            <svg
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              className="w-3 h-3"
                                            >
                                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                              <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {task.assigned_member.name}
                                          </span>
                                        )}
                                        {task.due_date && (
                                          <span className="flex items-center gap-1">
                                            <svg
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="currentColor"
                                              strokeWidth={2}
                                              className="w-3 h-3"
                                            >
                                              <rect
                                                x="3"
                                                y="4"
                                                width="18"
                                                height="18"
                                                rx="2"
                                              />
                                              <path d="M16 2v4M8 2v4M3 10h18" />
                                            </svg>
                                            {fmtDate(task.due_date)}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          )}

          {/* ── Task Detail Panel ────────────────────────────────────────────── */}
          {expandedTaskId && (
            <div className="mt-6 p-5 rounded-xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
              {(() => {
                const task = tasks.find((t) => t.id === expandedTaskId);
                if (!task) return null;
                return (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                          {task.title}
                        </h3>
                        <div className="flex gap-2 mt-1">
                          <span
                            className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${PRIORITY_BADGE[task.priority]}`}
                          >
                            {PRIORITY_LABEL[task.priority]}
                          </span>
                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleStatusChange(
                                task.id,
                                e.target.value as TaskStatus,
                              )
                            }
                            className="text-[11px] rounded border border-black/10 dark:border-white/10 bg-transparent px-1.5 py-0.5 text-[#1d1d1f] dark:text-white"
                          >
                            {VALID_STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditTask(task)}
                          className="text-[#6e6e73] hover:text-blue-500 text-sm px-2 py-1"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-[#6e6e73] hover:text-red-500 text-sm px-2 py-1"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mb-4 whitespace-pre-wrap">
                        {task.description}
                      </p>
                    )}

                    <div className="flex gap-4 text-xs text-[#6e6e73] dark:text-[#86868b] mb-4">
                      {task.assigned_member && (
                        <span>
                          Asignado a:{" "}
                          <strong className="text-[#1d1d1f] dark:text-white">
                            {task.assigned_member.name}
                          </strong>
                        </span>
                      )}
                      {task.due_date && (
                        <span>
                          Vence:{" "}
                          <strong className="text-[#1d1d1f] dark:text-white">
                            {fmtDate(task.due_date)}
                          </strong>
                        </span>
                      )}
                    </div>

                    {/* Comments */}
                    <div className="border-t border-black/8 dark:border-white/8 pt-4">
                      <h4 className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-3">
                        Comentarios
                      </h4>

                      {loadingComments ? (
                        <div className="space-y-2">
                          {[1, 2].map((i) => (
                            <div
                              key={i}
                              className="h-12 rounded-lg bg-gray-100 dark:bg-[#1a1a1f] animate-pulse"
                            />
                          ))}
                        </div>
                      ) : comments.length === 0 ? (
                        <p className="text-xs text-[#6e6e73] dark:text-[#86868b] mb-3">
                          Sin comentarios
                        </p>
                      ) : (
                        <div className="space-y-3 mb-3">
                          {comments.map((c) => (
                            <div
                              key={c.id}
                              className="text-sm bg-gray-50 dark:bg-[#1a1a1f] rounded-lg p-3"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-[#1d1d1f] dark:text-white text-xs">
                                  {c.author?.full_name ?? "Usuario"}
                                </span>
                                <span className="text-[10px] text-[#6e6e73]">
                                  {fmtDate(c.created_at)}
                                </span>
                              </div>
                              <p className="text-[#6e6e73] dark:text-[#86868b] text-xs">
                                {c.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <TextArea
                          placeholder="Añadir comentario..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="flex-1 min-h-[0px]"
                          rows={2}
                        />
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="apple-btn-primary text-sm py-1 px-3 self-end"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* ── Task Modal ──────────────────────────────────────────────────── */}
          {showTaskModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-[#111116] rounded-2xl p-6 w-full max-w-lg mx-4 border border-black/8 dark:border-white/8">
                <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white mb-4">
                  {editingTask ? "Editar tarea" : "Nueva tarea"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                      Título *
                    </label>
                    <Input
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Título de la tarea"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                      Descripción
                    </label>
                    <TextArea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Descripción (opcional)"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                        Asignado a
                      </label>
                      <select
                        value={formAssignedTo}
                        onChange={(e) => setFormAssignedTo(e.target.value)}
                        className="w-full text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-3 py-2 text-[#1d1d1f] dark:text-white"
                      >
                        <option value="">Sin asignar</option>
                        {members.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                        Prioridad
                      </label>
                      <select
                        value={formPriority}
                        onChange={(e) => setFormPriority(e.target.value)}
                        className="w-full text-sm rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1f] px-3 py-2 text-[#1d1d1f] dark:text-white"
                      >
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                        <option value="urgent">Urgente</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider block mb-1">
                      Fecha de vencimiento
                    </label>
                    <Input
                      type="date"
                      value={formDueDate}
                      onChange={(e) => setFormDueDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowTaskModal(false);
                      resetForm();
                    }}
                    className="apple-btn-secondary text-sm py-2 px-4"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveTask}
                    disabled={submitting || !formTitle.trim()}
                    className="apple-btn-primary text-sm py-2 px-4"
                  >
                    {submitting
                      ? "Guardando..."
                      : editingTask
                        ? "Guardar cambios"
                        : "Crear tarea"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirm delete dialog */}
          {confirmDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-[#1a1a1f] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
                <p className="text-sm font-medium text-[#1d1d1f] dark:text-white mb-4">
                  {confirmDelete.type === "list"
                    ? "Eliminar esta lista y todas sus tareas?"
                    : "Eliminar esta tarea?"}
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="apple-btn-secondary text-sm py-2 px-4"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDeleteTask}
                    className="apple-btn-primary text-sm py-2 px-4 !bg-red-500 hover:!bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
