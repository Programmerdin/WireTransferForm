// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Text from '../components/Text/Text';
import branchData from '../data/branchData.json';
import cibclogo from '../assets/cibclogo.png';
import instructions from '../assets/instructions.png';
import printIcon from '../assets/print-icon.png';
import '../styles/Home.css';
import { getStateFullName } from '../utils/stateUtils'; // Import the utility function
import LanguageDiv from '../components/LanguageDiv/LanguageDiv';
import translations from '../data/translations';

function Home() {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryAddress1, setBeneficiaryAddress1] = useState('');
  const [beneficiaryAddress2, setBeneficiaryAddress2] = useState('');
  
  const [transit_rawvalue, setTransit_rawvalue] = useState('')
  const [transit_formattedvalue, setTransit_formattedvalue] = useState('')
  const [account, setAccount] = useState('');
  const [isTransitFocused, setIsTransitFocused] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [isTransitValid, setIsTransitValid] = useState(null); // Initialize as null
  const [isAccountValid, setIsAccountValid] = useState(null); // Initialize as null

  const handleTransitChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setTransit_rawvalue(value);
      setIsTransitValid(value.length === 0 ? null : value.length === 5); // Update transit validity
    }
  };

  const handleAccountChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,7}$/.test(value)) {
      setAccount(value);
      setIsAccountValid(value.length === 0 ? null : value.length === 7); // Update account validity
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

  const generateCCCode = (transit_formattedvalue) => {
    return `CC0010${transit_formattedvalue}`;
  };

  const ccCode = generateCCCode(transit_formattedvalue, account);

  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const findBranchByTransitNumber = (transitNumber) => {
    if (transitNumber === '') {
      setIsTransitValid(null); // No input yet, so no warning
      return { Address: '', State: '', City: '', Branch: '', PostalCode: '' };
    }
  
    const branch = branchData.find(branch => branch["TransitNumber"] === transitNumber);
    if (branch) {
      setIsTransitValid(true);
      return branch;
    } else {
      setIsTransitValid(false);
      return { Address: 'Address not found', State: 'State not found', City: 'City not found', Branch: 'Branch not found', PostalCode: 'Postal Code not found' };
    }
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

  const isFormValid = () => {
    return isTransitValid && isAccountValid && beneficiaryName && beneficiaryAddress1 && beneficiaryAddress2;
  };

  return (
    <div className='Home-div'>
      <img src={cibclogo} alt="" className="cibc-logo print-only" />
      <div className={'languageDivContainer'}>
        <LanguageDiv value={setSelectedLanguage} />
      </div>
      <div className='spacer-div20' />
      <p className='p-page-title'>
        Wire Transfer Instructions  
        <span className='span-style'>
          {getTranslation('wireTransferInstructions')}
        </span>
      </p>
      <div className='spacer-div30' />
      <p className='p-segment-title'>
        Beneficiary Information
        <span className='span-style'>
          {getTranslation('beneficiaryInformation')}
        </span>
      </p>

      <div className='spacer-div10' />
      <div className='grid-container'>
        <p className='p1'>
          Name
          <span className='span-style'>
            {getTranslation('name')}
          </span>:
        </p>
        <Text
          value={beneficiaryName}
          onChange={(e) => setBeneficiaryName(e.target.value)}
          className="custom-textfield"
          placeholder="Enter customer name"
        />  
      </div>
      <div className='spacer-div10' />

      <div className='grid-container'>
        <p className='p1'>
          Address
          <span className='span-style'>
            {getTranslation('address')}
          </span>:
        </p>
        <Text
          value={beneficiaryAddress1}
          onChange={(e) => setBeneficiaryAddress1(e.target.value)}
          placeholder="Enter customer Street address"
          className="custom-textfield"
        />
      </div>
      <div className='grid-container'>
        <div></div>
        <Text 
          value={beneficiaryAddress2}
          onChange={(e) => setBeneficiaryAddress2(e.target.value)}
          placeholder="Enter customer City, Province/State, Postal Code" 
          className="custom-textfield"
        />
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          Institution/Bank
          <span className='span-style'>
            {getTranslation('institutionBank')}
          </span>:
        </p>
        <p className='p1'>0010</p>
      </div>
      <div className='spacer-div10 hide' />
      <div className='grid-container print-only'>
        <p className='p1'>
          Account Number
          <span className='span-style'>
            {getTranslation('accountNumber')}
          </span>:
        </p>
        <p>{transit_formattedvalue + " " + account}</p>
      </div>
    
      <div className='grid-container hide'>
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
          className="custom-numberfield"
        />
      </div>

      <div className='grid-container'>
        <div></div>
        {isTransitValid === false && (
          <p className='p-error'>Transit not found</p>
        )}
      </div>
      <div className='spacer-div10 hide' />

      <div className='grid-container hide'>
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
          className="custom-numberfield"
        />
      </div>
      <div className='grid-container hide'>
        <div></div>
        {isAccountValid === false && (
          <p className='p-error'>Account Number is not 7 digits</p>
        )}
      </div>


      <div className='spacer-div40' />
      <p className='p-segment-title'>
        Bank Information
        <span className='span-style'>
          {getTranslation('bankInformation')}
        </span>
      </p>
      <div className='spacer-div10' />

      <div className='grid-container'>
        <p className='p1'>
          Bank Name
          <span className='span-style'>
            {getTranslation('bankName')}
          </span>:
        </p>
        <p className='p1'>Canadian Imperial Bank of Commerce</p>
      </div>
      <div className='spacer-div10' />

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
      <div className='spacer-div10' />

      <div className='grid-container'>
        <p className='p1'>
          Postal Code
          <span className='span-style'>
            {getTranslation('postalCode')}
          </span>:
        </p>
        <p className='p1'>{postalCode}</p>
      </div>
      <div className='spacer-div20' />

      <div className='grid-container'>
        <p className='p1'>
          SWIFT:
        </p>
        <p className='p1'>CIBCCATT</p>
      </div>
      <div className='spacer-div10' />

      <div className='grid-container'>
        <p className='p1'>
          CC Code
          <span className='span-style'>
            {getTranslation('ccCode')}
          </span>:
        </p>
        <p className='p1'>{ccCode}</p>
      </div>
      <div className='spacer-div40' />

      {!isFormValid() && (
        <p className='p-error2'>Form is incomplete, please fill out all fields</p>
      )}

      {isFormValid() && (
        <button className='print-button' onClick={() => window.print()}>
          <img src={printIcon} alt="Print Icon" className="print-icon" />
          <p>Print</p>
        </button>
      )}
      
      <div className='instructions-div'>
        <button className='instructions-button' onClick={() => setShowInstructions(prev => !prev)}>
          {showInstructions ? 'Hide Advanced Instructions' : 'Show Advanced Instructions'}
        </button>
        {showInstructions && (
          <div className='instructions-shown'>
            <img src={instructions} className="instructions-image" />
          </div>
        )}
      </div>

      <p className='p-support'>If you find any errors, or have any suggestions, feel free to contact me at <a href="mailto:hong525011@gmail.com">hong525011@gmail.com</a></p>
    </div>
  );
}

export default Home;
