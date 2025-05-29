
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface FurnishRequest {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  squareMeters: number;
  budget: number;
  submittedAt: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
}

const AdminFurnishRequests = () => {
  const [requests, setRequests] = useState<FurnishRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/furnish-requests`);
      if (!res.ok) throw new Error("Failed to fetch requests");
      const data = await res.json();
      setRequests(data);
    } catch (err: any) {
      toast.error(err.message || "Error loading requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (_id: string, status: FurnishRequest['status']) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/furnish-requests/${_id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");

      setRequests(prev => prev.map(r => r._id === _id ? { ...r, status } : r));
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const getFilteredRequests = (status: string) =>
    status === 'all' ? requests : requests.filter(r => r.status === status);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow py-10 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Furnish Requests</h1>
            <p className="text-gray-600">Manage all incoming furnish service requests.</p>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid grid-cols-6 md:w-fit">
              {['all', 'pending', 'contacted', 'scheduled', 'completed', 'cancelled'].map(tab => (
                <TabsTrigger key={tab} value={tab}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</TabsTrigger>
              ))}
            </TabsList>

            {['all', 'pending', 'contacted', 'scheduled', 'completed', 'cancelled'].map(tab => (
              <TabsContent key={tab} value={tab}>
                <Card>
                  <CardHeader>
                    <CardTitle>{tab === 'all' ? 'All Requests' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Requests`}</CardTitle>
                    <CardDescription>
                      {tab === 'all' ? 'Showing all requests' : `Requests with status: ${tab}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
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
                          {getFilteredRequests(tab).length > 0 ? (
                            getFilteredRequests(tab).map((r) => (
                              <TableRow key={r._id}>
                                <TableCell>{r.fullName}</TableCell>
                                <TableCell>
                                  <div>{r.email}</div>
                                  <div className="text-sm text-muted-foreground">{r.phone}</div>
                                </TableCell>
                                <TableCell>{r.propertyType} — {r.squareMeters}m²</TableCell>
                                <TableCell>L.E.{r.budget}</TableCell>
                                <TableCell>{format(new Date(r.submittedAt), 'PPP')}</TableCell>
                                <TableCell>
                                  <Badge>{r.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  {r.status !== 'completed' && r.status !== 'cancelled' && (
                                    <div className="flex gap-2 flex-wrap">
                                      {r.status === 'pending' && (
                                        <Button onClick={() => updateStatus(r._id, 'contacted')} size="sm">Contacted</Button>
                                      )}
                                      {r.status === 'contacted' && (
                                        <Button onClick={() => updateStatus(r._id, 'scheduled')} size="sm">Schedule</Button>
                                      )}
                                      {r.status === 'scheduled' && (
                                        <Button onClick={() => updateStatus(r._id, 'completed')} size="sm">Complete</Button>
                                      )}
                                      <Button onClick={() => updateStatus(r._id, 'cancelled')} size="sm" variant="destructive">Cancel</Button>
                                    </div>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                                No requests for this status.
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