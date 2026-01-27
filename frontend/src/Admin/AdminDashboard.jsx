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
  FileText,
  TrendingUp,
  Users,
  Eye,
  Star,
  Calendar,
  Activity,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';

const AdminDashboard = ({
  products = [
    {
      id: 1,
      name: "Smart Parking System Pro",
      description: "Sistem parkir otomatis dengan sensor IoT dan AI detection",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      price: "Rp 50.000.000"
    },
    {
      id: 2,
      name: "RFID Access Control",
      description: "Sistem akses kontrol dengan teknologi RFID terbaru",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
      price: "Rp 15.000.000"
    }
  ],
  onAddProduct = (product) => console.log('Add:', product),
  onUpdateProduct = (id, product) => console.log('Update:', id, product),
  // onDeleteProduct = (id) => console.log('Delete:', id),
  onLogout = () => console.log('Logout')
}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image: '',
    price: ''
  });

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
      {/* Background particles - tetap dipertahankan */}
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

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                {/* <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Settings className="w-8 h-8 text-white" />
                </div> */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={onLogout}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/50 text-red-300 rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12%
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Produk</p>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8%
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Penjualan</p>
            <p className="text-3xl font-bold text-white">24</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15%
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Pelanggan</p>
            <p className="text-3xl font-bold text-white">1,247</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="flex items-center text-emerald-400 text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-1"></div>
                  Live
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm mb-1">Status Sistem</p>
            <p className="text-xl font-bold text-emerald-400">Optimal</p>
          </motion.div>
        </motion.div>

        {/* Enhanced Action Bar */}


        {/* Enhanced Add/Edit Form */}
        {(isAdding || isEditing) && (
          <motion.div
            className="mb-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                {isAdding ? <Plus className="w-6 h-6 text-white" /> : <Edit2 className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {isAdding ? 'Tambah Produk Baru' : 'Edit Produk'}
                </h3>
                <p className="text-slate-400">
                  {isAdding ? 'Masukkan detail produk baru' : 'Perbarui informasi produk'}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="Masukkan nama produk"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Harga
                  </label>
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="Rp 0.000.000"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
                    <Image className="w-4 h-4 mr-2" />
                    URL Gambar
                  </label>
                  <input
                    type="url"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-slate-300 mb-3">
                    <FileText className="w-4 h-4 mr-2" />
                    Deskripsi
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                    placeholder="Deskripsi produk"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-slate-700/50">
              <motion.button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-5 h-5" />
                {isAdding ? 'Simpan Produk' : 'Update Produk'}
              </motion.button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 rounded-xl font-semibold transition-all duration-300"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            </div>
          </motion.div>
        )}

        {products.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Belum Ada Produk</h3>
            <p className="text-slate-400 mb-8">Mulai tambahkan produk sistem parkir pertama Anda</p>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold mx-auto hover:scale-105 transition-transform"
            >
              <Plus className="w-5 h-5" />
              Tambah Produk Pertama
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;