import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package as PackageIcon, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from './ui/button';
import { getBusinessInsight } from '../lib/gemini';
import { toast } from 'sonner';

const data = [
  { name: 'Sen', sales: 4000, stock: 2400 },
  { name: 'Sel', sales: 3000, stock: 1398 },
  { name: 'Rab', sales: 2000, stock: 9800 },
  { name: 'Kam', sales: 2780, stock: 3908 },
  { name: 'Jum', sales: 1890, stock: 4800 },
  { name: 'Sab', sales: 2390, stock: 3800 },
  { name: 'Min', sales: 3490, stock: 4300 },
];

export function Dashboard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const handleGetInsight = async () => {
    setIsLoadingInsight(true);
    const result = await getBusinessInsight(data);
    setInsight(result);
    setIsLoadingInsight(false);
    toast.success('Insight Bisnis AI Berhasil Dibuat');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Selamat datang kembali di SIBERAS</p>
        </div>
        <Button 
          onClick={handleGetInsight} 
          disabled={isLoadingInsight}
          className="gap-2 bg-gradient-to-r from-primary to-green-600 hover:opacity-90 transition-opacity"
        >
          {isLoadingInsight ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          AI Business Insight
        </Button>
      </div>

      {insight && (
        <Card className="bg-primary/10 border-primary/30 animate-in fade-in slide-in-from-top-4 duration-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Saran AI DigiScript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{insight}</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.450.000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-primary flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
              dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stok Beras</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.240 Kg</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-blue-500 flex items-center">
                <ArrowDownRight className="w-3 h-3" /> -4%
              </span>
              dari minggu lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Masuk</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-primary flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +8
              </span>
              hari ini
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaksi Keluar</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-orange-500 flex items-center">
                <ArrowUpRight className="w-3 h-3" /> +12
              </span>
              hari ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Grafik Penjualan Mingguan</CardTitle>
            <CardDescription>Visualisasi performa penjualan 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `Rp ${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  itemStyle={{ color: 'var(--color-primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Stok Beras Terlaris</CardTitle>
            <CardDescription>Perbandingan stok beras populer</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="stock" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
