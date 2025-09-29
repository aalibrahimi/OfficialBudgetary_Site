"use client";
import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  CreditCard,
  Target,
  ArrowUpRight,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("90d");
  const [hideSensitiveData, setHideSensitiveData] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // sample data merely for demonstrations ( write  this in my frontend book )
  const chartData = useMemo(() => {
    const days = [];
    const currentDate = new Date();
    const daysToShow = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 1);

      // genereate realistic sample data
      const baseIncome = Math.random() * 200 + 50; // $50  - $250 per day
      const baseExpense = Math.random() * 150 + 30; // $30 - 180 per day

      days.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        income: Math.round(baseIncome * 100) / 100,
        expenses: Math.round(baseExpense * 100) / 100,
      });
    }
    return days;
  }, [timeRange]);

  const categoryData = [
    { name: "Housing", value: 1200, color: "#ef4444" },
    { name: "Food", value: 800, color: "#f97316" },
    { name: "Transportation", value: 400, color: "#eab308" },
    { name: "Entertainment", value: 300, color: "22c55e" },
    { name: "Shopping", value: 250, color: "#3b82f6" },
    { name: "Other", value: 150, color: "#8b5cf6" },
  ];

  const budgetData = [
    { category: "Housing", budgeted: 1200, spent: 1150, percentage: 95.8 },
    { category: "Food", budgeted: 800, spent: 920, percentage: 115 },
    { category: "Transportation", budgeted: 400, spent: 380, percentage: 95 },
    { category: "Entertainement", budgeted: 300, spent: 450, percentage: 150 },
    { category: "Shopping", budgeted: 250, spent: 180, percentage: 72 },
  ];

  const monthlyTotals = useMemo(
    () => ({
      income: chartData.reduce((sum, day) => sum + day.income, +0),
      expenses: chartData.reduce((sum, day) => sum + day.expenses, +0),
    }),
    [chartData]
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const chartConfig = {
    income: {
      label: "Income",
      color: "#22c55e",
    },
    expenses: {
      label: "Expenses",
      color: "#ef4444",
    },
  };

  // const getBudgetStatus = (percentage) => {
  //   if (percentage > 100)
  //     return { status: "over", color: "destructive", icon: AlertTriangle };
  //   if (percentage > 80)
  //     return { status: "warning", color: "secondary", icon: Minus };
  //   return { status: "good", color: "default", icon: CheckCircleIcon };
  // };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Navigation */}

      <div className="max-7xl mx-auto  px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex not-sm:flex-col not-sm:gap-6 items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Financial Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Comprehensive insights into your financial health and spending
                patterns
              </p>
            </div>
            <div className="flex items-center not-sm:self-start space-x-4">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setHideSensitiveData(!hideSensitiveData)}
                className="flex items-center gap-2 min-h-9 bg-zinc-100 dark:bg-teal-800/40"
              >
                {hideSensitiveData ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {hideSensitiveData ? "Show" : "Hide"} Data
              </Button>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="W-[140px] min-h-9">
                  <SelectValue placeholder="Time Frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={"outline"}
                size={"sm"}
                className="bg-transparent min-h-9"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>

            {/*     <div className="flex items-center space-x-2">
              <Button variant={"outline"} size={"sm"}>
                {" "}
                <RefreshCw className="w-4 h-4 mr-2" /> Refresh{" "}
              </Button>
              <Button variant={"outline"} size={"sm"}>
                {" "}
                <Filter className="w-4 h-4 mr-2" /> Filters{" "}
              </Button>
            </div> */}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Expense */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {" "}
                Total Income{" "}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="">
              <div className="text-2xl font-bold text-green-600">
                {hideSensitiveData
                  ? "••••"
                  : formatCurrency(monthlyTotals.income)}
              </div>
              <div className="flex items-center space-x-2 text-xs  text-muted-foreground">
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                <span>+12.5% from last period</span>
              </div>
            </CardContent>
          </Card>

          {/* Total Income */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm  font-medium">
                {" "}
                Total Expenses
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-red-500 text-2xl font-bold">
                {hideSensitiveData
                  ? "••••"
                  : formatCurrency(monthlyTotals.expenses)}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <TrendingDown className="text-red-500 h-3 w-3" />
                <span>+5.2% from last period</span>
              </div>
            </CardContent>
          </Card>

          {/* Net Amount */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Amount</CardTitle>
              <Target className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${monthlyTotals.income - monthlyTotals.expenses >= 0 ? "text-green-600" : "text-red-600"} `}
              >
                {hideSensitiveData
                  ? "••••"
                  : formatCurrency(
                      monthlyTotals.income - monthlyTotals.expenses
                    )}
              </div>
            </CardContent>
          </Card>

          {/* Savings Rate */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Savings Rate
              </CardTitle>
              <Target className="w-4 h-4" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${monthlyTotals.income - monthlyTotals.expenses >= 0 ? "text-green-600" : "text-red-600"} `}
              >
                {hideSensitiveData
                  ? "••••"
                  : `${(((monthlyTotals.income - monthlyTotals.expenses) / monthlyTotals.income) * 100).toFixed(1)}%`}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {/*turn arrow up into a terning operrator with down arrow too */}
                <ArrowUpRight className="w-3 h-3 text-green-500" />
                <span>Target: 20% +</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4 rounded-xs  "
        >
          <TabsList className="grid-full grid-cols-4 gap-6 rounded-xs [&_button]:rounded-xs">
            <TabsTrigger value="overview">OverView</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="col-span-3">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>
                    Daily Financial activity for the selected period
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                {/* Main Chart */}
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[400px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 12, right: 12 }}
                  >
                    {/* <defs> A container for reusable SVG elements (like gradients, patterns, clip paths). Anything inside <defs> doesn’t render by itself it’s just a definition. */}
                    <defs>
                      {/* linearGradient Defines a gradient fill that can be applied later (for example, to an area chart or bar chart) */}
                      {/* x1="0" y1="0" x2="0" y2="1" → direction of the gradient (top → bottom). */}
                      <linearGradient
                        id="fillIncome"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-income)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-income)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillExpenses"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        {/* offset="5%" → position of the stop (5% from the top). */}
                        <stop
                          offset="5%"
                          stopColor="var(--color-expenses)"
                          stopOpacity={0.8}
                        />
                        {/* At 5% down, the gradient color is strong (opacity 0.8).  At 95% down, the gradient fades (opacity 0.1).*/}
                        <stop
                          offset="95%"
                          stopColor="var(--color-expenses)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      {/* basically im definting the color, the positioning of the graphs, and high and low it can go before stopping */}
                    </defs>

                    <CartesianGrid vertical={false} />
                    {/* Optimizing how I want to display the x axis, the gap, date formatted, removing tick lines */}
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <Area
                      dataKey="expenses"
                      type="natural"
                      fill="url(#fillExpenses)"
                      stroke="var(--color-expenses)"
                      stackId="a"
                    />

                    <Area
                      dataKey="income"
                      type="natural"
                      fill="url(#fillIncome)"
                      stroke="var(--color-income)"
                      stackId="a"
                    />

                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/*  CashFlow Card - under Main graph -  */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Inflows
                      </span>
                      <span className="font-medium text-green-600">
                        {hideSensitiveData
                          ? "••••"
                          : formatCurrency(monthlyTotals.income)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Outflows
                      </span>
                      <span className="font-medium text-red-600">
                        {hideSensitiveData
                          ? "••••"
                          : formatCurrency(monthlyTotals.expenses)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Net Flow</span>
                      <span
                        className={`font-bold ${monthlyTotals.income - monthlyTotals.expenses >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {hideSensitiveData
                          ? "••••"
                          : formatCurrency(
                              monthlyTotals.income - monthlyTotals.expenses
                            )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Top categories Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.slice(0, 3).map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm">{category.name} </span>
                        </div>
                        <span className="font-medium">
                          {hideSensitiveData
                            ? "••••"
                            : formatCurrency(category.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Budget Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        On Track
                      </span>
                      <Badge
                        variant={"default"}
                        className="bg-gree-100 text-green-800"
                      >
                        3 Categories
                      </Badge>
                    </div>
                    <div className="flex item-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Over Budget
                      </span>
                      <Badge variant={"destructive"}>2 Categories </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total Variance
                      </span>
                      <span className="font-medium text-red-600">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Spending Trend</CardTitle>
                  <CardDescription>
                    Month-over-month spending analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="expenses"
                        fill="var(--color-expenses)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Income Trend</CardTitle>
                  <CardDescription>
                    Month-over-month income analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="income"
                        fill="var(--color-income)"
                        radius={[2, 2, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of spending by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={chartConfig}
                    className="h-[300px] w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Categories Tab */}

              <Card>
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                  <CardDescription>
                    Detailed breakdown with percentages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryData.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {hideSensitiveData
                              ? "••••"
                              : formatCurrency(category.value)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {(
                              (category.value /
                                categoryData.reduce(
                                  (sum, cat) => sum + cat.value,
                                  0
                                )) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Budget Tab */}
          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Spending</CardTitle>
                <CardDescription>
                  Track your spending against your budget goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {budgetData.map((item) => {
                    // const status = getBudgetStatus(item.percentage);
                    // const StatusIcon = status.icon;

                    return (
                      <div key={item.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{item.category}</span>
                            {/* <StatusIcon className="w-4 h-4" /> */}
                            <Badge
                              variant={
                                item.percentage > 50 ? "destructive" : "outline"
                              }
                            >
                              {item.percentage.toFixed(0)}%
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              {hideSensitiveData
                                ? "••••"
                                : formatCurrency(item.spent)}{" "}
                              /{" "}
                              {hideSensitiveData
                                ? "••••"
                                : formatCurrency(item.budgeted)}
                            </div>
                          </div>
                        </div>
                        <Progress
                          value={Math.min(item.percentage, 100)}
                          className={`h-2 ${item.percentage > 100 ? "[&>div]:bg-red-500" : "[&>div]:bg-green-500"}`}
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>
                            Remaining:{" "}
                            {hideSensitiveData
                              ? "••••"
                              : formatCurrency(
                                  Math.max(0, item.budgeted - item.spent)
                                )}
                          </span>
                          <span>
                            {item.percentage > 100 ? "Over by " : ""}
                            {hideSensitiveData
                              ? "••••"
                              : formatCurrency(
                                  Math.abs(item.budgeted - item.spent)
                                )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
