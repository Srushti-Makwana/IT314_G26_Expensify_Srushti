"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../../../../../components/ui/button'
import { PenBox } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "/Users/dharmilmunjapara/Desktop/exp_trac_maru_server/expense-tracker/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '../../../../../components/ui/input';
import { db } from '../../../../../utils/dbConfig';
import { Budgets } from '../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || '🎯');  // Default to a target emoji
  const [openEmojiPicker, setEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || ''); // Default to empty if no name exists
  const [amount, setAmount] = useState(budgetInfo?.amount || ''); // Default to empty or previous amount
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog open/close
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    // Ensure amount is a valid number, fallback to 0 if it's invalid
    const validAmount = amount ? parseFloat(amount) : 0;

    // Update the budget even if no changes
    const result = await db.update(Budgets).set({
      name: name,
      amount: validAmount,  // Ensure the amount is a valid number
      icon: emojiIcon,
    }).where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast("Budget Updated!");
      setOpenDialog(false); // Close the dialog after updating the budget
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="flex gap-2" onClick={() => setOpenDialog(true)}><PenBox /> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && (
                  <div className="absolute z-20">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="e.g. 5000$"
                    value={amount}  
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => onUpdateBudget()}
                  className="mt-5 w-full"
                >
                  Update Budget
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
