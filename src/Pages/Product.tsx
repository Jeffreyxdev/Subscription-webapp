import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from 'react';
import {auth, db} from '../Firebase/firebase-conig'
import { addDoc, collection } from 'firebase/firestore'
import { Input } from "../component/ui/input";
import { Button } from "../component/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../component/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/ui/select";
const plans = [
  {
    name: "Free",
    price: "₦0",
    description: "Perfect for getting started",
    features: ["1 Website", "5 GB Hosting", "Limited Support"],
  },
  {
    name: "Premium",
    price: "₦4,999",
    description: "Best for professionals",
    features: ["10 Website", "15 GB Hosting", "Premium Support"],
  },
  {
    name: "Enterprise",
    price: "₦9,999/month",
    description: "For large organizations",
    features: ["Unlimited Website", "50 GB Hosting", "Premium Support"],
  },
];
const Product = ({isAuth}) => {

  
    const navigate =useNavigate();
    
    const [formData, setFormData] = useState({
      name: "",
      age: "",
      payment: "",
      location: "",
      plan: "",
    });
    useEffect(()=>{
        if(!isAuth){
            navigate('/login');
            toast.error(
             "Please, login first");
        }
    },[])
    
    const validateForm = () => {
      const { name, age, location, plan } = formData;
      if (!name || !age || !location || !plan) {
        toast.error(
         
          "Please fill all the fields",
        );
        return false;
      }
      return true;
    };
    const postCollectionRef = collection(db, "ALLpost" )
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }
      try {
        // Add the form data to Firestore
        await addDoc(postCollectionRef, formData);
        toast.success("Subscription Successful!");
        navigate('/form');
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Failed to subscribe. Please try again.");
      }
    
  

      toast.success(
       "Subscription Successful!",
       
      );
      navigate('/form');
    };
    
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };


    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
    ) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-4">
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto"
    >
      <motion.h1
        variants={item}
        className="text-4xl font-bold text-center mb-4 text-gray-900"
      >
        Choose Your Plan
      </motion.h1>
      <motion.p
        variants={item}
        className="text-lg text-center mb-12 text-gray-600"
      >
        Select the perfect plan for your needs
      </motion.p>

      <motion.div
        variants={container}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="relative"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-blue-600">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && <span>/month</span>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700">
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Subscribe Now
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              name="age"
              type="number"
              placeholder="Your Age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              name="location"
              placeholder="Your Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Input
              name="payment"
              type="string"
              placeholder="Card Number"
              value={formData.payment}
              onChange={handleInputChange}
              required
              className="w-full"
            />
          </div>
          <div>
            <Select
              onValueChange={(value) =>
                handleInputChange({ target: { name: "plan", value } })
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.name} value={plan.name}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white" onClick={handleSubmit}
          >
            Subscribe
          </Button>
        </form>
      </motion.div>
    </motion.div>
  </div>
  )
}

export default Product
