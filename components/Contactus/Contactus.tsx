"use client";
import { Variants, motion } from "framer-motion";
import { Mail, Phone, Clock, MapPin } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useCreateEnquiryMutation } from "@/redux/apis/ContactApi";
import { toast } from "sonner";

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  message: string;
}

const ContactusPage = () => {
  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleCreateEnquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createEnquiry(formData).unwrap();
      if (response.success) {
        setFormData({
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          message: "",
        });
        toast.success(response.message)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const contactData = [
    { id: 1, icon: <Phone />, title: "Contact Us", subtitle: "+1234567890" },
    { id: 2, icon: <Mail />, title: "Email Us", subtitle: "info@webtunix.com" },
    {
      id: 3,
      icon: <Clock />,
      title: "Working Hours",
      subtitle: "Mon-Fri 10AM-7PM",
    },
    {
      id: 4,
      icon: <MapPin />,
      title: "Location",
      subtitle: "E-331, Phase 8B, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160055",
    },
  ];

  return (
    <section className="mx-auto">
      {/* Header */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <h3 className="text-xs sm:text-sm md:text-base uppercase bg-white/10 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 tracking-widest text-center">
          <span className="text-[#e30613] mr-2">{"\u2726"}</span>
          GET IN TOUCH
          <span className="text-[#e30613] ml-2">{"\u2726"}</span>
        </h3>
      </div>

      <h2 className="text-center mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-3xl mb-10 sm:mb-14 font-semibold leading-snug sm:leading-tight">
        {`Let's`} Collaborate and Create Powerful{" "}
        <span className="bg-gradient-to-r from-[#e30613] to-[#e3061583] bg-clip-text text-transparent cursor-default transition duration-500 hover:from-[#e3061583] hover:to-[#e30613]">
          AI Solutions
        </span>
      </h2>

      <div className="flex flex-col md:flex-row my-10 mx-20">
        {/* Contact Form */}
        <div className="flex-1 bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat p-6 sm:p-8 border border-white/10 relative overflow-hidden rounded-l-lg">
          <h2 className="text-2xl font-semibold mb-6">Have any questions?</h2>
          <form className="space-y-4" onSubmit={handleCreateEnquiry}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="First Name"
                className="flex-1 p-5 border-[#131313] bg-black shadow-2xl"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                className="flex-1 p-5 border-[#201e1e] bg-black shadow-2xl"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="tel"
                placeholder="Phone No."
                className="flex-1 p-5 border-[#201e1e] bg-black shadow-2xl"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="flex-1 p-5 border-[#201e1e] bg-black shadow-2xl"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <Textarea
              placeholder="Write Message"
              className="w-full p-5 border-[#201e1e] bg-black shadow-2xl rounded-lg h-32 resize-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />

            <Button
              type="submit"
              size={"lg"}
              variant={"destructive"}
              className="w-full text-white rounded-full px-6 py-3 text-base font-medium transition-all duration-300 mt-5"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Now"}
            </Button>
          </form>
        </div>

        {/* Google Map */}
        <div className="flex-1 rounded-r-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.3429682359397!2d76.68131007557942!3d30.708757274595886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef2e54e46d59%3A0xdc5b14d4e00f6bf7!2sWebtunix%20AI!5e0!3m2!1sen!2sin!4v1755520684125!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Contact Info Cards */}
      <motion.div
  className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 mx-20"
  variants={containerVariants}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.3 }}
>
  {contactData.map(({ id, icon, title, subtitle }) => (
    <motion.article
      key={id}
      className="bg-[#1B1B1B33] bg-[url('/Service/service-bg.png')] bg-center bg-cover bg-no-repeat rounded-2xl px-1 py-5 sm:py-6 lg:py-8 flex flex-col items-center text-center border border-white/10"
      variants={cardVariants}
    >
      {/* Icon */}
      <div className="flex items-center justify-center text-[#e30613] w-12 h-12 sm:w-14 sm:h-14 mb-4">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold mb-3 hover:text-[#e30613] transition-colors duration-300 cursor-pointer">
        {title}
      </h3>

      {/* Subtitle (grows naturally) */}
      <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
        {subtitle}
      </p>
    </motion.article>
  ))}
</motion.div>

    </section>
  );
};

export default ContactusPage;
