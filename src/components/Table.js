import React, { useState } from "react";

const Table = ({ ads }) => {
  const [sortKey, setSortKey] = useState("campaign");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedAds = [...ads].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    return sortDirection === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const columns = [
    { key: "campaign", label: "Campaign" },
    { key: "platform", label: "Platform" },
    { key: "adset", label: "Adset" },
    { key: "creative", label: "Creative" },
    { key: "spend", label: "Spend" },
    { key: "impressions", label: "Impressions" },
    { key: "clicks", label: "Clicks" },
    { key: "results", label: "Results" },
  ];

  const getSortArrow = (key) => {
    if (key !== sortKey) return "";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-3 cursor-pointer hover:text-blue-600"
              >
                {label} {getSortArrow(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedAds.map((ad, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 font-medium">{ad.campaign}</td>
              <td className="px-4 py-2 italic text-gray-500">{ad.platform}</td>
              <td className="px-4 py-2">{ad.adset}</td>
              <td className="px-4 py-2">{ad.creative}</td>
              <td className="px-4 py-2">${ad.spend.toLocaleString()}</td>
              <td className="px-4 py-2">{ad.impressions.toLocaleString()}</td>
              <td className="px-4 py-2">{ad.clicks.toLocaleString()}</td>
              <td className="px-4 py-2">{ad.results}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;