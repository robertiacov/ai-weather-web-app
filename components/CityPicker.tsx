'use client'

import React from 'react'
import Select from 'react-select'
import { Country, City, State } from "country-state-city"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeIcon } from '@heroicons/react/solid'

type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    };
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    };
    label: string;
} | null;

type stateOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        isoCode: string;
        name: string;
    };
    label: string;
} | null;

const options = Country.getAllCountries().map(country => ({
    value: {
        latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}))

const CityPicker = () => {
    const [selectedCountry, setSelectedCountry] = useState<option>(null)
    const [selectedState, setSelectedState] = useState<stateOption>(null)
    const [selectedCity, setSelectedCity] = useState<cityOption>(null)

    const router = useRouter();

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option)
        setSelectedState(null);
        setSelectedCity(null);
    };

    const handleSelectedState = (option: stateOption) => {
        setSelectedState(option);
        setSelectedCity(null);
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        router.push(`/location/${option?.value?.name}/${option?.value?.latitude}/${option?.value?.longitude}`);
    }

  return (
    <div className='space-y-4'>
        <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80'>
                <GlobeIcon className='h-5 w-5 text-white'/>
                <label htmlFor="country">Country</label>
            </div>
            <Select
                className='text-black'
                value={selectedCountry}
                onChange={handleSelectedCountry}
                options={options} 
            />
        </div>

        {selectedCountry && (
            <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80'>
                <GlobeIcon className='h-5 w-5 text-white'/>
                <label htmlFor="country">State / Region</label>
            </div>
            <Select
                className='text-black'
                value={selectedState}
                onChange={handleSelectedState}
                options={
                    State.getStatesOfCountry(selectedCountry.value.isoCode)?.map(state => ({ 
                        value: {
                            latitude: state.latitude!,
                            longitude: state.longitude!,
                            countryCode: state.countryCode,
                            name: state.name,
                            isoCode: state.isoCode,
                        },
                        label: state.name,
                    }))
                }
                
            />
        </div>
        )
        }

        {selectedState && (
            <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80'>
                <GlobeIcon className='h-5 w-5 text-white'/>
                <label htmlFor="country">City</label>
            </div>
            <Select
                className='text-black'
                value={selectedCity}
                onChange={handleSelectedCity}
                options={
                    City.getCitiesOfState(selectedState.value.countryCode, selectedState.value.isoCode)?.map(city => ({ 
                        value: {
                            latitude: city.latitude!,
                            longitude: city.longitude!,
                            countryCode: city.countryCode,
                            name: city.name,
                            stateCode: city.stateCode,
                        },
                        label: city.name,
                    }))
                }
                />
        </div>
        )
        }

        
    </div>
  )
}

export default CityPicker