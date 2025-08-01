import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Send, User, Clock } from "lucide-react";

export const WhatsAppPage = () => {
  const conversations = [
    {
      id: 1,
      customer: "John Kipchoge",
      phone: "+254722123456",
      lastMessage: "Is the Toyota Prado still available?",
      status: "hot_lead",
      timestamp: "2 min ago",
      unread: 3
    },
    {
      id: 2,
      customer: "Mary Wanjiku",
      phone: "+254733987654",
      lastMessage: "When will financing be approved?",
      status: "financing_pending",
      timestamp: "1 hour ago",
      unread: 1
    },
    {
      id: 3,
      customer: "Peter Ochieng",
      phone: "+254711456789",
      lastMessage: "Thanks for the vehicle details",
      status: "follow_up",
      timestamp: "3 hours ago",
      unread: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hot_lead": return "bg-red-500";
      case "financing_pending": return "bg-orange-500";
      case "follow_up": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">WhatsApp Conversations</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageSquare className="w-4 h-4 mr-2" />
          Open WhatsApp Web
        </Button>
      </div>

      <div className="grid gap-4">
        {conversations.map((conv) => (
          <Card key={conv.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    {conv.unread > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{conv.customer}</h3>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(conv.status)}`}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{conv.phone}</p>
                    <p className="text-sm mt-1">{conv.lastMessage}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {conv.timestamp}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Send className="w-5 h-5 mb-1" />
              Broadcast Update
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <MessageSquare className="w-5 h-5 mb-1" />
              Template Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};