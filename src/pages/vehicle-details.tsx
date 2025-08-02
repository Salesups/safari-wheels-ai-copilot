import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, MapPin, Clock, AlertTriangle, CheckCircle2, Ship } from "lucide-react";

export const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock vehicle data - in production this would come from API
  const vehicle = {
    id: id || "V001",
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
    urgentFlags: ["age_limit_near"],
    images: ["/placeholder.svg"],
    specifications: {
      engine: "3.0L V6",
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: "45,000 km",
      color: "White Pearl"
    },
    documents: [
      { name: "Import Declaration", status: "complete" },
      { name: "Bill of Lading", status: "complete" },
      { name: "Invoice", status: "pending" },
      { name: "NTSA Inspection", status: "not_started" }
    ]
  };

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

  const statusConfig = getStatusConfig(vehicle.status);
  const StatusIcon = statusConfig.icon;

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "complete": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "pending": return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Vehicle Details</h1>
      </div>

      {/* Vehicle header */}
      <Card className={vehicle.urgentFlags.length > 0 ? 'border-red-200 bg-red-50/30' : ''}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${statusConfig.color} rounded-lg flex items-center justify-center`}>
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </CardTitle>
                <p className="text-muted-foreground">
                  Chassis: {vehicle.chassisNo}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {vehicle.urgentFlags.length > 0 && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <Badge variant={statusConfig.variant}>
                <StatusIcon className="w-4 h-4 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Location:</span>
              <span className="font-medium">{vehicle.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Value:</span>
              <span className="font-medium">KSh {(vehicle.estimatedValue / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days Since Import:</span>
              <span className={`font-medium ${vehicle.daysSinceImport > 20 ? 'text-red-600' : ''}`}>
                {vehicle.daysSinceImport} days
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer:</span>
              <span className="font-medium">{vehicle.customer || "Not assigned"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle>Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Engine:</span>
              <span className="font-medium">{vehicle.specifications.engine}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transmission:</span>
              <span className="font-medium">{vehicle.specifications.transmission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fuel Type:</span>
              <span className="font-medium">{vehicle.specifications.fuelType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mileage:</span>
              <span className="font-medium">{vehicle.specifications.mileage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Color:</span>
              <span className="font-medium">{vehicle.specifications.color}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Status */}
      <Card>
        <CardHeader>
          <CardTitle>Document Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vehicle.documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getDocumentStatusIcon(doc.status)}
                  <span className="font-medium">{doc.name}</span>
                </div>
                <Badge variant={
                  doc.status === 'complete' ? 'default' :
                  doc.status === 'pending' ? 'secondary' : 'outline'
                }>
                  {doc.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => navigate('/docs')}
        >
          Manage Documents
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigate('/?tab=compliance')}
        >
          View Compliance
        </Button>
        {vehicle.urgentFlags.length > 0 && (
          <Button 
            variant="destructive"
            onClick={() => navigate('/follow-up')}
          >
            Urgent Action Required
          </Button>
        )}
      </div>
    </div>
  );
};