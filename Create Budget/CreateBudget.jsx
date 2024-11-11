"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "C:/Sushi/Project/expense-tracker1/expense-tracker/@/components/ui/dialog.jsx";
import EmojiPicker from "emoji-picker-react";
import { db } from "C:/Sushi/Project/expense-tracker1/expense-tracker/utils/dbConfig.jsx";
import { Budgets } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({ refreshData }) {
    const [emojiIcon, setEmojiIcon] = useState('+');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { user } = useUser();

    const onCreateBudget = async () => {
        if (!name || !amount) {
            toast.error("Please fill all fields!");
            return;
        }

        try {
            const result = await db.insert(Budgets)
                .values({
                    name: name.trim(),
                    amount: parseFloat(amount),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    icon: emojiIcon
                })
                .returning({ insertedId: Budgets.id });

            if (result) {
                refreshData();
                toast.success('New Budget Created!');
                setName('');
                setAmount('');
                setEmojiIcon('+');
            }
        } catch (error) {
            toast.error("Failed to create budget. Please try again.");
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-8 rounded-xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                        <h2 className="text-4xl text-white font-bold">+</h2>
                        <h2 className="text-xl text-white font-semibold">Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent
                    className="w-full max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl"
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold">Create New Budget</DialogTitle>
                        <DialogDescription className="mt-4 text-sm text-gray-600">
                            <div className="mt-5 flex flex-col items-start">
                                <div
                                    className="border-2 border-gray-300 p-4 rounded-lg text-5xl cursor-pointer mb-3 transition-transform hover:scale-110"
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                                >
                                    {emojiIcon}
                                </div>
                                {openEmojiPicker && (
                                    <div className="absolute z-20">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="mt-5 w-full">
                                    <h2 className="text-black font-medium mb-1">Budget Name</h2>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Home Decor"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                                    />
                                </div>

                                <div className="mt-5 w-full">
                                    <h2 className="text-black font-medium mb-1">Budget Amount</h2>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="e.g. Rs. 5000"
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
                                    />
                                </div>

                                <button
                                    disabled={!(name && amount)}
                                    onClick={onCreateBudget}
                                    className={`mt-6 w-full p-3 rounded-md text-white transition-colors duration-300 
                                        ${name && amount ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
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
