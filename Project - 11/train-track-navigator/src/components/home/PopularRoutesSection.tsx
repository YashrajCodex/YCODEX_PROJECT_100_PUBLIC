
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  time: string;
  imageUrl?: string;
}

const RouteCard: React.FC<RouteCardProps> = ({ from, to, price, time, imageUrl }) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div 
        className="h-32 bg-gray-200 bg-cover bg-center" 
        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-railway-muted">From</p>
            <h3 className="font-semibold text-railway-dark">{from}</h3>
          </div>
          <ArrowRight className="h-5 w-5 text-railway-muted mt-4" />
          <div className="text-right">
            <p className="text-sm text-railway-muted">To</p>
            <h3 className="font-semibold text-railway-dark">{to}</h3>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-railway-muted">Fastest journey</p>
            <p className="font-medium text-railway-dark">{time}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-railway-muted">From</p>
            <p className="font-bold text-railway-primary">{price}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4 border-railway-primary text-railway-primary hover:bg-railway-primary hover:text-white"
        >
          View Trains
        </Button>
      </CardContent>
    </Card>
  );
};

const PopularRoutesSection: React.FC = () => {
  const popularRoutes = [
    {
      from: "New York",
      to: "Boston",
      price: "$29",
      time: "3h 45m",
      imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
    },
    {
      from: "Chicago",
      to: "St. Louis",
      price: "$45",
      time: "5h 20m",
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80"
    },
    {
      from: "Seattle",
      to: "Portland",
      price: "$35",
      time: "3h 30m",
      imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    },
    {
      from: "Los Angeles",
      to: "San Francisco",
      price: "$55",
      time: "6h 40m",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section className="py-16 bg-railway-light">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-railway-dark mb-2">Popular Routes</h2>
            <p className="text-railway-muted max-w-xl">Discover our most traveled routes with great prices and frequent departures</p>
          </div>
          <Button variant="link" className="text-railway-primary mt-2 md:mt-0">
            View All Routes <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <RouteCard
              key={index}
              from={route.from}
              to={route.to}
              price={route.price}
              time={route.time}
              imageUrl={route.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutesSection;
