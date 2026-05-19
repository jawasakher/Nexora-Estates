import React, { useMemo, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import EmptyState from '../../components/ui/EmptyState'
import Loader from '../../components/ui/Loader'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import StatCard from '../../components/ui/StatCard'
import DashboardSection from '../../components/ui/DashboardSection'
import OwnerPropertyRow from '../../components/owner/OwnerPropertyRow'
import { assets } from '../../assets/data'

const Listproperty = () => {
  const { user, currency, loadingProperties, navigate } = useAppContext()
  const [localProperties, setLocalProperties] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  const baseProperties = useMemo(() => (Array.isArray(user?.properties) ? user.properties : []), [user])
  const properties = localProperties ?? baseProperties

  const filteredProperties = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    const filtered = (properties ?? []).filter((property) => {
      const matchesSearch = !query || [property?.title, property?.address, property?.city, property?.propertyType]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))

      const matchesAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'available' && property?.isAvailable) ||
        (availabilityFilter === 'hidden' && !property?.isAvailable)

      return matchesSearch && matchesAvailability
    })

    filtered.sort((a, b) => {
      if (sortBy === 'price-high') return (b?.price?.sale ?? 0) - (a?.price?.sale ?? 0)
      if (sortBy === 'price-low') return (a?.price?.sale ?? 0) - (b?.price?.sale ?? 0)
      return 0
    })

    return filtered
  }, [properties, searchTerm, availabilityFilter, sortBy])

  const stats = useMemo(() => {
    const total = properties.length
    const available = properties.filter((property) => property?.isAvailable).length
    const hidden = total - available
    const avgSale = total ? Math.round(properties.reduce((sum, property) => sum + (Number(property?.price?.sale) || 0), 0) / total) : 0

    return { total, available, hidden, avgSale }
  }, [properties])

  const clearFilters = () => {
    setSearchTerm('')
    setAvailabilityFilter('all')
    setSortBy('latest')
  }

  const handleToggleAvailability = (propertyId) => {
    setLocalProperties((prev) => {
      const source = prev ?? baseProperties

      return source.map((property) =>
        property._id === propertyId
          ? { ...property, isAvailable: !property.isAvailable }
          : property,
      )
    })
  }

  const handleDelete = (propertyId) => {
    const confirmed = window.confirm('Delete this property from the owner list?')
    if (!confirmed) return

    setLocalProperties((prev) => {
      const source = prev ?? baseProperties
      return source.filter((property) => property._id !== propertyId)
    })
  }

  if (loadingProperties) {
    return (
      <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] flex items-center justify-center lg:w-11/12'>
        <Loader />
      </div>
    )
  }

  if (!properties?.length) {
    return (
      <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 lg:w-11/12'>
        <EmptyState
          title='No properties found'
          description='You have not listed any properties yet.'
          action={
            <Button variant='primary' onClick={() => navigate('/owner/add-property')}>
              Add your first property
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 space-y-6'>
      <Card className='p-5 sm:p-6'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>Owner management</p>
            <h2 className='h2 mt-1'>Manage your listings</h2>
            <p className='text-slate-600'>Search, filter, toggle availability, and remove properties from your owner dashboard.</p>
          </div>
          <Button variant='primary' onClick={() => navigate('/owner/add-property')}>
            Add property
          </Button>
        </div>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard icon={assets.house} value={String(stats.total).padStart(2, '0')} label='Total Listings' className='bg-[#fff4d2]' />
        <StatCard icon={assets.calendarCheck} value={String(stats.available).padStart(2, '0')} label='Available' className='bg-[#d1e8ff]' />
        <StatCard icon={assets.list} value={String(stats.hidden).padStart(2, '0')} label='Hidden' className='bg-[#e6f6ea]' />
        <StatCard icon={assets.dollar} value={`${currency}${stats.avgSale}`} label='Avg Sale Price' className='bg-[#fbe7ff]' />
      </div>

      <DashboardSection
        title='Filter listings'
        description='Use filters to find a property quickly.'
        actions={<Button variant='secondary' size='sm' onClick={clearFilters}>Reset</Button>}
      >
        <div className='grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4'>
          <Input
            label='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Title, city, address...'
          />

          <div>
            <h5 className='h5 mb-2'>Availability</h5>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              <option value='all'>All</option>
              <option value='available'>Available</option>
              <option value='hidden'>Hidden</option>
            </select>
          </div>

          <div>
            <h5 className='h5 mb-2'>Sort</h5>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              <option value='latest'>Latest</option>
              <option value='price-high'>Price high to low</option>
              <option value='price-low'>Price low to high</option>
            </select>
          </div>

          <div className='flex items-end'>
            <Badge variant='info' className='w-full justify-center py-3'>
              {filteredProperties.length} visible listings
            </Badge>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection title='Your properties' description='Listing cards can be toggled, viewed, edited, or removed.'>
        {filteredProperties.length ? (
          <div className='space-y-4 p-5'>
            <div className='hidden rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-slate-950 lg:grid lg:grid-cols-[0.45fr_1.8fr_1.1fr_0.8fr_1fr]'>
              <div>Index</div>
              <div>Name</div>
              <div>Type / City</div>
              <div>Price</div>
              <div>Actions</div>
            </div>

            {filteredProperties.map((property, index) => (
              <OwnerPropertyRow
                key={property._id}
                property={property}
                index={index}
                currency={currency}
                onToggleAvailability={handleToggleAvailability}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className='p-6'>
            <EmptyState
              title='No properties match'
              description='Try a different search term or switch the availability filter.'
              action={<Button variant='primary' onClick={clearFilters}>Clear filters</Button>}
            />
          </div>
        )}
      </DashboardSection>
    </div>
  )
}

export default Listproperty
