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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="users" element={<Profile />} />
                </Route>
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter