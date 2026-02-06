import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Ticket, 
  Search, 
  Filter, 
  Image, 
  Mic, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  User,
  Phone,
  MapPin,
  Calendar,
  Eye,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerName: string;
  phone: string;
  location: string;
  issue: string;
  type: "text" | "image" | "voice";
  status: "pending" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  attachment?: string;
}

// Mock data for demonstration
const mockTickets: SupportTicket[] = [
  {
    id: "1",
    ticketNumber: "#4521",
    customerName: "أحمد محمد",
    phone: "+20 100 123 4567",
    location: "القاهرة - مدينة نصر",
    issue: "مشكلة في التكييف - لا يعمل بشكل صحيح",
    type: "image",
    status: "pending",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    attachment: "/upload/maintenance01.jpg",
  },
  {
    id: "2",
    ticketNumber: "#4520",
    customerName: "سارة علي",
    phone: "+20 101 234 5678",
    location: "الجيزة - الدقي",
    issue: "تسريب مياه في الحمام",
    type: "voice",
    status: "in_progress",
    priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    ticketNumber: "#4519",
    customerName: "محمود حسن",
    phone: "+20 102 345 6789",
    location: "الإسكندرية - سموحة",
    issue: "عطل كهربائي في الإضاءة",
    type: "text",
    status: "resolved",
    priority: "low",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "4",
    ticketNumber: "#4518",
    customerName: "نورا أحمد",
    phone: "+20 103 456 7890",
    location: "القاهرة - المعادي",
    issue: "صيانة دورية للمكيفات",
    type: "text",
    status: "closed",
    priority: "low",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "5",
    ticketNumber: "#4517",
    customerName: "كريم عبدالله",
    phone: "+20 104 567 8901",
    location: "الجيزة - 6 أكتوبر",
    issue: "مشكلة في السباكة - انسداد",
    type: "image",
    status: "pending",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
    attachment: "/upload/maintenance02.jpg",
  },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [tickets] = useState<SupportTicket[]>(mockTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const getStatusBadge = (status: SupportTicket["status"]) => {
    const styles = {
      pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      in_progress: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      closed: "bg-muted text-muted-foreground border-border",
    };
    const labels = isRTL 
      ? { pending: "قيد الانتظار", in_progress: "جاري العمل", resolved: "تم الحل", closed: "مغلق" }
      : { pending: "Pending", in_progress: "In Progress", resolved: "Resolved", closed: "Closed" };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      in_progress: <AlertCircle className="w-3 h-3" />,
      resolved: <CheckCircle2 className="w-3 h-3" />,
      closed: <XCircle className="w-3 h-3" />,
    };
    return (
      <Badge variant="outline" className={`${styles[status]} flex items-center gap-1`}>
        {icons[status]}
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    const styles = {
      low: "bg-muted text-muted-foreground",
      medium: "bg-amber-500/10 text-amber-600",
      high: "bg-destructive/10 text-destructive",
    };
    const labels = isRTL 
      ? { low: "منخفضة", medium: "متوسطة", high: "عالية" }
      : { low: "Low", medium: "Medium", high: "High" };
    return <Badge className={styles[priority]}>{labels[priority]}</Badge>;
  };

  const getTypeIcon = (type: SupportTicket["type"]) => {
    switch (type) {
      case "image": return <Image className="w-4 h-4 text-secondary" />;
      case "voice": return <Mic className="w-4 h-4 text-secondary" />;
      default: return <MessageCircle className="w-4 h-4 text-secondary" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return isRTL ? `منذ ${days} يوم` : `${days}d ago`;
    if (hours > 0) return isRTL ? `منذ ${hours} ساعة` : `${hours}h ago`;
    return isRTL ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customerName.includes(searchQuery) || 
                         ticket.ticketNumber.includes(searchQuery) ||
                         ticket.issue.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === "pending").length,
    inProgress: tickets.filter(t => t.status === "in_progress").length,
    resolved: tickets.filter(t => t.status === "resolved").length,
  };

  return (
    <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isRTL ? "لوحة تحكم التذاكر" : "Tickets Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? "إدارة ومتابعة طلبات الدعم والصيانة" : "Manage and track support and maintenance requests"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "إجمالي التذاكر" : "Total Tickets"}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "قيد الانتظار" : "Pending"}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "جاري العمل" : "In Progress"}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.resolved}</p>
                <p className="text-sm text-muted-foreground">{isRTL ? "تم الحل" : "Resolved"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? "بحث عن تذكرة..." : "Search tickets..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 me-2" />
                  <SelectValue placeholder={isRTL ? "الحالة" : "Status"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? "الكل" : "All"}</SelectItem>
                  <SelectItem value="pending">{isRTL ? "قيد الانتظار" : "Pending"}</SelectItem>
                  <SelectItem value="in_progress">{isRTL ? "جاري العمل" : "In Progress"}</SelectItem>
                  <SelectItem value="resolved">{isRTL ? "تم الحل" : "Resolved"}</SelectItem>
                  <SelectItem value="closed">{isRTL ? "مغلق" : "Closed"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? "التذاكر" : "Tickets"}</CardTitle>
            <CardDescription>
              {isRTL 
                ? `عرض ${filteredTickets.length} من ${tickets.length} تذكرة` 
                : `Showing ${filteredTickets.length} of ${tickets.length} tickets`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isRTL ? "رقم التذكرة" : "Ticket #"}</TableHead>
                    <TableHead>{isRTL ? "العميل" : "Customer"}</TableHead>
                    <TableHead>{isRTL ? "المشكلة" : "Issue"}</TableHead>
                    <TableHead>{isRTL ? "النوع" : "Type"}</TableHead>
                    <TableHead>{isRTL ? "الأولوية" : "Priority"}</TableHead>
                    <TableHead>{isRTL ? "الحالة" : "Status"}</TableHead>
                    <TableHead>{isRTL ? "الوقت" : "Time"}</TableHead>
                    <TableHead>{isRTL ? "إجراءات" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{ticket.customerName}</p>
                            <p className="text-xs text-muted-foreground">{ticket.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{ticket.issue}</TableCell>
                      <TableCell>{getTypeIcon(ticket.type)}</TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatTime(ticket.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align={isRTL ? "start" : "end"}>
                            <DropdownMenuItem onClick={() => setSelectedTicket(ticket)}>
                              <Eye className="w-4 h-4 me-2" />
                              {isRTL ? "عرض التفاصيل" : "View Details"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle2 className="w-4 h-4 me-2" />
                              {isRTL ? "تعيين فني" : "Assign Technician"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="w-4 h-4 me-2" />
                              {isRTL ? "إغلاق التذكرة" : "Close Ticket"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-secondary" />
              {isRTL ? "تفاصيل التذكرة" : "Ticket Details"} {selectedTicket?.ticketNumber}
            </DialogTitle>
            <DialogDescription>
              {isRTL ? "معلومات كاملة عن طلب الدعم" : "Complete support request information"}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTicket && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{selectedTicket.customerName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {selectedTicket.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedTicket.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedTicket.createdAt.toLocaleString(isRTL ? 'ar-EG' : 'en-US')}</span>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">{isRTL ? "وصف المشكلة:" : "Issue Description:"}</p>
                <p className="text-sm text-muted-foreground">{selectedTicket.issue}</p>
              </div>

              {selectedTicket.attachment && (
                <div>
                  <p className="text-sm font-medium mb-2">{isRTL ? "المرفقات:" : "Attachments:"}</p>
                  <img 
                    src={selectedTicket.attachment} 
                    alt="Attachment" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{isRTL ? "نوع الرسالة:" : "Message Type:"}</span>
                <div className="flex items-center gap-1">
                  {getTypeIcon(selectedTicket.type)}
                  <span className="text-sm capitalize">{selectedTicket.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {getStatusBadge(selectedTicket.status)}
                {getPriorityBadge(selectedTicket.priority)}
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  {isRTL ? "تعيين فني" : "Assign Technician"}
                </Button>
                <Button variant="outline" className="flex-1">
                  {isRTL ? "تحديث الحالة" : "Update Status"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;