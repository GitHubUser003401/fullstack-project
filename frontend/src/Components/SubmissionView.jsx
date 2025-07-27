function SubmissionView({ open, message, onClose}) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 animate-fade-in flex backdrop-blur-xl items-center justify-center z-50">
            <div className="bg-gradient-to-br from-[#1e1ef8] to-[#22b6e8] rounded-lg shadow-lg p-6 min-w-[800px] scroll-p-12 scrollbar-thin h-fit">
            <div className="mb-4 text-2xl text-center text-red-700 font-baskervville">
                Submission Code
            </div>
                <div className="w-[750px] max-h-[450px] overflow-scroll mb-8 rounded-lg bg-gray-800">
                <div className="mb-4 text-lg text-red-700 font-newsreader">
                    <pre className="whitespace-pre-wrap p-4">
                        {message}
                    </pre>
                </div>
                </div>
                <div className="flex justify-end gap-6">
                    <button
                        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 hover:scale-105 hover:-translate-y-1"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                
            </div>
        </div>
    );
}
export default SubmissionView;