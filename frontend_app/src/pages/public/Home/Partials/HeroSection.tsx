import { Button } from "antd";
import { Plus, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-6 py-10 shadow-sm md:py-16">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Pusat Penemuan Barang <span className="text-[#0D9488] font-bold">UNIBI</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
          Platform pintar untuk membantu warga kampus melaporkan, mencari, dan mencocokkan barang hilang atau temuan secara cepat dan terpusat.
        </p>

        <div className="hidden justify-center gap-4 md:flex">
          <Button
            size="large"
            icon={<PackageOpen size={18} />}
            className="h-12 rounded-xl border-gray-300 px-8 font-medium text-gray-700 hover:border-[#0D9488] hover:text-[#0D9488]"
            onClick={() => navigate('/report-found-item/create')}
          >
            Lapor Temuan
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<Plus size={18} />}
            className="h-12 rounded-xl bg-red-500! px-8 font-medium hover:bg-teal-700 shadow-md shadow-teal-500/20"
            onClick={() => navigate('/report-lost-item/create')}
          >
            Lapor Kehilangan
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;