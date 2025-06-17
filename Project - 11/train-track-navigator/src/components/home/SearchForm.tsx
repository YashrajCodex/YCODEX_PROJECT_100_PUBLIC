
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, MapPin } from "lucide-react";
import { useStationData } from "@/hooks/useStation";
import { APIResponse, StationDetail } from "../../lib/interfaces/stationInterface";

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    class: "economy"
  });

  // temporary detail for stations to render when user input station name. from and to 
  const [fromStationSlice, setFromStationSlice] = useState<StationDetail[] | null>([]);
  const [toStationSlice, setToStationSlice] = useState<StationDetail[] | null>([]);
  //******************************************************* */

  // to get data from api
  const{data: fromStation, loading: fromLoading, error: fromError} = useStationData<APIResponse<StationDetail[]>>(formData.from);
  // console.log(fromStation)
  const { data: toStation, loading: toLoading, error: toError} = useStationData<APIResponse<StationDetail[]>>(formData.to);
  // console.log(toStation)


  useEffect(function () {
    if(fromStation?.status === "success" && fromStation?.data){
      setFromStationSlice(fromStation.data.slice(0, 5));
    }else{
      setFromStationSlice([]);
    }
  }, [fromStation]);

  useEffect(function () {
    if(toStation?.status === "success" && toStation?.data){
      setToStationSlice(toStation.data.slice(0, 5));
    }else{
      setToStationSlice([]);
    }
  }, [toStation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search form submitted:", formData);
    // Actual search functionality would go here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold text-railway-dark mb-4">Find Your Train</h2>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1">
          <Label htmlFor="from" className="text-sm font-medium mb-1.5 block">From</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-railway-muted" />
            <Input
              id="from"
              name="from"
              placeholder="Departure Station"
              className="pl-9"
              value={formData.from}
              onChange={handleChange}
            />
          </div>
          { fromLoading && <p>Loading...</p> }
          {fromError && <p>Error: {fromError.message}</p> }
          {fromStationSlice && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1">
              {fromStationSlice.map((station) => (
                <div 
                  key={station.code} 
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectChange("from", station.name)}
                >
                  {station.name} || {station.code}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="hidden md:flex items-center justify-center">
          <div className="bg-gray-100 rounded-full p-2">
            <ArrowRight className="h-4 w-4 text-railway-muted" />
          </div>
        </div>
        
        <div className="flex-1">
          <Label htmlFor="to" className="text-sm font-medium mb-1.5 block">To</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-railway-muted" />
            <Input
              id="to"
              name="to"
              placeholder="Arrival Station"
              className="pl-9"
              value={formData.to}
              onChange={handleChange}
            />
          </div>
          { toLoading && <p>Loading...</p> }
          {toError && <p>Error: {toError.message}</p> }
          {toStationSlice && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1">
              {toStationSlice.map((station) => (
                <div 
                  key={station.code} 
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectChange("to", station.name)}
                >
                  {station.name} || {station.code}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <Label htmlFor="date" className="text-sm font-medium mb-1.5 block">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        
        <div>
          <Label htmlFor="passengers" className="text-sm font-medium mb-1.5 block">Passengers</Label>
          <Select 
            defaultValue={formData.passengers} 
            onValueChange={(value) => handleSelectChange("passengers", value)}
          >
            <SelectTrigger id="passengers">
              <SelectValue placeholder="Number of Passengers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Passenger</SelectItem>
              <SelectItem value="2">2 Passengers</SelectItem>
              <SelectItem value="3">3 Passengers</SelectItem>
              <SelectItem value="4">4 Passengers</SelectItem>
              <SelectItem value="5+">5+ Passengers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="class" className="text-sm font-medium mb-1.5 block">Class</Label>
          <Select 
            defaultValue={formData.class} 
            onValueChange={(value) => handleSelectChange("class", value)}
          >
            <SelectTrigger id="class">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-railway-primary hover:bg-railway-secondary text-white py-6"
      >
        Search Trains
      </Button>
    </form>
  );
};

export default SearchForm;
