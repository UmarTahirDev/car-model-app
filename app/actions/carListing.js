"use server";

import connectToDatabase from "@/lib/db";
import CarListing from "@/models/CarListing";

export async function addCarListing(formData, info) {
  console.log(info, "info getting from server");
  
  try {
    // Connect to the database
    await connectToDatabase();

    const carModel = formData.get("carModel");
    const price = Number(formData.get("price"));
    const phone = formData.get("phone");
    const city = formData.get("city");
    const copies = Number(formData.get("copies"));

    // Process image files
    const imageFiles = [];
    const files = formData.getAll("images");

    for (const file of files) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "ecommerce-test-app");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/firstcloudimage/image/upload`,
        { method: "POST", body: uploadData }
      );

      const imagedata = await response.json();
      // Push the secure URL to imageFiles array
      imageFiles.push(imagedata.secure_url);
    }

    // Create a new car listing in the database
    const carListing = new CarListing({
      carModel,
      price,
      phone,
      city,
      copies,
      info, // Use the actual info received from the server
      images: imageFiles,
    });

    console.log("Car Listing to be saved:", carListing);

    // Save to the database
    await carListing.save();

    return { success: true, message: "Car listing added successfully!" };
  } catch (error) {
    console.error("Error adding car listing:", error.message || error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}


export async function getCarListing() {
  try {
    // Connect to the database
    await connectToDatabase();
    const cars = await CarListing.find();
    return { success: true, cars };
  } catch (error) {
    console.error("Error adding car listing:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
