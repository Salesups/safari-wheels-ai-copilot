import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageSquare, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export const FollowUpPage = () => {
  const followUps = [
    {
      id: 1,
      customer: "John Kipchoge",
      phone: "+254722123456",
      reason: "Financing approval deadline",
      priority: "urgent",
      dueDate: "Today, 5:00 PM",
      status: "pending",
      vehicle: "Toyota Prado 2018"
    },
    {
      id: 2,
      customer: "Sarah Muthoni",
      phone: "+254711987654",
      reason: "Document submission reminder",
      priority: "high",
      dueDate: "Tomorrow, 10:00 AM",
      status: "pending",
      vehicle: "Honda CRV 2019"
    },
    {
      id: 3,
      customer: "David Kamau",
      phone: "+254733456789",
      reason: "Final purchase decision",
      priority: "medium",
      dueDate: "Dec 8, 2:00 PM",
      status: "completed",
      vehicle: "Nissan X-Trail 2020"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    return status === "completed" ? 
      <CheckCircle className="w-4 h-4 text-green-600" /> : 
      <Clock className="w-4 h-4 text-orange-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Follow-up Schedule</h1>
        <Button>
          <AlertTriangle className="w-4 h-4 mr-2" />
          View Overdue
        </Button>
      </div>

      <div className="grid gap-4">
        {followUps.map((followUp) => (
          <Card key={followUp.id} className={`${followUp.priority === 'urgent' ? 'border-red-200 bg-red-50/50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-center">
                    {getStatusIcon(followUp.status)}
                    <div className={`w-2 h-2 rounded-full mt-1 ${getPriorityColor(followUp.priority)}`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{followUp.customer}</h3>
                      <Badge variant={followUp.priority === 'urgent' ? 'destructive' : 'secondary'}>
                        {followUp.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{followUp.phone}</p>
                    <p className="text-sm mt-1 font-medium">{followUp.reason}</p>
                    <p className="text-xs text-muted-foreground">{followUp.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{followUp.dueDate}</p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                    {followUp.status === 'pending' && (
                      <Button size="sm">
                        Mark Done
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Urgent follow-ups</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Scheduled calls</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};