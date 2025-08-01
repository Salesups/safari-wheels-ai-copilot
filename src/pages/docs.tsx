import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Download, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";

export const DocsPage = () => {
  const documents = [
    {
      id: 1,
      customer: "John Kipchoge",
      vehicle: "Toyota Prado 2018",
      documents: [
        { name: "Import Declaration", status: "completed", required: true },
        { name: "NTSA Inspection", status: "pending", required: true },
        { name: "Insurance Certificate", status: "missing", required: true },
        { name: "Bank Pre-approval", status: "completed", required: false }
      ],
      overallStatus: "in_progress"
    },
    {
      id: 2,
      customer: "Mary Wanjiku",
      vehicle: "Honda CRV 2019",
      documents: [
        { name: "Import Declaration", status: "completed", required: true },
        { name: "NTSA Inspection", status: "completed", required: true },
        { name: "Insurance Certificate", status: "completed", required: true },
        { name: "Registration Certificate", status: "completed", required: true }
      ],
      overallStatus: "completed"
    },
    {
      id: 3,
      customer: "Peter Ochieng",
      vehicle: "Nissan X-Trail 2020",
      documents: [
        { name: "Import Declaration", status: "pending", required: true },
        { name: "Age Verification", status: "missing", required: true },
        { name: "NTSA Inspection", status: "not_started", required: true }
      ],
      overallStatus: "urgent"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending": return <Clock className="w-4 h-4 text-orange-600" />;
      case "missing": return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "border-green-200 bg-green-50/50";
      case "urgent": return "border-red-200 bg-red-50/50";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <div className="grid gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className={getOverallStatusColor(doc.overallStatus)}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5" />
                  <div>
                    <CardTitle className="text-lg">{doc.customer}</CardTitle>
                    <p className="text-sm text-muted-foreground">{doc.vehicle}</p>
                  </div>
                </div>
                <Badge variant={
                  doc.overallStatus === 'completed' ? 'default' :
                  doc.overallStatus === 'urgent' ? 'destructive' : 'secondary'
                }>
                  {doc.overallStatus.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {doc.documents.map((document, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(document.status)}
                      <div>
                        <p className="font-medium text-sm">{document.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {document.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {document.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3" />
                        </Button>
                      )}
                      {document.status !== 'completed' && (
                        <Button size="sm" variant="outline">
                          <Upload className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">
                  Generate Checklist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">7</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Missing Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Urgent action needed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Ready for Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-xs text-muted-foreground">Complete documentation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-xs text-muted-foreground">Age limit deadline</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};