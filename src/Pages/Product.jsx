import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Product = ({isAuth}) => {

    const navigate =useNavigate();

    useEffect(()=>{
        if(!isAuth){
            navigate('/login');
            toast.error("Please, login first");
        }
    },[])
  return (
    <Card className={`w-[300px] ${isPopular ? 'border-blue-500 shadow-lg' : ''} transition-all hover:scale-105`}>
      <CardHeader>
        {isPopular && (
          <div className="text-sm font-medium text-blue-600 mb-2">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-gray-600">/month</span>}
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSelectPlan}
          className={`w-full ${
            isPopular 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Product
