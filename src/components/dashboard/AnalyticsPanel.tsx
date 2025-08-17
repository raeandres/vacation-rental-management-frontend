import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DownloadIcon, LineChart, BarChart, PieChart } from "lucide-react";

interface ChartProps {
  type: "booking" | "financial";
  period: "week" | "month" | "year";
}

const BookingChart = ({
  period = "month",
}: {
  period?: "week" | "month" | "year";
}) => {
  return (
    <div className="w-full h-64 bg-background border rounded-md flex items-center justify-center relative">
      <LineChart className="w-12 h-12 text-muted-foreground/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Booking data visualization for {period} period
        </p>
      </div>
    </div>
  );
};

const OccupancyChart = ({
  period = "month",
}: {
  period?: "week" | "month" | "year";
}) => {
  return (
    <div className="w-full h-64 bg-background border rounded-md flex items-center justify-center relative">
      <BarChart className="w-12 h-12 text-muted-foreground/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Occupancy rate visualization for {period} period
        </p>
      </div>
    </div>
  );
};

const RevenueChart = ({
  period = "month",
}: {
  period?: "week" | "month" | "year";
}) => {
  return (
    <div className="w-full h-64 bg-background border rounded-md flex items-center justify-center relative">
      <LineChart className="w-12 h-12 text-muted-foreground/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Revenue streams visualization for {period} period
        </p>
      </div>
    </div>
  );
};

const ExpenseChart = ({
  period = "month",
}: {
  period?: "week" | "month" | "year";
}) => {
  return (
    <div className="w-full h-64 bg-background border rounded-md flex items-center justify-center relative">
      <PieChart className="w-12 h-12 text-muted-foreground/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Expense breakdown visualization for {period} period
        </p>
      </div>
    </div>
  );
};

const AnalyticsPanel = () => {
  const [activeTab, setActiveTab] = useState<"booking" | "financial">(
    "booking",
  );
  const [timePeriod, setTimePeriod] = useState<"week" | "month" | "year">(
    "month",
  );

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>
            Visualize your booking and financial data
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={timePeriod}
            onValueChange={(value) =>
              setTimePeriod(value as "week" | "month" | "year")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "booking" | "financial")
          }
        >
          <TabsList className="grid w-[400px] grid-cols-2 mb-6">
            <TabsTrigger value="booking">Booking Data</TabsTrigger>
            <TabsTrigger value="financial">Financial Data</TabsTrigger>
          </TabsList>
          <TabsContent value="booking" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Booking Trends</h3>
                <BookingChart period={timePeriod} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Occupancy Rates</h3>
                <OccupancyChart period={timePeriod} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">
                Platform Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {["Airbnb", "Trip.com", "Booking.com", "Agoda"].map(
                  (platform) => (
                    <Card key={platform} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">{platform}</div>
                        <div className="text-2xl font-bold mt-1">
                          {Math.floor(Math.random() * 30)}%
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Revenue Streams</h3>
                <RevenueChart period={timePeriod} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Expense Breakdown</h3>
                <ExpenseChart period={timePeriod} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-3">Expense Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Toiletries", "Cleaning Materials", "Cleaner Payments"].map(
                  (category) => (
                    <Card key={category} className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">{category}</div>
                        <div className="text-2xl font-bold mt-1">
                          ${Math.floor(Math.random() * 500)}
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
