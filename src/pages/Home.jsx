// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Text from '../components/Text/Text';
import branchData from '../data/branchData.json';
import cibclogo from '../assets/cibclogo.png';
import '../styles/Home.css';
import { getStateFullName } from '../utils/stateUtils'; // Import the utility function
import LanguageDiv from '../components/LanguageDiv/LanguageDiv';
import translations from '../data/translations';

function Home() {
  const [text, setText] = useState('');
  const [transit_rawvalue, setTransit_rawvalue] = useState('')
  const [transit_formattedvalue, setTransit_formattedvalue] = useState('')
  const [account, setAccount] = useState('');
  const [isTransitFocused, setIsTransitFocused] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleTransitChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setTransit_rawvalue(value);
    }
  };

  const handleAccountChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,7}$/.test(value)) {
      setAccount(value);
    }
  };
  
  const generateTransit_formattedvalue = (transit) => {
    return transit.padStart(5, '0');
  };

  useEffect(() => {
    if (transit_rawvalue !== '') {
      setTransit_formattedvalue(generateTransit_formattedvalue(transit_rawvalue));
    }
  }, [transit_rawvalue]);

  const generateCCCode = (transit_formattedvalue, account) => {
    return `0010${transit_formattedvalue}${account}`;
  };

  const ccCode = generateCCCode(transit_formattedvalue, account);

  // const generateIBAN = (transit_formattedvalue, account) => {
  //   return `CA${transit_formattedvalue}${account}`;
  // };

  // const IBAN = generateIBAN(transit_formattedvalue, account);

  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  // const [branch, setBranch] = useState('');

  const [postalCode, setPostalCode] = useState('');
  
  const findBranchByTransitNumber = (transitNumber) => {
    const branch = branchData.find(branch => branch["TransitNumber"] === transitNumber);
    return branch ? branch : { Address: 'Address not found', State: 'State not found', City: 'City not found', Branch: 'Branch not found', PostalCode: 'Postal Code not found' };
  };

  useEffect(() => {
    const branchInfo = findBranchByTransitNumber(transit_formattedvalue);
    setAddress(branchInfo.Address);
    setState(branchInfo.State);
    setCity(branchInfo.City);
    // setBranch(branchInfo.Branch);
    setPostalCode(branchInfo.PostalCode);
  }, [transit_formattedvalue]);

  const getTranslation = (key) => {
    return selectedLanguage && translations[selectedLanguage] ? translations[selectedLanguage][key] : '';
  };

  return (
    <div className='Home-div'>
      <img src={cibclogo} alt="Description of image" className="styled-image" />
      <div className={'languageDivContainer'}>
        <LanguageDiv value={setSelectedLanguage} />
      </div>
      <div className='spacer-div30' />
      <p className='p-page-title'>
        Wire Transfer Instructions  
        <span className='span-style'>
          {getTranslation('wireTransferInstructions')}
        </span>
      </p>
      <div className='spacer-div40' />
      <p className='p-segment-title'>
        Beneficiary Information
        <span className='span-style'>
          {getTranslation('beneficiaryInformation')}
        </span>
      </p>
      <div className='spacer-div20' />
      <div className='grid-container'>
        <p className='p1'>
          Name
          <span className='span-style'>
            {getTranslation('name')}
          </span>:
        </p>
        <Text
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter customer name"
        />  
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          Address
          <span className='span-style'>
            {getTranslation('address')}
          </span>:
        </p>
        <Text
          placeholder="Enter customer address"
        />
      </div>
      <div className='spacer-div30' />

      <div className='grid-container'>
        <p className='p1'>
          Institution/Bank
          <span className='span-style'>
            {getTranslation('institutionBank')}
          </span>:
        </p>
        <p className='p1'>0010</p>
      </div>
      <div className='spacer-div20' />
    
      <div className='grid-container'>
        <p className='p1'>
          Transit/Branch
          <span className='span-style'>
            {getTranslation('transitBranch')}
          </span>:
        </p>
        <Text
          value={isTransitFocused ? transit_rawvalue : transit_formattedvalue}
          onChange={handleTransitChange}
          onFocus={() => setIsTransitFocused(true)}
          onBlur={() => setIsTransitFocused(false)}
          placeholder="Enter transit number"
        />
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          Account Number
          <span className='span-style'>
            {getTranslation('accountNumber')}
          </span>:
        </p>
        <Text
          value={account}
          onChange={handleAccountChange}
          placeholder="Enter account number"
        />
      </div>

      <div className='spacer-div50' />
      <p className='p-segment-title'>
        Bank Information
        <span className='span-style'>
          {getTranslation('bankInformation')}
        </span>
      </p>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          Bank Name
          <span className='span-style'>
            {getTranslation('bankName')}
          </span>:
        </p>
        <p className='p1'>Canadian Imperial Bank of Commerce</p>
      </div>
      <div className='spacer-div20' />

      {/* <div className='grid-container'>
        <p>Branch:</p>
        <p>{branch}</p>
      </div> */}

      <div className='grid-container'>
        <p className='p1'>
          Address
          <span className='span-style'>
            {getTranslation('address')}
          </span>:
        </p>
        <p className='p1'>{address}</p>
      </div>

      <div className='grid-container'>
        <p className='p1'></p>
        <p className='p1'>{city}, {getStateFullName(state)}, Canada</p>
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          Postal Code
          <span className='span-style'>
            {getTranslation('postalCode')}
          </span>:
        </p>
        <p className='p1'>{postalCode}</p>
      </div>
      <div className='spacer-div30' />

      <div className='grid-container'>
        <p className='p1'>
          SWIFT:
        </p>
        <p className='p1'>CIBCCATT</p>
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          CC Code
          <span className='span-style'>
            {getTranslation('ccCode')}
          </span>:
        </p>
        <p className='p1'>{ccCode}</p>
      </div>
      <div className='spacer-div20' />

      {/* <div className='grid-container'>
        <p className='p1'>IBAN:</p>
        <p className='p1'>{IBAN}</p>
      </div> */}
    </div>
  );
}

export default Home;
