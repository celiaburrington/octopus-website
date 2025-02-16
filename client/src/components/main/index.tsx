import './index.css';
import VideoComponent from './videoComponent';

export default function MainPage() {
  return (
    <div className='os-main-page'>
      <img src='site-resources/Octopus_vulgaris_2.jpg' alt='Octopus vulgaris' className='os-ov-2' />
      <img src='site-resources/Octopus_Vulgaris.jpg' alt='Octopus vulgaris' className='os-ov-2' />
      <img
        src='site-resources/Octopus_Martinique.jpg'
        alt='Octopus Martinique'
        className='os-ov-2'
      />
      {/* Coconut_octopus_(Amphioctopus_marginatus)_(14217840897) */}
      <img src='site-resources/Coconut_octopus_1.jpg' alt='Coconut Octopus' className='os-ov-2' />
      {/* Coconut_octopus_in_North_Sulawesi;_Christian_Gloor;_June_2015 */}
      <img src='site-resources/Coconut_octopus_2.jpg' alt='Coconut Octopus' className='os-ov-2' />
      <img src='site-resources/Octopus_eyes.jpg' alt='Octopus eyes close-up' className='os-ov-2' />
      <VideoComponent className='os-parallax' source='site-resources/Octopus_clips.mp4' />
      <VideoComponent
        className='os-video'
        source='site-resources/Octopus_vulgaris_-_5919.ogg.1080p.vp9.mp4'
      />
    </div>
  );
}
