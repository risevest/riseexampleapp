import DollarCard from 'app/assets/icons/svg/dollar-card.svg'
import USDC from 'app/assets/icons/svg/USDC.svg'
import React from 'react'

import NairaCard from '../../assets/icons/svg/naira-card.svg'

export const selectCardOptions = (rates: Rates) => {
  return [
    {
      description: '15 mins',
      fee: '1.5%',
      icon: <NairaCard height={18} width={18} />,
      id: '1',
      isNaira: true,
      name: 'Naira Debit Card',
      pageName: 'CardPayment',
      rate: `$1-₦${rates.toUsd}`
    },
    {
      description: '1 business day',
      fee: '0.5%',
      icon: <DollarCard height={40} width={40} />,
      id: '2',
      isNaira: false,
      name: 'USD Debit/Credit Card',
      pageName: 'CardPayment'
    }
  ]
}

export const cryptoTransferOptions = [
  {
    description: '15 mins',
    fee: '',
    icon: <USDC />,
    id: '2',
    name: 'USDC',
    rate: '1 USDC = $1'
  }
]

export const domTransferOptions = [
  {
    heading: 'Beneficiary Name',
    id: '1',
    value: 'Rumexx Capital Limited'
  },
  {
    heading: 'Bank Name',
    id: '2',
    value: 'Stanbic IBTC Bank PLC, Nigeria'
  },
  {
    heading: 'Account Type',
    id: '3',
    value: 'Domicilliary'
  },
  {
    heading: 'Account Number',
    id: '4',
    value: '0035366415'
  }
]

export const wireTransferOptions = [
  {
    heading: 'Beneficiary Name',
    id: '1',
    value: 'Rise Vest Technologies Limited'
  },
  {
    heading: 'Beneficiary Address',
    id: '2',
    value: '716 Washington Street, Building 3 Columbia SC 29201 USA'
  },
  {
    heading: 'Bank name',
    id: '3',
    value: 'TD Bank'
  },
  {
    heading: 'Account Number',
    id: '4',
    value: '4350508457'
  },
  {
    heading: 'ABA Number',
    id: '5',
    value: '0311-01266'
  },
  {
    heading: 'Swift Code',
    id: '6',
    value: 'NRTHUS33XXX'
  },
  {
    heading: 'US Domestic Routing',
    id: '7',
    value: '053902197'
  }
]

export const JobSector = [
  {
    label: 'Advertising / Media / Publishing',
    value: 'Advertising / Media / Publishing'
  },
  {
    label: 'Agriculture/ Agro Allied',
    value: 'Agriculture/ Agro Allied'
  },
  {
    label: 'Art / Design',
    value: 'Art / Design'
  },
  {
    label: 'Automotive / Car Services',
    value: 'Automotive / Car Services'
  },
  {
    label: 'Banking / Financial Services',
    value: 'Banking / Financial Services'
  },
  {
    label: 'Beverages / Drinks',
    value: 'Beverages / Drinks'
  },
  {
    label: 'Consulting',
    value: 'Consulting'
  },
  {
    label: 'Ecommerce / Retail / Wholesales',
    value: 'Ecommerce / Retail / Wholesales'
  },
  {
    label: 'Education Services/ Research',
    value: 'Education Services/ Research'
  },
  {
    label: 'Energy / Power',
    value: 'Energy / Power'
  },
  {
    label: 'Engineering / Construction',
    value: 'Engineering / Construction'
  },
  {
    label: 'Fashion / Clothings',
    value: 'Fashion / Clothings'
  },
  {
    label: 'FMCG / Conglomerate',
    value: 'FMCG / Conglomerate'
  },
  {
    label: 'Food Services / Hospitality / Hotels',
    value: 'Food Services / Hospitality / Hotels'
  },
  {
    label: 'Gaming / Sports',
    value: 'Gaming / Sports'
  },
  {
    label: 'Government',
    value: 'Government'
  },
  {
    label: 'GHealthcare / Pharmaceutical',
    value: 'Healthcare / Pharmaceutical'
  },
  {
    label: 'ICT / Telecommunications',
    value: 'ICT / Telecommunications'
  },
  {
    label: 'Internet / Software',
    value: 'Internet / Software'
  },
  {
    label: 'Legal',
    value: 'legal'
  },
  {
    label: 'Logistics / Transportation',
    value: 'Logistics / Transportation'
  },
  {
    label: 'Manufacturing / Production',
    value: 'Manufacturing / Production'
  },
  {
    label: 'NGO / Non-Profit / International Agencies',
    value: 'NGO / Non-Profit / International Agencies'
  },
  {
    label: 'Nutrition / Confectionery / Foods',
    value: 'Nutrition / Confectionery / Foods'
  },
  {
    label: 'Oil & Gas / Mining',
    value: 'Oil & Gas / Mining'
  },
  {
    label: 'Professional / Social Associations',
    value: 'Professional / Social Associations'
  },
  {
    label: 'Real Estate / Property / Facilities Management',
    value: 'Real Estate / Property / Facilities Management'
  },
  {
    label: 'Recruitment / HR Services',
    value: 'Recruitment / HR Services'
  },
  {
    label: 'Religious Bodies / Associations',
    value: 'Religious Bodies / Associations'
  },
  {
    label: 'Security Agencies',
    value: 'Security Agencies'
  },
  {
    label: 'Trade / Services',
    value: 'Trade / Services'
  },
  {
    label: 'Travels / Tourism',
    value: 'Travels / Tourism'
  },
  {
    label: 'Waste Management',
    value: 'Waste Management'
  },
  {
    label: 'Others',
    value: 'Others'
  }
]
