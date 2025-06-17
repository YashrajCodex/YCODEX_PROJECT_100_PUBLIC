import { Card } from "@/components/ui/card";
import { APIResponse, PnrDetail } from "@/lib/interfaces/pnrInterface";

interface Props {
  pnrResult: APIResponse<PnrDetail>;
}

export default function PnrResultComp({ pnrResult }: Props) {
    
  if (!pnrResult) return null;
    const {trainName, trainNo, dateOfJourney, chartStatus, passengerList, pnrNumber }= pnrResult.data;
  return (
    <div className="mt-6 p-4 border rounded-lg bg-blue-50">
            <h3 className="text-lg font-semibold text-blue-700">PNR Result</h3>
            {pnrResult.data && (
              <div className="mt-6 space-y-4">
                <Card className="p-4 bg-blue-50 border">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">
                    PNR Details
                  </h3>
                  <p>
                    <strong>PNR:</strong> {pnrNumber}
                  </p>
                  <p>
                    <strong>Train:</strong> {trainNo} - {trainName}
                  </p>
                  <p>
                    <strong>Date of Journey:</strong> {dateOfJourney}
                  </p>
                  <p>
                    <strong>Chart Status:</strong> {chartStatus}
                  </p>
                </Card>

                {passengerList?.map((passenger, idx) => (
                  <Card key={idx} className="p-4 border rounded-lg">
                    <h4 className="text-md font-semibold mb-2">
                      Passenger {idx + 1}
                    </h4>
                    <p>
                      <strong>Booking Status:</strong> {passenger.bookingStatus}
                    </p>
                    <p>
                      <strong>Current Status:</strong>{" "}
                      {passenger.currentStatusDetails}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </div>
  )
}
