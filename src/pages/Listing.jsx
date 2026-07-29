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
import { useI18n } from '../i18n/I18nContext.jsx'


const Listing = () => {
  const { t } = useI18n()
  const {properties, loadingProperties, currency} = useAppContext();
  const [searchParams] = useSearchParams();
  const ALL_CITIES = 'ALL_CITIES'
  const ALL_TYPES = 'ALL_TYPES'
  const ALL_PRICES = 'ALL_PRICES'
  const SORT_RELEVANT = 'RELEVANT'
  const SORT_LOW = 'LOW_TO_HIGH'
  const SORT_HIGH = 'HIGH_TO_LOW'

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') ?? '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') ?? ALL_CITIES);
  const [selectedType, setSelectedType] = useState(ALL_TYPES);
  const [selectedPrice, setSelectedPrice] = useState(ALL_PRICES);
  const [sortBy, setSortBy] = useState(SORT_RELEVANT);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: SORT_RELEVANT, label: t('listing.relevant') },
    { value: SORT_LOW, label: t('listing.lowToHigh') },
    { value: SORT_HIGH, label: t('listing.highToLow') },
  ];

  const featuredProperty = properties?.[0];

  const propertyTypes = [
    { value: ALL_TYPES, label: t('listing.allTypes') },
    { value: 'House', label: t('listing.types.house') },
    { value: 'Apartment', label: t('listing.types.apartment') },
    { value: 'Villa', label: t('listing.types.villa') },
    { value: 'Penthouse', label: t('listing.types.penthouse') },
    { value: 'Townhouse', label: t('listing.types.townhouse') },
    { value: 'Commercial', label: t('listing.types.commercial') },
    { value: 'Land plot', label: t('listing.types.landPlot') },
  ];
   const priceRange = [
    { value: ALL_PRICES, label: t('listing.allPrices') },
    { value: '0 to 10000', label: '0 to 10000' },
    { value: '10000 to 20000', label: '10000 to 20000' },
    { value: '20000 to 40000', label: '20000 to 40000' },
    { value: '40000 to 80000', label: '40000 to 80000' },
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
      if (selectedCity === ALL_CITIES) return true;
      return property?.city === selectedCity;
    };

    const matchesType = (property) => {
      if (selectedType === ALL_TYPES) return true;
      return property?.propertyType === selectedType;
    };

    const matchesPrice = (property) => {
      if (selectedPrice === ALL_PRICES) return true;
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

        if (sortBy === SORT_LOW) return aSale - bSale;
        if (sortBy === SORT_HIGH) return bSale - aSale;
        return 0;
      });

    return sorted;
  }, [properties, searchTerm, selectedCity, selectedType, selectedPrice, sortBy]);

  const cityCounts = useMemo(() => {
    const counts = filteredProperties.reduce((acc, property) => {
      const city = property?.city || t('listing.unknown');
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [filteredProperties]);

  const mapCity = cityCounts[0]?.[0] || (selectedCity === ALL_CITIES ? '' : selectedCity) || featuredProperty?.city || t('listing.defaultMapCity');
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapCity)}&t=m&z=11&output=embed`;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity(ALL_CITIES);
    setSelectedType(ALL_TYPES);
    setSelectedPrice(ALL_PRICES);
    setSortBy(SORT_RELEVANT);
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm || selectedCity !== ALL_CITIES || selectedType !== ALL_TYPES || selectedPrice !== ALL_PRICES || sortBy !== SORT_RELEVANT;

  const seoTitle = useMemo(() => {
    if (searchTerm) return t('listing.searchResultsFor', { term: searchTerm });
    if (selectedCity !== ALL_CITIES) return t('listing.cityListings', { city: selectedCity });
    return t('listing.propertyListings');
  }, [searchTerm, selectedCity]);

  const seoDescription = useMemo(() => {
    const baseDescription = t('listing.seoBaseDescription');
    if (searchTerm || selectedCity !== ALL_CITIES || selectedType !== ALL_TYPES || selectedPrice !== ALL_PRICES) {
      return t('listing.seoFilteredDescription', { count: filteredProperties.length, base: baseDescription });
    }

    return baseDescription;
  }, [filteredProperties.length, searchTerm, selectedCity, selectedType, selectedPrice, t]);

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
            {showFilters ? t('listing.hideFilters') : t('listing.showFilters')}
          </Button>
        </div>

        {/**right side listing */}
        <div className="flex-1 space-y-6 order-2 xl:order-1">
          <Card className='p-5'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <h3 className='h3 mb-1'>{t('listing.results')}</h3>
                <p className='text-sm text-slate-600'>
                  {t('listing.filtersMatch', { count: filteredProperties.length })}
                </p>
              </div>
              <div className='flex flex-wrap gap-2'>
                {hasActiveFilters && (
                  <Badge variant='info'>{t('listing.activeFilters')}</Badge>
                )}
                <Badge variant='neutral'>{t('listing.total', { count: properties?.length ?? 0 })}</Badge>
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
                title={t('listing.noMatches')}
                description={t('listing.noMatchesDescription')}
                action={<Button variant='primary' onClick={clearFilters}>{t('common.reset')}</Button>}
              />
            )
          )}

          <Card className='p-5'>
            <div className='flex items-start justify-between gap-4 mb-4'>
              <div>
                <h3 className='h3 mb-1'>{t('listing.mapPreview')}</h3>
                <p className='text-sm text-slate-600'>{t('listing.mapPreviewDescription')}</p>
              </div>
              <Badge variant='neutral'>{t('listing.preview')}</Badge>
            </div>

            <div className='grid gap-4 lg:grid-cols-[1.3fr_1fr]'>
              <div className='overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm'>
                <div className='flex items-center justify-between border-b border-slate-900/10 px-4 py-3'>
                  <div>
                    <p className='text-xs uppercase tracking-[0.2em] text-slate-500'>{t('listing.coverage')}</p>
                    <p className='mt-1 text-sm font-semibold text-slate-900'>{mapCity}</p>
                  </div>
                  <Badge variant='success'>{t('listing.listingsCount', { count: filteredProperties.length })}</Badge>
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
                        <p className='text-sm text-slate-500'>{t('listing.propertiesCount', { count })}</p>
                      </div>
                      <Badge variant='neutral'>{Math.round((count / filteredProperties.length) * 100)}%</Badge>
                    </div>
                  </button>
                )) : (
                  <div className='rounded-2xl border border-slate-900/10 bg-white p-4 text-sm text-slate-500'>
                    {t('listing.noMapData')}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/**left side Filters */}
        <Card className={`xl:w-88 p-5 space-y-5 order-1 xl:order-2 ${showFilters ? 'block' : 'hidden xl:block'}`}>
          <div>
            <h3 className='h3 mb-2'>{t('listing.searchTitle')}</h3>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('listing.searchPlaceholder')}
            />
          </div>

          <div>
            <h5 className='h5 mb-3'>{t('listing.sortBy')}</h5>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              {sortOptions.map((sort) => (
                <option key={sort.value} value={sort.value}>{sort.label}</option>
              ))}
            </select>
          </div>

          <div>
            <h5 className='h5 mb-3'>{t('listing.city')}</h5>
            <div className='flex flex-wrap gap-2'>
              {[{ value: ALL_CITIES, label: t('listing.allCities') }, ...cities.map((city) => ({ value: city, label: city }))].map((cityOption) => (
                <button
                  key={cityOption.value}
                  type='button'
                  onClick={() => setSelectedCity(cityOption.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedCity === cityOption.value ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {cityOption.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className='h5 mb-3'>{t('listing.propertyType')}</h5>
            <div className='flex flex-wrap gap-2'>
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  type='button'
                  onClick={() => setSelectedType(type.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedType === type.value ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h5 className='h5 mb-3'>{t('listing.priceRange')}</h5>
            <div className='flex flex-wrap gap-2'>
              {priceRange.map((price) => (
                <button
                  key={price.value}
                  type='button'
                  onClick={() => setSelectedPrice(price.value)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${selectedPrice === price.value ? 'bg-secondary text-slate-950' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {price.value === ALL_PRICES ? price.label : `${currency}${price.label}`}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters ? (
            <Button variant='secondary' className='w-full' onClick={clearFilters}>
              {t('common.clearFilters')}
            </Button>
          ) : null}
        </Card>
        </div> 
    </div>
  );
};

export default Listing;

    