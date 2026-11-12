import type { BarangTemuan } from "@/types/barangTemuan";

export const barangTemuan: BarangTemuan[] = [
  {
    id: "bt-001",
    namaBarang: "Kartu Parkir",
    kategori: "Aksesoris",
    lokasi: "Di sekitaran SC, Lorong Lab, dekat tangga utama",
    tanggal: "27-04-2026",
    waktu: "09:15 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Kartu parkir kampus ditemukan di sekitar Student Center dekat lorong laboratorium.",
    image: "/images/barang-temuan/kartu-parkir.svg",
  },
  {
    id: "bt-002",
    namaBarang: "Hoddie",
    kategori: "Pakaian",
    lokasi: "Di ruangan B216 Kampus 1",
    tanggal: "21-03-2026",
    waktu: "13:40 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Hoddie warna gelap tertinggal di kursi bagian belakang ruangan B216 Kampus 1.",
    image: "/images/barang-temuan/hoodie.svg",
  },
  {
    id: "bt-003",
    namaBarang: "Earphone Wireless",
    kategori: "Elektronik",
    lokasi: "Sekitar kantin kampus 1, meja dekat kasir",
    tanggal: "11-04-2026",
    waktu: "12:04 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Earphone wireless Lenovo warna hitam ditemukan pada meja Laboratorium.",
    image: "/images/barang-temuan/earphone.svg",
  },
  {
    id: "bt-004",
    namaBarang: "Tumbler 330 ml",
    kategori: "Aksesoris",
    lokasi: "Di kelas B116 depan meja",
    tanggal: "27-04-2026",
    waktu: "10:20 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Tumbler stainless 330 ml ditemukan di kelas B116 setelah jadwal perkuliahan selesai.",
    image: "/images/barang-temuan/tumbler.svg",
  },
  {
    id: "bt-005",
    namaBarang: "Flashdisk",
    kategori: "Elektronik",
    lokasi: "Lab A",
    tanggal: "30-04-2026",
    waktu: "15:35 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Flashdisk hitam ditemukan di meja komputer nomor 12 pada Lab A.",
    image: "/images/barang-temuan/flashdisk.svg",
  },
  {
    id: "bt-006",
    namaBarang: "Kacamata",
    kategori: "Aksesoris",
    lokasi: "Sekitaran lantai 2 kampus",
    tanggal: "15-03-2026",
    waktu: "11:00 WIB",
    status: "MENUNGGU",
    deskripsi:
      "Kacamata dengan frame hitam ditemukan di area lantai 2 kampus.",
    image: "/images/barang-temuan/kacamata.svg",
  },
  {
    id: "bt-007",
    namaBarang: "Almamater",
    kategori: "Pakaian",
    lokasi: "Sekitaran Lapangan basket",
    tanggal: "20-04-2026",
    waktu: "16:10 WIB",
    status: "PROSES",
    deskripsi:
      "Jaket almamater ditemukan di tribun lapangan basket setelah kegiatan mahasiswa.",
    image: "/images/barang-temuan/almamater.svg",
  },
  {
    id: "bt-008",
    namaBarang: "Cincin Perak",
    kategori: "Perhiasan",
    lokasi: "Ruang administrasi lantai 1",
    tanggal: "03-05-2026",
    waktu: "08:30 WIB",
    status: "COCOK",
    deskripsi:
      "Cincin perak kecil ditemukan di area loket administrasi lantai 1.",
    image: "/images/barang-temuan/cincin.svg",
  },
];

export const kategoriBarangTemuan = [
  "Elektronik",
  "Perhiasan",
  "Pakaian",
  "Aksesoris",
  "Lainnya",
] as const;
