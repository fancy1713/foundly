import type { BaseResponse } from "./common";
import type { User } from "./user.type";

export type StatusLaporanKehilangan = "PROSES" | "DITEMUKAN" | "TIDAK_DITEMUKAN" | "SELESAI";

export interface BarangLaporan {
  id_barang_hilang: number;
  id_user: number;
  nama_barang: string;
  kategori: string;
  deskripsi: string;
  lokasi_hilang: string;
  waktu_hilang: string;
  tgl_hilang: string;
  foto_barang: string;
  status: StatusLaporanKehilangan;
  createdAt: string;
  user?: Partial<User>;
}

export type MyLostReportsResponse = BaseResponse<BarangLaporan[]>;
export type DetailLostReportResponse = BaseResponse<BarangLaporan>;