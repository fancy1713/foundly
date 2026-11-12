# Foundly — Aplikasi Web Lost & Found Berbasis Multimodal Machine Learning

Aplikasi web yang menghubungkan pelapor barang hilang dengan penemu barang secara otomatis, menggunakan machine learning multimodal (teks + gambar) untuk mendeteksi kemiripan antar laporan tanpa perlu pencocokan manual.

**Role:** Ketua Tim & Machine Learning Engineer | 2026

Repo ini adalah monorepo yang berisi 3 bagian aplikasi Foundly: `backend/`, `ml_engine/`, dan `frontend_app/`.

---

## 📌 Problem Statement

Proses pencocokan barang hilang dan barang ditemukan secara manual memakan waktu dan rentan human error. Foundly mengotomasi proses ini: setiap ada laporan baru, sistem menghitung *similarity score* antara foto + deskripsi barang yang dicari dengan kandidat-kandidat barang yang sudah dilaporkan, lalu memberi notifikasi WhatsApp otomatis jika ditemukan kecocokan yang cukup tinggi.

## 🧠 Arsitektur Sistem

Foundly terdiri dari 3 service yang saling terhubung:

```
┌──────────────────┐      REST API       ┌──────────────────┐      webhook       ┌──────────────────┐
│   frontend_app    │ ───────────────────▶ │     backend       │ ───────────────────▶ │     ml_engine      │
│  (React + Vite)    │ ◀─────────────────── │ (Express + Prisma) │ ◀─────────────────── │   (FastAPI)         │
└──────────────────┘                       └──────────────────┘                     └──────────────────┘
                                                      │
                                                      ▼
                                             WhatsApp Web.js
                                           (notifikasi otomatis)
```

### `ml_engine/` — Matching Engine (Python, FastAPI)
- **Computer Vision**: ekstraksi fitur visual foto barang menggunakan **ResNet-50** (`torchvision`) pre-trained, dibandingkan dengan *cosine similarity*.
- **NLP**: ekstraksi fitur semantik deskripsi barang (nama, kategori, lokasi, ciri-ciri) menggunakan **Sentence-Transformers** (`all-MiniLM-L6-v2`).
- **Multimodal Weighted Scoring**: skor akhir = 60% kemiripan gambar + 40% kemiripan teks, dengan ambang batas kecocokan minimum 85%.
- **Async 1-to-N Matching**: endpoint `/api/match` menerima 1 barang target + N kandidat, memproses di `BackgroundTasks` agar request tidak blocking, lalu mengirim hasil terbaik kembali ke backend lewat **webhook**.

### `backend/` — API Utama (TypeScript, Express 5, Prisma 7)
- REST API untuk autentikasi (JWT), manajemen laporan barang hilang/ditemukan, dan upload foto.
- **Prisma ORM** di atas **MariaDB**, dengan migration terversi di `prisma/migrations`.
- Memicu `ml_engine` setiap ada laporan baru yang relevan untuk dicek kemiripannya, lalu menerima hasilnya lewat webhook.
- **Notifikasi otomatis via WhatsApp** menggunakan `whatsapp-web.js` ketika sistem menemukan kandidat kecocokan.

### `frontend_app/` — Antarmuka Pengguna (React + TypeScript + Vite)
- Dibangun dengan **React Router**, **TanStack Query** untuk data-fetching & caching, **Ant Design** + **Tailwind CSS** untuk UI, dan **Recharts** untuk visualisasi data/statistik laporan.

## 🛠️ Tech Stack

**ML Engine:** `Python` `FastAPI` `PyTorch` `torchvision (ResNet-50)` `Sentence-Transformers`
**Backend:** `TypeScript` `Express 5` `Prisma 7` `MariaDB` `JWT` `whatsapp-web.js`
**Frontend:** `React` `TypeScript` `Vite` `TanStack Query` `Ant Design` `Tailwind CSS` `Recharts`

## 📁 Struktur Repo

```
foundly/
├── backend/        # REST API (Express + Prisma + MariaDB)
├── ml_engine/      # Matching engine (FastAPI + PyTorch + Sentence-Transformers)
├── frontend_app/   # Web app (React + Vite)
└── README.md
```

## 🚀 Cara Menjalankan

**ML Engine:**
```bash
cd ml_engine
pip install -r requirements.txt
python -m venv venv && . venv/bin/activate   # atau venv\Scripts\activate di Windows
uvicorn main:app --reload
```

**Backend:**
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

**Frontend:**
```bash
cd frontend_app
npm install
npm run dev
```

> ⚠️ **Keamanan:** masing-masing bagian butuh file `.env` sendiri (lihat `.env.example` di `backend/` dan `frontend_app/`). Jangan pernah commit file `.env` asli — sudah di-`.gitignore`.

## 📸 Screenshot

> Tambahkan screenshot UI aplikasi (halaman laporan, halaman pencocokan, dsb.) di sini.

## 💡 Potensi Pengembangan

- Menambahkan dashboard admin untuk memantau tingkat keberhasilan pencocokan.
- Fine-tuning threshold skor minimum (85%) berdasarkan data real pengguna.
- Menambahkan notifikasi via email sebagai alternatif WhatsApp.

---

*Proyek tim — dikerjakan bersama divisi Frontend & Backend sebagai bagian dari pengembangan Foundly.*
