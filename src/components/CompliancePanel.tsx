import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Calendar,
  Car,
  Shield,
  DollarSign,
  ExternalLink
} from "lucide-react";

export const CompliancePanel = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Compliance tasks with Kenya-specific requirements
  const complianceTasks = [
    {
      id: "C001",
      vehicle: "Toyota Prado 2018",
      chassisNo: "JTEBX9FJ8EK123456", 
      type: "age_limit",
      title: "Vehicle Age Limit Check",
      description: "Vehicle approaching 8-year age limit (March 2024 rule)",
      status: "critical",
      dueDate: "2024-01-20",
      daysLeft: 3,
      requirements: [
        { name: "Import permit", status: "complete" },
        { name: "Age verification", status: "pending" },
        { name: "NTSA clearance", status: "not_started" }
      ],
      estimatedCost: 25000,
      priority: "high"
    },
    {
      id: "C002", 
      vehicle: "Honda CR-V 2019",
      chassisNo: "2HKRM4H58KH123456",
      type: "customs",
      title: "Customs Documentation", 
      description: "Missing customs declaration documents",
      status: "pending",
      dueDate: "2024-01-25",
      daysLeft: 8,
      requirements: [
        { name: "Bill of lading", status: "complete" },
        { name: "Invoice verification", status: "pending" },
        { name: "Tax assessment", status: "pending" },
        { name: "Release order", status: "not_started" }
      ],
      estimatedCost: 180000,
      priority: "medium"
    },
    {
      id: "C003",
      vehicle: "Subaru Forester 2020",
      chassisNo: "JF2SKAEC3LH123456",
      type: "ntsa",
      title: "NTSA Registration",
      description: "Vehicle registration and number plate allocation",
      status: "in_progress", 
      dueDate: "2024-01-30",
      daysLeft: 13,
      requirements: [
        { name: "Inspection certificate", status: "complete" },
        { name: "Insurance cover", status: "complete" },
        { name: "Logbook application", status: "pending" },
        { name: "Number plate", status: "not_started" }
      ],
      estimatedCost: 15000,
      priority: "medium"
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      critical: { 
        label: "Critical", 
        color: "destructive" as const, 
        bgColor: "bg-red-100",
        textColor: "text-red-800"
      },
      pending: { 
        label: "Pending", 
        color: "secondary" as const,
        bgColor: "bg-yellow-100", 
        textColor: "text-yellow-800"
      },
      in_progress: { 
        label: "In Progress", 
        color: "default" as const,
        bgColor: "bg-blue-100",
        textColor: "text-blue-800"
      },
      complete: { 
        label: "Complete", 
        color: "default" as const,
        bgColor: "bg-green-100",
        textColor: "text-green-800"
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getRequirementProgress = (requirements: any[]) => {
    const completed = requirements.filter(req => req.status === "complete").length;
    return (completed / requirements.length) * 100;
  };

  const getRequirementStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle2 className="w-3 h-3 text-green-600" />;
      case "pending": return <Clock className="w-3 h-3 text-yellow-600" />;
      default: return <div className="w-3 h-3 rounded-full border-2 border-gray-300" />;
    }
  };

  const filteredTasks = complianceTasks.filter(task => 
    activeFilter === "all" || task.status === activeFilter
  );

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-red-50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-red-600">1</div>
            <div className="text-xs text-red-800">Critical</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-yellow-600">2</div>
            <div className="text-xs text-yellow-800">Pending</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-blue-600">1</div>
            <div className="text-xs text-blue-800">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardContent className="p-3 text-center">
            <div className="text-lg font-bold text-green-600">12</div>
            <div className="text-xs text-green-800">Complete</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 overflow-x-auto">
        {["all", "critical", "pending", "in_progress"].map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="whitespace-nowrap"
          >
            {filter.replace("_", " ").charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Compliance tasks */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const statusConfig = getStatusConfig(task.status);
          const progress = getRequirementProgress(task.requirements);
          
          return (
            <Card key={task.id} className={`${task.status === 'critical' ? 'border-red-200' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${statusConfig.bgColor} rounded-lg flex items-center justify-center`}>
                      <FileText className={`w-5 h-5 ${statusConfig.textColor}`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{task.title}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        {task.vehicle} • {task.chassisNo.slice(-8)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {task.daysLeft <= 5 && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <Badge variant={statusConfig.color}>
                      {task.daysLeft} days left
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
                
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                {/* Requirements checklist */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Requirements:</h4>
                  {task.requirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {getRequirementStatusIcon(req.status)}
                      <span className={req.status === "complete" ? "line-through text-muted-foreground" : ""}>
                        {req.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Cost and actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="w-3 h-3" />
                    <span>Est. KSh {task.estimatedCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Docs
                    </Button>
                    <Button 
                      size="sm" 
                      variant={task.status === "critical" ? "destructive" : "default"}
                    >
                      {task.status === "critical" ? "Urgent Action" : "Update"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};