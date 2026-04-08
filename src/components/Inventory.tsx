import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2,
  Package as PackageIcon
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Product } from '../types';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const initialProducts: Product[] = [
  { id: '1', name: 'Beras Pandan Wangi', stock: 500, wholesale_price: 12000, retail_price: 14000, category: 'Premium', unit: 'Kg' },
  { id: '2', name: 'Beras Rojo Lele', stock: 300, wholesale_price: 11000, retail_price: 13000, category: 'Medium', unit: 'Kg' },
  { id: '3', name: 'Beras Setra Ramos', stock: 800, wholesale_price: 10500, retail_price: 12500, category: 'Medium', unit: 'Kg' },
  { id: '4', name: 'Beras Ketan Putih', stock: 150, wholesale_price: 15000, retail_price: 18000, category: 'Ketan', unit: 'Kg' },
];

export function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    stock: 0,
    wholesale_price: 0,
    retail_price: 0,
    category: 'Medium',
    unit: 'Kg'
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.wholesale_price || !newProduct.retail_price) {
      toast.error('Mohon isi semua data produk');
      return;
    }

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      stock: Number(newProduct.stock) || 0,
      wholesale_price: Number(newProduct.wholesale_price),
      retail_price: Number(newProduct.retail_price),
      category: newProduct.category || 'Medium',
      unit: newProduct.unit || 'Kg'
    };

    setProducts([...products, product]);
    setIsAddDialogOpen(false);
    setNewProduct({ name: '', stock: 0, wholesale_price: 0, retail_price: 0, category: 'Medium', unit: 'Kg' });
    toast.success('Produk berhasil ditambahkan');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventori Beras</h1>
          <p className="text-muted-foreground">Kelola stok dan harga beras Anda</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Tambah Beras
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Beras</Label>
                <Input 
                  id="name" 
                  value={newProduct.name} 
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Contoh: Beras Pandan Wangi" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stok Awal</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    value={newProduct.stock} 
                    onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Satuan</Label>
                  <Input 
                    id="unit" 
                    value={newProduct.unit} 
                    onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="wholesale">Harga Grosir</Label>
                  <Input 
                    id="wholesale" 
                    type="number" 
                    value={newProduct.wholesale_price} 
                    onChange={(e) => setNewProduct({...newProduct, wholesale_price: Number(e.target.value)})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="retail">Harga Ecer</Label>
                  <Input 
                    id="retail" 
                    type="number" 
                    value={newProduct.retail_price} 
                    onChange={(e) => setNewProduct({...newProduct, retail_price: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <Input 
                  id="category" 
                  value={newProduct.category} 
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="Premium/Medium/Ketan" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Batal</Button>
              <Button onClick={handleAddProduct}>Simpan Produk</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari beras..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[250px]">Nama Beras</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Harga Grosir</TableHead>
                  <TableHead>Harga Ecer</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <PackageIcon className="w-4 h-4 text-primary" />
                        </div>
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-bold",
                        product.stock < 200 ? "text-destructive" : "text-foreground"
                      )}>
                        {product.stock} {product.unit}
                      </span>
                    </TableCell>
                    <TableCell>Rp {product.wholesale_price.toLocaleString()}</TableCell>
                    <TableCell>Rp {product.retail_price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
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
