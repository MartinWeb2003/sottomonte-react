import { type SchemaTypeDefinition } from 'sanity'
import { listingSchema } from './listing'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [listingSchema],
}
