import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BrainCircuit, Clock, Users, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface InsightProps {
  id: string;
  title: string;
  description: string;
  type: 'task' | 'resource' | 'timeline';
  priority: 'high' | 'medium' | 'low';
  applied: boolean;
}

interface AIInsightsPanelProps {
  projectId?: string;
  insights?: InsightProps[];
}

const defaultInsights: InsightProps[] = [
  {
    id: '1',
    title: 'Task Prioritization',
    description: 'Consider prioritizing the "Database Migration" task as it's blocking 3 other tasks in your critical path.',
    type: 'task',
    priority: 'high',
    applied: false
  },
  {
    id: '2',
    title: 'Resource Allocation',
    description: 'Developer Sarah has 3 high-priority tasks assigned this week. Consider redistributing some tasks to Alex who has availability.',
    type: 'resource',
    priority: 'medium',
    applied: false
  },
  {
    id: '3',
    title: 'Timeline Risk',
    description: 'Based on current progress, the "Frontend Development" phase is likely to miss its deadline by 2 days.',
    type: 'timeline',
    priority: 'high',
    applied: false
  },
  {
    id: '4',
    title: 'Task Dependency',
    description: 'Adding a dependency between "API Documentation" and "Client Integration" tasks could improve workflow.',
    type: 'task',
    priority: 'low',
    applied: false
  },
  {
    id: '5',
    title: 'Resource Optimization',
    description: 'Team capacity is underutilized on Fridays. Consider scheduling more reviews or planning sessions.',
    type: 'resource',
    priority: 'medium',
    applied: true
  },
];

const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ 
  projectId = 'default', 
  insights = defaultInsights 
}) => {
  const [activeTab, setActiveTab] = useState('all');
  const [localInsights, setLocalInsights] = useState<InsightProps[]>(insights);

  const filteredInsights = activeTab === 'all' 
    ? localInsights 
    : localInsights.filter(insight => insight.type === activeTab);

  const handleApplyInsight = (id: string) => {
    setLocalInsights(prevInsights => 
      prevInsights.map(insight => 
        insight.id === id ? { ...insight, applied: true } : insight
      )
    );
  };

  const handleDismissInsight = (id: string) => {
    setLocalInsights(prevInsights => 
      prevInsights.filter(insight => insight.id !== id)
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <Clock className="h-4 w-4" />;
      case 'resource': return <Users className="h-4 w-4" />;
      case 'timeline': return <TrendingUp className="h-4 w-4" />;
      default: return <BrainCircuit className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full h-full bg-background border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Insights</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {localInsights.length} suggestions
          </Badge>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
            <TabsTrigger value="task" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="resource" className="flex-1">Resources</TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4 px-2">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4 px-4">
              {filteredInsights.length > 0 ? (
                filteredInsights.map((insight) => (
                  <Card key={insight.id} className={`border ${insight.applied ? 'bg-muted/30' : 'bg-card'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(insight.type)}
                          <h4 className="font-medium">{insight.title}</h4>
                          {insight.applied && (
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" /> Applied
                            </Badge>
                          )}
                        </div>
                        <Badge variant={getPriorityColor(insight.priority)} className="text-xs capitalize">
                          {insight.priority}
                        </Badge>
                      </div>
                      
                      <p className="mt-2 text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                      
                      {insight.type === 'resource' && (
                        <div className="mt-3 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                            <AvatarFallback>SA</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                            <AvatarFallback>AL</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                      
                      {!insight.applied && (
                        <div className="mt-3 flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDismissInsight(insight.id)}
                          >
                            Dismiss
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleApplyInsight(insight.id)}
                          >
                            Apply
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-medium">No insights available</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    There are no AI insights for this filter at the moment.
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default AIInsightsPanel;
