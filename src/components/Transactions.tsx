import { useState } from 'react';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Search, 
  Plus,
  Calendar as CalendarIcon,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
import { Transaction, Product } from '../types';
import { format } from 'date-fns';
import { toast } from 'sonner';

const initialTransactions: Transaction[] = [
  { id: '1', product_id: '1', type: 'out', quantity: 50, price: 14000, total: 700000, date: new Date().toISOString(), note: 'Penjualan Ecer' },
  { id: '2', product_id: '2', type: 'in', quantity: 200, price: 11000, total: 2200000, date: new Date().toISOString(), note: 'Restok Supplier' },
  { id: '3', product_id: '3', type: 'out', quantity: 100, price: 10500, total: 1050000, date: new Date().toISOString(), note: 'Penjualan Grosir' },
];

const products: Product[] = [
  { id: '1', name: 'Beras Pandan Wangi', stock: 500, wholesale_price: 12000, retail_price: 14000, category: 'Premium', unit: 'Kg' },
  { id: '2', name: 'Beras Rojo Lele', stock: 300, wholesale_price: 11000, retail_price: 13000, category: 'Medium', unit: 'Kg' },
  { id: '3', name: 'Beras Setra Ramos', stock: 800, wholesale_price: 10500, retail_price: 12500, category: 'Medium', unit: 'Kg' },
];

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTx, setNewTx] = useState<Partial<Transaction>>({
    type: 'out',
    quantity: 0,
    price: 0,
    product_id: '',
    note: ''
  });

  const handleAddTransaction = () => {
    if (!newTx.product_id || !newTx.quantity || !newTx.price) {
      toast.error('Mohon lengkapi data transaksi');
      return;
    }

    const tx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      product_id: newTx.product_id!,
      type: newTx.type as 'in' | 'out',
      quantity: Number(newTx.quantity),
      price: Number(newTx.price),
      total: Number(newTx.quantity) * Number(newTx.price),
      date: new Date().toISOString(),
      note: newTx.note
    };

    setTransactions([tx, ...transactions]);
    setIsAddDialogOpen(false);
    setNewTx({ type: 'out', quantity: 0, price: 0, product_id: '', note: '' });
    toast.success('Transaksi berhasil dicatat');
  };

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name || 'Produk Terhapus';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaksi</h1>
          <p className="text-muted-foreground">Catat arus masuk dan keluar barang</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger
              render={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" /> Transaksi Baru
                </Button>
              }
            />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Catat Transaksi Baru</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Tipe Transaksi</Label>
                  <div className="flex gap-2">
                    <Button 
                      variant={newTx.type === 'in' ? 'default' : 'outline'} 
                      className="flex-1 gap-2"
                      onClick={() => setNewTx({...newTx, type: 'in'})}
                    >
                      <ArrowUpCircle className="w-4 h-4" /> Masuk
                    </Button>
                    <Button 
                      variant={newTx.type === 'out' ? 'default' : 'outline'} 
                      className="flex-1 gap-2"
                      onClick={() => setNewTx({...newTx, type: 'out'})}
                    >
                      <ArrowDownCircle className="w-4 h-4" /> Keluar
                    </Button>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="product">Pilih Beras</Label>
                  <Select onValueChange={(val) => {
                    const p = products.find(p => p.id === val);
                    setNewTx({
                      ...newTx, 
                      product_id: val,
                      price: newTx.type === 'out' ? p?.retail_price : p?.wholesale_price
                    });
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="qty">Jumlah (Kg)</Label>
                    <Input 
                      id="qty" 
                      type="number" 
                      value={newTx.quantity}
                      onChange={(e) => setNewTx({...newTx, quantity: Number(e.target.value)})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Harga Satuan</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      value={newTx.price}
                      onChange={(e) => setNewTx({...newTx, price: Number(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="note">Catatan</Label>
                  <Input 
                    id="note" 
                    value={newTx.note}
                    onChange={(e) => setNewTx({...newTx, note: e.target.value})}
                    placeholder="Contoh: Penjualan Toko A" 
                  />
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Transaksi:</span>
                    <span className="text-lg font-bold text-primary">
                      Rp {((newTx.quantity || 0) * (newTx.price || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
                <Button onClick={handleAddTransaction}>Simpan Transaksi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari transaksi..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(tx.date), 'dd MMM yyyy, HH:mm')}
                    </TableCell>
                    <TableCell className="font-medium">{getProductName(tx.product_id)}</TableCell>
                    <TableCell>
                      <Badge variant={tx.type === 'in' ? 'default' : 'secondary'} className="gap-1">
                        {tx.type === 'in' ? (
                          <ArrowUpCircle className="w-3 h-3" />
                        ) : (
                          <ArrowDownCircle className="w-3 h-3" />
                        )}
                        {tx.type === 'in' ? 'Masuk' : 'Keluar'}
                      </Badge>
                    </TableCell>
                    <TableCell>{tx.quantity} Kg</TableCell>
                    <TableCell className="font-bold">Rp {tx.total.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground italic">{tx.note}</TableCell>
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
