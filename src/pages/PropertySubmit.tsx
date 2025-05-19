import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { FilePlus, FileText, Plus, Trash2, Upload } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Define the form schema
const propertyFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(1, "Location is required"),
  pricePerDay: z.coerce.number().positive("Price must be positive"),
  pricePerWeek: z.coerce.number().positive("Price must be positive"),
  pricePerMonth: z.coerce.number().positive("Price must be positive"),
  bedrooms: z.coerce.number().int().positive("Must have at least 1 bedroom"),
  bathrooms: z.coerce.number().positive("Must have at least 1 bathroom"),
  maxGuests: z.coerce.number().int().positive("Must accommodate at least 1 guest"),
  facilities: z.array(
    z.object({
      name: z.string().min(1, "Facility name is required"),
      icon: z.string().default("tv"),
    })
  ),
  images: z.any().refine(files => files?.length > 0, {
    message: "At least one image is required",
  }),
  leaseDocument: z.any().refine(file => file?.length > 0, {
    message: "Lease document is required",
  }),
  idDocument: z.any().refine(file => file?.length > 0, {
    message: "ID document is required",
  }),
});

type PropertyFormValues = z.infer<typeof propertyFormSchema>;

// Array of available locations
const LOCATIONS = [
  { value: "new-cairo", label: "New Cairo" },
  { value: "sheikh-zayed", label: "Sheikh Zayed" },
  { value: "cairo", label: "Cairo" },
  { value: "alexandria", label: "Alexandria" },
  { value: "gouna", label: "Gouna" },
  { value: "sahel", label: "Sahel" },
  { value: "ain-el-sokhna", label: "Ain El Sokhna" },
];

const PropertySubmit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [leaseFile, setLeaseFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with default values
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      pricePerDay: 0,
      pricePerWeek: 0,
      pricePerMonth: 0,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      facilities: [{ name: "WiFi", icon: "wifi" }],
      images: undefined,
      leaseDocument: undefined,
      idDocument: undefined,
    },
  });

  // Use field array for dynamic facilities
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "facilities",
  });

  // Handle image upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages(prevImages => [...prevImages, ...newImages]);
      form.setValue("images", [...images, ...newImages], { 
        shouldValidate: true 
      });
    }
  };

  // Handle lease document upload
  const handleLeaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLeaseFile(e.target.files[0]);
      form.setValue("leaseDocument", e.target.files, { 
        shouldValidate: true 
      });
    }
  };

  // Handle ID document upload
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
      form.setValue("idDocument", e.target.files, { 
        shouldValidate: true 
      });
    }
  };

  // Remove an image from the list
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    form.setValue("images", newImages.length ? newImages : undefined, {
      shouldValidate: true
    });
  };

  // Handle form submission
  const onSubmit = (data: PropertyFormValues) => {
    setIsSubmitting(true);
    
    // In a real application, you would send this data to your backend
    // For now, we'll just simulate a submission
    setTimeout(() => {
      toast.success("Property submitted successfully", {
        description: "Your property will be reviewed by our team."
      });
      setIsSubmitting(false);
      navigate("/properties");
    }, 1500);

    console.log("Submitted data:", {
      ...data,
      owner: {
        id: 1, // In a real app, this would come from the authenticated user
        name: user?.username || "Anonymous",
      },
      images: images,
      documents: [
        { name: "Lease Document", file: leaseFile, type: "lease" as const },
        { name: "ID Document", file: idFile, type: "id" as const },
      ],
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Submit Your Property</h1>
            <p className="text-gray-600">
              List your property on our platform and start earning!
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Beach House Retreat" {...field} />
                        </FormControl>
                        <FormDescription>
                          A catchy name for your property
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your property in detail..."
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of your property
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Select 
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                              {LOCATIONS.map((location) => (
                                <SelectItem key={location.value} value={location.value}>
                                  {location.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Select where your property is located
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Property Details</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input type="number" min="0.5" step="0.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="maxGuests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Guests</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Pricing</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="pricePerDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Per Day ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pricePerWeek"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Per Week ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pricePerMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Per Month ($)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Facilities</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`facilities.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input placeholder="Facility name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ name: "", icon: "tv" })}
                      className="mt-2"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add Facility
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Property Images</h2>
                </CardHeader>
                <CardContent>
                  <FormItem>
                    <FormLabel>Upload Images</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                        <div className="space-y-2 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                          </div>
                          <div className="text-xs text-gray-500">
                            PNG, JPG, WEBP up to 5MB each
                          </div>
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImagesChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />

                    {images.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Uploaded Images</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-md overflow-hidden">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Property image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FormItem>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Required Documents</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormItem>
                    <FormLabel>
                      Lease Document
                      <Badge variant="outline" className="ml-2">PDF Required</Badge>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <div 
                          className="flex-1 flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50"
                          onClick={() => document.getElementById('lease-upload')?.click()}
                        >
                          <FilePlus className="mr-2 h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {leaseFile ? leaseFile.name : "Upload lease document"}
                          </span>
                          <Input
                            id="lease-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleLeaseChange}
                          />
                        </div>
                        {leaseFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => {
                              setLeaseFile(null);
                              form.setValue("leaseDocument", undefined, {
                                shouldValidate: true
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a copy of the lease agreement to verify your ownership of the property
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel>
                      ID Document
                      <Badge variant="outline" className="ml-2">PDF Required</Badge>
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <div 
                          className="flex-1 flex items-center border rounded-md p-3 cursor-pointer hover:bg-gray-50"
                          onClick={() => document.getElementById('id-upload')?.click()}
                        >
                          <FileText className="mr-2 h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {idFile ? idFile.name : "Upload identification document"}
                          </span>
                          <Input
                            id="id-upload"
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            onChange={handleIdChange}
                          />
                        </div>
                        {idFile && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => {
                              setIdFile(null);
                              form.setValue("idDocument", undefined, {
                                shouldValidate: true
                              });
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Upload a copy of your ID for verification purposes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/properties")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Property"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertySubmit;
