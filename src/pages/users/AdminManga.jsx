import React, { useEffect } from "react";
import { Trash } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import useAuthStore from "../../store/auth-store";
import useMangaStore from "../../store/manga-store";
import AddMangaModal from "../../components/AddMangaModal";
import Swal from "sweetalert2";

function AdminManga() {
    const {
        mangaList,
        currentPage,
        fetchMangaByPage,
        deleteMangaById,
        deleteAllManga,
        searchManga,
        showAddModal,
        setShowAddModal,
        totalPages,
    } = useMangaStore();

    const { user } = useAuthStore();

    useEffect(() => {
        if (user?.role === "ADMIN") {
            fetchMangaByPage(currentPage);
        }
    }, [user]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchMangaByPage(newPage);
        }
    };

    const handleDelete = async (malId) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบมังงะนี้ใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ลบเลย",
            cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
            try {
                await deleteMangaById(malId);
                Swal.fire("ลบสำเร็จ!", "มังงะถูกลบเรียบร้อยแล้ว", "success");
            } catch (error) {
                Swal.fire("ผิดพลาด!", "ไม่สามารถลบมังงะได้", "error");
            }
        }
    };

    const handleDeleteAll = async (malId) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบมังงะนี้ใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ลบเลย",
            cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
            try {
                await deleteAllManga();
                Swal.fire("ลบสำเร็จ!", "มังงะถูกลบเรียบร้อยแล้ว", "success");
            } catch (error) {
                Swal.fire("ผิดพลาด!", "ไม่สามารถลบมังงะได้", "error");
            }
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        if (query.trim() === "") {
            fetchMangaByPage(1);
        } else {
            searchManga(query);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-auto">
                <Topbar />
                <main className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">จัดการข้อมูลมังงะ</h2>
                        <div className="flex gap-3 justify-between">
                            <button
                                onClick={handleDeleteAll}
                                className="bg-red-500 text-white rounded hover:bg-red-700 transition px-4 py-2"
                            >ลบมังงะทั้งหมด
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-[#c88a50] text-white rounded hover:bg-[#7a623f] transition px-4 py-2"
                            >
                                เพิ่มมังงะใหม่
                            </button>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหามังงะ..."
                        className="w-full mb-4 px-4 py-2 rounded-md border"
                        onChange={handleSearch}
                    />
                    <div className="bg-white rounded-md shadow-md">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">ชื่อเรื่อง</th>
                                    <th className="p-3">id</th>
                                    <th className="p-3">ประเภท</th>
                                    <th className="p-3">คะแนน</th>
                                    <th className="p-3">สถานะ</th>
                                    <th className="p-3">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mangaList.map((manga) => (
                                    <tr key={manga.malId} className="border-t relative">
                                        <td className="p-3 flex items-center gap-3">
                                            <img
                                                src={manga.imageUrl}
                                                alt={manga.title}
                                                className="w-10 h-14 object-cover rounded"
                                            />
                                            <div>
                                                <p className="font-semibold">{manga.title}</p>
                                                <p className="text-xs text-gray-500">{manga.type}</p>
                                            </div>
                                        </td>
                                        <td className="p-3">{manga.id || "-"}</td>
                                        <td className="p-3">{manga.type || "-"}</td>
                                        <td className="p-3">{manga.score || "-"}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${manga.status === "Finished"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {manga.status || "-"}
                                            </span>
                                        </td>
                                        <td className="p-3 flex gap-2 justify-center absolute bottom-5 right-10">
                                            <button onClick={() => handleDelete(manga.malId)}>
                                                <Trash size={20} className="text-red-500 hover:text-red-300" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <div className="flex justify-center items-center py-3 gap-2 flex-wrap">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
              text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                ⏮ First
                            </button>

                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
              text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                ◀ Prev
                            </button>

                            <span className="px-4 py-1.5 rounded-full text-sm font-semibold text-[#5a4633]">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
              text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Next ▶
                            </button>

                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded-full text-sm font-medium border border-[#5a4633]
              text-[#5a4633] hover:bg-[#5a4633] hover:text-white transition-all duration-300
              disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Last ⏭
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {showAddModal && <AddMangaModal />}
        </div>
    );
}

export default AdminManga;
