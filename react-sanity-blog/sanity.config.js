import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'react-sanity-blog',

  projectId: 'ujvzk236',
  dataset: 'dbrsba',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
