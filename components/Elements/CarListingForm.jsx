"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ImagePlus, Trash2, Eye, Loader2 } from "lucide-react";
import { addCarListing } from "@/app/actions/carListing";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { formContent } from "@/constants/formContent"; // Import the content

export default function CarListingForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [formState, setFormState] = useState({ success: false, message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageLimit, setImageLimit] = useState(0);
  const { toast } = useToast();

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("carModel") || formData.get("carModel").length < 3) {
      errors.carModel = formContent.validationMessages.carModel;
      toast({
        title: "Car model",
        description: errors.carModel,
      });
    }
    if (
      !formData.get("price") ||
      isNaN(formData.get("price")) ||
      Number(formData.get("price")) <= 0
    ) {
      errors.price = formContent.validationMessages.price;
      toast({
        title: "Price Error",
        description: errors.price,
      });
    }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.get("phone") || !phoneRegex.test(formData.get("phone"))) {
      errors.phone = formContent.validationMessages.phone;
      toast({
        title: "Phone Number Error",
        description: errors.phone,
      });
    }
    if (!formData.get("city")) {
      errors.city = formContent.validationMessages.city;
      toast({
        title: "City Error",
        description: errors.city,
      });
    }
    if (images.length === 0) {
      errors.images = formContent.validationMessages.imageError.noImages;
      toast({
        title: "Image Error",
        description: errors.images,
      });
    } else if (images.length > imageLimit) {
      errors.images = formContent.validationMessages.imageError.limitExceeded(imageLimit);
      toast({
        title: "Image Error",
        description: errors.images,
      });
    }
    return errors;
  };

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);

      if (fileArray.length > imageLimit) {
        toast({
          title: "Upload Limit Exceeded",
          description: formContent.validationMessages.imageError.uploadLimitExceeded(imageLimit),
        });
      } else {
        setImages(fileArray);
      }
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target);
    const validationErrors = validateForm(formData);
  
    // Stop form submission if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setLoading(false);
      return;
    }
  
    // Check if the number of images matches the imageLimit
    if (images.length === imageLimit) {
      // Append images to formData
      images.forEach((file) => {
        formData.append('images', file);
      });
  
      const info = {
        userId: session?.user._id,
        userEmail: session?.user.email,
      };
  
      try {
        const result = await addCarListing(formData, info);
        if (result.success) {
          router.push("/");
        }
        setFormState(result);
      } catch (error) {
        toast({
          title: "Submission Error",
          description: formContent.validationMessages.submissionError,
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast({
        title: "Image Limit Error",
        description: formContent.validationMessages.imageError.imageLimit(imageLimit),
      });
    }
  };
  

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Add New Car Listing
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="carModel">{formContent.labels.carModel}</Label>
            <Input
              id="carModel"
              name="carModel"
              placeholder={formContent.placeholders.carModel}
              required
            />
          </div>
          <div className="flex justify-between gap-6 items-center">
            <div className="space-y-2 w-full">
              <Label htmlFor="price">{formContent.labels.price}</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder={formContent.placeholders.price}
                required
              />
            </div>
            <div className="space-y-2 w-full">
              <Label htmlFor="phone">{formContent.labels.phone}</Label>
              <Input
                id="phone"
                name="phone"
                type="number"
                placeholder={formContent.placeholders.phone}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{formContent.labels.city}</Label>
            <RadioGroup
              name="city"
              defaultValue="lahore"
              className="flex space-x-4"
            >
              {formContent.cities.map((city) => (
                <div className="flex items-center space-x-2" key={city}>
                  <RadioGroupItem value={city} id={city} />
                  <Label htmlFor={city}>{city.charAt(0).toUpperCase() + city.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageLimit">{formContent.labels.imageLimit}</Label>
            <Select
              name="imageLimit"
              onValueChange={(value) => setImageLimit(Number(value))}
            >
              <SelectTrigger id="imageLimit">
                <SelectValue placeholder="Select number of images" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{formContent.labels.images}</Label>
            <div className="flex flex-wrap gap-2">
              {images.slice(0, imageLimit).map((img, index) => (
                <div
                  key={index}
                  className="relative group p-2 bg-white border rounded-md w-24 h-24"
                >
                  <Image
                    src={URL.createObjectURL(img)}
                    alt={`Uploaded ${index + 1}`}
                    layout="fill"
                    className="object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteImage(index)}
                      className="text-white hover:text-red-500 transition-colors hover:bg-slate-100/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:text-black transition-colors hover:bg-slate-100/80"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <label
                htmlFor="imageUpload"
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-50/25 transition-colors"
              >
                <ImagePlus className="w-8 h-8 text-gray-400" />
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={images.length >= imageLimit}
                />
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Car Listing"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
