import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../libs/axios";
import { ArrowLeft, CalendarIcon, ClockIcon } from "lucide-react";
import RateLimit from "../Components/RateLimit";

const NoteDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRateLimit, setIsRateLimit] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          console.error("Error fetching note:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  if (isRateLimit) return <RateLimit />;

  if (loading)
    return (
      <div className="max-w-3xl mx-auto p-4 mt-20 text-center">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );

  if (!note)
    return (
      <div className="max-w-3xl mx-auto p-4 mt-20 text-center">
        <h2 className="text-2xl font-bold">Note not found</h2>
        <Link to="/" className="btn btn-primary mt-4 text-white">
          Back to Home
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 animate-in slide-in-from-bottom duration-500">
      <Link
        to="/"
        className="btn btn-ghost btn-sm mb-6 gap-2 text-base-content/50 hover:text-primary transition-colors"
      >
        <ArrowLeft className="size-4" />
        Return to Dashboard
      </Link>

      <div className="bg-base-200 p-10 rounded-3xl border border-white/5 relative overflow-hidden min-h-[400px] shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-mono uppercase tracking-wider text-base-content/40">
          <div className="flex items-center gap-1.5 bg-base-300 px-3 py-1.5 rounded-full border border-base-content/5">
            <CalendarIcon className="size-3.5" />
            <span>
              Created: {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-base-300 px-3 py-1.5 rounded-full border border-base-content/5">
            <ClockIcon className="size-3.5" />
            <span>
              Last Updated: {new Date(note.updatedAt).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <h1 className="text-4xl font-extrabold mb-8 text-white leading-tight">
          {note.title}
        </h1>

        <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed whitespace-pre-wrap font-sans">
          {note.content}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/edit", { state: { id: note._id } })}
              className="btn btn-primary btn-sm rounded-full px-6 border-none shadow-lg shadow-primary/20"
            >
              Edit Note
            </button>
          </div>
          <div className="text-xs font-medium text-base-content/40 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            ThinkBoard Note
          </div>
        </div>

        {/* Background Accent */}
        <div className="absolute bottom-0 right-0 w-64 h-64 -mb-32 -mr-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
