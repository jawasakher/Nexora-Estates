import ListingCard from './property/ListingCard'
import { useAppContext } from '../context/AppContext.jsx'

const Item = ({ property }) => {
  const { currency } = useAppContext()

  return <ListingCard property={property} currency={currency} />
}

export default Item
