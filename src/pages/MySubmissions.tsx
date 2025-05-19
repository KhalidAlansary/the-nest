
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { propertySubmissions } from '@/data/propertySubmissions';
import { PropertySubmission } from '@/types/propertySubmission';

const MySubmissions = () => {
  const { user } = useAuth();
  
  // Filter submissions by current user and only show pending or rejected ones
  const mySubmissions = propertySubmissions.filter(
    (submission) => 
      submission.owner === user?.username && 
      (submission.status === 'pending' || submission.status === 'rejected')
  );

  const getStatusBadge = (status: PropertySubmission['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Property Submissions</h1>
        
        {mySubmissions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySubmissions.map((submission) => (
              <Card key={submission.id} className="shadow-md">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-xl">{submission.title}</CardTitle>
                    <CardDescription className="text-sm">
                      Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  {getStatusBadge(submission.status)}
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Location:</p>
                      <p className="text-sm text-gray-600">
                        {submission.location.city}, {submission.location.state}
                      </p>
                    </div>
                    
                    {submission.adminComments && (
                      <div>
                        <p className="text-sm font-medium text-gray-900">Admin Comments:</p>
                        <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md border">
                          {submission.adminComments}
                        </p>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <p className="text-right">
                        <a href={`/property-submission/${submission.id}`} className="text-nest-primary hover:text-nest-primary/80 text-sm">
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
            <h3 className="text-xl font-medium text-gray-600">You don't have any pending or rejected property submissions.</h3>
            <p className="mt-4">
              <a href="/submit-property" className="text-nest-primary hover:text-nest-primary/80">
                Submit a new property
              </a>
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MySubmissions;
