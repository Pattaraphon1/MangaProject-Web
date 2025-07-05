import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "../Layouts/Layout"
import Home from "../pages/Home"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import News from "../pages/News"
import MangaPage from "../pages/Manga"
import AnimePage from "../pages/Anime"

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="manga" element={<MangaPage />} />
                    <Route path="anime" element={<AnimePage />} />
                    <Route path="news" element={<News/>} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter