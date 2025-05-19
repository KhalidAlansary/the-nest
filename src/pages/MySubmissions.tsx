
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { propertySubmissions } from '@/data/propertySubmissions';
import { PropertySubmission as PropertySubmissionType, ApprovalStatus } from '@/types/propertySubmission';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  approved: "bg-green-100 text-green-800 hover:bg-green-100",
  rejected: "bg-red-100 text-red-800 hover:bg-red-100"
};

const MySubmissions = () => {
  const { user } = useAuth();
  
  // Filter submissions to only show those from the current user
  const mySubmissions = propertySubmissions.filter(submission => 
    submission.owner.id === user?.id
  );
  
  // Group submissions by status
  const pendingSubmissions = mySubmissions.filter(sub => sub.status === 'pending');
  const approvedSubmissions = mySubmissions.filter(sub => sub.status === 'approved');
  const rejectedSubmissions = mySubmissions.filter(sub => sub.status === 'rejected');
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const PropertySubmission = ({ submission }: { submission: PropertySubmissionType }) => {
    const statusColor = statusColors[submission.status];
    
    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{submission.name}</CardTitle>
              <CardDescription>Submitted on {formatDate(submission.submittedAt)}</CardDescription>
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
              <p>${submission.pricePerDay}/day</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-500">Description</p>
            <p className="line-clamp-3">{submission.description}</p>
          </div>
          
          {submission.reviewNotes && submission.status === 'rejected' && (
            <div className="mt-4 p-3 bg-red-50 rounded-md">
              <p className="text-sm font-medium text-red-800">Rejection Reason:</p>
              <p className="text-sm text-red-700">{submission.reviewNotes}</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-gray-500">
            <span>{submission.bedrooms} {submission.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
            <span className="mx-2">•</span>
            <span>{submission.bathrooms} {submission.bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
            <span className="mx-2">•</span>
            <span>Up to {submission.maxGuests} guests</span>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Property Submissions</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({mySubmissions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedSubmissions.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedSubmissions.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {mySubmissions.length > 0 ? (
              mySubmissions.map((submission) => (
                <PropertySubmission key={submission.id} submission={submission} />
              ))
            ) : (
              <p className="text-center py-10 text-gray-500">You haven't submitted any properties yet.</p>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingSubmissions.length > 0 ? (
              pendingSubmissions.map((submission) => (
                <PropertySubmission key={submission.id} submission={submission} />
              ))
            ) : (
              <p className="text-center py-10 text-gray-500">You don't have any pending submissions.</p>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {approvedSubmissions.length > 0 ? (
              approvedSubmissions.map((submission) => (
                <PropertySubmission key={submission.id} submission={submission} />
              ))
            ) : (
              <p className="text-center py-10 text-gray-500">You don't have any approved submissions.</p>
            )}
          </TabsContent>
          
          <TabsContent value="rejected">
            {rejectedSubmissions.length > 0 ? (
              rejectedSubmissions.map((submission) => (
                <PropertySubmission key={submission.id} submission={submission} />
              ))
            ) : (
              <p className="text-center py-10 text-gray-500">You don't have any rejected submissions.</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MySubmissions;
