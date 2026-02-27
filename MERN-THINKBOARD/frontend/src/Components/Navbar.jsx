import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="glass-nav">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity"
          >
            ThinkBoard
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="btn btn-primary rounded-full px-6 flex items-center gap-2 shadow-lg shadow-primary/20 border-none"
            >
              <PlusIcon className="size-5" />
              <span className="font-semibold">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
