import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import useAuthStore from "../../store/auth-store";
import useUserStore from "../../store/user-store";
import EditUserModal from "../../components/EditUserModal";
import Swal from "sweetalert2";


function AdminUser() {
    const { user } = useAuthStore();
    const {
        userList,
        fetchAllUsers,
        deleteUserById,
        searchUser,
    } = useUserStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (user?.role === "ADMIN") {
            fetchAllUsers();
        }
    }, [user]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") {
            fetchAllUsers();
        } else {
            searchUser(query);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "ใช่, ลบเลย",
            cancelButtonText: "ยกเลิก",
        });

        if (result.isConfirmed) {
            try {
                await deleteUserById(id);
                Swal.fire("ลบสำเร็จ!", "ผู้ใช้งานถูกลบเรียบร้อยแล้ว", "success");
            } catch (error) {
                Swal.fire("ผิดพลาด!", "ไม่สามารถลบอนิเมะได้", "error");
            }
        }
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">จัดการผู้ใช้งาน</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหาผู้ใช้..."
                        className="w-full mb-4 px-4 py-2 rounded-md border"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <div className="bg-white rounded-md shadow-md">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3">ชื่อผู้ใช้</th>
                                    <th className="p-3">อีเมล</th>
                                    <th className="p-3">บทบาท</th>
                                    <th className="p-3 text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.map((u) => (
                                    <tr key={u.id} className="border-t">
                                        <td className="p-3">{u.username}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${u.role === "ADMIN"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-blue-100 text-blue-600"
                                                    }`}
                                            >
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center flex gap-2 justify-center">
                                            <button onClick={() => setSelectedUser(u)} className="text-blue-500 hover:text-blue-300">
                                                แก้ไข
                                            </button>
                                            <button onClick={() => handleDelete(u.id)}>
                                                <Trash size={20} className="text-red-500 hover:text-red-300" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* แก้ไขผู้ใช้ */}
                    {selectedUser && (
                        <EditUserModal
                            selectedUser={selectedUser}
                            onClose={() => setSelectedUser(null)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default AdminUser;
