import React, { useEffect, useRef, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import Logo from '@/components/Logo';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import SuccessCheckmark from './sucessSVG';
import Avatar from './avatar';
import ShopList from './ShopList';
import { setUserLocation } from '@/redux/slices/userSlice';

const defaultTransition = {
  delay: 2,
  duration: 0.9,
  ease: [0.22, 0.9, 0.1, 1],
};

type Merchant = {
  distance: any;
  uid: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  created_at: string;
  staff: number;
};

const ShopSelector: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const merchantsData = useSelector(
    (state: RootState) => state.merchant.merchantsData,
  ); // Fetch merchants data from Redux

  const [viewport, setViewport] = useState({
    latitude: user.userLocation.lat,
    longitude: user.userLocation.lng,
    zoom: 13,
  });
  const [activeMerchant, setActiveMerchant] = useState<Merchant | null>(null); // 当前选中的商家

  const mapRef = useRef<any>(null);

  // 当用户位置变化时，更新地图视图
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [user.userLocation.lng, user.userLocation.lat],
        zoom: 13,
      });
    }
  }, [user.userLocation]);

  // 处理店铺点击事件
  const handleMerchantClick = (merchant: Merchant, e: any) => {
    e.stopPropagation();
    setActiveMerchant(merchant);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [merchant.longitude, merchant.latitude],
        zoom: 15,
      });
    }
  };

  // 处理返回用户位置按钮点击事件
  const handleUserLocationClick = () => {
    if (mapRef.current) {
      setActiveMerchant(null);
      mapRef.current.flyTo({
        center: [user.userLocation.lng, user.userLocation.lat],
        zoom: 13,
      });
    }
  };

  return (
    <div className='h-full w-full relative lg:flex lg:flex-row-reverse'>
      {/* 地图部分 */}
      <div className='flex h-1/2 w-full z-0 relative lg:h-screen lg:w-2/3 xl:w-3/4'>
        <Map
          ref={mapRef} // 获取地图实例
          initialViewState={viewport}
          style={{ width: '100%', height: '100%' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          onMove={(evt) => setViewport(evt.viewState)}
        >
          {/* 用户位置标记 */}
          <Marker
            longitude={user.userLocation.lng}
            latitude={user.userLocation.lat}
            anchor='bottom'
            onClick={handleUserLocationClick}
          >
            <div className='border-body rounded-full flex border-4 scale-75 '>
              <Avatar />
            </div>
          </Marker>

          {/* 商家位置标记 */}
          {merchantsData.map((merchant, index) => (
            <Marker
              key={index}
              longitude={merchant.longitude}
              latitude={merchant.latitude}
              anchor='bottom'
              onClick={() => handleMerchantClick(merchant, event)}
            >
              <div className='bg-hover border-white rounded-full cursor-pointer border-2 h-[40px]  shadow-md p-2 w-[40px]'>
                <Logo className='h-full fill-white w-full ' />
                {/* 商家信息卡片，悬浮在地图之上 */}
                <AnimatePresence>
                  {activeMerchant === merchant && (
                    <motion.div
                      initial={{ opacity: 0, y: 60, scale: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ defaultTransition }}
                      className='bg-white rounded shadow-lg  min-w-[300px]  top-16 -left-[130px] z-50  card-rounded card-padding absolute'
                    >
                      <h3 className='font-bold text-lg'>
                        {activeMerchant.name}
                      </h3>
                      <p className='text-sm mb-6 text-gray-500'>
                        {activeMerchant.address}
                      </p>
                      <button
                        onClick={() => setActiveMerchant(null)}
                        className='sbutton'
                      >
                        Close
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Marker>
          ))}
        </Map>
        <button
          className='bg-hover border-white rounded-full  font-black border-4 shadow text-white mb-[10px] p-2 top-4 right-4 z-50 group sbutton  center absolute !h-[50px] !w-[50px]'
          style={{ zIndex: 1000 }}
          onClick={handleUserLocationClick}
        >
          <i className='flex text-2xl fi fi-sr-location-crosshairs'></i>
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ defaultTransition }}
            className='bg-white font-normal shadow-lg text-sm text-primary top-0 right-[70px] z-50 -translate-y-1/2 hidden card-rounded  card-padding absolute group-hover:flex group-active:flex'
          >
            My Location
          </motion.div>
        </button>
      </div>

      {/* 商家列表部分 */}
      <motion.div
        className='bg-white rounded-t-lg flex flex-col flex-1 h-1/2 shadow-lg -mt-[30px] w-full z-50   absolute overflow-y-auto lg:rounded-none lg:h-screen lg:-mt-[10px] lg:w-1/3 lg:relative xl:w-1/4 '
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className='bg-white w-full py-4 top-0 z-20 center sticky'>
          <motion.div
            id='drag-container'
            whileTap={{ width: 120 }}
            className='bg-muted rounded-full h-[5px] w-[80px] hover:bg-hover active:bg-black'
          ></motion.div>
        </div>
        <div className='col card-padding justify-start'>
          {' '}
          <ShopList
            handleMerchantClick={handleMerchantClick}
            activeMerchant={activeMerchant}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ShopSelector;
