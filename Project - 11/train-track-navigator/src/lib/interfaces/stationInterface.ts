export interface StationDetail {
  code: string;
  name: string;
  eng_name: string;
  state_name: string;
}

export interface APIResponse <T>{
  status: string;
  message: string;
  timestamp: number;
  data: T;
}