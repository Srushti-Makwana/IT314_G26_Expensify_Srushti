"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "C:/Users/Admin/Downloads/expense-tracker/expense-tracker/@/components/ui/dialog.jsx";
import EmojiPicker from "emoji-picker-react";

function CreateBudget() {
    const [emojiIcon, setEmojiIcon] = useState('+');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');     
    const [amount, setAmount] = useState('');  

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md">
                        <h2 className="text-3xl">+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent 
                    className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg"
                    style={{
                        position: "fixed",
                        top: "45%",           
                        left: "50%",
                        transform: "translate(-50%, -15%)",
                    }}
                >
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className="mt-5 flex flex-col items-start">
                                <div 
                                    className="border border-gray-300 p-3 rounded-md text-4xl cursor-pointer mb-2"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </div>
                                {openEmojiPicker && (
                                    <div className="absolute z-10">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="mt-3 w-full">
                                    <h2 className="text-black font-medium mb-1 text-left">Budget Name</h2>
                                    <input 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Home Decor"
                                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mt-3 w-full">
                                    <h2 className="text-black font-medium mb-1 text-left">Budget Amount</h2>
                                    <input 
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. Rs. 5000"
                                        className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button
                                        disabled={!(name && amount)}
                                        className={`mt-5 w-full p-3 rounded-md transition-colors duration-300 
                                                    ${name && amount ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
                                    >
                                        Create Budget
                                    </button>

                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateBudget;
