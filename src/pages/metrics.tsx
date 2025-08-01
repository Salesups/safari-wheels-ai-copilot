import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Car, 
  Users, 
  Clock,
  Ship,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const MetricsPage = () => {
  const metrics = {
    revenue: {
      current: 12500000,
      target: 15000000,
      growth: 8.5,
      period: "This Month"
    },
    vehicles: {
      total: 45,
      inTransit: 12,
      atPort: 8,
      ready: 25,
      sold: 18
    },
    customers: {
      total: 234,
      active: 67,
      hotLeads: 23,
      converted: 12
    },
    operations: {
      avgClearanceTime: 5.2,
      complianceRate: 94,
      customerSatisfaction: 4.6
    }
  };

  const recentTransactions = [
    { id: 1, customer: "John Kipchoge", vehicle: "Toyota Prado 2018", amount: 4200000, status: "completed" },
    { id: 2, customer: "Mary Wanjiku", vehicle: "Honda CRV 2019", amount: 3800000, status: "pending" },
    { id: 3, customer: "Peter Ochieng", vehicle: "Nissan X-Trail 2020", amount: 4500000, status: "completed" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Business Metrics</h1>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Revenue</span>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh {(metrics.revenue.current / 1000000).toFixed(1)}M</div>
            <div className="flex items-center space-x-1 text-sm">
              <TrendingUp className="w-3 h-3 text-green-600" />
              <span className="text-green-600">+{metrics.revenue.growth}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
            <Progress 
              value={(metrics.revenue.current / metrics.revenue.target) * 100} 
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((metrics.revenue.current / metrics.revenue.target) * 100)}% of monthly target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Vehicle Inventory</span>
              <Car className="w-4 h-4 text-blue-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.vehicles.total}</div>
            <div className="text-sm text-muted-foreground">Total vehicles</div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Ready for Sale</span>
                <span className="font-medium">{metrics.vehicles.ready}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>In Transit</span>
                <span className="font-medium">{metrics.vehicles.inTransit}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>At Port</span>
                <span className="font-medium">{metrics.vehicles.atPort}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Customer Pipeline</span>
              <Users className="w-4 h-4 text-purple-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.customers.hotLeads}</div>
            <div className="text-sm text-muted-foreground">Hot leads</div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Active Customers</span>
                <span className="font-medium">{metrics.customers.active}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Conversions</span>
                <span className="font-medium">{metrics.customers.converted}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>Operations</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.operations.avgClearanceTime}</div>
            <div className="text-sm text-muted-foreground">Avg clearance days</div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Compliance Rate</span>
                <span className="font-medium">{metrics.operations.complianceRate}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Customer Rating</span>
                <span className="font-medium">{metrics.operations.customerSatisfaction}/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {transaction.status === 'completed' ? 
                    <CheckCircle className="w-4 h-4 text-green-600" /> :
                    <Clock className="w-4 h-4 text-orange-600" />
                  }
                  <div>
                    <p className="font-medium text-sm">{transaction.customer}</p>
                    <p className="text-xs text-muted-foreground">{transaction.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">KSh {(transaction.amount / 1000000).toFixed(1)}M</p>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-green-700">This Month Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sales Target</span>
                <span className="font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
              
              <div className="flex justify-between text-sm mt-3">
                <span>Customer Satisfaction</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-700">Operational Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Port Clearance</span>
                <Badge variant="outline">5.2 days avg</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Document Processing</span>
                <Badge variant="outline">94% compliant</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Customer Response</span>
                <Badge variant="outline">2.1 hrs avg</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-red-700">Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Financing approval time</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Lead response automation</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Document digitization</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};