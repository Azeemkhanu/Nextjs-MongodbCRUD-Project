import Link from "next/link"
export default function Navbar(){
    return(
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 font-serif ">
            <Link className="text-orange-500 text-xl  font-bold" href={"/"}>Nayatel</Link>
            <Link className="bg-white p-2" href={"/addTopic"}>Add Topic</Link>
        </nav>
    )
}