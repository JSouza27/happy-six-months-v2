import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type StepCardProps = {
  children: React.ReactNode[];
};

export default function StepCard({ children }: StepCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = children.length;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 h-[38rem] flex flex-col bg-[rgba(255,251,251,0.51)]">
      <CardHeader className="flex flex-row gap-4 items-center">
        <CardTitle className="w-max">Feliz 6 meses de namoro</CardTitle>
        <img
          className="w-8 m-0"
          src="/img/cupid_love.svg"
          alt="imagem de um arco com coração"
        />
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {children[currentStep]}
      </CardContent>
      <CardFooter className="flex justify-between">
        <button
          className="disabled:opacity-0 bg-[#C0DFCF] h-8 w-8 rounded-full flex items-center justify-center"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 text-[#43525B]" />
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentStep === index ? 'bg-[#FFA8A6]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          className="disabled:opacity-0 bg-[#C0DFCF] h-8 w-8 rounded-full flex items-center justify-center"
          onClick={nextStep}
          disabled={currentStep === totalSteps - 1}
        >
          <ArrowRight className="h-4 w-4 text-[#43525B]" />
        </button>
      </CardFooter>
    </Card>
  );
}
