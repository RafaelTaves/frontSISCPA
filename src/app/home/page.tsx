import SideBar from "../components/SideBar";

export default function Home () {
    return(
        <div className="min-h-screen max-h-screen w-full flex flex-col md:flex-row bg-gray-200">
            <SideBar/>
            <div className="w-full flex-col overflow-y-auto">
                
            </div>
        </div>
    )
}