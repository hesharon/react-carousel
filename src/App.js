import './App.css';
import Carousel from './components/carousel'
import './components/carousel/styles.css'

function App() {
  const images = [
    'https://www.planetware.com/wpimages/2019/12/hawaii-in-pictures-beautiful-places-to-photograph-hanauma-bay-oahu.jpg',
    'https://live.staticflickr.com/870/27268641848_3c37ba81f2_b.jpg',
    'https://lp-cms-production.imgix.net/features/2019/05/shutterstockRF_533417248-91dd956338b0.jpg'
]
  return (
    <div style={{ width: '50%', margin: 'auto' }}>
      <Carousel id='carousel'>
        {images.map((img, index) => <img key={index} src={img} width='100%' style={{ objectFit: 'cover' }}/>)}
      </Carousel>
    </div>
  )
}

export default App
