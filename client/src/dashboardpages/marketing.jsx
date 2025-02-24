import { useState } from "react";
import { ChevronDown, Copy } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker
import "../customCss/marketing-table-style.css";
import { useNavigate } from "react-router-dom";

const MarketingTable = () => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [metaLoggedIn, setMetaLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 4; // Number of campaigns per page
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false); // State to manage copy feedback

  const trialTrainingUrl = "https://example.com/trial-training"; // Replace with your actual URL


  const campaigns = [
    {
      id: 1,
      name: "Promo 1",
      reach: { value: "60", label: "Link click" },
      impression: { value: "8,231", label: "People" },
      cpc: { value: "$0.01", label: "Per click" },
      time: { value: "May 12 2024 - May 20 2024", label: "7 days" },
    },
    {
      id: 2,
      name: "Promo 1",
      reach: { value: "60", label: "Link click" },
      impression: { value: "8,231", label: "People" },
      cpc: { value: "$0.01", label: "Per click" },
      time: { value: "May 12 2024 - May 20 2024", label: "7 days" },
    },
    {
      id: 3,
      name: "Promo 1",
      reach: { value: "60", label: "Link click" },
      impression: { value: "8,231", label: "People" },
      cpc: { value: "$0.01", label: "Per click" },
      time: { value: "May 12 2024 - May 20 2024", label: "7 days" },
    },
    {
      id: 4,
      name: "Promo 1",
      reach: { value: "60", label: "Link click" },
      impression: { value: "8,231", label: "People" },
      cpc: { value: "$0.01", label: "Per click" },
      time: { value: "May 12 2024 - May 20 2024", label: "7 days" },
    },
    {
      id: 5,
      name: "Promo 1",
      reach: { value: "60", label: "Link click" },
      impression: { value: "8,231", label: "People" },
      cpc: { value: "$0.01", label: "Per click" },
      time: { value: "May 12 2024 - May 20 2024", label: "7 days" },
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
  const startIndex = (currentPage - 1) * campaignsPerPage;
  const paginatedCampaigns = campaigns.slice(startIndex, startIndex + campaignsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top when page changes
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(trialTrainingUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };


  const handleMetaLogin = () => {
    // Implement Meta login logic here
    setMetaLoggedIn(true);
  };

  const handleTrialTrainingBooking = () => {
    navigate("/dashboard/trialtraining");
  };

  return (
    <div className="min-h-screen rounded-3xl bg-[#1C1C1C] lg:p-6 md:p-5 sm:p-2 p-1">
      <div className="rounded-xl lg:p-6 md:p-5 sm:p-4 p-4 w-full overflow-hidden">
        <div className="flex justify-between items-center mb-8 relative flex-wrap gap-4">
          <h1 className="text-2xl oxanium_font text-white">Marketing</h1>

          <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 w-full lg:w-auto">
            <button
              className="flex justify-center open_sans_font items-center gap-2 cursor-pointer bg-blue-600 text-white px-7 py-2 rounded-xl text-sm w-full lg:w-auto"
              onClick={handleMetaLogin}
            >
              {metaLoggedIn ? "Logged In" : "Login with Meta"}
            </button>
            <button
              className="flex justify-center open_sans_font items-center gap-2 cursor-pointer bg-green-600 text-white px-7 py-2 rounded-xl text-sm w-full lg:w-auto"
              onClick={handleTrialTrainingBooking}
            >
              Book Trial Training
            </button>
            <button
              className="flex justify-center open_sans_font items-center gap-2 cursor-pointer bg-black text-white px-7 py-2 rounded-xl text-sm w-full lg:w-auto"
              onClick={() => setIsDateOpen((prev) => !prev)}
            >
              Date
              <ChevronDown size={16} />
            </button>
          </div>

          {isDateOpen && (
            <div className="absolute top-full right-6 z-20 bg-black text-white p-4 rounded-xl mt-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                inline
                dateFormat="MMM dd, yyyy"
              />
            </div>
          )}
        </div>

        <div className="flex items-center lg:flex-row flex-col gap-2 mb-8">
          <input
            type="text"
            value={trialTrainingUrl}
            readOnly
            className="flex-1 bg-[#141414] text-white rounded-xl p-2 pr-10 outline-none"
          />
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 text-sm bg-[#F27A30] text-white px-4 py-2 rounded-xl hover:bg-[#e6691d] transition-colors"
          >
            <Copy size={16} />
            {isCopied ? "Copied!" : "Copy URL"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1200px] md:min-w-[800px] w-full">
            <div className="grid grid-cols-5 text-sm text-white pb-4">
              <div className="font-medium open_sans_font_700">Name</div>
              <div className="font-medium open_sans_font_700">Reach</div>
              <div className="font-medium open_sans_font_700">Impression</div>
              <div className="font-medium open_sans_font_700">CPC</div>
              <div className="font-medium open_sans_font_700">Time</div>
            </div>

            <div className="space-y-4 open_sans_font">
              {paginatedCampaigns.map((campaign) => (
                <div key={campaign.id} className="grid grid-cols-5 bg-[#141414] rounded-xl p-4">
                  <div>
                    <span className="text-white">{campaign.name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white">{campaign.reach.value}</span>
                    <span className="text-sm text-gray-400">{campaign.reach.label}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white">{campaign.impression.value}</span>
                    <span className="text-sm text-gray-400">{campaign.impression.label}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white">{campaign.cpc.value}</span>
                    <span className="text-sm text-gray-400">{campaign.cpc.label}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white whitespace-nowrap">{campaign.time.value}</span>
                    <span className="text-sm text-gray-400">{campaign.time.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {campaigns.length > campaignsPerPage && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors border border-gray-800"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1.5 rounded-xl transition-colors border ${
                    currentPage === page
                      ? "bg-[#F27A30] text-white border-transparent"
                      : "bg-black text-white border-gray-800 hover:bg-gray-900"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl bg-black text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-900 transition-colors border border-gray-800"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingTable;