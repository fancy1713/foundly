import { Card } from "antd";
import { Image as ImageIcon } from "lucide-react";

type DetailItemImageProps = {
  imageUrl: string | null;
  itemName: string;
};

const DetailItemImage = ({ imageUrl, itemName }: DetailItemImageProps) => {
  console.log(imageUrl);
  return (
    <Card 
      className="w-full rounded-[20px] border border-gray-100 bg-white p-2 shadow-[0px_18px_40px_rgba(112,144,176,0.04)] flex flex-col justify-between"
      bordered={false}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F8F6] text-[#11998E]">
            <ImageIcon size={20} />
          </div>
          <h3 className="m-0 text-lg font-bold text-[#1B2559]">Foto Dokumentasi</h3>
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mt-2 shadow-inner">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={itemName} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={48} strokeWidth={1} />
              <span className="mt-2 text-sm font-medium">Gambar Tidak Tersedia</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DetailItemImage;