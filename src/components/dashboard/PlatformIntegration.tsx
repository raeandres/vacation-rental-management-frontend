import React, { useState } from "react";
import {
  Plus,
  Trash2,
  RefreshCw,
  Check,
  X,
  Settings,
  Cloud,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const PlatformIntegration = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [platforms, setPlatforms] = useState<Platform[]>([
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

  const [syncInProgress, setSyncInProgress] = useState(false);
  const [cloudStorage, setCloudStorage] = useState({
    enabled: true,
    provider: "google-drive",
    autoBackup: true,
    lastBackup: "2023-05-15T12:00:00",
  });

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

  const handleSync = () => {
    setSyncInProgress(true);
    // Simulate sync process
    setTimeout(() => {
      setSyncInProgress(false);
      // Update last sync time for all connected platforms
      setPlatforms(
        platforms.map((platform) => {
          if (platform.status === "connected") {
            return { ...platform, lastSync: new Date().toISOString() };
          }
          return platform;
        }),
      );
    }, 2000);
  };

  const togglePlatformStatus = (id: string) => {
    setPlatforms(
      platforms.map((platform) => {
        if (platform.id === id) {
          const newStatus =
            platform.status === "connected" ? "disconnected" : "connected";
          return { ...platform, status: newStatus };
        }
        return platform;
      }),
    );
  };

  const toggleAutoSync = (id: string) => {
    setPlatforms(
      platforms.map((platform) => {
        if (platform.id === id) {
          return { ...platform, autoSync: !platform.autoSync };
        }
        return platform;
      }),
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Platform Integration</h2>
          <p className="text-gray-500">
            Manage your connected booking platforms
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus size={16} />
                Add Platform
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Platform</DialogTitle>
                <DialogDescription>
                  Connect a new booking platform to your dashboard.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="platform" className="text-right">
                    Platform
                  </Label>
                  <Select defaultValue="other">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="booking">Booking.com</SelectItem>
                      <SelectItem value="trip">Trip.com</SelectItem>
                      <SelectItem value="agoda">Agoda</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-key" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    className="col-span-3"
                    placeholder="Enter your API key"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-secret" className="text-right">
                    API Secret
                  </Label>
                  <Input
                    id="api-secret"
                    type="password"
                    className="col-span-3"
                    placeholder="Enter your API secret"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="auto-sync" className="text-right">
                    Auto Sync
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="auto-sync" defaultChecked />
                    <Label htmlFor="auto-sync">
                      Enable automatic synchronization
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Connect Platform</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="default"
            onClick={handleSync}
            disabled={syncInProgress}
            className="flex items-center gap-2"
          >
            <RefreshCw
              size={16}
              className={syncInProgress ? "animate-spin" : ""}
            />
            {syncInProgress ? "Syncing..." : "Sync Now"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <Card
              key={platform.id}
              className={`overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                selectedPlatform === platform.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() =>
                setSelectedPlatform(
                  selectedPlatform === platform.id ? null : platform.id,
                )
              }
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-md overflow-hidden">
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className={getStatusColor(platform.status)}
                      >
                        {platform.status.charAt(0).toUpperCase() +
                          platform.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Settings size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-gray-500">
                  <p>Last synced: {formatDate(platform.lastSync)}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`auto-sync-${platform.id}`}
                    checked={platform.autoSync}
                    onCheckedChange={(checked) => {
                      toggleAutoSync(platform.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    disabled={platform.status !== "connected"}
                  />
                  <Label
                    htmlFor={`auto-sync-${platform.id}`}
                    className="text-sm"
                  >
                    Auto Sync
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlatformStatus(platform.id);
                  }}
                  className="flex items-center gap-1"
                >
                  {platform.status === "connected" ? (
                    <>
                      <X size={14} />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      Connect
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {platforms.some((p) => p.status === "error") && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              One or more platforms have connection errors. Please check your
              API credentials and try reconnecting.
            </AlertDescription>
          </Alert>
        )}

        {/* Listings Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {getSelectedPlatformName()} Listings
              </h3>
              <p className="text-muted-foreground">
                {selectedPlatform
                  ? `Showing listings for ${getSelectedPlatformName()}`
                  : "Showing all listings across platforms"}
              </p>
            </div>
            <div className="flex gap-2">
              {selectedPlatform && (
                <Button
                  variant="outline"
                  onClick={() => setSelectedPlatform(null)}
                >
                  Show All Platforms
                </Button>
              )}
              <Button>
                <Plus size={16} className="mr-2" />
                Add Listing
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Guest Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredListings().length > 0 ? (
                      getFilteredListings().map((listing) => (
                        <TableRow key={listing.id}>
                          <TableCell className="font-medium">
                            {listing.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={getListingStatusColor(listing.status)}
                            >
                              {listing.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{listing.guestName || "-"}</TableCell>
                          <TableCell>{listing.dateRange}</TableCell>
                          <TableCell className="text-right">
                            {listing.currency} {listing.rate}/day
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Settings size={16} />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Edit Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Duplicate Listing
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Delete Listing
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-gray-500"
                        >
                          No listings found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlatformIntegration;
