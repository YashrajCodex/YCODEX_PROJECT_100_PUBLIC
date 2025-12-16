import { Challenge } from "@/data/challenges";
import { addNewChallenge } from "@/lib/storage/indexDB";
import AlertAnimate from "../../UI/AlertAnimate";
import { useState } from "react";
import { OperationResult } from "@/pages/Playground";

interface AddAsProp {
  cl: Challenge;
}
export default function AddAsChallenge({ cl }: AddAsProp) {
  const [success, setSuccess] = useState<OperationResult>();
  async function handleAdd() {
    addNewChallenge(cl).then(
      () => setSuccess({ type: "success", message: "added" }),
      (reason) => setSuccess({ type: "error", message: reason })
    );
  }
  return (
    <div>
      {success && <AlertAnimate {...success} />}
      <button
        className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
        onClick={() => handleAdd()}
      >
        Add +
      </button>
    </div>
  );
}
