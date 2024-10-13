import CarListingForm from '@/components/Elements/CarListingForm'
import React from 'react'

export const metadata = {
  title: 'Add a New Car Listing - Car Listings',
  description: 'List your car for sale by filling out our easy-to-use form. Share details and images to attract potential buyers.'
};

export default function page() {
  return (
   <div className="p-2 md:p-6">
    <CarListingForm/>
   </div>
  )
}
