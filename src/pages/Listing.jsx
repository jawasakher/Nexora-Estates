import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from "../context/AppContext.jsx";
import ListingCard from '../components/property/ListingCard';
import PropertyImages from '../components/PropertyImages';
import ListingSkeleton from '../components/skeletons/ListingSkeleton';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { assets, cities } from '../assets/data';
import Seo from '../components/Seo';


const Listing = () => {
  const {properties, loadingProperties, currency} = useAppContext();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') ?? 'All cities');
  const [selectedType, setSelectedType] = useState('All types');
  const [selectedPrice, setSelectedPrice] = useState('All prices');
  const [sortBy, setSortBy] = useState('Relevant');
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = ["Relevant", "Low to High", "High to Low"];

  const featuredProperty = properties?.[0];

  const propertyTypes = [
    'All types',
    "House",
    "Apartment",
    "Villa",
    "Penthouse",
    "Townhouse",
    "Commercial",
    "Land plot",
  ];
   const priceRange = [
    'All prices',
    '0 to 10000',
    '10000 to 20000',
    '20000 to 40000',
    '40000 to 80000',
   ];

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const matchesSearch = (property) => {
      if (!query) return true;
      return [property?.title, property?.address, property?.city, property?.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    };

    const matchesCity = (property) => {
      if (selectedCity === 'All cities') return true;
      return property?.city === selectedCity;
    };

    const matchesType = (property) => {
      if (selectedType === 'All types') return true;
      return property?.propertyType === selectedType;
    };

    const matchesPrice = (property) => {
      if (selectedPrice === 'All prices') return true;
      const sale = Number(property?.price?.sale ?? 0);
      const [min, max] = selectedPrice.split(' to ').map(Number);
      return sale >= min && sale < max;
    };

    const sorted = [...(properties ?? [])]
      .filter(matchesSearch)
      .filter(matchesCity)
      .filter(matchesType)
      .filter(matchesPrice)
      .sort((a, b) => {
        const aSale = Number(a?.price?.sale ?? 0);
        const bSale = Number(b?.price?.sale ?? 0);

        if (sortBy === 'Low to High') return aSale - bSale;
        if (sortBy === 'High to Low') return bSale - aSale;
        return 0;
      });

    return sorted;
  }, [properties, searchTerm, selectedCity, selectedType, selectedPrice, sortBy]);

  const cityCounts = useMemo(() => {
    const counts = filteredProperties.reduce((acc, property) => {
      const city = property?.city || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filteredProperties]);

  const mapCity = cityCounts[0]?.[0] || selectedCity || featuredProperty?.city || 'New York';
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapCity)}&t=m&z=11&output=embed`;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity('All cities');
    setSelectedType('All types');
    setSelectedPrice('All prices');
    setSortBy('Relevant');
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm || selectedCity !== 'All cities' || selectedType !== 'All types' || selectedPrice !== 'All prices' || sortBy !== 'Relevant';

  const seoTitle = useMemo(() => {
    if (searchTerm) return `Search results for ${searchTerm}`;
    if (selectedCity !== 'All cities') return `${selectedCity} property listings`;
    return 'Property listings';
  }, [searchTerm, selectedCity]);

  const seoDescription = useMemo(() => {
    const baseDescription = 'Browse premium real estate listings with filters, smart search, and a refined discovery experience.';
    if (searchTerm || selectedCity !== 'All cities' || selectedType !== 'All types' || selectedPrice !== 'All prices') {
      return `${filteredProperties.length} properties match your current filters. ${baseDescription}`;
    }

    return baseDescription;
  }, [filteredProperties.length, searchTerm, selectedCity, selectedType, selectedPrice]);

  const seoImage = featuredProperty?.images?.[0] || assets.about;

  return (
    <div className="bg-linear-to-r from-[#fffbee] to-white py-16 pt-28">
      <Seo
        title={seoTitle}
        description={seoDescription}
        canonicalPath='/listing'
        image={seoImage}
      />
      <div className="max-padd-container mb-10">
        {featuredProperty ? <PropertyImages property={featuredProperty} /> : null}
      </div>
      <div className="max-padd-container flex flex-col gap-8 mb-16 xl:flex-row">
        <div className="xl:hidden">
          <Button variant='secondary' className='w-full rounded-full' onClick={() => setShowFilters((current) => !current)}>
            {showFilters ? 'Hide filters' : 'Show filters'}
          </Button>
        </div>

        {/**right side listing */}
        <div className="flex-1 space-y-6 order-2 xl:order-1">
          <Card className='p-5'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <h3 className='h3 mb-1'>Results</h3>
                <p className='text-sm text-slate-600'>
                  {filteredProperties.length} properties match your current filters.
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {hasActiveFilters && (
                  <Badge variant='info'>Active filters</Badge>
                )}
                <Badge variant='neutral'>{properties?.length ?? 0} total</Badge>
              </div>
            </div>
          </Card>

          {loadingProperties ? (
            <ListingSkeleton count={6} />
          ) : (
            filteredProperties.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {filteredProperties.map((property) => (
                  <ListingCard key={property._id} property={property} currency={currency} />
                ))}
              </div>
            ) : (
              <EmptyState
                title='No matches found'
                description='Try adjusting the search term, city, property type or price range.'
                action={<Button variant='primary' onClick={clearFilters}>Reset filters</Button>}
              />
            )
          )}

          <Card className='p-5'>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div>
                <h3 className='h3 mb-1'>Map Preview</h3>
                <p className='text-sm text-slate-600'>Live city preview for the current filtered set.</p>
              </div>
              <Badge variant='neutral'>Preview</Badge>
            </div>

            <div className='grid gap-4 lg:grid-cols-[1.3fr_1fr]'>
              <div className='overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-900/10 px-4 py-3'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>Coverage</p>
                    <p className='mt-1 text-sm font-semibold text-slate-900'>{mapCity}</p>
                  </div>
                  <Badge variant='success'>{filteredProperties.length} listings</Badge>
                </div>
                <div className='aspect-16/12 min-h-72 w-full'>
                  <iframe
                    title={`${mapCity} property map preview`}
                    src={mapEmbedUrl}
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    className='h-full w-full border-0'
                  />
                </div>
              </div>

              <div className='space-y-3'>
                {cityCounts.length > 0 ? cityCounts.map(([city, count]) => (
                  <button
                    key={city}
                    type='button'
                    onClick={() => setSelectedCity(city)}
                    className={`w-full rounded-2xl border p-4 text-left transition-all ${selectedCity === city ? 'border-secondary bg-secondary/10 shadow-sm' : 'border-slate-900/10 bg-white hover:border-secondary/40 hover:bg-slate-50'}`}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div>
                        <h5 className='h5'>{city}</h5>
                        <p className='text-sm text-slate-500'>{count} properties</p>
                      </div>
                      <Badge variant='neutral'>{Math.round((count / filteredProperties.length) * 100)}%</Badge>
                    </div>
                  </button>
                )) : (
                  <div className='rounded-2xl border border-slate-900/10 bg-white p-4 text-sm text-slate-500'>
                    No map data available for the current filters.
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/**left side Filters */}
        <Card className={`xl:w-88 p-5 space-y-5 order-1 xl:order-2 ${showFilters ? 'block' : 'hidden xl:block'}`}>
          <div>
            <h3 className='h3 mb-2'>Search</h3>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search by city, address or title'
            />
          </div>

          <div>
            <h5 className='h5 mb-3'>Sort By</h5>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              {sortOptions.map((sort) => (
                <option key={sort} value={sort}>{sort}</option>
              ))}
            </select>
          </div>

          <div>
            <h5 className='h5 mb-3'>City</h5>
            <div className='flex flex-wrap gap-2'>
              {['All cities', ...cities].map((city) => (
                <button
                  key={city}
                  type='button'
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedCity === city ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className='h5 mb-3'>Property Type</h5>
            <div className='flex flex-wrap gap-2'>
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type='button'
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedType === type ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className='h5 mb-3'>Price Range</h5>
            <div className='flex flex-wrap gap-2'>
              {priceRange.map((price) => (
                <button
                  key={price}
                  type='button'
                  onClick={() => setSelectedPrice(price)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedPrice === price ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {price === 'All prices' ? price : `$${price}`}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters ? (
            <Button variant='secondary' className='w-full' onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </Card>
        </div> 
    </div>
  );
};

export default Listing;

    