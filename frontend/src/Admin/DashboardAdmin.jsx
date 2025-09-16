import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Save, 
  X, 
  Package,
  DollarSign,
  Image,
  FileText
} from 'lucide-react';
import { Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onLogout
}) => {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    image: '',
    price: ''
  });

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setEditForm({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price
    });
  };

  const handleSave = () => {
    if (isAdding) {
      onAddProduct(editForm);
      setIsAdding(false);
    } else if (isEditing) {
      onUpdateProduct(isEditing, editForm);
      setIsEditing(null);
    }
    setEditForm({ name: '', description: '', image: '', price: '' });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({ name: '', description: '', image: '', price: '' });
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({ name: '', description: '', image: '', price: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${
              i % 4 === 0 ? 'bg-cyan-400/20' :
              i % 4 === 1 ? 'bg-blue-500/20' :
              i % 4 === 2 ? 'bg-emerald-400/20' : 'bg-purple-400/20'
            } rounded-full`}
            style={{
              left: `${10 + (i * 67) % 80}%`,
              top: `${15 + (i * 43) % 70}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-15, 15, -15],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.4, 0.8]
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Admin <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-slate-400">Kelola produk sistem parkir otomatis</p>
          </div>
          <motion.button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-xl transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Produk</p>
                <p className="text-2xl font-bold text-white">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Kategori</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Status</p>
                <p className="text-2xl font-bold text-emerald-400">Aktif</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Product Button */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
          >
            <Plus className="w-5 h-5" />
            Tambah Produk
          </button>
        </motion.div>

        {/* Add/Edit Form */}
        {(isAdding || isEditing) && (
          <motion.div
            className="mb-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {isAdding ? 'Tambah Produk Baru' : 'Edit Produk'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Masukkan nama produk"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Harga
                </label>
                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Rp 0.000.000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <Image className="w-4 h-4 inline mr-2" />
                  URL Gambar
                </label>
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Deskripsi
                </label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Deskripsi produk"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                Simpan
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 rounded-xl font-semibold transition-all duration-300"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 rounded-2xl p-6 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + (index * 0.1) }}
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
              <p className="text-slate-400 text-sm mb-3">{product.description}</p>
              <p className="text-cyan-400 font-semibold mb-4">{product.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-300 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Trash2 className="w-4 h-4" />
                  Hapus
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;