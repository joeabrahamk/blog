import React, {useState, useEffect} from 'react'
import { useParams} from 'react-router-dom'
import SanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'


const builder = imageUrlBuilder(SanityClient)

const urlFor = source => {
  return builder.image(source)
}

const OnePost = () => {
  const [postData, setPostData] = useState("")
  const {slug} = useParams() 

  useEffect(() => {
  console.log(`Fetching post with slug: ${slug}`);
  SanityClient.fetch(
    `*[slug.current == $slug]{
      title,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      body,
      "name": author->name,
      "authorImage": author->image
    }`,
    { slug }
  )
  .then(data => {
    console.log('Fetched data:', data[0]);
    setPostData(data[0]);
    console.log("Data:",postData)
    console.log(postData)
  })
  .catch(err => console.error('Error fetching data:', err));
}, [slug]);

  if (!postData) return <div>Loading...</div>

  return (
    <div className="bg-gray-200 min-h-screen p-12">
      <div className="container shadow-lg mx-auto bg-green-100 rounded-lg p-12">
        <div className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-white bg-opacity-75 rounded p-12">
              <h2 className="cursive text-3xl lg:text-6xl mb-4">
                {postData[0].title}
              </h2>
              <div className="flex justify-center text-gray-800">
                <img src={urlFor(postData[0].authorImage).url()} alt={postData[0].name} className="w-10 h-10 rounded-full" />
              </div>
              <p className="cursive flex justify-center my-4">
                {postData[0].name}
              </p>
            </div>
          </div>

        </div>
        <img src={postData[0].mainImage.asset.url} alt={postData[0].title} className="w-full object-cover rounded-t" style={{height: "400px"}} />
      </div>
      <div className='px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full'>
        <BlockContent blocks={postData[0].body} projectId="ujvzk236" dataset="dbrsba" />
      </div>

    </div>
  )
}

export default OnePost
