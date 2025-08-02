import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Car,
  Ship,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  MessageSquare
} from "lucide-react";

export const VehicleTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVehicleDetails = (vehicle: any) => {
    toast({
      title: "Vehicle Details",
      description: `Viewing details for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    });
    // Navigate to vehicle details page or open modal
    navigate(`/vehicle/${vehicle.id}`);
  };

  const handleActNow = (vehicle: any) => {
    if (vehicle.urgentFlags.includes("age_limit_near")) {
      navigate('/docs');
    } else if (vehicle.urgentFlags.includes("customs_delay")) {
      navigate('/follow-up');
    } else {
      navigate('/metrics');
    }
  };

  const handleContact = (vehicle: any) => {
    navigate(`/?tab=customers&customer=${vehicle.customer}`);
  };

  // Mock vehicle data - structured around the journey from port to sale
  const vehicles = [
    {
      id: "V001",
      make: "Toyota",
      model: "Prado",
      year: 2018,
      chassisNo: "JTEBX9FJ8EK123456",
      status: "in_transit",
      location: "MV Asian Grace - ETA: Thu",
      daysSinceImport: 12,
      complianceStatus: "pending",
      estimatedValue: 2800000,
      customer: null,
      urgentFlags: ["age_limit_near"]
    },
    {
      id: "V002", 
      make: "Honda",
      model: "CR-V",
      year: 2019,
      chassisNo: "2HKRM4H58KH123456",
      status: "at_port",
      location: "Mombasa Port - Berth 15",
      daysSinceImport: 5,
      complianceStatus: "docs_missing",
      estimatedValue: 2200000,
      customer: null,
      urgentFlags: ["customs_delay"]
    },
    {
      id: "V003",
      make: "Subaru",
      model: "Forester", 
      year: 2020,
      chassisNo: "JF2SKAEC3LH123456",
      status: "compliance_pending",
      location: "Clearing Agent",
      daysSinceImport: 8,
      complianceStatus: "ntsa_pending",
      estimatedValue: 2500000,
      customer: "John Kipchoge",
      urgentFlags: []
    },
    {
      id: "V004",
      make: "Toyota",
      model: "Harrier",
      year: 2017,
      chassisNo: "JTJBM7FX4D5123456", 
      status: "ready_for_sale",
      location: "Showroom",
      daysSinceImport: 25,
      complianceStatus: "complete",
      estimatedValue: 2600000,
      customer: null,
      urgentFlags: []
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      in_transit: { 
        label: "In Transit", 
        color: "bg-blue-500", 
        variant: "default" as const,
        icon: Ship 
      },
      at_port: { 
        label: "At Port", 
        color: "bg-orange-500", 
        variant: "secondary" as const,
        icon: MapPin 
      },
      compliance_pending: { 
        label: "Compliance", 
        color: "bg-yellow-500", 
        variant: "outline" as const,
        icon: Clock 
      },
      ready_for_sale: { 
        label: "Ready", 
        color: "bg-green-500", 
        variant: "default" as const,
        icon: CheckCircle2 
      }
    };
    return configs[status as keyof typeof configs] || configs.in_transit;
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.chassisNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = statusFilter === "all" || vehicle.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          All
        </Button>
        <Button
          variant={statusFilter === "in_transit" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("in_transit")}
        >
          Transit
        </Button>
        <Button
          variant={statusFilter === "at_port" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("at_port")}
        >
          Port
        </Button>
      </div>

      {/* Vehicle cards */}
      <div className="space-y-3">
        {filteredVehicles.map((vehicle) => {
          const statusConfig = getStatusConfig(vehicle.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <Card 
              key={vehicle.id} 
              className={`${vehicle.urgentFlags.length > 0 ? 'border-red-200 bg-red-50/30' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${statusConfig.color} rounded-lg flex items-center justify-center`}>
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {vehicle.chassisNo.slice(-8)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {vehicle.urgentFlags.length > 0 && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    <Badge variant={statusConfig.variant} className="text-xs">
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{vehicle.location}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value:</span>
                    <span className="font-medium">
                      KSh {(vehicle.estimatedValue / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  
                  {vehicle.customer && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">{vehicle.customer}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Days since import:</span>
                    <span className={`font-medium ${vehicle.daysSinceImport > 20 ? 'text-red-600' : ''}`}>
                      {vehicle.daysSinceImport} days
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleVehicleDetails(vehicle)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                  {vehicle.customer && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleContact(vehicle)}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                  )}
                  {vehicle.urgentFlags.length > 0 && (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleActNow(vehicle)}
                    >
                      Act Now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};