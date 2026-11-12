import type { BaseResponse } from "./common";
import type { User } from "./user.type";

export type StatusBarangTemuan = "DISIMPAN" | "MENUNGGU" | "DIAMBIL" | "SELESAI";

export interface BarangTemuan {
  id_temuan: number;
  id_user: number;
  nama_barang: string;
  kategori: string;
  deskripsi: string;
  lokasi_temuan: string;
  waktu_temuan: string;
  tgl_temuan: string;
  foto_barang: string;
  status: StatusBarangTemuan;
  createdAt: string;
  user?: Partial<User>;
}

export type MyFoundReportsResponse = BaseResponse<BarangTemuan[]>;
export type DetailFoundReportResponse = BaseResponse<BarangTemuan>;