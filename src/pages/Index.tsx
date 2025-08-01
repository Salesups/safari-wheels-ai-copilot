import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  MessageSquare,
  FileText,
  Users,
  DollarSign,
  Ship,
  MapPin,
  Phone
} from "lucide-react";
import { VehicleTracker } from "@/components/VehicleTracker";
import { CompliancePanel } from "@/components/CompliancePanel";
import { AIInsights } from "@/components/AIInsights";
import { QuickActions } from "@/components/QuickActions";
import { CustomerPipeline } from "@/components/CustomerPipeline";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - in real app this would come from backend
  const dealerStats = {
    vehiclesInTransit: 12,
    atPort: 8,
    pendingCompliance: 15,
    readyForSale: 23,
    activeLeads: 34,
    financingPending: 7,
    urgentAlerts: 3
  };

  return (
    <div>
      {/* Mobile-first header with key metrics */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">Safari Wheels AI</h1>
            <div className="flex items-center gap-2">
              {dealerStats.urgentAlerts > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {dealerStats.urgentAlerts} urgent
                </Badge>
              )}
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            </div>
          </div>
          
          {/* Quick stats bar */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-blue-600">{dealerStats.vehiclesInTransit}</div>
              <div className="text-xs text-muted-foreground">In Transit</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-orange-600">{dealerStats.atPort}</div>
              <div className="text-xs text-muted-foreground">At Port</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-red-600">{dealerStats.pendingCompliance}</div>
              <div className="text-xs text-muted-foreground">Compliance</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-2">
              <div className="text-lg font-bold text-green-600">{dealerStats.readyForSale}</div>
              <div className="text-xs text-muted-foreground">Ready</div>
            </div>
          </div>
        </div>
      </div>

        {/* Main content */}
        <div className="space-y-4">
        {/* AI Insights - Always visible for COO-level intelligence */}
        <AIInsights />

        {/* Quick Actions for immediate needs */}
        <QuickActions />

        {/* Tab navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: "overview", label: "Overview", icon: TrendingUp },
            { key: "vehicles", label: "Vehicles", icon: Car },
            { key: "compliance", label: "Compliance", icon: FileText },
            { key: "customers", label: "Customers", icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(key)}
              className="whitespace-nowrap"
            >
              <Icon className="w-4 h-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "overview" && <OverviewTab stats={dealerStats} />}
        {activeTab === "vehicles" && <VehicleTracker />}
        {activeTab === "compliance" && <CompliancePanel />}
        {activeTab === "customers" && <CustomerPipeline />}
      </div>
    </div>
  );
};

// Overview tab component
const OverviewTab = ({ stats }: { stats: any }) => (
  <div className="space-y-4">
    {/* Critical alerts first */}
    <Card className="border-red-200 bg-red-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-red-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Urgent Actions Required
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-red-500">
          <div>
            <div className="font-medium text-sm">Vehicle age limit expiring</div>
            <div className="text-xs text-muted-foreground">Toyota Prado 2016 - 3 days left</div>
          </div>
          <Button size="sm" variant="destructive">Act Now</Button>
        </div>
        <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-orange-500">
          <div>
            <div className="font-medium text-sm">Customer financing expires</div>
            <div className="text-xs text-muted-foreground">John Kipchoge - Follow up today</div>
          </div>
          <Button size="sm" variant="outline">
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Revenue opportunity */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          Revenue Opportunities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600 mb-1">KSh 2.8M</div>
        <div className="text-sm text-muted-foreground mb-3">
          Ready to close this week
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Hot leads ready to buy</span>
            <span className="font-medium">KSh 1.2M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Financing approvals pending</span>
            <span className="font-medium">KSh 1.6M</span>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Port status */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Ship className="w-4 h-4 text-blue-600" />
          Port & Transit Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">MV Asian Grace</span>
            </div>
            <Badge variant="outline">Arriving Thu</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm">12 vehicles clearing</span>
            </div>
            <Badge variant="secondary">2-3 days</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Index;
