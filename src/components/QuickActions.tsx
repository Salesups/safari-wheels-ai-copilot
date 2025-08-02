import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Phone,
  FileText,
  Car,
  DollarSign,
  Users,
  AlertTriangle,
  Plus
} from "lucide-react";

export const QuickActions = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWhatsAppLeads = () => {
    navigate('/whatsapp');
  };

  const handleCallFollowups = () => {
    navigate('/follow-up');
  };

  const handleDocsNeeded = () => {
    navigate('/docs');
  };

  const handleAddVehicle = () => {
    navigate('/addvehicle');
  };

  const handleFinancing = () => {
    // Navigate to customers tab with financing filter
    navigate('/?tab=customers&filter=financing');
  };

  const handleNewCustomer = () => {
    // Navigate to customers tab with action to add new customer
    navigate('/?tab=customers&action=new');
  };

  const handleCheckInventory = () => {
    navigate('/?tab=vehicles');
  };

  const handleReviewOrder = () => {
    navigate('/metrics');
  };

  const handlePreSellUnits = () => {
    navigate('/?tab=customers');
  };

  const actions = [
    {
      icon: MessageSquare,
      label: "WhatsApp Leads",
      count: 5,
      color: "bg-green-500",
      action: handleWhatsAppLeads
    },
    {
      icon: Phone,
      label: "Call Follow-ups",
      count: 3,
      color: "bg-blue-500", 
      action: handleCallFollowups
    },
    {
      icon: FileText,
      label: "Docs Needed",
      count: 7,
      color: "bg-orange-500",
      action: handleDocsNeeded
    },
    {
      icon: Car,
      label: "Add Vehicle",
      color: "bg-purple-500",
      action: handleAddVehicle
    },
    {
      icon: DollarSign,
      label: "Financing",
      count: 4,
      color: "bg-emerald-500",
      action: handleFinancing
    },
    {
      icon: Users,
      label: "New Customer",
      color: "bg-pink-500",
      action: handleNewCustomer
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-16 flex-col gap-1 relative p-2"
                onClick={action.action}
              >
                {action.count && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {action.count}
                  </div>
                )}
                <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-1`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {action.label}
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};