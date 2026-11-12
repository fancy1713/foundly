import { useState, useMemo } from "react";
import { Empty, Spin } from "antd";

import { useGetMyLostReportsQuery } from "@/hooks/queries/public/useBarangLaporanQueries";
import { useGetMyFoundReportsQuery } from "@/hooks/queries/public/useBarangTemuanQueries";

import HeroSection from "./Partials/HeroSection";
import FilterSection from "./Partials/FilterSection";
import ItemCard from "./Partials/ItemCard";
import FloatingActionMenu from "./Partials/FloatingActionMenu";
import type { BarangLaporan } from "@/types/barangLaporan";
import type { BarangTemuan } from "@/types/barangTemuan";

type UnifiedItem = 
  | (BarangLaporan & { type: "HILANG" })
  | (BarangTemuan & { type: "TEMUAN" });

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("semua");

  const { data: lostData, isLoading: loadingLost } = useGetMyLostReportsQuery();
  const { data: foundData, isLoading: loadingFound } = useGetMyFoundReportsQuery();

  const allItems: UnifiedItem[] = useMemo(() => {
    const lostItems: UnifiedItem[] = (lostData?.data || []).map((item) => ({ 
      ...item, 
      type: "HILANG" as const 
    }));
    
    const foundItems: UnifiedItem[] = (foundData?.data || []).map((item) => ({ 
      ...item, 
      type: "TEMUAN" as const 
    }));
    
    return [...lostItems, ...foundItems].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [lostData, foundData]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchType = filterType === "semua" || item.type.toLowerCase() === filterType;
      const matchSearch = item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchType && matchSearch;
    });
  }, [allItems, searchTerm, filterType]);

  const isLoading = loadingLost || loadingFound;

  return (
    <div className="relative min-h-screen bg-[#F9FAFB] pb-24 md:pb-12">
      
      <HeroSection />

      <section className="mx-auto mt-8 max-w-6xl px-6">
        
        <FilterSection 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setFilterType={setFilterType} 
        />

        {isLoading ? (
          <div className="flex min-h-[40vh] w-full items-center justify-center">
            <Spin size="large" className="text-[#0D9488]" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => {
              const itemId = item.type === "HILANG" ? item.id_barang_hilang : item.id_temuan;
              
              return (
                <ItemCard
                  key={`${item.type}-${itemId}`}
                  item={item}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[40vh] items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white">
            <Empty description={<span className="text-gray-400">Belum ada data barang sesuai filter</span>} />
          </div>
        )}

      </section>

      <FloatingActionMenu />

    </div>
  );
};

export default LandingPage;