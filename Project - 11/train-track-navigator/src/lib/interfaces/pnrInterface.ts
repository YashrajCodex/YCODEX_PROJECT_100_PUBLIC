export interface PnrDetail {
  arrivalDate: string;
  dateOfJourney: string;
  boardingPoint: string;
  bookingDate: string;
  destinationStation: string;
  journeyClass: string;
  numberOfPassengers: number;
  pnrNumber: string;
  trainName: string;
  trainNo: string;
  chartStatus: string;
  state_name: string;
  passengerList: passengerDetail[];
}

export interface APIResponse<T> {
  status: boolean;
  timestamp: number;
  data: T;
}

export interface passengerDetail {
  bookingStatus: string;
  currentStatusDetails: string;
}
