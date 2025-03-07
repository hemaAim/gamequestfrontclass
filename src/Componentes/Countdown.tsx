"use client";
import { useEffect, useState, useCallback } from "react";

interface CountdownProps {
   targetDate: string;
   Finaliza_em: string;
   inicio: string
}

export default function Countdown({ targetDate, Finaliza_em, inicio }: CountdownProps) {
   const formatDate = useCallback((dateStr: string) => {
      const [day, month, yearWithTime] = dateStr.split("/");
      const [year, time] = yearWithTime.split(" ");
      const [hour, minute] = time.split(":");
      const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00`;

      return new Date(formattedDate).getTime();
   }, []);

   const calculateTimeLeft = useCallback(() => {
      const difference = formatDate(targetDate) - new Date().getTime();
      return {
         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
         minutes: Math.floor((difference / (1000 * 60)) % 60),
         seconds: Math.floor((difference / 1000) % 60),
      };
   }, [formatDate, targetDate]);

   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

   useEffect(() => {
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
      return () => clearInterval(timer);
   }, [calculateTimeLeft]); // Agora `calculateTimeLeft` é uma dependência estável

   return (
      <div className="flex flex-col items-start space-y-4 mt-10 mb-5">

         <p className="mt-2 text-xl font-bold">
            Inicio: <code className="bg-white/20   px-3 text-base rounded-sm italic font-medium">{inicio}</code>
         </p>
         <h2 className="text-3xl font-bold text-white">{Finaliza_em}</h2>
         <div className="flex space-x-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
               <div key={unit} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-b from-purple-300/10 to-orange-600 text-white border border-orange-700/40 flex items-center justify-center text-3xl font-bold rounded-xl shadow-md">
                     {String(value).padStart(2, "0")}
                  </div>
                  <p className="text-base text-white font-semibold uppercase">{unit}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
