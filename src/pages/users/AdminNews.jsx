import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";


function AdminNews() {

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Topbar />
                <main className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">จัดการข่าวสาร</h2>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminNews;
