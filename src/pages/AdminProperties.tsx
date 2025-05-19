
import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Check, X, FileText, User } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ApprovalStatus } from '@/types/propertySubmission';
import { propertySubmissions } from '@/data/propertySubmissions';
import { properties } from '@/data/properties';

const AdminProperties = () => {
  const [submissions, setSubmissions] = useState(propertySubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof propertySubmissions[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [reviewNote, setReviewNote] = useState('');

  // Function to handle property approval/rejection
  const handleApprovalAction = (id: number, action: ApprovalStatus) => {
    // Update the local state
    setSubmissions(prevSubmissions => 
      prevSubmissions.map(submission => 
        submission.id === id 
          ? { ...submission, status: action, reviewNotes: reviewNote }
          : submission
      )
    );

    // In a real app, you would make an API call to update the status in the database
    // For now, just simulate with a toast notification
    toast.success(`Property ${action === 'approved' ? 'approved' : 'rejected'} successfully`, {
      description: `Property ID: ${id}`
    });

    // Close the dialog
    setIsDetailsOpen(false);
    setSelectedSubmission(null);
    setReviewNote('');
  };

  // Function to view submission details
  const viewDetails = (submission: typeof propertySubmissions[0]) => {
    setSelectedSubmission(submission);
    setIsDetailsOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status: ApprovalStatus) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow section-padding">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-nest-dark mb-2">Property Submissions</h1>
            <p className="text-gray-600">
              Review and manage property submissions from owners.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Table>
              <TableCaption>List of property submissions requiring review</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Property Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>{submission.id}</TableCell>
                    <TableCell>{submission.name}</TableCell>
                    <TableCell>{submission.owner.name}</TableCell>
                    <TableCell>{submission.location}</TableCell>
                    <TableCell>{format(new Date(submission.submittedAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{getStatusBadge(submission.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => viewDetails(submission)} 
                          variant="outline" 
                          size="sm"
                        >
                          View Details
                        </Button>
                        
                        {submission.status === 'pending' && (
                          <>
                            <Button 
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setReviewNote('');
                                handleApprovalAction(submission.id, 'approved');
                              }} 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            
                            <Button 
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setReviewNote('');
                                setIsDetailsOpen(true);
                              }} 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                
                {submissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No property submissions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      
      {/* Property Details Dialog */}
      {selectedSubmission && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Property Submission Details</DialogTitle>
              <DialogDescription>
                Review this property submission before making a decision.
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-6">
              {/* Property Images */}
              <div>
                <h3 className="text-lg font-medium mb-2">Property Images</h3>
                {Array.isArray(selectedSubmission.images) && selectedSubmission.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedSubmission.images.map((image: any, index: number) => (
                      <div key={index} className="overflow-hidden rounded-md">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={image.url}
                            alt={image.alt || `Property image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Property Details */}
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-500">Property Name</Label>
                    <p className="font-medium">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-500">Location</Label>
                    <p className="font-medium">{selectedSubmission.location}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm text-gray-500">Description</Label>
                    <p>{selectedSubmission.description}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Owner Information */}
              <div>
                <h3 className="text-lg font-medium mb-2">Owner Information</h3>
                <div className="flex items-center">
                  {selectedSubmission.owner.avatar ? (
                    <img 
                      src={selectedSubmission.owner.avatar} 
                      alt={selectedSubmission.owner.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{selectedSubmission.owner.name}</p>
                    <p className="text-sm text-gray-500">Owner ID: {selectedSubmission.owner.id}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Property Specifications */}
              <div>
                <h3 className="text-lg font-medium mb-2">Property Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="text-xl font-bold">{selectedSubmission.bedrooms}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="text-xl font-bold">{selectedSubmission.bathrooms}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Max Guests</p>
                      <p className="text-xl font-bold">{selectedSubmission.maxGuests}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-500">Price Per Day</p>
                      <p className="text-xl font-bold">${selectedSubmission.pricePerDay}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Separator />
              
              {/* Facilities */}
              <div>
                <h3 className="text-lg font-medium mb-2">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSubmission.facilities.map((facility) => (
                    <Badge key={facility.id} variant="outline" className="px-3 py-1">
                      {facility.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Documents */}
              {selectedSubmission.documents && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Submitted Documents</h3>
                  <div className="flex flex-col space-y-2">
                    {selectedSubmission.documents.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center p-3 border rounded-md"
                      >
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{doc.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    In a real application, these documents would be downloadable and verifiable.
                  </p>
                </div>
              )}
              
              {/* Review Notes Section */}
              {selectedSubmission.status === 'pending' && (
                <div>
                  <Label htmlFor="review-notes">Review Notes (optional)</Label>
                  <Textarea
                    id="review-notes"
                    placeholder="Add notes about why you're approving or rejecting this property..."
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter className="flex justify-end space-x-2 mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
              
              {selectedSubmission.status === 'pending' && (
                <>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprovalAction(selectedSubmission.id, 'approved')}
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  
                  <Button 
                    variant="destructive"
                    onClick={() => handleApprovalAction(selectedSubmission.id, 'rejected')}
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
};

export default AdminProperties;
