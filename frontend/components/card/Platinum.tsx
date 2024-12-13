import { FC, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

type PlatinumProps = {
  name: string;
  member_id: number;
  year: number;
  month: number;
  pic: string;
}

const Platinum : FC<PlatinumProps> = ({ name, member_id, year, month, pic }) => {
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
      <div className="w-[792px] h-[508px] bg-[url('/img_2.png')]  bg-cover bg-center bg-no-repeat">
        <img src={pic} alt="" className="absolute ml-[46px] mt-[46px] w-[152px] h-[206px] rounded-[4px]"/>
        <div className="absolute ml-[80px] mt-[333px]">
          <div className="w-[460px] h-[50px] relative">
            <svg ref={barcodeRef} className="absolute inset-0 w-full h-full" preserveAspectRatio="none"></svg>
          </div>
          <div className="mt-[9px] text-[#777777] font-extrabold">{member_id.toString().padStart(9, '0')}</div>
        </div>
        <div className="absolute ml-[460px] mt-[393px] font-black text-xl text-[#545252]">
          {month.toString().padStart(2, '0')}/{year}
        </div>
        <div className="mt-[135px] ml-[238px] text-[#525151] font-extrabold text-[55px] space-x-1">
          {name}
        </div>
      </div>
    </div>
  )
};

export default Platinum;