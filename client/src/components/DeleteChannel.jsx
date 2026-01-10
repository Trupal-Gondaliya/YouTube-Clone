const DeleteChannel = ({onClose, onConfirm, title }) => {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Channel?</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm leading-relaxed">
                    This action is permanent. All videos and data associated with <strong>{title}</strong> will be removed forever.
                </p>
                
                <div className="flex justify-end gap-3 mt-8">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors dark:text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors shadow-lg shadow-red-500/20"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteChannel;