import { Box, Text, useTheme } from '@risemaxi/sarcelle'
import Icon from 'app/assets/icons'
import { DynamicModal, Retry } from 'app/components'
import { Bank, useGetBanks } from 'app/domains/wallet'
import { useLazyResult } from 'app/hooks/use-lazy-result'
import { countriesData } from 'app/utils/countriesData'
import React, { useCallback, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ViewStyle
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

interface BankItemProps {
  bank: Bank
  isSelected: boolean
  onPress: (bank: Bank) => void
}

function BankItem({ isSelected, bank: bank, onPress }: BankItemProps) {
  return (
    <TouchableOpacity onPress={() => onPress(bank)}>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        marginVertical={16}
      >
        <Text
          color={isSelected ? 'primary' : 'neutral-dark-mode'}
          textTransform="capitalize"
          variant="tab-17-reg"
        >
          {bank.name}
        </Text>
        {isSelected && <Icon height={14} name="tick" width={24} />}
      </Box>
    </TouchableOpacity>
  )
}

const ItemSeparator = () => (
  <Box borderBottomWidth={1} borderColor={{ custom: '#ECEFF1' }} />
)

interface BanksModalProps {
  bankId?: string
  countryCode?: string
  isOpen: boolean
  selectBank: (bank: Bank) => void
  toggleModalVisibility: () => void
}

export function BanksModal({
  bankId,
  countryCode,
  isOpen,
  toggleModalVisibility,
  selectBank: selectBank
}: BanksModalProps) {
  const country = countriesData.find((node) => node.countryCode === countryCode)
  const countryName = country?.countryNameEn?.replace(/\s+/g, '').toLowerCase()
  const { banks, status, refetch } = useGetBanks(countryName)

  const { colors, textVariants } = useTheme()

  const [search, setSearch] = useState('')

  const searchResult = useMemo(() => {
    if (!search) return banks

    return banks.filter((bank) => {
      const searchTerm = search.toLowerCase()
      return (
        bank.name.toLowerCase().includes(searchTerm) ||
        bank.id.toLowerCase().includes(searchTerm)
      )
    })
  }, [banks, search])
  const lazyResult = useLazyResult(searchResult, 20)

  const _selectBank = (bank: Bank) => {
    toggleModalVisibility()
    selectBank(bank)
  }

  const renderItem = useCallback(
    ({ item }: { item: Bank }) => (
      <BankItem
        bank={item}
        isSelected={item.id === bankId}
        onPress={_selectBank}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bankId]
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
            placeholder="search banks"
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
      onDismiss={() => {
        lazyResult.reset()
        setSearch('')
      }}
      renderScrollView={false}
      toggleModalVisibility={toggleModalVisibility}
      type="partialFull"
    >
      <Box flex={1}>
        {(() => {
          switch (status) {
            case 'loading':
              return <ActivityIndicator color={colors.primary} />
            case 'error':
              return (
                <Retry
                  onRetry={refetch}
                  text={`Failed to fetch banks for ${country?.countryNameEn}`}
                />
              )
            case 'success':
              return (
                <FlatList
                  contentContainerStyle={LIST_CONTAINER_STYLE}
                  data={lazyResult.result}
                  ItemSeparatorComponent={ItemSeparator}
                  ListEmptyComponent={
                    <Text>No banks found for {country?.countryNameEn} </Text>
                  }
                  onEndReached={lazyResult.fetchNextPage}
                  onEndReachedThreshold={0.6}
                  renderItem={renderItem}
                  style={LIST_STYLE}
                />
              )

            default:
              return null
          }
        })()}
      </Box>
    </DynamicModal>
  )
}

const LIST_CONTAINER_STYLE = {
  flexGrow: 1
} satisfies ViewStyle

const LIST_STYLE = {
  marginHorizontal: -16,
  paddingHorizontal: 16
} satisfies ViewStyle

const TEXT_INPUT = {
  flexGrow: 1,
  marginLeft: 10,
  padding: 0
} satisfies ViewStyle
