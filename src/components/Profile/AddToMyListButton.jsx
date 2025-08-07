import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/auth-store";

const AddToMyListButton = ({ itemId, type }) => {
    const [inMyList, setInMyList] = useState(false);
    const [animating, setAnimating] = useState(false);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        const checkInList = async () => {
            try {
                const res = await axios.get(`http://localhost:8899/api/mylist/${type}/status/${itemId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInMyList(res.data.inList);
            } catch (err) {
                console.error("Error checking list status", err);
            }
        };

        checkInList();
    }, [itemId]);

    const handleToggleList = async () => {
        try {
            if (inMyList) {
                await axios.delete(`http://localhost:8899/api/mylist/${type}/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`http://localhost:8899/api/mylist/${type}/${itemId}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setAnimating(true);
            setInMyList(!inMyList);
            setTimeout(() => setAnimating(false), 300);
        } catch (error) {
            console.error("❌ Error toggling list:", error);
        }
    };

    return (
        <button className="ml-20"
            onClick={handleToggleList}
            aria-label={inMyList ? `Remove from My List` : `Add to My List`}
            style={{
                cursor: "pointer",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "2rem",
                color: inMyList ? "#1da1f2" : "#aaa", // สีฟ้าเวลาถูกเพิ่ม
                transform: animating ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.3s ease, color 0.3s ease",
                userSelect: "none",
            }}
        >
            {inMyList ? "✔️" : "➕"}
        </button>
    );
};

export default AddToMyListButton;
