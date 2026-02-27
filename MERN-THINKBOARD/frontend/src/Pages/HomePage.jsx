import React, { useEffect, useState } from "react";
import RateLimit from "../Components/RateLimit";
import axios from "../libs/axios";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIcon, Edit3, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimit, setIsRateLimit] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/notes");
      setNotes(res.data);
      setIsRateLimit(false);
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimit(true);
      } else {
        console.error("Error fetching notes:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent card click
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`/notes/${id}`);
      toast.success("Note deleted");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimit(true);
      } else {
        toast.error("Failed to delete note");
        console.error(error);
      }
    }
  };

  const handleEdit = (e, id) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/edit`, { state: { id } });
  };

  if (isRateLimit) return <RateLimit />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-base-200 animate-pulse rounded-2xl border border-base-content/5"
              ></div>
            ))}
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                onClick={() => navigate(`/note`, { state: { id: note._id } })}
                className="card-glow bg-base-200 rounded-2xl border border-white/5 cursor-pointer flex flex-col h-full group transition-all"
              >
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-base-content/60 line-clamp-3 text-sm leading-relaxed mb-6">
                    {note.content}
                  </p>
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="text-xs font-medium text-base-content/40 flex items-center gap-1.5">
                      <CalendarIcon className="size-3.5" />
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleEdit(e, note._id)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-base-content/40 hover:text-primary transition-all"
                        title="Edit Note"
                      >
                        <Edit3 className="size-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, note._id)}
                        className="p-2 rounded-lg hover:bg-error/10 text-base-content/40 hover:text-error transition-all"
                        title="Delete Note"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-content/10">
            <p className="text-xl text-base-content/50">Your board is empty.</p>
            <Link to="/create" className="btn btn-primary mt-4">
              Add Your First Note
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
