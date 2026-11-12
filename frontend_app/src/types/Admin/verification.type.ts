import type { BarangLaporan } from "../barangLaporan";
import type { BarangTemuan } from "../barangTemuan";
import type { BaseResponse } from "../common";

export interface VerifikasiHistory {
  id_verifikasi: number;
  id_pencocokan: number;
  id_admin: number;
  status_verifikasi: boolean;
  catatan: string;
  tgl_verfikasi: string;
  waktu_verifikasi: string;
  
  admin: {
    nama: string;
  };
  pencocokan: {
    id_barang_hilang: number;
    id_temuan: number;
    tingkat_kemiripan: number;
    status: boolean;
    barang_hilang: BarangLaporan;
    barang_temuan: BarangTemuan;
  };
}

export type VerifikasiHistoryResponse = BaseResponse<VerifikasiHistory[]>;