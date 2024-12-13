import { FC, useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

type DiamondProps = {
  name: string;
  member_id: number;
  year: number;
  month: number;
  pic: string;
};

const Diamond: FC<DiamondProps> = ({ name, member_id, year, month, pic }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    JsBarcode(barcodeRef.current, member_id.toString().padStart(9, '0'), {
      format: 'CODE128',
      displayValue: false,
      width: 2,
      height: 50,
      margin: 0,
      background: 'transparent',
    });
  }, [member_id]);

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className="h-[508px] w-[792px] '/img.png')]  bg-cover bg-center bg-no-repeat">
        <img
          src={pic}
          alt=''
          className='rounded-[4px] h-[206px] mt-[46px] ml-[46px] w-[152px] absolute'
        />
        <div className='mt-[336px] ml-[80px] absolute'>
          <div className='h-[50px] w-[460px] relative'>
            <svg
              ref={barcodeRef}
              className='h-full w-full inset-0 absolute'
              preserveAspectRatio='none'
            ></svg>
          </div>
          <div className='font-extrabold mt-[9px] text-[#777777]'>
            {member_id.toString().padStart(9, '0')}
          </div>
        </div>
        <div className='font-black mt-[394px] text-xl ml-[460px] text-[#847900] absolute'>
          {month.toString().padStart(2, '0')}/{year}
        </div>
        <div className='font-extrabold space-x-1 mt-[120px] ml-[232px] text-[#847900] text-[55px]'>
          {name}
        </div>
      </div>
    </div>
  );
};

export default Diamond;
