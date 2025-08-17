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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Platform {
  id: string;
  name: string;
  logo: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  autoSync: boolean;
}

const PlatformIntegration = () => {
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

      <Tabs defaultValue="platforms">
        <TabsList className="mb-4">
          <TabsTrigger value="platforms">Connected Platforms</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platforms.map((platform) => (
              <Card key={platform.id} className="overflow-hidden">
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
                        <CardTitle className="text-lg">
                          {platform.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={getStatusColor(platform.status)}
                        >
                          {platform.status.charAt(0).toUpperCase() +
                            platform.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
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
                      onCheckedChange={() => toggleAutoSync(platform.id)}
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
                    onClick={() => togglePlatformStatus(platform.id)}
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
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                One or more platforms have connection errors. Please check your
                API credentials and try reconnecting.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="cloud" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Cloud size={20} />
                    Cloud Storage Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure cloud storage to access your data from any device
                  </CardDescription>
                </div>
                <Switch
                  checked={cloudStorage.enabled}
                  onCheckedChange={() =>
                    setCloudStorage({
                      ...cloudStorage,
                      enabled: !cloudStorage.enabled,
                    })
                  }
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <Label>Storage Provider</Label>
                  </div>
                  <div className="col-span-3">
                    <Select
                      value={cloudStorage.provider}
                      onValueChange={(value) =>
                        setCloudStorage({ ...cloudStorage, provider: value })
                      }
                      disabled={!cloudStorage.enabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google-drive">
                          Google Drive
                        </SelectItem>
                        <SelectItem value="dropbox">Dropbox</SelectItem>
                        <SelectItem value="onedrive">OneDrive</SelectItem>
                        <SelectItem value="icloud">iCloud</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <Label>Auto Backup</Label>
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={cloudStorage.autoBackup}
                        onCheckedChange={() =>
                          setCloudStorage({
                            ...cloudStorage,
                            autoBackup: !cloudStorage.autoBackup,
                          })
                        }
                        disabled={!cloudStorage.enabled}
                      />
                      <Label>Enable automatic backup</Label>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Last backup: {formatDate(cloudStorage.lastBackup)}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <Label>Sync Frequency</Label>
                  </div>
                  <div className="col-span-3">
                    <Select
                      defaultValue="daily"
                      disabled={
                        !cloudStorage.enabled || !cloudStorage.autoBackup
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" disabled={!cloudStorage.enabled}>
                Reset Configuration
              </Button>
              <Button disabled={!cloudStorage.enabled}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformIntegration;
