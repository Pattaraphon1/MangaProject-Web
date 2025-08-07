import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import News from "../pages/News"
import MangaPage from "../pages/Manga"
import AnimePage from "../pages/Anime"
import AnimeItem from "../pages/AnimeItem"
import MangaItem from "../pages/MangaItem"
import NewsItem from "../pages/NewsItem"
import Profile from "../pages/users/Profile"
import NotFound from "../pages/NotFound"
import GuestRoute from "./GuestRoute"
import ProtectedRoute from "./ProtectRoute"
import MainLayout from "../Layouts/MainLayout"
import AdminAnime from "../pages/users/AdminAnime"
import AdminManga from "../pages/users/AdminManga"
import AdminUser from "../pages/users/AdminUsers"
import AdminRoute from "./AdminRoute"
import AdminNews from "../pages/users/AdminNews"


function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="manga" element={<MangaPage />} />
                    <Route path="manga/:id" element={<MangaItem />} />
                    <Route path="anime" element={<AnimePage />} />
                    <Route path="anime/:id" element={<AnimeItem />} />
                    <Route path="news/" element={<News />} />
                    <Route path="news/:id" element={<NewsItem />} />

                    <Route element={<GuestRoute />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="users" element={<Profile />} />
                        <Route element={<AdminRoute />}>
                            <Route path="admin-anime" element={<AdminAnime />} />
                            <Route path="admin-manga" element={<AdminManga />} />
                            <Route path="admin-users" element={<AdminUser />} />
                            <Route path="admin-news" element={<AdminNews />} />
                        </Route>
                    </Route>

                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter