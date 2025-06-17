import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Train } from "lucide-react";
import { usePnrStation } from "@/hooks/usePnrStation";
import { PnrDetail, APIResponse } from "@/lib/interfaces/pnrInterface";
import PnrResultComp from "./PnrResultComp";

export default function PNRStatusChecker() {
  const [pnr, setPnr] = useState<string>("");
  const [fetch, setFetch] = useState<boolean>(false);  

  const {
    pnr: pnrResult,
    loading: pnrLoading,
    error: pnrError,
  } = usePnrStation<APIResponse<PnrDetail>>(pnr, fetch, setFetch);
  
  return (
    <Card className="max-w-xl mx-auto mt-10 p-6 shadow-xl rounded-2xl bg-white">
      <CardContent>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Train className="text-blue-600" /> PNR Status Checker
        </h2>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Enter 10-digit PNR"
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            className="flex-1"
            maxLength={10}
            type="number"
          />
          <Button disabled={pnrLoading} onClick={() => setFetch(true)}>
            {pnrLoading ? <Loader2 className="animate-spin" /> : "Check Status"}
          </Button>
        </div>
        {pnrError && (
          <p className="text-red-500 mt-3">{pnrError.message}</p>
        )}
      </CardContent>
      <PnrResultComp pnrResult={pnrResult} />
    </Card>
  );
}
