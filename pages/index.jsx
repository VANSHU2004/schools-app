import { useState, useEffect } from "react";
import Link from "next/link";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [schools, setSchools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const perPage = 6;

  useEffect(() => {
    
      try {
        const fetchData = async () => {
          const res = await fetch("/api/schools");
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          setSchools(data);
          setFiltered(data);
        };
        fetchData();
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        setFiltered([]);
    } finally {
        setLoading(false);
    }
  }, []); 

  // search + filter
  useEffect(() => {
    let result = schools;

    if (search) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (city) {
      result = result.filter(s => s.city.toLowerCase().includes(city.toLowerCase()));
    }

    setFiltered(result);
    setPage(1); // reset to first page when filter/search changes
  }, [search, city, schools]);

  // pagination
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">School Directory</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
        <input
          type="text"
          placeholder="Filter by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 flex-1 rounded"
        />
      </div>

      {/* School Cards */}
      {loading ? (
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
) : (
  <>
    {paginated.length === 0 ? (
      <div className="text-center text-gray-500 py-10">
        <p>No schools found. Try adding one!</p>
      </div>
    ) : (
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {paginated.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s)}
            className="border rounded shadow p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform"
          >
            <img
              src={s.image}
              alt={s.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="font-semibold">{s.name}</h2>
            <p className="text-sm text-gray-600">{s.address}</p>
            <p className="text-sm text-gray-600">{s.city}</p>
          </div>
        ))}
      </div>
    )}
  </>
)}


      {/* 🔹 Detail card (modal style) */}
{selected && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Background overlay with blur */}
    <div 
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setSelected(null)} // close when clicking outside
    ></div>

    {/* Modal content */}
    <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 z-10 transform transition-all duration-300 scale-95 opacity-0 animate-fadeInScale">
      {/* Close button */}
      <button
        onClick={() => setSelected(null)}
        className="absolute top-1 right-1 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      {/* Details inside white box */}
      <img
        src={selected.image}
        alt={selected.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{selected.name}</h2>
      <p><strong>Address:</strong> {selected.address}</p>
      <p><strong>City:</strong> {selected.city}</p>
      <p><strong>State:</strong> {selected.state}</p>
      <p><strong>Contact:</strong> {selected.contact}</p>
      <p><strong>Email:</strong> {selected.email_id}</p>
    </div>
  </div>
)}


        

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-3 py-1">{page} / {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add School Button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/addSchool"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 cursor-pointer"
        >
          ➕ Add New School
        </Link>
      </div>
    </div>
  );
}
