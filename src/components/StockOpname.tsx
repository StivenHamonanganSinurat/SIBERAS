import { useState } from 'react';
import { 
  ClipboardCheck, 
  Search, 
  Plus,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Badge } from './ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { StockOpname, Product } from '../types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const products: Product[] = [
  { id: '1', name: 'Beras Pandan Wangi', stock: 500, wholesale_price: 12000, retail_price: 14000, category: 'Premium', unit: 'Kg' },
  { id: '2', name: 'Beras Rojo Lele', stock: 300, wholesale_price: 11000, retail_price: 13000, category: 'Medium', unit: 'Kg' },
  { id: '3', name: 'Beras Setra Ramos', stock: 800, wholesale_price: 10500, retail_price: 12500, category: 'Medium', unit: 'Kg' },
];

const initialOpnames: StockOpname[] = [
  { id: '1', product_id: '1', system_stock: 500, actual_stock: 498, difference: -2, date: new Date().toISOString(), note: 'Rusak dimakan tikus' },
];

export function StockOpnameView() {
  const [opnames, setOpnames] = useState<StockOpname[]>(initialOpnames);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newOpname, setNewOpname] = useState<Partial<StockOpname>>({
    product_id: '',
    actual_stock: 0,
    note: ''
  });

  const handleAddOpname = () => {
    if (!newOpname.product_id || newOpname.actual_stock === undefined) {
      toast.error('Mohon lengkapi data opname');
      return;
    }

    const product = products.find(p => p.id === newOpname.product_id);
    if (!product) return;

    const opname: StockOpname = {
      id: Math.random().toString(36).substr(2, 9),
      product_id: newOpname.product_id!,
      system_stock: product.stock,
      actual_stock: Number(newOpname.actual_stock),
      difference: Number(newOpname.actual_stock) - product.stock,
      date: new Date().toISOString(),
      note: newOpname.note
    };

    setOpnames([opname, ...opnames]);
    setIsAddDialogOpen(false);
    setNewOpname({ product_id: '', actual_stock: 0, note: '' });
    toast.success('Stock opname berhasil dicatat');
  };

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name || 'Produk Terhapus';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Opname</h1>
          <p className="text-muted-foreground">Audit stok fisik vs stok sistem</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Mulai Opname
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Catat Stock Opname</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="product">Pilih Beras</Label>
                <Select onValueChange={(val) => {
                  const p = products.find(p => p.id === val);
                  setNewOpname({...newOpname, product_id: val});
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih produk..." />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {newOpname.product_id && (
                <div className="p-3 bg-muted rounded-lg space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Stok Sistem:</span>
                    <span className="font-bold">
                      {products.find(p => p.id === newOpname.product_id)?.stock} Kg
                    </span>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="actual">Stok Fisik (Kg)</Label>
                <Input 
                  id="actual" 
                  type="number" 
                  value={newOpname.actual_stock}
                  onChange={(e) => setNewOpname({...newOpname, actual_stock: Number(e.target.value)})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="note">Catatan Penyesuaian</Label>
                <Input 
                  id="note" 
                  value={newOpname.note}
                  onChange={(e) => setNewOpname({...newOpname, note: e.target.value})}
                  placeholder="Contoh: Barang rusak/hilang" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
              <Button onClick={handleAddOpname}>Simpan Opname</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Stock Opname</CardTitle>
          <CardDescription>Daftar audit stok yang telah dilakukan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Stok Sistem</TableHead>
                  <TableHead>Stok Fisik</TableHead>
                  <TableHead>Selisih</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opnames.map((op) => (
                  <TableRow key={op.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(op.date), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell className="font-medium">{getProductName(op.product_id)}</TableCell>
                    <TableCell>{op.system_stock} Kg</TableCell>
                    <TableCell>{op.actual_stock} Kg</TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-bold",
                        op.difference < 0 ? "text-destructive" : op.difference > 0 ? "text-primary" : "text-foreground"
                      )}>
                        {op.difference > 0 ? `+${op.difference}` : op.difference} Kg
                      </span>
                    </TableCell>
                    <TableCell>
                      {op.difference === 0 ? (
                        <Badge variant="outline" className="text-primary border-primary gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Sesuai
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1">
                          <AlertTriangle className="w-3 h-3" /> Selisih
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
