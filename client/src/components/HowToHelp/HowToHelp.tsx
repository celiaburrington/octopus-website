import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiBallPenLine } from 'react-icons/ri';
import * as billResponse from './temp.json';
import './HowToHelp.css';

type Bill = {
  id: string;
  session: string;
  jurisdiction: {
    id: string;
    name: string;
    classification: 'state' | 'municipality' | 'country';
  };
  from_organization: {
    id: string;
    name: string;
    classification: string;
  };
  identifier: string;
  title: string;
  created_at: string;
  updated_at: string;
  openstates_url: string;
  first_action_date?: string;
  latest_action_date?: string;
  latest_action_description?: string;
  latest_passage_date?: string;
};

type BillResponse = {
  results: Bill[];
  pagination: {
    max_page: number;
    page: number;
    per_page: number;
    total_items: number;
  };
};

const HowToHelp = () => {
  const [bills, setBills] = useState<BillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(
        //   'https://v3.openstates.org/bills?sort=updated_asc&q=octopus+aquaculture+-labeling&page=1&per_page=20&apikey=190cad75-86bd-4ce0-af6f-c67321f65a75',
        // );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        const json: BillResponse = billResponse as BillResponse;
        // const json: BillResponse = await response.json();
        setBills(json);
        setError(null);
      } catch (err) {
        setError(`Error Loading Bills`);
        setBills(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='os-how-to-help'>
      <div className='os-help-page-head'>
        <div className='os-img-attr'>
          <Link to='/attribution' className='os-no-link'>
            Attribution [3]
          </Link>
        </div>
        <div className='os-involved-title'>How To Help</div>
      </div>
      <div className='os-legislation-title'>Know Your Legislation</div>
      <div className='os-legislation-body'>
        Already some states have proposed legislation to premptively ban octopus farms in the US.
        The laws also ban importing octopus meat that was produced via commercial aquaculture.
        Taking US consumers out of the equation could help to disuade companies from pursuing
        octopus farms. Find out what states have gotten involved.
      </div>
      <table className='os-bill-table'>
        <tr>
          <th>State</th>
          <th>Bill</th>
          <th>First Action Date</th>
          <th>Last Action</th>
          <th>Last Action Date</th>
          <th>Bill Passed</th>
          <th>Identifier</th>
        </tr>
        {!error
          ? bills?.results.map((bill: Bill) => (
              <tr key={bill.id}>
                <td>{bill.jurisdiction.name}</td>
                <td>
                  {bill.jurisdiction.name === 'Connecticut' ? bill.title.toLowerCase() : bill.title}
                </td>
                <td>
                  {bill.first_action_date
                    ? new Date(bill.first_action_date).toLocaleDateString()
                    : ''}
                </td>
                <td>{bill.latest_action_description}</td>
                <td>
                  {bill.latest_action_date
                    ? new Date(bill.latest_action_date).toLocaleDateString()
                    : ''}
                </td>
                <td>
                  {bill.latest_passage_date
                    ? `Yes! Passed on ${new Date(bill.latest_passage_date).toLocaleDateString()}`
                    : 'Not yet.'}
                </td>
                <td>
                  <a href={bill.openstates_url} target='_blank' rel='noopener noreferrer'>
                    {bill.identifier}
                  </a>
                </td>
              </tr>
            ))
          : error}
      </table>
      <div className='os-petition-title'>
        Petition the EU and US to continue to ban octopus farms
        <RiBallPenLine className='os-pen' />
      </div>
      <div className='os-petition-list'>
        <a
          className='os-no-link'
          href='https://secure.avaaz.org/campaign/en/ban_octopus_farming_loc/'
          target='_blank'
          rel='noopener noreferrer'>
          <div className='os-petition-link'>AVAAZ petition</div>
        </a>
        <a
          className='os-petition-link os-no-link'
          href='https://www.drove.com/campaign/6202d5ca01cf365ea19492a3'
          target='_blank'
          rel='noopener noreferrer'>
          <img
            className='os-petition-icon-r'
            src='site-resources/animal-save-movement.png'
            alt='ALDF Icon'
            width={50}
            height={50}
          />
          Animal Save Movement
        </a>
        <div className='os-petition-link'>
          Ekō petitions{' '}
          <a
            className='os-no-link os-petition-icon-l'
            href='https://action.eko.org/a/stop-the-world-s-first-octopus-farm-fba21'
            target='_blank'
            rel='noopener noreferrer'>
            [1]
          </a>
          <a
            className='os-no-link os-petition-icon-l'
            href='https://action.eko.org/a/eu-close-loophole-ban-octopus-farms'
            target='_blank'
            rel='noopener noreferrer'>
            [2]
          </a>
          <img
            className='os-petition-icon-l'
            src='site-resources/eko-icon.png'
            alt='ALDF Icon'
            width={50}
            height={50}
          />
        </div>
        <a
          className='os-no-link'
          href='https://www.change.org/p/for-a-european-law-banning-the-breeding-of-octopuses-in-farms'
          target='_blank'
          rel='noopener noreferrer'>
          <div className='os-petition-link'>Change.org</div>
        </a>
        <a
          className='os-no-link'
          href='https://aldf.org/article/petition-ban-octopus-farming-today/'
          target='_blank'
          rel='noopener noreferrer'>
          <div className='os-petition-link'>
            <img
              className='os-petition-icon-r'
              src='site-resources/aldf-icon.png'
              alt='ALDF Icon'
              width={50}
              height={50}
            />
            ALDF US Ban petition
          </div>
        </a>
        <br />
      </div>
    </div>
  );
};

export default HowToHelp;
