'use client'

import React from 'react'
import Select from 'react-select'
import { Country, City, State } from "country-state-city"
import { useState } from 'react'

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
    const [selectedState, setSelectedState] = useState<option>(null)
    const [selectedCity, setSelectedCity] = useState<cityOption>(null)
  return (
    <div>
        <Select 
            options={options} 
        />
    </div>
  )
}

export default CityPicker