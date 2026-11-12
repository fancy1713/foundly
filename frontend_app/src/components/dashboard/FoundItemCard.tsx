import { foundItems } from "@/data/dashboard";

const FoundItemCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[320px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">
          Barang Ditemukan
        </h3>

        <span className="text-sm text-teal-500">
          {foundItems.length} barang ditemukan
        </span>
      </div>

      <div className="space-y-8">
        {foundItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-xl rounded-lg object-cover"
            />

            <div className="flex-1">
              <h4 className="font-medium">
                {item.name}
              </h4>

              <p className="text-sm text-gray-500">
                {item.description}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === "COCOK"
                  ? "bg-green-100 text-green-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItemCard;