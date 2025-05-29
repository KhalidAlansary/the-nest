import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-nest-accent text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help you find
              your perfect nest.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-700 mb-8">
                  We'd love to hear from you. Whether you have questions about
                  our properties, need help with a booking, or are interested in
                  listing your property with us, our team is ready to assist.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-nest-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="text-nest-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Address</h3>
                      <p className="text-gray-600">
                        Fifth Settlement
                        <br />
                        New Cairo
                        <br />
                        Egypt
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-nest-primary/10 p-3 rounded-full mr-4">
                      <Phone className="text-nest-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-gray-600">+20 1067668951</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-nest-primary/10 p-3 rounded-full mr-4">
                      <Mail className="text-nest-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-gray-600">
                        youssifhussein669@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-nest-primary/10 p-3 rounded-full mr-4">
                      <Clock className="text-nest-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-nest-primary/10 p-3 rounded-full mr-4">
                      <MessageCircle className="text-nest-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Live Chat</h3>
                      <p className="text-gray-600">
                        Available 24/7 through our website or mobile app.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nest-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nest-primary"
                        placeholder="Your email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nest-primary"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nest-primary"
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mr-2 h-4 w-4 text-nest-primary focus:ring-nest-primary border-gray-300 rounded"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-nest-primary hover:underline">
                        privacy policy
                      </a>{" "}
                      and consent to be contacted regarding my inquiry.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-nest-primary hover:bg-nest-primary/90"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="h-96 w-full bg-gray-200">
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {/* This would be replaced with an actual map integration */}
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl font-medium">Interactive Map Placeholder</p>
              <p>An interactive map would be displayed here</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
