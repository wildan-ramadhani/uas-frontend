// app/admin/page.jsx
// Ini adalah Server Component, tidak perlu 'use client'
import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminDashboardLayout from '../components/AdminDashboardLayout'; // ✅ Import komponen baru

// Fungsi untuk mengambil semua data produk dari API backend Anda
async function getAllProducts() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  try {
    const res = await fetch(`${backendUrl}/api/products`, {
      cache: 'no-store' // Penting: Agar data selalu di-fetch terbaru
    });

    if (!res.ok) {
      let errorDetail = 'Unknown error';
      try {
        const errorData = await res.json();
        errorDetail = errorData.message || JSON.stringify(errorData);
      } catch (jsonError) {
        errorDetail = await res.text();
      }
      const errorMessage = `Failed to fetch products from backend: Status ${res.status}, Detail: ${errorDetail}`;
      console.error(`[Server] ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error(`[Server] Error fetching products for AdminPage: "${error.message}"`);
    return []; 
  }
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Periksa apakah pengguna adalah admin
  if (!session || session.user.role !== 'admin') {
    console.log("Akses ditolak: Pengguna bukan admin atau tidak terautentikasi.");
    redirect('/'); // Redirect ke halaman utama jika bukan admin
  }

  const products = await getAllProducts(); // Ambil semua produk untuk ditampilkan di dashboard admin

  return (
    // ✅ Render komponen AdminDashboardLayout dan teruskan produk
    <AdminDashboardLayout initialProducts={products} />
  );
}
