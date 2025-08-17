import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, DollarSign, TrendingDown, Filter } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category?: string;
}

const FinancialOverview = () => {
  const [activeTab, setActiveTab] = useState("earnings");
  const [expenseFilter, setExpenseFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock data for earnings
  const earnings: Transaction[] = [
    {
      id: "1",
      date: "2023-06-01",
      description: "Airbnb Booking #1234",
      amount: 120.0,
    },
    {
      id: "2",
      date: "2023-06-03",
      description: "Booking.com Reservation #5678",
      amount: 95.5,
    },
    {
      id: "3",
      date: "2023-06-05",
      description: "Trip.com Booking #9012",
      amount: 150.75,
    },
    {
      id: "4",
      date: "2023-06-10",
      description: "Agoda Reservation #3456",
      amount: 85.25,
    },
    {
      id: "5",
      date: "2023-06-15",
      description: "Airbnb Booking #7890",
      amount: 110.0,
    },
  ];

  // Mock data for expenses
  const expenses: Transaction[] = [
    {
      id: "1",
      date: "2023-06-02",
      description: "Toilet Paper",
      amount: 12.99,
      category: "toiletries",
    },
    {
      id: "2",
      date: "2023-06-04",
      description: "Cleaning Service",
      amount: 50.0,
      category: "cleaner payments",
    },
    {
      id: "3",
      date: "2023-06-07",
      description: "All-Purpose Cleaner",
      amount: 8.75,
      category: "cleaning materials",
    },
    {
      id: "4",
      date: "2023-06-09",
      description: "Shampoo and Soap",
      amount: 15.5,
      category: "toiletries",
    },
    {
      id: "5",
      date: "2023-06-12",
      description: "Cleaning Service",
      amount: 50.0,
      category: "cleaner payments",
    },
    {
      id: "6",
      date: "2023-06-14",
      description: "Disinfectant Spray",
      amount: 7.25,
      category: "cleaning materials",
    },
  ];

  // Calculate totals
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalEarnings - totalExpenses;

  // Filter expenses based on selected category
  const filteredExpenses =
    expenseFilter === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === expenseFilter);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-green-500" />
              <span className="text-2xl font-bold">
                ${totalEarnings.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-2xl font-bold">
                ${totalExpenses.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-blue-500" />
              <span className="text-2xl font-bold">
                ${netProfit.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Financial Transactions</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>
                Enter the details of your new transaction below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transaction-type" className="text-right">
                  Type
                </Label>
                <Select defaultValue="earning">
                  <SelectTrigger id="transaction-type" className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earning">Earning</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select defaultValue="">
                  <SelectTrigger id="category" className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="toiletries">Toiletries</SelectItem>
                    <SelectItem value="cleaning materials">
                      Cleaning Materials
                    </SelectItem>
                    <SelectItem value="cleaner payments">
                      Cleaner Payments
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setDialogOpen(false)}>
                Save Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earnings.map((earning) => (
                    <TableRow key={earning.id}>
                      <TableCell>{earning.date}</TableCell>
                      <TableCell>{earning.description}</TableCell>
                      <TableCell className="text-right font-medium">
                        ${earning.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <Select value={expenseFilter} onValueChange={setExpenseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="toiletries">Toiletries</SelectItem>
                  <SelectItem value="cleaning materials">
                    Cleaning Materials
                  </SelectItem>
                  <SelectItem value="cleaner payments">
                    Cleaner Payments
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${expense.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialOverview;
