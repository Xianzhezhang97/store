import { FC, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

type GoldenProps = {
  name: string;
  member_id: number;
  year: number;
  month: number;
}

const Golden : FC<GoldenProps> = ({ name, member_id, year, month }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    JsBarcode(barcodeRef.current, (member_id.toString().padStart(9, '0')), {
        format: 'CODE128',
        displayValue: false,
        width: 2,
        height: 50,
        margin: 0,
        background: 'transparent',
      });
  }, [member_id]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[792px] h-[508px] ">

        <div className="absolute ml-[80px] mt-[333px]">
          <div className="w-[460px] h-[50px] relative">
            <svg ref={barcodeRef} className="absolute inset-0 w-full h-full" preserveAspectRatio="none"></svg>
          </div>
          <div className="mt-[9px] text-[#777777] font-extrabold">{member_id.toString().padStart(9, '0')}</div>
        </div>
        <div className="absolute ml-[460px] mt-[393px] font-black text-xl text-[#545252]">
          {month.toString().padStart(2, '0')}/{year}
        </div>
        <div className="mt-[82px] ml-[54px] text-[#8C6729] font-extrabold text-[55px] space-x-1">
          {name}
        </div>
      </div>
    </div>
  )
};

export default Golden;