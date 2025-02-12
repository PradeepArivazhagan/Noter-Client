import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdDone } from "react-icons/md";
import { IoIosAddCircle, IoMdClose, IoMdSave } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ThreeDot } from "react-loading-indicators";
import NoNotes from "../assets/NoNotes.png";
import axios from "axios";
import Cookie from "js-cookie";
import Modal from "react-modal";
import toast from "react-hot-toast";

//Styling for Modal
const customStyles = {
  content: {
    width: "80%",
    maxWidth: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

const Notes = () => {
  const userId = Cookie.get("userId");

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editId, setEditId] = useState(null);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [showAction, setShowAction] = useState(null);
  const onClickShowAction = (id) => {
    setShowAction((prev) => (prev === id ? null : id));
  };

  //Create Modal Functions
  const openCreateModal = () => {
    navigate(`createNote`);
    setIsOpen(true);
  };

  const closeCreateModal = () => {
    setIsOpen(false);
  };

  //Edit Modal Functions
  const openEditModal = (id) => {
    navigate(`/notes/editNote/${id}`);
    setEditId(id);
    setEditModalIsOpen(true);

    axios
      .get(`https://noter-server-zyvf.onrender.com/notes/editNote/${id}`)
      .then((response) => {
        setEditTitle(response.data.note.title);
        setEditContent(response.data.note.content);
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          style: {
            border: "1px solid #000000",
            padding: "14px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#ff0000",
            secondary: "#ffffff",
          },
        });
        console.error(error.message);
      });
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    navigate(`/notes`);
    setEditId(null);
  };

  //Handling Create Note
  const onCreateNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `https://noter-server-zyvf.onrender.com/notes/createNote`,
        {
          userId,
          title,
          content,
        }
      );
      setNotes([...notes, response.data.note]);
      setTitle("");
      setContent("");
      closeCreateModal();
      toast.success(response.data.message, {
        style: {
          border: "1px solid #000000",
          padding: "14px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#2fe053",
          secondary: "#ffffff",
        },
      });
      navigate(`/notes`);
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          border: "1px solid #000000",
          padding: "14px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#ffffff",
        },
      });
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Handling Edit Note
  const handleEditNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://noter-server-zyvf.onrender.com/notes/editNote/${editId}`,
        {
          title: editTitle,
          content: editContent,
        }
      );

      const updatedNotes = notes.map((note) =>
        note._id === editId ? response.data.note : note
      );

      setNotes(updatedNotes);
      setEditTitle("");
      setEditContent("");
      closeEditModal();
      toast.success(response.data.message, {
        style: {
          border: "1px solid #000000",
          padding: "14px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#2fe053",
          secondary: "#ffffff",
        },
      });
      navigate(`/notes`);
    } catch (error) {
      toast.error("Something went wrong", {
        style: {
          border: "1px solid #000000",
          padding: "14px",
          color: "#000000",
        },
        iconTheme: {
          primary: "#ff0000",
          secondary: "#ffffff",
        },
      });
      console.error(error.message);
    } finally {
      setShowAction(false);
      setLoading(false);
    }
  };

  //Handling Delete Note
  const handleDeleteNote = async (id) => {
    const toastId = toast.loading("Loading", {
      style: {
        border: "1px solid #000000",
        padding: "14px",
        color: "#000000",
      },
    });
    try {
      const response = await axios.delete(
        `https://noter-server-zyvf.onrender.com/notes/deleteNote/${id}`
      );
      setNotes(notes.filter((note) => note._id !== id));
      toast.success(
        response.data.message,
        { id: toastId },
        {
          style: {
            border: "1px solid #000000",
            padding: "14px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#2fe053",
            secondary: "#ffffff",
          },
        }
      );
    } catch (error) {
      toast.error(
        "Something went wrong",
        { id: toastId },
        {
          style: {
            border: "1px solid #000000",
            padding: "14px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#ff0000",
            secondary: "#ffffff",
          },
        }
      );
      console.error(error.message);
    }
  };

  //Get all notes of the user LoggedIn
  useEffect(() => {
    setLoading(true);
    if (!userId) return;
    axios
      .get(`https://noter-server-zyvf.onrender.com/notes?userId=${userId}`)
      .then((response) => {
        setNotes(response.data.notes);
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  //Empty Note Component
  const EmptyNote = () => {
    return (
      <div className="mt-12 min-h-96 flex flex-col items-center justify-center">
        <img className="w-52 md:w-56 lg:w-80" src={NoNotes} alt="empty note" />
        <p className="hidden md:block text-center text-gray-400 mt-12">
          You have no notes yet. Click the &quot;Create Note&quot; button to
          start adding new ones.
        </p>
        <p className="block md:hidden text-center text-gray-400 mt-12">
          You have no notes yet. Click the &quot;Add&quot; button to start
          adding new ones.
        </p>
      </div>
    );
  };

  //Loader Component
  const Loader = () => {
    return (
      <div className="flex flex-row items-center justify-center h-16 w-full">
        <ThreeDot color="#000" size="medium" />
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-lvh px-6 md:px-20 lg:px-32 py-24 lg:py-28">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">My Notes</h1>
        <button
          onClick={openCreateModal}
          className="bg-black hover:bg-gray-800 transition-colors duration-200 text-white py-1.5 px-4 rounded cursor-pointer flex flex-row items-center gap-2"
        >
          <IoIosAddCircle />
          <span className="hidden md:block">Create Note</span>
          <span className="md:hidden">Add</span>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeCreateModal}
          style={customStyles}
          contentLabel="Create Note"
        >
          <h1 className="text-xl font-semibold">New Note</h1>
          <form onSubmit={onCreateNote} className="flex flex-col mt-2 rounded">
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="outline-0 bg-gray-100 py-1.5 px-3 w-full placeholder:text-gray-300"
              placeholder="Title"
            />
            <hr className="text-gray-200" />
            <textarea
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
              className="outline-0 mt-1.5 bg-gray-100 py-1.5 px-3 w-full placeholder:text-gray-300"
              placeholder="Content"
            />
            <div className="mt-1 flex flex-row items-center justify-between w-full mx-auto">
              <button
                onClick={closeCreateModal}
                className="mt-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer py-1 px-2.5 rounded flex flex-row items-center gap-1"
              >
                <IoMdClose />
                Cancel
              </button>
              <button
                type="submit"
                className="mt-2 border-2 border-black bg-black hover:border-gray-800 hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-white py-1 px-3 rounded flex flex-row items-center gap-1"
              >
                {loading ? (
                  <div className="">
                    <ThreeDot color="#ffffff" size="small" />
                  </div>
                ) : (
                  <>
                    Done
                    <MdDone />
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      {loading ? (
        <Loader />
      ) : notes.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
          {notes.map((note) => (
            <div key={note._id} className="bg-white rounded-md p-3 shadow">
              <div className="flex flex-row justify-between items-start gap-5 ">
                <h2 className="font-semibold text-xl break-words max-w-[80%] overflow-hidden text-ellipsis">{note.title}</h2>
                <div className="flex flex-row items-center gap-1">
                  {showAction === note._id && (
                    <div className="flex flex-row items-center gap-3 bg-gray-100 rounded-full py-1 px-2">
                      <button
                        onClick={() => openEditModal(note._id)}
                        className="rounded-full text-black hover:text-yellow-500 text-xl transition-colors duration-200 cursor-pointer"
                      >
                        <MdEdit />
                      </button>
                      <Modal
                        isOpen={editModalIsOpen}
                        onRequestClose={closeEditModal}
                        style={customStyles}
                        contentLabel="Modal"
                      >
                        <h1 className="text-xl font-semibold">Edit Note</h1>
                        <form
                          onSubmit={handleEditNote}
                          className="flex flex-col mt-2 rounded"
                        >
                          <input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            type="text"
                            className="outline-0 bg-gray-100 py-1.5 px-3 w-full placeholder:text-gray-300"
                            placeholder="Title"
                            required
                          />
                          <hr className="text-gray-200" />
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="outline-0 mt-1.5 bg-gray-100 py-1.5 px-3 w-full placeholder:text-gray-300"
                            placeholder="Content"
                            required
                          />
                          <div className="mt-1 flex flex-row items-center justify-between w-full mx-auto">
                            <button
                              onClick={closeEditModal}
                              className="mt-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer py-1 px-2.5 rounded flex flex-row items-center gap-1"
                            >
                              <IoMdClose />
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="mt-2 border-2 border-black bg-black hover:bg-gray-800 hover:border-gray-800 transition-colors duration-200 cursor-pointer text-white py-1 px-3 rounded flex flex-row items-center gap-1"
                            >
                              {loading ? (
                                <div className="">
                                  <ThreeDot color="#ffffff" size="small" />
                                </div>
                              ) : (
                                <>
                                  Save
                                  <IoMdSave />
                                </>
                              )}
                            </button>
                          </div>
                        </form>
                      </Modal>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="rounded-full text-black hover:text-red-500 text-xl transition-colors duration-200 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => onClickShowAction(note._id)}
                    className={`p-1 text-xl ${
                      showAction !== note._id && "bg-gray-100"
                    } rounded-full cursor-pointer`}
                  >
                    {showAction === note._id ? (
                      <IoMdClose />
                    ) : (
                      <BsThreeDotsVertical />
                    )}
                  </button>
                </div>
              </div>
              <p className="mt-2 break-words max-w-full overflow-hidden text-ellipsis">{note.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyNote />
      )}
    </div>
  );
};

export default Notes;
