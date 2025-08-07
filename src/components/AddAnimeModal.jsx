import React, { useState } from "react";
import useAnimeStore from "../store/anime-store";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

function AddAnimeModal() {
  const {
    setShowAddModal,
    fetchNewAnime,
    setStartPage,
    startPage,
    currentPage,
    fetchAnimeByPage,
    totalPages,
  } = useAnimeStore();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchNewAnime();
      await fetchAnimeByPage(currentPage);
      setShowAddModal(false);
      Swal.fire({
        icon: "success",
        title: "เพิ่มอนิเมะสำเร็จ!",
        text: "✅ เพิ่มอนิเมะจาก Jikan API เรียบร้อยแล้ว",
        confirmButtonColor: "#c88a50",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "❌ ดึงข้อมูลล้มเหลว",
        confirmButtonColor: "#c88a50",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-black/20 items-center justify-center z-50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded shadow w-96"
          >
            <h2 className="text-lg font-bold mb-4">เพิ่มอนิเมะจาก Jikan API</h2>
            <form onSubmit={handleSubmit}>
              <p className="text-sm text-gray-500 mb-1">
                ตอนนี้มีข้อมูลถึงหน้า <span className="font-semibold">{totalPages || "?"}</span>
              </p>
              <label className="block mb-2">หน้าเริ่มต้น:</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded"
                value={startPage || 1}
                onChange={(e) => setStartPage(parseInt(e.target.value) || 1)}
                min={1}
                required
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#c88a50] text-white px-4 py-2 rounded hover:bg-[#7a623f]"
                >
                  {loading ? "กำลังเพิ่ม..." : "เพิ่ม"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AddAnimeModal;
