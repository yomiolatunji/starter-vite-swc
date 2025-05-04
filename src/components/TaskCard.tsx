import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskCardProps {
  id?: string;
  title?: string;
  description?: string;
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  deadline?: Date;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "in-progress" | "review" | "done";
  onClick?: () => void;
}

const priorityColors = {
  low: "bg-green-100 text-green-800 hover:bg-green-100",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  high: "bg-red-100 text-red-800 hover:bg-red-100",
};

const statusColors = {
  todo: "bg-slate-100 text-slate-800",
  "in-progress": "bg-blue-100 text-blue-800",
  review: "bg-purple-100 text-purple-800",
  done: "bg-green-100 text-green-800",
};

const TaskCard: React.FC<TaskCardProps> = ({
  id = "task-1",
  title = "Implement User Authentication",
  description = "Add login and registration functionality with OAuth support",
  assignee = {
    name: "Alex Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    initials: "AJ",
  },
  deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  priority = "medium",
  status = "in-progress",
  onClick = () => {},
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const daysUntilDeadline = () => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = daysUntilDeadline();
  const isUrgent = daysLeft <= 2 && status !== "done";

  return (
    <Card
      className="w-[280px] h-[150px] bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
          <Badge variant="outline" className={statusColors[status]}>
            {status.replace("-", " ")}
          </Badge>
        </div>

        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{description}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={assignee.avatar} alt={assignee.name} />
              <AvatarFallback>{assignee.initials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600">{assignee.name}</span>
          </div>

          <Badge className={priorityColors[priority]}>{priority}</Badge>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 border-t flex justify-between items-center bg-gray-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-xs text-gray-600">
                <CalendarIcon className="h-3 w-3 mr-1" />
                <span>{formatDate(deadline)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Due date</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isUrgent ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-xs text-red-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <span>
                    {daysLeft === 0
                      ? "Due today"
                      : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Urgent: Approaching deadline</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="flex items-center text-xs text-gray-600">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {daysLeft === 0
                ? "Due today"
                : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
