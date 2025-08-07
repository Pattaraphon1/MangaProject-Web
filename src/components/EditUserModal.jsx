import React, { useState } from "react";
import useUserStore from "../store/user-store";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"

function EditUserModal({ selectedUser, onClose }) {
  const { updateUserById } = useUserStore();
  const [username, setUsername] = useState(selectedUser.username);
  const [email, setEmail] = useState(selectedUser.email);
  const [role, setRole] = useState(selectedUser.role);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserById(selectedUser.id, { username, email, role });
      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        text: "อัพเดตข้อมูลผู้ใช้สำเร็จ",
        timer: 2000,
        showConfirmButton: false,
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "อัพเดตข้อมูลผู้ใช้ไม่สำเร็จ",
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
          <h3 className="text-lg font-bold mb-4">Edit User</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">ชื่อผู้ใช้</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">บทบาท</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                disabled={loading}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
}

export default EditUserModal;
