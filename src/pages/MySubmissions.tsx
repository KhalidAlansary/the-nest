import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  approved: "bg-green-100 text-green-800 hover:bg-green-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100",
};

const MySubmissions = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/properties/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      setSubmissions(data);
    } catch (err) {
      console.error("Failed to load submissions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchSubmissions();
  }, [user]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const PropertySubmission = ({ submission }: { submission: any }) => {
    const statusColor =
      statusColors[submission.status as keyof typeof statusColors];

    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{submission.name}</CardTitle>
              <CardDescription>
                Submitted on {formatDate(submission.createdAt)}
              </CardDescription>
            </div>
            <Badge className={statusColor}>{submission.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p>{submission.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Daily Price</p>
              <p>L.E.{submission.pricePerDay}/day</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weekly Price</p>
              <p>L.E.{submission.pricePerWeek}/week</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Price</p>
              <p>L.E.{submission.pricePerMonth}/month</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Description</p>
            <p className="line-clamp-3">{submission.description}</p>
          </div>
          {submission.reviewComment && submission.status === "rejected" && (
            <div className="mt-4 p-3 bg-red-50 rounded-md">
              <p className="text-sm font-medium text-red-800">
                Rejection Reason:
              </p>
              <p className="text-sm text-red-700">{submission.reviewComment}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-gray-500">
            <span>
              {submission.bedrooms}{" "}
              {submission.bedrooms === 1 ? "bedroom" : "bedrooms"}
            </span>
            <span className="mx-2">•</span>
            <span>
              {submission.bathrooms}{" "}
              {submission.bathrooms === 1 ? "bathroom" : "bathrooms"}
            </span>
            <span className="mx-2">•</span>
            <span>Up to {submission.maxGuests} guests</span>
          </div>
        </CardFooter>
      </Card>
    );
  };

  // Type-safe filtering
  const grouped = {
    all: submissions,
    pending: submissions.filter((sub) => sub.status === "pending"),
    approved: submissions.filter((sub) => sub.status === "approved"),
    rejected: submissions.filter((sub) => sub.status === "rejected"),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Property Submissions</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All ({grouped.all.length})</TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({grouped.pending.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({grouped.approved.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({grouped.rejected.length})
              </TabsTrigger>
            </TabsList>

            {["all", "pending", "approved", "rejected"].map((status) => (
              <TabsContent key={status} value={status}>
                {grouped[status as keyof typeof grouped].length > 0 ? (
                  grouped[status as keyof typeof grouped].map((sub: any) => (
                    <PropertySubmission key={sub._id} submission={sub} />
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-500">
                    {status === "all"
                      ? "You haven't submitted any properties yet."
                      : `You don't have any ${status} submissions.`}
                  </p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MySubmissions;
