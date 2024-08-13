// client.js
/* eslint-disable no-unused-vars */
import sanityClient from '@sanity/client';

const SanityClient = sanityClient({
  projectId: 'ujvzk236',
  dataset: 'dbrsba',
  useCdn: true,
});

export default SanityClient;