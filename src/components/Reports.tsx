import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon,
  Calendar as CalendarIcon,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const monthlyData = [
  { name: 'Jan', pemasukan: 45000000, pengeluaran: 38000000 },
  { name: 'Feb', pemasukan: 52000000, pengeluaran: 41000000 },
  { name: 'Mar', pemasukan: 48000000, pengeluaran: 45000000 },
  { name: 'Apr', pemasukan: 61000000, pengeluaran: 48000000 },
];

const categoryData = [
  { name: 'Premium', value: 45 },
  { name: 'Medium', value: 35 },
  { name: 'Ketan', value: 20 },
];

const COLORS = ['#00FF00', '#00CC00', '#009900'];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h1>
          <p className="text-muted-foreground">Analisis performa bisnis SIBERAS</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="w-4 h-4" /> Pilih Periode
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" /> Cetak Laporan
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pemasukan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">Rp 206.000.000</div>
            <div className="flex items-center gap-1 text-xs text-primary mt-1">
              <TrendingUp className="w-3 h-3" /> +15% dari periode lalu
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">Rp 172.000.000</div>
            <div className="flex items-center gap-1 text-xs text-orange-500 mt-1">
              <TrendingUp className="w-3 h-3" /> +8% dari periode lalu
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Laba Bersih</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">Rp 34.000.000</div>
            <div className="flex items-center gap-1 text-xs text-blue-500 mt-1">
              <TrendingUp className="w-3 h-3" /> +24% dari periode lalu
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Arus Kas Bulanan</CardTitle>
            <CardDescription>Perbandingan pemasukan vs pengeluaran</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value/1000000}jt`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  formatter={(value) => `Rp ${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="pemasukan" fill="var(--color-primary)" radius={[4, 4, 0, 0]} name="Pemasukan" />
                <Bar dataKey="pengeluaran" fill="#f97316" radius={[4, 4, 0, 0]} name="Pengeluaran" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Penjualan per Kategori</CardTitle>
            <CardDescription>Distribusi volume penjualan beras</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">Kategori <span className="font-bold text-primary">Premium</span> mendominasi penjualan bulan ini.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
