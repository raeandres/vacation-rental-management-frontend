import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Calendar,
  DollarSign,
  BarChart3,
  Globe,
  Settings,
  Menu,
} from "lucide-react";
import BookingTable from "./dashboard/BookingTable";
import FinancialOverview from "./dashboard/FinancialOverview";
import AnalyticsPanel from "./dashboard/AnalyticsPanel";
import PlatformIntegration from "./dashboard/PlatformIntegration";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock data for summary cards
  const summaryData = {
    totalBookings: 24,
    occupancyRate: 78,
    totalRevenue: 8750,
    pendingInquiries: 5,
  };

  const NavigationContent = () => (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Host Dashboard</h2>
        <p className="text-muted-foreground text-sm">Manage your properties</p>
      </div>

      <nav className="space-y-2 flex-1">
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("dashboard");
            setIsMobileMenuOpen(false);
          }}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button
          variant={activeTab === "bookings" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("bookings");
            setIsMobileMenuOpen(false);
          }}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Bookings
        </Button>
        <Button
          variant={activeTab === "finances" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("finances");
            setIsMobileMenuOpen(false);
          }}
        >
          <DollarSign className="mr-2 h-4 w-4" />
          Finances
        </Button>
        <Button
          variant={activeTab === "analytics" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("analytics");
            setIsMobileMenuOpen(false);
          }}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </Button>
        <Button
          variant={activeTab === "platforms" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("platforms");
            setIsMobileMenuOpen(false);
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Platform Settings
        </Button>
      </nav>

      <div className="mt-auto pt-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            HH
          </div>
          <div>
            <p className="font-medium text-sm">Host Name</p>
            <p className="text-xs text-muted-foreground">host@example.com</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 border-r bg-card p-4 flex-col">
        <NavigationContent />
      </div>

      {/* Mobile Navigation */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40 bg-background border shadow-md"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 flex flex-col">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">Navigation</SheetTitle>
          </SheetHeader>
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 lg:p-6 pt-16 lg:pt-6">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summaryData.totalBookings}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Occupancy Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summaryData.occupancyRate}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${summaryData.totalRevenue}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {summaryData.pendingInquiries}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Needs attention
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid grid-cols-1 sm:grid-cols-4 mb-6">
                <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
                <TabsTrigger value="finances">Financial Summary</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="platforms">Platform Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>
                      View and manage your latest bookings across all platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookingTable />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="finances" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>
                      Track your earnings and expenses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FinancialOverview />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>
                      Visualize your booking and financial data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsPanel />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>
                      Manage your connected booking platforms and listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PlatformIntegration />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Booking Management</h1>
            <BookingTable />
          </div>
        )}

        {activeTab === "finances" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Financial Tracking</h1>
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                  Detailed view of your earnings and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FinancialOverview />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <Card>
              <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
                <CardDescription>Interactive charts and graphs</CardDescription>
              </CardHeader>
              <CardContent>
                <AnalyticsPanel />
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "platforms" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Platform Settings</h1>
            <PlatformIntegration />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
