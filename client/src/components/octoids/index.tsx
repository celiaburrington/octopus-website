import { Link } from 'react-router-dom';
import { GiOctopus } from 'react-icons/gi';
import './index.css';

const Octoids = () => (
  <div className='os-octoids-page'>
    <div className='os-octoids-page-head'>
      <div className='os-img-attr'>
        <Link to='/attribution' className='os-no-link'>
          Attribution [4]
        </Link>
      </div>
      <div className='os-octoids-title'>Octoids!</div>
    </div>
    <div className='os-section-title'>Octopi, Octopuses, Octopodes?</div>
    <div className='os-section-body'>
      Winner, winner! Octopuses! That&apos;s right, the correct plural word for these silly
      cephalopods is octopuses, not octopi. The mistake is often made that octopus is a Latin word,
      when it actually comes from Greek. If we want to get super technical, the true plural would be
      octopodes, but I don&apos;t see that one catching on soon.
    </div>
    <div className='os-section-title'>
      First Class Camouflage <GiOctopus />
    </div>
    <div className='os-section-body'>
      Octopuses have some of the most impressive shapeshifting abilites seen in the entire animal
      kingdom. They are able to rapidly change their skin color through pigment-filled
      chromatophores. By streching or contracting these special skin cells, an octopus can have an
      instant makeover.
      <br />
      <br />
      But the octopuses transformation skills don&apos;t stop there. They are also able to go from
      smooth swimmers to skin as rough as coral in an instant. Matching the color and texture of
      surrounding reefs and rocks can make these creatures nearly invisible.
      <br />
      <br />
    </div>
    <div className='os-octoid-imgs'>
      <img src='/site-resources/camouflage/Day_Octopus.jpg' height={250}></img>
      <img src='/site-resources/camouflage/Lorry_Bay.jpeg' height={250}></img>
      <img src='/site-resources/camouflage/Octopus_Chromatophores.jpg' height={250}></img>
      <img src='/site-resources/camouflage/Partridge_Point.jpeg' height={250}></img>
      <img src='/site-resources/camouflage/Pulpo_2022.jpg' height={250}></img>
    </div>
    <Link to='/attribution' className='os-octoid-attr'>
      Attribution [4-8]
    </Link>
    <div className='os-section-title'>
      A Brain Like No Other <GiOctopus />
    </div>
    <div className='os-section-body'>
      The octopus has 500 million neurons in its body, but more than 350 million of those neurons
      are located outside of the central brain! More than 3/5ths of an octopuses nervous system is
      located in its arms. <br />
      <br />
      “The octopus’ arms have a neural ring that bypasses the brain, and so the arms can send
      information to each other without the brain being aware of it...So while the brain isn’t quite
      sure where the arms are in space, the arms know where each other are and this allows the arms
      to coordinate during actions like crawling.” <br />
      -- Dominic Sivitilli, a behavioral neuroscientist from the University of Washington.
      <br />
      <br />
      The Coconut Octopus carries clam shells to act as emergency shelter when traveling across the
      exposed seafloor. This demonstrates a high level of intelligence needed to anticipate the
      future. Other species of octopus are known to use their environment in a similar fashion,
      using the suckers that line their arms to build an armor from loose rocks and shells. Tool use
      is surprisingly rare, only seen in 0.1% of animals.
      <br />
      <br />
    </div>
    <div className='os-octoid-imgs'>
      <img src='/site-resources/shells/Coconut_octopus_2.jpg' height={250}></img>
      <img src='/site-resources/shells/Coconut_octopus_1.jpg' height={250}></img>
      <img src='/site-resources/shells/Octopus_shell.jpg' height={250}></img>
    </div>
    <Link to='/attribution' className='os-octoid-attr'>
      Attribution [9-11]
    </Link>
    <div className='os-video-embed'>
      <iframe
        src='https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FTheOctoNation%2Fvideos%2F2883536961956307%2F&show_text=false&width=380&t=0'
        width={380}
        height={476}
        // style='border:none;overflow:hidden'
        // allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
        allowFullScreen={true}></iframe>
    </div>
  </div>
);

export default Octoids;
