import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function CardContentItems() {
  const { receipts: rec, reports: rep, transactions: trans } = useSelector((state: RootState) => state);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="text-center">
        <p className="text-2xl font-bold text-primary">
          {trans && trans?.transactions?.length}
        </p>
        <p className="text-sm text-muted-foreground">Total Transactions</p>
      </div>
      <div className="text-center">
              <p className="text-2xl font-bold text-success">{ rep && rep?.reports?.length}</p>
        <p className="text-sm text-muted-foreground">Reports Generated</p>
      </div>
      <div className="text-center">
              <p className="text-2xl font-bold text-warning">{ rec && rec?.receipts?.length}</p>
        <p className="text-sm text-muted-foreground">Receipts Created</p>
      </div>
      {/* <div className="text-center">
        <p className="text-2xl font-bold text-muted-foreground">30</p>
        <p className="text-sm text-muted-foreground">Days Active</p>
      </div> */}
    </div>
  );
}
