import { Avatar } from "antd";

const Header = () => {
  return (
    <header className="bg-[#f5f6f8] px-10 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[56px] leading-none font-bold text-[#4a4a4a]">
            Foundly Petugas
          </h1>

          <p className="text-[#9c9c9c] mt-4 text-lg max-w-3xl">
            Kelola laporan barang hilang dan barang ditemukan.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <h3 className="font-semibold text-2xl">
              Admin
            </h3>

            <p className="text-sm text-gray-400">
              admin@foundly.com
            </p>
          </div>

          <Avatar size={70}>
            A
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;