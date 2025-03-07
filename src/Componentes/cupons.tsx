export default function Coupon() {
   return (
     <div className="relative flex items-center bg-gradient-to-r from-green-400 to-cyan-400 w-96 h-24 rounded-lg shadow-lg overflow-hidden">
       {/* Código de barras */}
       <div className="w-12 h-full bg-white flex items-center justify-center">
         <div className="w-6 h-16 bg-black"></div>
       </div>
       
       {/* Conteúdo do cupom */}
       <div className="flex-1 px-4 py-2 text-white">
         <h1 className="text-lg font-bold">Medical care coupon</h1>
         <p className="text-sm">For orders over $300</p>
         <p className="text-xs mt-1 opacity-80">Valid until: 2020 - 07 - 06</p>
       </div>
       
       {/* Valor */}
       <div className="flex flex-col items-center pr-4">
         <span className="text-xs text-white opacity-80">VALUE</span>
         <span className="text-2xl font-bold text-white">$60</span>
       </div>



       <div className="absolute -top-1 left-[2.4rem] -translate-y-3 h-5 w-5 bg-[#141335] rounded-full"></div>
       <div className="absolute -bottom-7 left-[2.4rem] -translate-y-3 h-5 w-5 bg-[#141335] rounded-full"></div>
       <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 bg-[#141335] rounded-full"></div>
     
     </div>
   );
 }
 