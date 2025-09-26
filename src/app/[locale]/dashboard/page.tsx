"use client"
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Target, 
  PieChart, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Minus,
  CheckCircleIcon,
  
} from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { AreaChart, CartesianGrid, XAxis, Area, YAxis, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { progressPercentage } from 'motion/react';

const AnalyticsDashboard = () => {
  const [timeRange,  setTimeRange] = useState("90d");
  const [hideSensitiveData, setHideSensitiveData] = useState(false);
  const [activeTab, setActiveTab] =  useState("overview")

  // sample data merely for demonstrations ( write  this in my frontend book )
  const chartData = useMemo(() => {
    const days = [];
    const currentDate  = new Date();
    const daysToShow = timeRange  ===  "7d"  ? 7 : timeRange ===  "30d" ? 30  : 90;

    for (let i = daysToShow -  1;  i >= 0;  i--){
      const date = new Date(currentDate);
      date.setDate(date.getDate() - 1);

      // genereate realistic sample data
      const baseIncome = Math.random() * 200 + 50;  // $50  - $250 per day
      const baseExpense = Math.random() * 150 + 30; // $30 - 180 per day
      
      days.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: "short"}),
        income: Math.round(baseIncome * 100) / 100,
        expenses: Math.round(baseExpense * 100) / 100,
      });
    }
    return days;
  },  [timeRange])


const categoryData = [
  { name: "Housing", value: 1200, color: "#ef4444"},
  { name: "Food", value: 800, color: "#f97316"},
  { name: "Transportation", value: 400, color: "#eab308"},
  { name: "Entertainment", value:  300, color: "22c55e"},
  { name: "Shopping", value: 250, color: "#3b82f6"},
  { name: "Other",  value: 150, color: "#8b5cf6"},
];

const budgetData = [
  { category: "Housing", budgeted: 1200, spent: 1150, percentage: 95.8},
  { category: "Food", budgeted: 800,  spent: 920, percentage: 115},
  { category: "Transportation", budgeted: 400, spent: 380, percentage:  95},
  { category:  "Entertainement", budgeted: 300, spent: 450, percentage: 150},
  { category:  "Shopping", budgeted: 250, spent:  180, percentage: 72},
];

const monthlyTotals = useMemo(() => ({
  income: chartData.reduce((sum, day) => sum + day.income, + 0),
  expenses: chartData.reduce((sum, day) => sum  + day.expenses, + 0),
}), [chartData])


const  formatCurrency = (amount : any) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const  chartConfig = {
  income: {
    label: "Income",
    color: "#22c55e",
  },
  expenses: {
    label: "Expenses",
    color: "#ef4444",
  },
};

const getBudgetStatus = (percentage) => {
  if (percentage > 100) return  { status: "over", color: "destructive", icon: AlertTriangle};
  if (percentage > 80) return { status:  "warning", color: "secondary", icon: Minus};
  return  { status: "good", color: "default", icon: CheckCircleIcon};
};

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    {/* Navigation */}
    <nav className=" bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 pt-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm"> 
                  <Image 
                  src="/budgetLogo.png"
                  alt="Simplicty Logo"
                  width={300}
                  height={300}
                  className=""></Image>
                   </span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard Analytics</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => setHideSensitiveData(!hideSensitiveData)}
                className='flex items-center gap-2'
              >
                {hideSensitiveData ?  <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" /> }
                {hideSensitiveData ? "Show" : "Hide"} Data
              </Button>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="W-[140px]">
                <SelectValue placeholder="Time Frame"/>
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
            >
              <Download className="w-4 h-4 mr-2" />
            </Button>
            </div>

          </div>
        </div>
      </nav>

  </div>
)































}

export default AnalyticsDashboard;