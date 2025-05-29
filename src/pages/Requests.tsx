import React from "react";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type RequestStatus = "pending" | "in_progress" | "completed" | "cancelled";
type RequestType = "maintenance" | "cleaning";

interface ServiceRequest {
  id: number;
  propertyId: string;
  propertyTitle: string;
  type: RequestType;
  status: RequestStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

// Mock data for maintenance and cleaning requests
const mockRequests: ServiceRequest[] = [
  {
    id: 1,
    propertyId: "1",
    propertyTitle: "Cozy Downtown Loft",
    type: "maintenance",
    status: "pending",
    description: "The kitchen sink is leaking",
    createdAt: "2025-05-10T12:00:00Z",
    updatedAt: "2025-05-10T12:00:00Z",
    owner: "jane_smith",
  },
  {
    id: 2,
    propertyId: "2",
    propertyTitle: "Luxury Beachfront Villa",
    type: "cleaning",
    status: "completed",
    description: "Regular cleaning service",
    createdAt: "2025-05-08T10:30:00Z",
    updatedAt: "2025-05-09T14:20:00Z",
    owner: "jane_smith",
  },
  {
    id: 3,
    propertyId: "3",
    propertyTitle: "Mountain View Cabin",
    type: "maintenance",
    status: "in_progress",
    description: "Heater not working properly",
    createdAt: "2025-05-07T09:15:00Z",
    updatedAt: "2025-05-08T11:45:00Z",
    owner: "jane_smith",
  },
];

const Requests = () => {
  const { user } = useAuth();

  // Filter requests by current user
  const userRequests = mockRequests.filter(
    (request) => request.owner === user?.username,
  );

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">Cancelled</Badge>
        );
      default:
        return null;
    }
  };

  const getRequestTypeBadge = (type: RequestType) => {
    switch (type) {
      case "maintenance":
        return (
          <Badge
            variant="outline"
            className="border-orange-500 text-orange-700"
          >
            Maintenance
          </Badge>
        );
      case "cleaning":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-700"
          >
            Cleaning
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Service Requests</h1>

        {userRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRequests.map((request) => (
              <Card key={request.id} className="shadow-md">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">
                      {request.propertyTitle}
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      Submitted:{" "}
                      {new Date(request.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col space-y-2 items-end">
                    {getStatusBadge(request.status)}
                    {getRequestTypeBadge(request.type)}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Issue Description:</p>
                      <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md border">
                        {request.description}
                      </p>
                    </div>

                    {request.status === "in_progress" && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          Last updated:{" "}
                          {new Date(request.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <p className="text-right">
                        <a
                          href={`/requests/${request.id}`}
                          className="text-nest-primary hover:text-nest-primary/80 text-sm"
                        >
                          View Details
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              You don't have any service requests.
            </h3>
            <p className="mt-4">
              <a
                href="/new-request"
                className="text-nest-primary hover:text-nest-primary/80"
              >
                Submit a new request
              </a>
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Requests;
