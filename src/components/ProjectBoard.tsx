import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import TaskCard from "./TaskCard";
import { DragDropContext, Droppable, Draggable } from "framer-motion";
import {
  Calendar,
  Clock,
  BarChart2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    name: string;
    avatar: string;
  };
  deadline: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "review" | "done";
}

interface ProjectBoardProps {
  projectId?: string;
  projectName?: string;
}

const ProjectBoard = ({
  projectId = "1",
  projectName = "Website Redesign",
}: ProjectBoardProps) => {
  const [view, setView] = useState<"kanban" | "gantt">("kanban");

  // Mock data for tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design Homepage",
      description: "Create wireframes and mockups for the new homepage",
      assignee: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      deadline: "2023-06-15",
      priority: "high",
      status: "todo",
    },
    {
      id: "2",
      title: "Implement Authentication",
      description: "Set up user authentication system with OAuth",
      assignee: {
        name: "Sam Taylor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      },
      deadline: "2023-06-20",
      priority: "medium",
      status: "in-progress",
    },
    {
      id: "3",
      title: "Database Schema Design",
      description: "Create database schema for the new features",
      assignee: {
        name: "Jamie Lee",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
      },
      deadline: "2023-06-10",
      priority: "high",
      status: "review",
    },
    {
      id: "4",
      title: "API Documentation",
      description: "Document all API endpoints for frontend team",
      assignee: {
        name: "Morgan Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
      },
      deadline: "2023-06-25",
      priority: "low",
      status: "done",
    },
  ]);

  // Function to handle drag and drop in Kanban view
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);

    // Update the status based on the destination droppable
    reorderedItem.status = result.destination.droppableId;

    // Insert at the new position
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    review: tasks.filter((task) => task.status === "review"),
    done: tasks.filter((task) => task.status === "done"),
  };

  // Status column configurations
  const statusColumns = [
    { id: "todo", title: "To Do", icon: <Clock className="h-4 w-4 mr-2" /> },
    {
      id: "in-progress",
      title: "In Progress",
      icon: <BarChart2 className="h-4 w-4 mr-2" />,
    },
    {
      id: "review",
      title: "Review",
      icon: <AlertCircle className="h-4 w-4 mr-2" />,
    },
    {
      id: "done",
      title: "Done",
      icon: <CheckCircle2 className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="w-full h-full bg-background p-4 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{projectName}</h2>
        <Tabs
          value={view}
          onValueChange={(value) => setView(value as "kanban" | "gantt")}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-4">
        {view === "kanban" ? (
          <div className="grid grid-cols-4 gap-4 h-[calc(100vh-200px)]">
            {statusColumns.map((column) => (
              <div key={column.id} className="flex flex-col h-full">
                <div className="flex items-center mb-2 p-2 bg-muted rounded-t-md">
                  {column.icon}
                  <h3 className="font-medium">{column.title}</h3>
                  <span className="ml-2 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    {
                      tasksByStatus[column.id as keyof typeof tasksByStatus]
                        .length
                    }
                  </span>
                </div>
                <div
                  className="bg-muted/50 rounded-b-md p-2 flex-1 overflow-y-auto"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const taskId = e.dataTransfer.getData("taskId");
                    const updatedTasks = tasks.map((task) =>
                      task.id === taskId
                        ? { ...task, status: column.id as Task["status"] }
                        : task,
                    );
                    setTasks(updatedTasks);
                  }}
                >
                  {tasksByStatus[column.id as keyof typeof tasksByStatus].map(
                    (task, index) => (
                      <div
                        key={task.id}
                        className="mb-2"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData("taskId", task.id);
                        }}
                      >
                        <TaskCard
                          id={task.id}
                          title={task.title}
                          description={task.description}
                          assignee={task.assignee}
                          deadline={task.deadline}
                          priority={task.priority}
                          status={task.status}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-6 h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Project Timeline</h3>
            </div>
            <div className="relative">
              {/* Timeline header */}
              <div className="flex border-b mb-4">
                <div className="w-1/4">Task</div>
                <div className="w-3/4 flex">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className="flex-1 text-center text-xs">
                      Day {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks in Gantt view */}
              {tasks.map((task) => {
                // Calculate position and width based on deadline
                const today = new Date();
                const deadline = new Date(task.deadline);
                const daysDiff = Math.ceil(
                  (deadline.getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                const startPosition = Math.max(0, 14 - daysDiff);
                const width = Math.min(daysDiff, 14 - startPosition);

                return (
                  <div key={task.id} className="flex items-center mb-4">
                    <div className="w-1/4 pr-4">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {task.assignee.name}
                      </div>
                    </div>
                    <div className="w-3/4 relative h-6">
                      <div
                        className={`absolute h-full rounded-md ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-amber-500" : "bg-green-500"}`}
                        style={{
                          left: `${(startPosition / 14) * 100}%`,
                          width: `${(width / 14) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectBoard;
