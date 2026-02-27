import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "../libs/axios";
import toast from "react-hot-toast";
import { SaveIcon, ArrowLeft, Loader2 } from "lucide-react";
import RateLimit from "../Components/RateLimit";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimit, setIsRateLimit] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    const fetchNote = async () => {
      try {
        const res = await axios.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimit(true);
        } else {
          toast.error("Failed to load note data");
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Fields cannot be empty");

    setSaving(true);
    try {
      await axios.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimit(true);
      } else {
        toast.error("Failed to update note");
      }
    } finally {
      setSaving(false);
    }
  };

  if (isRateLimit) return <RateLimit />;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="size-12 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <Link
        to="/"
        className="btn btn-ghost btn-sm mb-4 gap-2 text-base-content/60 hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Cancel Changes
      </Link>

      <h2 className="text-3xl font-extrabold mb-8 text-white">Edit Note</h2>

      <div className="bg-base-200 p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">
                Title
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">
                Content
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-48 bg-base-100"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`btn btn-primary rounded-full w-full gap-2 transition-all shadow-lg shadow-primary/20 border-none ${saving ? "loading" : ""}`}
            disabled={saving}
          >
            {!saving && <SaveIcon className="size-5" />}
            {saving ? "Updating..." : "Update Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
