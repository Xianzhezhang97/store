import React, { useEffect, useRef, useState, useMemo } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import SuccessCheckmark from './sucessSVG';
import { setUserLocation } from '@/redux/slices/userSlice';
import { setMerchantsData } from '@/redux/slices/merchantSlice';
import useFetch from '@/api/useFetch'; // Custom hook for fetching data
import { addNotification } from '@/redux/slices/globalSlice';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'next-i18next';

// Custom hook to fetch and watch user location
const useUserLocation = () => {
  const dispatch = useDispatch();
  const [localUserLocation, setLocalUserLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const newLocation = { lat: latitude, lng: longitude };
      dispatch(setUserLocation(newLocation)); // Update Redux
      setLocalUserLocation(newLocation); // Update local state
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error('Error getting user location:', error);
    };

    // Use watchPosition to continually watch for location updates
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Timeout in 10 seconds
        maximumAge: 0, // Prevent caching of locations
      },
    );

    // Cleanup function to clear the watch when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [dispatch]);

  return localUserLocation;
};

// Custom hook to fetch merchants
const useMerchantsData = () => {
  const dispatch = useDispatch();
  const fetchData = useFetch();
  const { t } = useTranslation();
  const merchantsData = useSelector(
    (state: RootState) => state.merchant.merchantsData,
  );

  useEffect(() => {
    // if (merchantsData.length === 0) {
    //   const fetchMerchants = async () => {
    //     try {
    //       const response = await fetchData('/merchant/list/', 'GET');
    //       if (response.code === 200) {
    //         dispatch(setMerchantsData(response.data));
    //       } else {
    //         dispatch(
    //           addNotification({
    //             id: uuidv4(),
    //             isOpen: true,
    //             Message: t(
    //               'An unexpected error occurred. Please try again later.',
    //             ),
    //             Type: 'error',
    //           }),
    //         );
    //       }
    //     } catch (error) {
    //       dispatch(
    //         addNotification({
    //           id: uuidv4(),
    //           isOpen: true,
    //           Message: t('Internet Error.'),
    //           Type: 'error',
    //         }),
    //       );
    //     }
    //   };
    //   fetchMerchants();
    // }
  }, [dispatch, fetchData, t, merchantsData]);

  return merchantsData;
};

// Haversine formula to calculate the distance between two points
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

type Merchant = {
  distance: number | null;
  uid: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  created_at: string;
  staff: number;
};

type ShopSelectorProps = {
  activeMerchant: Merchant | null;
  handleMerchantClick: (merchant: Merchant, e: any) => void;
};

const ShopSelector: React.FC<ShopSelectorProps> = ({
  activeMerchant,
  handleMerchantClick,
}) => {
  const userLocation = useUserLocation(); // Use custom hook for user location
  const merchantsData = useMerchantsData(); // Use custom hook for merchants data

  const [viewport, setViewport] = useState({
    latitude: userLocation.lat,
    longitude: userLocation.lng,
    zoom: 12,
  });

  const mapRef = useRef<any>(null);

  // Update viewport when userLocation changes
  useEffect(() => {
    setViewport((prev) => ({
      ...prev,
      latitude: userLocation.lat,
      longitude: userLocation.lng,
    }));
  }, [userLocation]);

  // Memoize the sorted merchants data to avoid unnecessary recalculations
  const sortedMerchants = useMemo(() => {
    return merchantsData
      .map((merchant) => ({
        ...merchant,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          merchant.latitude,
          merchant.longitude,
        ),
      }))
      .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity)); // Sort by distance, null values at the end
  }, [merchantsData, userLocation]);

  // Handle click to return to user's location
  const handleUserLocationClick = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 13,
      });
    }
  };

  return (
    <div className='h-full mb-[200px] w-full grid-gap  col  relative'>
      <h4 className='h4'>Merchants List</h4>
      <p className='flex text-sm mb-6'>Choose the nearest store around you.</p>
      <div className=' grid-gap col'>
        {sortedMerchants.map((merchant, index) => (
          <div
            onClick={() => handleMerchantClick(merchant, event)}
            key={index}
            className={` cursor-pointer flex w-full card-padding card-rounded justify-between items-center ${
              activeMerchant === merchant ? 'border-hover border-2' : 'border'
            }`}
          >
            <div className='flex flex-col'>
              <div className='flex gap-2 items-baseline'>
                <h3 className='h4'>{merchant.name}</h3>
                <p className='text-sm text-gray-500'>
                  •{' '}
                  {merchant.distance !== null ? (
                    `${merchant.distance.toFixed(2)} km`
                  ) : (
                    <span className='rounded bg-gray-300 h-4 w-12 inline-block'></span>
                  )}
                </p>
              </div>
              <p className='text-sm text-gray-500'>{merchant.address}</p>
            </div>

            {activeMerchant === merchant && (
              <SuccessCheckmark
                className='h-6 w-6'
                withMessage={false}
                color='stroke-hover'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopSelector;
