import BusinessIcon from 'app/assets/icons/svg/business-icon.svg'
import SchoolIcon from 'app/assets/icons/svg/school-icon.svg'
import React from 'react'
import { StyleSheet } from 'react-native'

import StartBusiness from '../../assets/icons/svg/start-business.svg'

export const ENTRIES1 = [
  {
    backgroundImage: (
      <StartBusiness style={{ ...StyleSheet.absoluteFillObject }} />
    ),
    firstPageQuestion: 'What would you like to call your Business?',
    icon: <BusinessIcon height={23} width={23} />,
    illustration: require('../../assets/images/start-business.png'),
    name: 'START A BUSINESS',
    placeholderText: 'Business Name',
    selectPlan: (
      navigationFunc: any,
      planName: string,
      type: string,
      ...rest: any
    ) => {
      navigationFunc.navigate('GoalsStack', {
        params: { planName, type, ...rest },
        screen: 'Landing'
      })
    },
    subtitle:
      'A short to mid-term investment plan to start your dream business.',
    thirdPageQuestion: 'When do you want to start the Business?',
    title: 'Start a Business',
    type: 'Business'
  },
  {
    backgroundImage: <StartBusiness />,
    firstPageQuestion: 'What school are you going to?',
    icon: <SchoolIcon height={23} width={23} />,
    illustration: require('../../assets/images/save-for-school.png'),
    name: 'SAVE FOR SCHOOL',
    placeholderText: 'School Name',
    selectPlan: (
      navigationFunc: any,
      planName: string,
      type: string,
      ...rest: any
    ) => {
      navigationFunc.navigate('GoalsStack', {
        params: { planName, type, ...rest },
        screen: 'Landing'
      })
    },
    subtitle:
      'The Save for School goal is a short to mid-term investment plan to help you save up to start your education journey',
    thirdPageQuestion: 'When does school start?',
    title: 'Save for School',
    type: 'School'
  }
]
