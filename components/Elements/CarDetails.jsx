import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar, Car, DollarSign, Fuel, MapPin, ParkingCircle, Phone, PrinterCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCarListing } from '@/app/actions/carListing';

export default async function CarDetails() {
  const { cars } = await getCarListing();

  if (!cars || cars.length === 0) {
    return <div className="text-center py-10">No cars found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/add-car">
        <Button variant="default" className="mb-6">Add Car</Button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">Available Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car._id} className="flex flex-col overflow-hidden">
            <div className="relative">
              <img
                src={car.images[0] || ''}
                alt={`${car.carModel}`} // Corrected to use carModel
                className="w-full h-48 object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">{car.carModel}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{car.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{car.city || 'N/A'}</span> {/* Changed to display city */}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-primary">Rs. {car.price || 'N/A'}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


// export function CarDetailsSkeleton() {
//   return (
//     <div className="container mx-auto py-8">
//       <Skeleton className="w-64 h-8 mb-6" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(6)].map((_, index) => (
//           <Card key={index} className="flex flex-col overflow-hidden">
//             <Skeleton className="w-full h-48" />
//             <CardHeader>
//               <Skeleton className="w-full h-6" />
//             </CardHeader>
//             <CardContent className="flex-grow">
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 {[...Array(4)].map((_, i) => (
//                   <Skeleton key={i} className="w-full h-4" />
//                 ))}
//               </div>
//               <Skeleton className="w-full h-16" />
//             </CardContent>
//             <CardFooter>
//               <Skeleton className="w-full h-10" />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }