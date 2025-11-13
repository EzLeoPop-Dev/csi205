import { useEffect, useState } from "react";

export default function ToDoListPage() {
    const [showWaitingOnly, setShowWaitingOnly] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    // โหลดข้อมูล todos จาก API
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error("Error fetching todos:", err));
    }, []);

    // waiting
    const filteredTodos = showWaitingOnly
        ? todos.filter((t) => !t.completed)
        : todos;

    // Pagination
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTodos = filteredTodos.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Toggle completed
    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    // Delete
    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    // Add new todo
    const addTodo = () => {
        if (!newTitle.trim()) return;

        // คำนวณ id ที่มากที่สุด
        const maxId = Math.max(...todos.map(i => i.id));
        const newTodo = {
            id: maxId + 1,  
            title: newTitle,
            completed: false,
        };

        setTodos([newTodo, ...todos]);
        setNewTitle("");
        setShowPopup(false);
    };

    return (
        <div className="max-w-[110rem] m-auto p-6 relative">
            <div className="flex justify-between items-center mb-4">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showWaitingOnly}
                        onChange={() => {
                            setShowWaitingOnly(!showWaitingOnly);
                            setCurrentPage(1);
                        }}
                        className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-full"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 bg-yellow-300 p-3 rounded-2xl">
                        Waiting Only
                    </span>
                </label>
                <div className="flex items-center gap-4">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border px-3 py-2 rounded-md bg-white text-gray-700"
                    >
                        {[5, 10, 50, 100].map((n) => (
                            <option key={n} value={n}>
                                {n} items per page
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => setShowPopup(true)}
                        className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-lg hover:bg-blue-700 shadow-md"
                        title="Add New Todo"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Table */}
            <table className="min-w-full text-sm border text-black border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                        <th className="border border-gray-300 px-4 py-2 w-[15rem] text-left">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTodos.map((item) => (
                        <tr key={item.id} className="bg-white text-black">
                            <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.title}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-between items-center">
                                <span
                                    className={`py-1 px-2 rounded-2xl text-white ${item.completed ? "bg-green-600" : "bg-red-600"
                                        }`}
                                >
                                    {item.completed ? "Done" : "Waiting"}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleComplete(item.id)}
                                        className="bg-blue-500 py-1.5 text-white px-2 rounded hover:bg-blue-600"
                                    >
                                        Toggle
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(item.id)}
                                        className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-3">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    First
                </button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-gray-700 font-medium">
                    Page {currentPage} / {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 bg-blue-600 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Last
                </button>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgba(69,73,73,0.5)] backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[25rem]">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Add New Todo
                        </h2>
                        {/* แสดง ID ที่จะเพิ่ม */}
                        <p className="text-black">ID: {Math.max(...todos.map(i => i.id)) + 1}</p>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Enter todo title..."
                            className="w-full border border-gray-300 text-gray-500 px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addTodo}
                                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
