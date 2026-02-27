import note from "../model/Note.js";

export async function fetchAllNotes(req, res) {
  try {
    const Note = await note.find().sort({createdAt: -1}); // {} if we have to find with ID
    res.status(200).send(Note);
  } catch (error) {
    console.error("All Data are Not Fetched", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchNotesById(req, res) {
  try {
    const singleNote = await note.findById(req.params.id);
    if (!singleNote) return res.status(404).json({ message: "Note Not Found" });
    res.status(200).send(singleNote);
  } catch (error) {
    console.error("Note not Fetched");
    res.status(500).json("Internal Error");
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new note({ title, content });
    await newNote.save();
    res.status(201).send(newNote);
  } catch (error) {
    console.error("Note Not Created", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      },
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note Not Found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Note Not Updated", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const deleteNote = await note.findByIdAndDelete(req.params.id);
    if (!deleteNote) return res.status(404).json({ message: "Note Not Found" });
    res.status(200).json({ message: "Note deleted Successfully" });
  } catch (error) {
    console.error("Note Not Deleted", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
