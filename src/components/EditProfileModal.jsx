import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useUserStore from "../store/user-store";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../store/auth-store";

const EditProfileModal = ({ isOpen, onClose }) => {
  const { updateCurrentUser } = useUserStore();
  const { fetchCurrentUser, currentUser } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ✅ โหลดข้อมูลเดิมเมื่อ modal เปิด
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
        password: "",
      });
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCurrentUser(formData); 
      await fetchCurrentUser(); 
      Swal.fire("สำเร็จ", "อัปเดตโปรไฟล์เรียบร้อยแล้ว", "success");
      onClose();
    } catch (err) {
      Swal.fire("ผิดพลาด", "ไม่สามารถอัปเดตโปรไฟล์ได้", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
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
            <div className="bg-white p-6 rounded-md w-full max-w-md relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ❌
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="เปลี่ยนชื่อผู้ใช้"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="เปลี่ยนอีเมล"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="เปลี่ยนรหัสผ่าน"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#c88a50] text-white px-4 py-2 rounded hover:bg-[#a5713d]"
                >
                  บันทึกการเปลี่ยนแปลง
                </button>
              </form>
            </div >
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div >
  );
};

export default EditProfileModal;
