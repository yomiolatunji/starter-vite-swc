import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Settings, Plus, Filter } from "lucide-react";
import ProjectBoard from "./ProjectBoard";
// Remove the AIInsightsPanel import since it's not being used correctly
// import AIInsightsPanel from './AIInsightsPanel';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  dueDate: string;
  priority: "low" | "medium" | "high";
  members: { id: string; name: string; avatar?: string }[];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Mock data for projects
  const projects: Project[] = [
    {
      id: "1",
      name: "Website Redesign",
      description: "Redesign the company website with new branding",
      progress: 65,
      dueDate: "2023-12-15",
      priority: "high",
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "2",
          name: "Sarah Miller",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        {
          id: "3",
          name: "David Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        },
      ],
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Develop a new mobile app for customer engagement",
      progress: 30,
      dueDate: "2024-02-28",
      priority: "medium",
      members: [
        {
          id: "2",
          name: "Sarah Miller",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        {
          id: "4",
          name: "Michael Brown",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        },
      ],
    },
    {
      id: "3",
      name: "Marketing Campaign",
      description: "Q4 marketing campaign for product launch",
      progress: 80,
      dueDate: "2023-11-30",
      priority: "high",
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        },
        {
          id: "5",
          name: "Emily Wilson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        },
      ],
    },
  ];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            <span>ProjectAI</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] rounded-full bg-background pl-8 md:w-[300px]"
              />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-4rem)]">
        {!selectedProject ? (
          <div className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage your projects and tasks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="all"
              className="mt-6"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card
                      key={project.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleProjectSelect(project)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>{project.name}</CardTitle>
                          <Badge className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex -space-x-2">
                              {project.members.slice(0, 3).map((member) => (
                                <Avatar
                                  key={member.id}
                                  className="border-2 border-background h-8 w-8"
                                >
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>
                                    {member.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {project.members.length > 3 && (
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                                  +{project.members.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Due:{" "}
                              {new Date(project.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((p) => p.progress < 100)
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleProjectSelect(project)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{project.name}</CardTitle>
                            <Badge
                              className={getPriorityColor(project.priority)}
                            >
                              {project.priority}
                            </Badge>
                          </div>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex -space-x-2">
                                {project.members.slice(0, 3).map((member) => (
                                  <Avatar
                                    key={member.id}
                                    className="border-2 border-background h-8 w-8"
                                  >
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                      {member.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {project.members.length > 3 && (
                                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                                    +{project.members.length - 3}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Due:{" "}
                                {new Date(project.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter((p) => p.progress === 100)
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleProjectSelect(project)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{project.name}</CardTitle>
                            <Badge
                              className={getPriorityColor(project.priority)}
                            >
                              {project.priority}
                            </Badge>
                          </div>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex -space-x-2">
                                {project.members.slice(0, 3).map((member) => (
                                  <Avatar
                                    key={member.id}
                                    className="border-2 border-background h-8 w-8"
                                  >
                                    <AvatarImage src={member.avatar} />
                                    <AvatarFallback>
                                      {member.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                                {project.members.length > 3 && (
                                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                                    +{project.members.length - 3}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Due:{" "}
                                {new Date(project.dueDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {projects.filter((p) => p.progress === 100).length === 0 && (
                    <div className="col-span-3 text-center py-10 text-muted-foreground">
                      No completed projects yet
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto">
              <div className="p-4 md:p-6">
                <div className="flex items-center mb-6">
                  <Button
                    variant="ghost"
                    onClick={handleBackToProjects}
                    className="mr-4"
                  >
                    ← Back to Projects
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {selectedProject.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
                <ProjectBoard project={selectedProject} />
              </div>
            </div>
            <div className="hidden lg:block w-[300px] border-l bg-background">
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Task Prioritization</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider prioritizing the design tasks to meet the
                      upcoming deadline.
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">Resource Optimization</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Team members Alex and Sarah are overallocated. Consider
                      redistributing tasks.
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      Timeline Recommendation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on current progress, project completion may be
                      delayed by 3 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
