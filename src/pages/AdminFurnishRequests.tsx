
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { FurnishRequest } from '@/types/property';
import { furnishRequests } from '@/data/furnishRequests';

const AdminFurnishRequests = () => {
  const [requests, setRequests] = useState<FurnishRequest[]>(furnishRequests);
  
  const updateStatus = (id: number, status: FurnishRequest['status']) => {
    setRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status } : request
      )
    );
    
    toast.success(`Request status updated to ${status}`, {
      description: `Request #${id} has been updated.`
    });
  };
  
  const getStatusColor = (status: FurnishRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeVariant = (status: FurnishRequest['status']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'contacted': return 'outline';
      case 'scheduled': return 'default';
      case 'completed': return 'secondary'; // Changed from 'success' to 'secondary'
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };
  
  const filteredRequests = (status: FurnishRequest['status'] | 'all') => {
    if (status === 'all') return requests;
    return requests.filter(request => request.status === status);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Furnish Requests Management</h1>
            <p className="text-gray-600">
              Review and manage furnishing service requests submitted by users.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid grid-cols-6 md:w-fit">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="contacted">Contacted</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            {(['all', 'pending', 'contacted', 'scheduled', 'completed', 'cancelled'] as const).map((tab) => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {tab === 'all' ? 'All Requests' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Requests`}
                    </CardTitle>
                    <CardDescription>
                      {tab === 'all' 
                        ? 'Showing all furnish requests' 
                        : `Showing furnish requests with ${tab} status`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests(tab).length > 0 ? (
                            filteredRequests(tab).map((request) => (
                              <TableRow key={request.id}>
                                <TableCell className="font-medium">#{request.id}</TableCell>
                                <TableCell>{request.fullName}</TableCell>
                                <TableCell>
                                  <div>{request.email}</div>
                                  <div className="text-sm text-muted-foreground">{request.phone}</div>
                                </TableCell>
                                <TableCell>
                                  <div>{request.propertyType}</div>
                                  <div className="text-sm text-muted-foreground">{request.squareMeters} m²</div>
                                </TableCell>
                                <TableCell>${request.budget}</TableCell>
                                <TableCell>{format(request.submittedAt, 'MMM d, yyyy')}</TableCell>
                                <TableCell>
                                  <Badge variant={getStatusBadgeVariant(request.status)}>
                                    {request.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      onClick={() => {
                                        // In a real app, this would open a dialog with the request details
                                        toast.info(`Viewing details for request #${request.id}`)
                                      }}
                                    >
                                      View
                                    </Button>
                                    
                                    {request.status === 'pending' && (
                                      <Button 
                                        size="sm" 
                                        onClick={() => updateStatus(request.id, 'contacted')}
                                      >
                                        Mark Contacted
                                      </Button>
                                    )}
                                    
                                    {request.status === 'contacted' && (
                                      <Button 
                                        size="sm" 
                                        onClick={() => updateStatus(request.id, 'scheduled')}
                                      >
                                        Schedule
                                      </Button>
                                    )}
                                    
                                    {request.status === 'scheduled' && (
                                      <Button 
                                        size="sm" 
                                        onClick={() => updateStatus(request.id, 'completed')}
                                        variant="default"
                                      >
                                        Complete
                                      </Button>
                                    )}
                                    
                                    {['pending', 'contacted', 'scheduled'].includes(request.status) && (
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => updateStatus(request.id, 'cancelled')}
                                      >
                                        Cancel
                                      </Button>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={8} className="h-24 text-center">
                                No furnish requests found for this status.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminFurnishRequests;
