import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  MessageSquare,
  MoreHorizontal,
  Search,
  Plus,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Booking {
  id: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  platform: "Airbnb" | "Trip.com" | "Booking.com" | "Agoda";
  status: "paid" | "inquiry" | "cancelled";
  amount: number;
  guests: number;
  property: string;
}

interface Platform {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  autoSync: boolean;
}

interface Listing {
  id: string;
  name: string;
  platformId: string;
  status: "Currently Hosting" | "Available";
  guestName: string | null;
  dateRange: string;
  rate: number;
  currency: string;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    guestName: "John Smith",
    checkIn: "2023-10-15",
    checkOut: "2023-10-20",
    platform: "Airbnb",
    status: "paid",
    amount: 750,
    guests: 2,
    property: "Seaside Villa",
  },
  {
    id: "2",
    guestName: "Maria Garcia",
    checkIn: "2023-10-22",
    checkOut: "2023-10-25",
    platform: "Booking.com",
    status: "inquiry",
    amount: 450,
    guests: 3,
    property: "Downtown Loft",
  },
  {
    id: "3",
    guestName: "Robert Chen",
    checkIn: "2023-11-01",
    checkOut: "2023-11-07",
    platform: "Trip.com",
    status: "paid",
    amount: 1200,
    guests: 4,
    property: "Mountain Cabin",
  },
  {
    id: "4",
    guestName: "Sarah Johnson",
    checkIn: "2023-11-10",
    checkOut: "2023-11-15",
    platform: "Agoda",
    status: "cancelled",
    amount: 600,
    guests: 2,
    property: "City Apartment",
  },
  {
    id: "5",
    guestName: "David Wilson",
    checkIn: "2023-11-18",
    checkOut: "2023-11-22",
    platform: "Airbnb",
    status: "paid",
    amount: 800,
    guests: 5,
    property: "Lakeside Cottage",
  },
];

const statusColors = {
  paid: "bg-green-100 text-green-800",
  inquiry: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

const platformColors = {
  Airbnb: "bg-rose-100 text-rose-800",
  "Trip.com": "bg-blue-100 text-blue-800",
  "Booking.com": "bg-indigo-100 text-indigo-800",
  Agoda: "bg-purple-100 text-purple-800",
};

const BookingTable = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const [platforms] = useState<Platform[]>([
    {
      id: "1",
      name: "Airbnb",
      logo: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=100&q=80",
      status: "connected",
      lastSync: "2023-05-15T10:30:00",
      autoSync: true,
    },
    {
      id: "2",
      name: "Trip.com",
      logo: "https://images.unsplash.com/photo-1619468129361-605ebea04b44?w=100&q=80",
      status: "connected",
      lastSync: "2023-05-14T14:45:00",
      autoSync: true,
    },
    {
      id: "3",
      name: "Booking.com",
      logo: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&q=80",
      status: "error",
      lastSync: "2023-05-10T09:15:00",
      autoSync: false,
    },
    {
      id: "4",
      name: "Agoda",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&q=80",
      status: "disconnected",
      lastSync: "2023-05-01T16:20:00",
      autoSync: false,
    },
  ]);

  const [listings] = useState<Listing[]>([
    {
      id: "1",
      name: "Cozy home in Eastwood",
      platformId: "1",
      status: "Currently Hosting",
      guestName: "John Smith",
      dateRange: "May 15 - May 20, 2023",
      rate: 120,
      currency: "USD",
    },
    {
      id: "2",
      name: "Muji home in Eastwood",
      platformId: "1",
      status: "Available",
      guestName: null,
      dateRange: "Available until Jun 1, 2023",
      rate: 95,
      currency: "USD",
    },
    {
      id: "3",
      name: "Modern Apartment Downtown",
      platformId: "2",
      status: "Currently Hosting",
      guestName: "Sarah Johnson",
      dateRange: "May 10 - May 25, 2023",
      rate: 150,
      currency: "USD",
    },
    {
      id: "4",
      name: "Luxury Villa by the Beach",
      platformId: "3",
      status: "Available",
      guestName: null,
      dateRange: "Available until Jul 15, 2023",
      rate: 300,
      currency: "USD",
    },
    {
      id: "5",
      name: "Studio in Arts District",
      platformId: "4",
      status: "Currently Hosting",
      guestName: "Mike Chen",
      dateRange: "May 8 - May 22, 2023",
      rate: 80,
      currency: "USD",
    },
    {
      id: "6",
      name: "Garden View Apartment",
      platformId: "1",
      status: "Available",
      guestName: null,
      dateRange: "Available until Aug 10, 2023",
      rate: 110,
      currency: "USD",
    },
  ]);

  const formatBookingDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "inquiry":
        return <Badge className="bg-blue-100 text-blue-800">Inquiry</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getPlatformBadge = (platform: string) => {
    const colorClass =
      platformColors[platform as keyof typeof platformColors] ||
      "bg-gray-100 text-gray-800";
    return <Badge className={colorClass}>{platform}</Badge>;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800";
      case "disconnected":
        return "bg-gray-100 text-gray-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getListingStatusColor = (status: string) => {
    switch (status) {
      case "Currently Hosting":
        return "bg-blue-100 text-blue-800";
      case "Available":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFilteredListings = () => {
    if (!selectedPlatform) return listings;
    return listings.filter(
      (listing) => listing.platformId === selectedPlatform,
    );
  };

  const getSelectedPlatformName = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform);
    return platform ? platform.name : "All Platforms";
  };

  const formatSyncDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Booking Management
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by guest or property..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="inquiry">Inquiries</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.guestName}
                      </TableCell>
                      <TableCell>{booking.property}</TableCell>
                      <TableCell>
                        {formatBookingDate(booking.checkIn)}
                      </TableCell>
                      <TableCell>
                        {formatBookingDate(booking.checkOut)}
                      </TableCell>
                      <TableCell>
                        {getPlatformBadge(booking.platform)}
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="text-right">
                        ${booking.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message Guest
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-gray-500"
                    >
                      No bookings found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingTable;
