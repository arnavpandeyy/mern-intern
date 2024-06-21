import Link from "next/link";

export default function Header() {
    return (
      <header className="flex items-center justify-between bg-black">
        <Link className = "text-primary font-bold text-2xl italic text-white" style={{color: "#24c1c7"}} href="/">
            Roxiler System Coding Challenge :
        </Link>
        <nav className="flex gap-12 items-center text-gray-600 font-semibold">
            <Link href={"/"} className="bg-black text-white p-3 rounded-full" style={{color: "#24c1c7"}}>Transaction</Link>
            <Link href={"/Statistics"} className="bg-black text-white p-3 rounded-full" style={{color: "#24c1c7"}}>Statistics</Link>
            <Link href={"/Graphs"} className="bg-black text-white p-3 rounded-full" style={{color: "#24c1c7"}}>BarGraph</Link>
            <Link href={"/Chart"} className="bg-black text-white p-3 rounded-full" style={{color: "#24c1c7"}}>PieChart</Link>
        </nav>
      </header>
    );
  }
  