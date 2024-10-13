export const formContent = {
    labels: {
      carModel: "Car Model",
      price: "Price",
      phone: "Phone",
      city: "City",
      images: "Images",
      imageLimit: "Number of Images",
    },
    placeholders: {
      carModel: "Enter car model",
      price: "Enter price",
      phone: "Enter phone number",
    },
    validationMessages: {
      carModel: "Car model must be at least 3 characters long.",
      price: "Please enter a valid price.",
      phone: "Phone number must be 10 to 15 digits.",
      city: "City is required.",
      imageError: {
        noImages: "At least one image is required.",
        limitExceeded: (limit) => `Only ${limit} images are allowed.`,
        uploadLimitExceeded: (limit) => `You can only upload up to ${limit} images.`,
        imageLimit: (limit) => `You must upload exactly ${limit} images.`,
      },
      submissionError: "An error occurred while submitting the form. Please try again.",
    },
    cities: ["lahore", "karachi"],
  };
  