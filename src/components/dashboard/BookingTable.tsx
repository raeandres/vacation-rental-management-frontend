import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Eye, MessageSquare, MoreHorizontal, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

  const formatDate = (dateString: string) => {
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

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Booking Management</CardTitle>
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
                    <TableCell>{formatDate(booking.checkIn)}</TableCell>
                    <TableCell>{formatDate(booking.checkOut)}</TableCell>
                    <TableCell>{getPlatformBadge(booking.platform)}</TableCell>
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
  );
};

export default BookingTable;
