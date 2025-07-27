function DialogBox({open , message, onConfirm, onExit}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 animate-fade-in flex backdrop-blur-xl items-center justify-center z-50">
            <div className="bg-gradient-to-br from-[#1e1ef8] to-[#22b6e8] rounded-lg shadow-lg p-6 min-w-[500px] h-fit">
            <div className="mb-4 text-2xl text-center text-red-700 font-baskervville">{message}</div>
            <div className="flex justify-end gap-6">
                <button
                    className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 hover:scale-105 hover:-translate-y-1"
                    onClick={onConfirm}
                >
                    Confirm
                </button>
                <button
                    className="px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300 hover:scale-105 hover:-translate-y-1"
                    onClick={onExit}
                >
                    Exit
                </button>
            </div>
            </div>
        </div>
    )
}
export default DialogBox;