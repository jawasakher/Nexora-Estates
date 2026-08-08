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
import { useOwnerProperties } from '../../hooks/useOwnerProperties.js'
import { useOwnerPropertyMutations } from '../../hooks/useOwnerPropertyMutations.js'
import { useI18n } from '../../i18n/I18nContext.jsx'

const Listproperty = () => {
  const { t } = useI18n()
  const { currency, navigate } = useAppContext()
  const { data: ownerProperties = [], isLoading: loadingProperties } = useOwnerProperties()
  const { toggleAvailabilityMutation, deletePropertyMutation } = useOwnerPropertyMutations()
  const [searchTerm, setSearchTerm] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')

  const properties = ownerProperties

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
    const property = properties.find((item) => item._id === propertyId)
    if (!property) return

    toggleAvailabilityMutation.mutate({
      propertyId,
      nextAvailability: !property.isAvailable,
    })
  }

  const handleDelete = (propertyId) => {
    const confirmed = window.confirm(t('owner.list.deleteConfirm'))
    if (!confirmed) return

    deletePropertyMutation.mutate(propertyId)
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
          title={t('owner.list.noProperties')}
          description={t('owner.list.noPropertiesDescription')}
          action={
            <Button variant='primary' onClick={() => navigate('/owner/add-property')}>
              {t('owner.list.addFirstProperty')}
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
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>{t('owner.list.managementTag')}</p>
            <h2 className='h2 mt-1'>{t('owner.list.manageListings')}</h2>
            <p className='text-slate-600'>{t('owner.list.manageListingsDescription')}</p>
          </div>
          <Button variant='primary' onClick={() => navigate('/owner/add-property')}>
            {t('common.addProperty')}
          </Button>
        </div>
      </Card>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <StatCard icon={assets.house} value={String(stats.total).padStart(2, '0')} label={t('owner.list.totalListings')} className='bg-[#fff4d2]' />
        <StatCard icon={assets.calendarCheck} value={String(stats.available).padStart(2, '0')} label={t('owner.list.available')} className='bg-[#d1e8ff]' />
        <StatCard icon={assets.list} value={String(stats.hidden).padStart(2, '0')} label={t('owner.list.hidden')} className='bg-[#e6f6ea]' />
        <StatCard icon={assets.dollar} value={`${currency}${stats.avgSale}`} label={t('owner.list.avgSalePrice')} className='bg-[#fbe7ff]' />
      </div>

      <DashboardSection
        title={t('owner.list.filterListings')}
        description={t('owner.list.filterListingsDescription')}
        actions={<Button variant='secondary' size='sm' onClick={clearFilters}>{t('common.reset')}</Button>}
      >
        <div className='grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4'>
          <Input
            label={t('owner.list.searchLabel')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('owner.list.searchPlaceholder')}
          />

          <div>
            <h5 className='h5 mb-2'>{t('owner.list.availability')}</h5>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              <option value='all'>{t('common.all')}</option>
              <option value='available'>{t('common.available')}</option>
              <option value='hidden'>{t('common.hidden')}</option>
            </select>
          </div>

          <div>
            <h5 className='h5 mb-2'>{t('owner.list.sort')}</h5>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20'
            >
              <option value='latest'>{t('owner.list.latest')}</option>
              <option value='price-high'>{t('owner.list.priceHighToLow')}</option>
              <option value='price-low'>{t('owner.list.priceLowToHigh')}</option>
            </select>
          </div>

          <div className='flex items-end'>
            <Badge variant='info' className='w-full justify-center py-3'>
              {t('owner.list.visibleListings', { count: filteredProperties.length })}
            </Badge>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection title={t('owner.list.yourProperties')} description={t('owner.list.yourPropertiesDescription')}>
        {filteredProperties.length ? (
          <div className='space-y-4 p-5'>
            <div className='hidden rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-slate-950 lg:grid lg:grid-cols-[0.45fr_1.8fr_1.1fr_0.8fr_1fr]'>
              <div>{t('owner.dashboard.index')}</div>
              <div>{t('owner.list.name')}</div>
              <div>{t('owner.list.typeCity')}</div>
              <div>{t('owner.list.price')}</div>
              <div>{t('owner.list.actions')}</div>
            </div>

            {filteredProperties.map((property, index) => (
              <OwnerPropertyRow
                key={property._id}
                property={property}
                index={index}
                currency={currency}
                onToggleAvailability={handleToggleAvailability}
                onDelete={handleDelete}
                isMutating={toggleAvailabilityMutation.isPending || deletePropertyMutation.isPending}
              />
            ))}
          </div>
        ) : (
          <div className='p-6'>
            <EmptyState
              title={t('owner.list.noMatch')}
              description={t('owner.list.noMatchDescription')}
              action={<Button variant='primary' onClick={clearFilters}>{t('common.clearFilters')}</Button>}
            />
          </div>
        )}
      </DashboardSection>
    </div>
  )
}

export default Listproperty
