import React from 'react';
import { 
  HIERARCHY_COUNTRIES, 
  DEFAULT_LOCATION_PATH 
} from '../data/hierarchyLocations';
import { SelectedLocationPath, HierarchyCountry, HierarchyState, HierarchyDistrict, HierarchyCity } from '../types';
import { MapPin, Globe, Compass, Building2, Check, ChevronDown } from 'lucide-react';

interface CascadingLocationPickerProps {
  locationPath: SelectedLocationPath;
  onLocationChange: (newPath: SelectedLocationPath) => void;
  compact?: boolean;
}

export const CascadingLocationPicker: React.FC<CascadingLocationPickerProps> = ({
  locationPath,
  onLocationChange,
  compact = false,
}) => {
  // Current active selections
  const currentCountry = HIERARCHY_COUNTRIES.find((c) => c.id === locationPath.countryId) || HIERARCHY_COUNTRIES[0];
  const statesList = currentCountry.states || [];
  
  const currentState = statesList.find((s) => s.id === locationPath.stateId) || statesList[0] || { id: '', name: '', districts: [] };
  const districtsList = currentState.districts || [];
  
  const currentDistrict = districtsList.find((d) => d.id === locationPath.districtId) || districtsList[0] || { id: '', name: '', cities: [] };
  const citiesList = currentDistrict.cities || [];
  
  const currentCity = citiesList.find((c) => c.id === locationPath.cityId) || citiesList[0] || { id: '', name: '', theaters: [] };

  // Handlers for cascading state updates
  const handleCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryId = e.target.value;
    const foundCountry = HIERARCHY_COUNTRIES.find((c) => c.id === newCountryId) || HIERARCHY_COUNTRIES[0];
    const firstState = foundCountry.states[0];
    const firstDistrict = firstState?.districts[0];
    const firstCity = firstDistrict?.cities[0];

    onLocationChange({
      countryId: foundCountry.id,
      stateId: firstState ? firstState.id : '',
      districtId: firstDistrict ? firstDistrict.id : '',
      cityId: firstCity ? firstCity.id : '',
    });
  };

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStateId = e.target.value;
    const foundState = statesList.find((s) => s.id === newStateId);
    const firstDistrict = foundState?.districts[0];
    const firstCity = firstDistrict?.cities[0];

    onLocationChange({
      countryId: locationPath.countryId,
      stateId: newStateId,
      districtId: firstDistrict ? firstDistrict.id : '',
      cityId: firstCity ? firstCity.id : '',
    });
  };

  const handleDistrictSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDistrictId = e.target.value;
    const foundDistrict = districtsList.find((d) => d.id === newDistrictId);
    const firstCity = foundDistrict?.cities[0];

    onLocationChange({
      countryId: locationPath.countryId,
      stateId: locationPath.stateId,
      districtId: newDistrictId,
      cityId: firstCity ? firstCity.id : '',
    });
  };

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLocationChange({
      ...locationPath,
      cityId: e.target.value,
    });
  };

  return (
    <div
      id="cascading-location-picker"
      className="w-full bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-800 p-4 sm:p-5 shadow-xl transition-all"
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#e50914]/15 border border-[#e50914]/40 flex items-center justify-center text-[#e50914]">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>Select Your Cinema Location</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                Cascading Selection
              </span>
            </h2>
            <p className="text-xs text-zinc-400">
              Select Country → State → District → City/Town to find local theaters & showtimes
            </p>
          </div>
        </div>

        {/* Current Active Location Badge */}
        <div className="flex items-center gap-2 text-xs bg-zinc-950/80 px-3 py-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <span className="text-base">{currentCountry.flag}</span>
          <span className="font-semibold text-white truncate max-w-[240px]">
            {currentCity.name}, {currentDistrict.name}
          </span>
          <span className="text-[11px] font-bold text-[#f5c518] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700">
            {currentCountry.currency.symbol} {currentCountry.currency.code}
          </span>
        </div>
      </div>

      {/* 4 Cascading Dropdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Country Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#f5c518]" />
            <span>1. Country</span>
          </label>
          <div className="relative">
            <select
              id="select-country"
              value={locationPath.countryId}
              onChange={handleCountrySelect}
              className="w-full appearance-none bg-zinc-950/90 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all cursor-pointer pr-9"
            >
              {HIERARCHY_COUNTRIES.map((country) => (
                <option key={country.id} value={country.id} className="bg-zinc-950 text-white py-1">
                  {country.flag} {country.name} ({country.currency.code})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. State Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>2. State / Province</span>
          </label>
          <div className="relative">
            <select
              id="select-state"
              value={locationPath.stateId}
              onChange={handleStateSelect}
              disabled={statesList.length === 0}
              className="w-full appearance-none bg-zinc-950/90 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all cursor-pointer pr-9 disabled:opacity-50"
            >
              {statesList.map((state) => (
                <option key={state.id} value={state.id} className="bg-zinc-950 text-white py-1">
                  {state.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. District Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>3. District / County</span>
          </label>
          <div className="relative">
            <select
              id="select-district"
              value={locationPath.districtId}
              onChange={handleDistrictSelect}
              disabled={districtsList.length === 0}
              className="w-full appearance-none bg-zinc-950/90 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all cursor-pointer pr-9 disabled:opacity-50"
            >
              {districtsList.map((dist) => (
                <option key={dist.id} value={dist.id} className="bg-zinc-950 text-white py-1">
                  {dist.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 4. City / Small City Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#e50914]" />
            <span>4. City / Small City / Town</span>
          </label>
          <div className="relative">
            <select
              id="select-city"
              value={locationPath.cityId}
              onChange={handleCitySelect}
              disabled={citiesList.length === 0}
              className="w-full appearance-none bg-zinc-950/90 text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all cursor-pointer pr-9 disabled:opacity-50"
            >
              {citiesList.map((city) => (
                <option key={city.id} value={city.id} className="bg-zinc-950 text-white py-1">
                  {city.name} {city.isSmallCity ? '(Town)' : ''} — {city.theaters.length} Theaters
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Quick towns pill strip for currently selected District */}
      {citiesList.length > 1 && (
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 text-[11px] font-semibold">
            Nearby towns in {currentDistrict.name}:
          </span>
          {citiesList.map((city) => {
            const isSelected = city.id === currentCity.id;
            return (
              <button
                key={city.id}
                onClick={() => onLocationChange({ ...locationPath, cityId: city.id })}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#e50914] text-white font-bold shadow-md shadow-red-950/40'
                    : 'bg-zinc-950/80 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
                <span>{city.name}</span>
                <span className="text-[10px] opacity-70">({city.theaters.length})</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
