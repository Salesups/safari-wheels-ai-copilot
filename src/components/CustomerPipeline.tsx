import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Phone,
  MessageSquare,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText
} from "lucide-react";

export const CustomerPipeline = () => {
  const [activeStage, setActiveStage] = useState("all");

  // Customer pipeline data with Kenyan context
  const customers = [
    {
      id: "CU001",
      name: "John Kipchoge",
      phone: "+254712345678",
      interestedVehicle: "Toyota Prado 2018",
      stage: "hot_lead",
      lastContact: "2 hours ago",
      budget: 2800000,
      financing: {
        status: "approved",
        bank: "KCB Bank",
        amount: 2200000,
        expiryDays: 5
      },
      notes: "Ready to buy, financing approved. Waiting for vehicle to clear customs.",
      priority: "high",
      nextAction: "Call today - financing expires soon"
    },
    {
      id: "CU002", 
      name: "Mary Wanjiku",
      phone: "+254723456789",
      interestedVehicle: "Honda CR-V 2019",
      stage: "financing",
      lastContact: "1 day ago",
      budget: 2200000,
      financing: {
        status: "pending",
        bank: "Equity Bank",
        amount: 1800000,
        expiryDays: 12
      },
      notes: "Submitted loan application. Waiting for approval.",
      priority: "medium",
      nextAction: "Follow up with bank"
    },
    {
      id: "CU003",
      name: "Peter Macharia",
      phone: "+254734567890", 
      interestedVehicle: "Subaru Forester 2020",
      stage: "negotiation",
      lastContact: "3 days ago",
      budget: 2500000,
      financing: {
        status: "cash",
        bank: null,
        amount: 2500000,
        expiryDays: null
      },
      notes: "Cash buyer. Negotiating price. Wants to see vehicle first.",
      priority: "medium",
      nextAction: "Schedule viewing"
    },
    {
      id: "CU004",
      name: "Grace Nyong'o",
      phone: "+254745678901",
      interestedVehicle: "Toyota Harrier 2017", 
      stage: "inquiry",
      lastContact: "1 week ago",
      budget: 2600000,
      financing: {
        status: "exploring",
        bank: null,
        amount: null,
        expiryDays: null
      },
      notes: "Initial inquiry. Needs more information about vehicle history.",
      priority: "low",
      nextAction: "Send vehicle details"
    }
  ];

  const stages = [
    { key: "inquiry", label: "Inquiry", count: 8, color: "bg-gray-500" },
    { key: "negotiation", label: "Negotiation", count: 5, color: "bg-blue-500" },
    { key: "financing", label: "Financing", count: 3, color: "bg-yellow-500" },
    { key: "hot_lead", label: "Hot Lead", count: 2, color: "bg-green-500" }
  ];

  const getStageConfig = (stage: string) => {
    const configs = {
      inquiry: { 
        label: "Inquiry", 
        variant: "secondary" as const,
        icon: Users 
      },
      negotiation: { 
        label: "Negotiation", 
        variant: "default" as const,
        icon: DollarSign 
      },
      financing: { 
        label: "Financing", 
        variant: "outline" as const,
        icon: Clock 
      },
      hot_lead: { 
        label: "Hot Lead", 
        variant: "default" as const,
        icon: TrendingUp 
      }
    };
    return configs[stage as keyof typeof configs] || configs.inquiry;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      default: return "secondary";
    }
  };

  const getFinancingStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600";
      case "pending": return "text-yellow-600";
      case "cash": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const filteredCustomers = customers.filter(customer => 
    activeStage === "all" || customer.stage === activeStage
  );

  const totalPipelineValue = customers.reduce((sum, customer) => sum + customer.budget, 0);

  return (
    <div className="space-y-4">
      {/* Pipeline summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                KSh {(totalPipelineValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Total Pipeline</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
              <div className="text-xs text-muted-foreground">Active Customers</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stage filters */}
      <div className="flex gap-2 overflow-x-auto">
        <Button
          variant={activeStage === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveStage("all")}
        >
          All ({customers.length})
        </Button>
        {stages.map((stage) => (
          <Button
            key={stage.key}
            variant={activeStage === stage.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveStage(stage.key)}
            className="whitespace-nowrap"
          >
            {stage.label} ({stage.count})
          </Button>
        ))}
      </div>

      {/* Customer cards */}
      <div className="space-y-3">
        {filteredCustomers.map((customer) => {
          const stageConfig = getStageConfig(customer.stage);
          const StageIcon = stageConfig.icon;
          
          return (
            <Card key={customer.id} className={customer.priority === "high" ? "border-green-200 bg-green-50/30" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h3 className="font-semibold text-sm">{customer.name}</h3>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant={getPriorityColor(customer.priority)} className="text-xs">
                          {customer.priority}
                        </Badge>
                        <Badge variant={stageConfig.variant} className="text-xs">
                          <StageIcon className="w-3 h-3 mr-1" />
                          {stageConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Interested in:</span>
                    <span className="font-medium">{customer.interestedVehicle}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-medium">
                      KSh {(customer.budget / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Financing:</span>
                    <span className={`font-medium ${getFinancingStatusColor(customer.financing.status)}`}>
                      {customer.financing.status === "cash" ? "Cash buyer" : 
                       customer.financing.status === "approved" ? `${customer.financing.bank} - Approved` :
                       customer.financing.status === "pending" ? `${customer.financing.bank} - Pending` :
                       "Exploring options"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last contact:</span>
                    <span className="font-medium">{customer.lastContact}</span>
                  </div>
                </div>

                {/* Financing alert */}
                {customer.financing.status === "approved" && customer.financing.expiryDays && customer.financing.expiryDays <= 7 && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded text-sm text-red-800 mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>Financing expires in {customer.financing.expiryDays} days!</span>
                  </div>
                )}

                {/* Notes */}
                <div className="bg-muted/50 rounded p-2 text-sm mb-3">
                  <p className="text-muted-foreground">{customer.notes}</p>
                </div>

                {/* Next action */}
                <div className="flex items-center justify-between text-sm text-blue-600 mb-3">
                  <span className="font-medium">Next: {customer.nextAction}</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    WhatsApp
                  </Button>
                  <Button size="sm" variant="default">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};