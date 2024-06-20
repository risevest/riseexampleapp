import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import { getComputedWidth as gw } from 'app/design'
import { Currency } from 'app/domains/wallet'
import React, { useState } from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/Ionicons'

import {
  countriesData,
  CountryData,
  currencyDataMap
} from './constants/countriesData'

interface CountryCodesProps {
  modal: boolean
  onCountryCodeChange: (item: CountryData) => void
  selectableCurrencies?: Currency[]
  selectedCountry: CountryData
  toggleModal: () => void
}

export default function CountryCodes({
  modal,
  toggleModal,
  selectedCountry,
  onCountryCodeChange,
  selectableCurrencies
}: CountryCodesProps) {
  const [search, setSearch] = useState('')
  const [searchData, setSearchData] = useState<CountryData[]>([])

  const { colors } = useTheme()

  const countries: CountryData[] = !!selectableCurrencies
    ? selectableCurrencies.map((currency) => currencyDataMap[currency])
    : countriesData

  //   find a country by name
  const handleSearch = (text: string) => {
    if (text.length > 0) {
      setSearch(text)
      const filteredCountries = countries.filter((value) =>
        value.nameEn.toLowerCase().includes(text.toLowerCase())
      )
      setSearchData(filteredCountries)
    } else {
      setSearchData(countries)
    }
  }
  //   Sort countries alphabetically : A - Z
  const handleSortCountries = (data: CountryData[]) => {
    const sortedArray = data
      .filter((value) => value.nameEn !== selectedCountry?.nameEn)
      .sort((a, b) => {
        const countryA = a.nameEn.toLowerCase()
        const countryB = b.nameEn.toLowerCase()

        if (countryA < countryB) {
          return -1
        }

        if (countryA > countryB) {
          return 1
        }

        return 0
      })

    return [selectedCountry, ...sortedArray]
  }

  const data = search
    ? handleSortCountries(searchData)
    : handleSortCountries(countries)

  //   Select a country from the list
  const selectCountry = React.useCallback(
    (item: CountryData) => {
      onCountryCodeChange(item)
      toggleModal()
    },
    [onCountryCodeChange, toggleModal]
  )

  // A country component with a flag, name and country code
  const SingleCountryItem = React.useCallback(
    ({ item }: ListRenderItemInfo<CountryData>) => {
      return (
        <TouchableOpacity onPress={() => selectCountry(item)} style={ITEM_CASE}>
          <Text containsEmoji variant="button-15-bold">
            {item?.flag}
          </Text>

          <Text ml="s" variant="button-15-bold">
            {item?.nameEn}
          </Text>

          <Text marginHorizontal="s">{'+' + item?.callingCode}</Text>

          {selectedCountry?.nameEn === item?.nameEn && (
            <Icon color={colors.primary} name="checkmark" size={gw(20)} />
          )}
        </TouchableOpacity>
      )
    },
    [colors.primary, selectCountry, selectedCountry?.nameEn]
  )

  return (
    <Modal
      animationIn="slideInUp"
      animationInTiming={800}
      animationOut="slideOutDown"
      animationOutTiming={800}
      backdropOpacity={0.2}
      isVisible={modal}
      onBackdropPress={toggleModal}
      style={NO_MARGIN}
      useNativeDriver
    >
      <Box
        backgroundColor="background"
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        bottom={0}
        height="80%"
        left={0}
        position="absolute"
        right={0}
      >
        <Box flexDirection="row" padding={gw(15)}>
          <Box
            alignItems="center"
            borderColor="primary"
            borderRadius={8}
            borderWidth={1}
            flex={1}
            flexDirection="row"
            height={40}
            paddingLeft={8}
          >
            <Icon color={colors.primary} name="search" size={gw(20)} />
            <TextInput
              autoCorrect={false}
              onChangeText={(value) => handleSearch(value)}
              placeholder="Search Country"
              placeholderTextColor={colors['soft-tect']}
              style={INPUT_TEXT}
            />
          </Box>
        </Box>

        <FlatList
          data={data}
          keyExtractor={(_item, index) => `${index}`}
          renderItem={(item) => <SingleCountryItem {...item} />}
        />
      </Box>
    </Modal>
  )
}

const ITEM_CASE: ViewStyle = {
  alignItems: 'center',
  borderBottomWidth: 1,
  borderColor: '#E6F5F6',
  borderTopWidth: 1,
  flexDirection: 'row',
  paddingHorizontal: 20,
  paddingVertical: 13
}

const NO_MARGIN: ViewStyle = {
  margin: 0
}

const INPUT_TEXT: TextStyle = {
  flex: 1,
  paddingLeft: 5
}
