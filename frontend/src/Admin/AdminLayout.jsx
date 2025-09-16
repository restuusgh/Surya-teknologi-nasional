const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="/admin/dashboard" className="block hover:text-cyan-400">Dashboard</a>
          <a href="/admin/products" className="block hover:text-cyan-400">Produk</a>
          <a href="/admin/portfolio" className="block hover:text-cyan-400">Portfolio</a>
          <a href="/admin/users" className="block hover:text-cyan-400">Pengguna</a>
        </nav>
      </aside>

      {/* Konten utama */}
      <div className="flex-1 bg-slate-100 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
