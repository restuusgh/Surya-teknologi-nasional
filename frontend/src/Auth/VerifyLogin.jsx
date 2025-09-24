import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyLogin = ({ onVerify }) => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailForVerification");
    if (!storedEmail) {
      navigate("/"); 
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleVerify = async () => {
    setError('');
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Kode verifikasi salah");
        setSuccess(false);
      } else {
        setSuccess(true);
        localStorage.removeItem("emailForVerification");

        localStorage.setItem("token", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));

        if (onVerify) {
          onVerify(data.admin);
        }

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat verifikasi");
      setSuccess(false);
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Verifikasi Email</h2>
        <p className="mb-4">
          Kami telah mengirimkan kode ke <strong>{email}</strong>.
        </p>
        <input
          type="text"
          placeholder="Masukkan kode verifikasi"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white focus:outline-none"
        />
        {error && <p className="text-red-400 mb-3">{error}</p>}
        {success && <p className="text-green-400 mb-3">Verifikasi berhasil!</p>}
        <button
          onClick={handleVerify}
          className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 rounded transition"
        >
          Verifikasi
        </button>
      </div>
    </div>
  );
};

export default VerifyLogin;
