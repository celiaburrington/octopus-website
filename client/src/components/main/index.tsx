import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import Footer from '../footer';
import Header from '../header';
import './index.scss';
import VideoComponent from './videoComponent';

export default function MainPage() {
  return (
    // inspiration for parallax implementation:
    // https://www.youtube.com/watch?v=rLrLJQBG_qo
    // https://codepen.io/keithclark/pen/ndEygj
    <div className='parallax_wrapper'>
      <div id='intro' className='intro_screen'>
        <Header />
      </div>
      <div id='group-1' className='parallax_group'>
        <div className='parallax_layer base_layer'>
          <div className='os-img-attr'>
            <Link to='/attribution' className='os-no-link'>
              Attribution [1]
            </Link>
          </div>
        </div>
        <div className='parallax_layer mid_layer1'>
          Octopus Farming: An Ethical and Environmental Misstep
        </div>
      </div>
      <div id='break' className='parallax_group'>
        {/* <div className='parallax_layer mid_layer_test'></div> */}
        <div className='parallax_layer video_layer'>
          <div className='os-opening-info'>
            <div className='os-op-title'>The Situation</div>
            <div className='os-op-body'>
              <p>
                Nueva Pescanova, a Spain-based seafood company, has pioneered attempts to farm
                octopus in captivity, despite strong evidence that such practices cause significant
                harm to the animals. Research reveals that high-welfare farming is impossible for
                octopuses, whose solitary and aggressive nature leads to severe suffering in
                overcrowded conditions.
              </p>
              <p>
                Additionally, the farming of carnivorous species like octopuses requires massive
                amounts of feeder fish, leading to competition for global fish stocks and
                threatening food security in regions reliant on fish as a primary source of protein.
              </p>
              <p>
                In light of the evidence of octopus sentience and the environmental consequences of
                large-scale farming, the ethical and ecological implications of octopus farming
                cannot be ignored. Though it might be human arrogance at play to decide one species
                more deserving than another of ethical treatment, I strongly believe that there is
                no commercially viable way to farm octopus in a manner that does not result in undue
                cruelty.
              </p>
              <Link to='/attribution' className='os-video-attr'>
                Attribution [Video 1]
              </Link>
            </div>
          </div>
          <VideoComponent className='os-video' source='/site-resources/Octopus_clips.mp4' />
        </div>
      </div>
      <div id='group-2' className='parallax_group'>
        <div className='parallax_layer mid_layer2'>
          <div className='os-img-attr'>
            <Link to='/attribution' className='os-no-link'>
              Attribution [2]
            </Link>
          </div>
        </div>
        <div className='top_layer'>
          <div className='os-info-cards'>
            <div className='os-card'>
              <h4>How can you help?</h4>
              You can make a difference! Already, several US states have proposed laws banning
              octopus farming thanks to the response from people around the world. See our
              involvement page for details and participate in some ongoing petitions. Check out
              these awesome other resources on octopuses as well!{' '}
              <a className='os-no-link' href='https://octonation.com/'>
                Octonation.com
              </a>
              <br />
              <div className='os-learn-more'>
                <Link to='/how-to-help' className='os-no-link'>
                  Learn more <FaArrowRightLong className='os-learn-arrow' />
                </Link>
              </div>
            </div>
            <div className='os-card'>
              <h4>Octopuses are super cool!</h4>
              Because of how far back their evolution split off from the rest of the intelligent
              life we&apos;ve observed, octopuses may be the closest thing we have to alien life.
              We&apos;d have to go back more than 500 million years to the basic flatworm to find a
              common ancestor. That&apos;s made octopus intelligence that much more fascinating to
              scientists.
              <br />
              <div className='os-learn-more'>
                <Link to='/octopus-facts' className='os-no-link'>
                  Learn more <FaArrowRightLong className='os-learn-arrow' />
                </Link>
              </div>
            </div>
            <div className='os-card'>
              <h4>Octopus Escape</h4>
              Known as the Houdini of the sea, octopuses are masters of escape. Famous for slipping
              out of aquarium enclosures (sometimes to snack on neighboring fish), an octopus can
              squeeze though any gap as long as it is big enough for their only solid body part:
              their beak. See if you have what it takes to escape!
              <br />
              <div className='os-learn-more'>
                <Link to='/game' className='os-no-link'>
                  Learn more <FaArrowRightLong className='os-learn-arrow' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='outro' className='outro_screen'>
        <Footer />
      </div>
    </div>
  );
}
