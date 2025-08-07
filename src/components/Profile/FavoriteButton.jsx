import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/auth-store";

const FavoriteButton = ({ itemId, type }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [animating, setAnimating] = useState(false);
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                // ส่ง request ไปเช็ค favorite status
                const res = await axios.get(`http://localhost:8899/api/favorite/${type}/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsFavorite(res.data.isFavorite);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        fetchFavoriteStatus();
    }, [itemId, token, type]);

    const handleToggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`http://localhost:8899/api/favorite/${type}/${itemId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`http://localhost:8899/api/favorite/${type}/${itemId}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setAnimating(true);
            setIsFavorite(!isFavorite);

            setTimeout(() => setAnimating(false), 300);
        } catch (error) {
            console.error("❌ Error toggling favorite:", error);
        }
    };

    return (
        <button
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? `Remove from favorite ${type}` : `Add to favorite ${type}`}
            style={{
                cursor: "pointer",
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "2rem",
                color: isFavorite ? "#e0245e" : "#aaa",
                transform: animating ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.3s ease, color 0.3s ease",
                userSelect: "none",
            }}
        >
            {isFavorite ? "💖" : "🤍"}
        </button>
    );
};

export default FavoriteButton;
