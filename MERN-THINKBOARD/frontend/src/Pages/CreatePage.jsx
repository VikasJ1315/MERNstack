import React, { useState } from "react";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { SaveIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import RateLimit from "../Components/RateLimit";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRateLimit, setIsRateLimit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Please fill in all fields");

    setLoading(true);
    try {
      await axios.post("/notes", { title, content });
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        setIsRateLimit(true);
      } else {
        toast.error(error.response?.data?.message || "Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isRateLimit) return <RateLimit />;

  return (
    <div className="max-w-2xl mx-auto p-4 animate-in fade-in duration-500">
      <Link
        to="/"
        className="btn btn-ghost btn-sm mb-4 gap-2 text-base-content/60 hover:text-primary transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Dashboard
      </Link>

      <h2 className="text-3xl font-extrabold mb-8 text-white">New Note</h2>

      <div className="bg-base-200 p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">
                Title
              </span>
            </label>
            <input
              type="text"
              placeholder="What's this about?"
              className="input input-bordered w-full bg-base-100 border-base-content/10 focus:border-primary transition-all text-lg"
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
              className="textarea textarea-bordered h-48 bg-base-100 border-base-content/10 focus:border-primary transition-all text-base leading-relaxed"
              placeholder="Let your ideas flow here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`btn btn-primary rounded-full w-full gap-2 transition-all shadow-lg shadow-primary/20 border-none ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {!loading && <SaveIcon className="size-5" />}
            {loading ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
