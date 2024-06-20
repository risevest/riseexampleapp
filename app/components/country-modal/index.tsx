import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { useLazyResult } from 'app/hooks/use-lazy-result'
import { countriesData, ICountriesData } from 'app/utils/countriesData'
import React, { useCallback, useMemo, useState } from 'react'
import { FlatList, TextInput, TouchableOpacity, ViewStyle } from 'react-native'

import { DynamicModal } from '../dynamic-modal/dynamic-modal'

interface CountryProps {
  country: ICountriesData
  isSelected: boolean
  onPress: (country: ICountriesData) => void
}

function Country({ isSelected, country, onPress }: CountryProps) {
  return (
    <TouchableOpacity onPress={() => onPress(country)}>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        marginVertical={16}
      >
        <Text
          color={isSelected ? 'primary' : 'neutral-dark-mode'}
          variant="tab-17-reg"
        >{`${country.countryNameEn} (+${country.countryCallingCode})`}</Text>
        {isSelected && <Icon height={14} name="tick" width={24} />}
      </Box>
    </TouchableOpacity>
  )
}

const sort = (countries: ICountriesData[], countryCode?: string) => {
  const country = countriesData.find((c) => c.countryCode === countryCode)

  const filteredCountries = countries.filter(
    (c) => c.countryCode !== countryCode
  )

  return country ? [country, ...filteredCountries] : filteredCountries
}

const ItemSeparator = () => (
  <Box borderBottomWidth={1} borderColor={{ custom: '#ECEFF1' }} />
)

interface CountryModalProps {
  countryCode?: string
  filterCountry?: (country: ICountriesData) => boolean
  isOpen: boolean
  selectCountry: (country: ICountriesData) => void
  toggleModalVisibility: () => void
}

export function CountryModal({
  countryCode,
  filterCountry,
  isOpen,
  toggleModalVisibility,
  selectCountry
}: CountryModalProps) {
  const { colors, textVariants } = useTheme()
  const [countries] = useState<ICountriesData[]>(() => {
    const filteredCountries = filterCountry
      ? countriesData.filter(filterCountry)
      : countriesData
    return sort(filteredCountries, countryCode)
  })

  const [search, setSearch] = useState('')

  const searchResult = useMemo(() => {
    if (!search) return countries

    return sort(
      countries.filter(
        (country) =>
          country.countryNameEn.toLowerCase().includes(search.toLowerCase()) ||
          country.countryCallingCode.includes(search)
      ),
      countryCode
    )
  }, [countries, countryCode, search])
  const lazyResult = useLazyResult(searchResult, 20)

  const _selectCountry = (country: ICountriesData) => {
    toggleModalVisibility()
    selectCountry(country)
  }

  const renderItem = useCallback(
    ({ item }: { item: ICountriesData }) => (
      <Country
        country={item}
        isSelected={item.countryCode === countryCode}
        onPress={_selectCountry}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countryCode]
  )

  return (
    <DynamicModal
      customHeader={
        <Box
          alignItems="center"
          backgroundColor="offWhite0003"
          borderRadius={8}
          flexDirection="row"
          marginBottom={16}
          padding={16}
        >
          <Icon name="search-grey" size={24} />
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => setSearch(text)}
            placeholder="search country"
            placeholderTextColor={colors['soft-tect']}
            style={[
              TEXT_INPUT,
              textVariants['body-15-regular'] as ViewStyle,
              { color: colors['neutral-dark-mode'] }
            ]}
          />
        </Box>
      }
      hideHeader
      isModalOpen={isOpen}
      onDismiss={() => setSearch('')}
      renderScrollView={false}
      toggleModalVisibility={toggleModalVisibility}
      type="partialFull"
    >
      <Box flex={1}>
        <FlatList
          data={lazyResult.result}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={lazyResult.fetchNextPage}
          onEndReachedThreshold={0.6}
          renderItem={renderItem}
        />
      </Box>
    </DynamicModal>
  )
}

const TEXT_INPUT: ViewStyle = {
  flexGrow: 1,
  marginLeft: 10,
  padding: 0
}
