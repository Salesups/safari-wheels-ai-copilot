import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  DollarSign,
  Clock
} from "lucide-react";

export const AIInsights = () => {
  // AI-generated insights based on current operations
  const insights = [
    {
      type: "revenue",
      priority: "high",
      message: "Exchange rate drop: Import now to save KSh 180K on pending orders",
      action: "Review orders",
      timeframe: "Next 48hrs"
    },
    {
      type: "compliance",
      priority: "critical",
      message: "New NTSA rule: Vehicle age limit reduced to 7 years from March",
      action: "Check inventory",
      timeframe: "Immediate"
    },
    {
      type: "opportunity",
      priority: "medium", 
      message: "3 hot leads for Prado models - port arrival matches demand",
      action: "Pre-sell units",
      timeframe: "This week"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "default";
      default: return "secondary";
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case "revenue": return DollarSign;
      case "compliance": return AlertCircle;
      case "opportunity": return TrendingUp;
      default: return Lightbulb;
    }
  };

  return (
    <Card className="border-blue-200 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
          <Brain className="w-4 h-4" />
          AI Operations Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = getPriorityIcon(insight.type);
          return (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
              <div className="p-1 rounded-full bg-blue-100">
                <Icon className="w-3 h-3 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium leading-tight">{insight.message}</p>
                  <Badge variant={getPriorityColor(insight.priority)} className="text-xs shrink-0">
                    {insight.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {insight.timeframe}
                  </div>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};