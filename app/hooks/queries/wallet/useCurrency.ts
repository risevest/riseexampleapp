import {getConfigSetting} from 'app/api/v2';
import {transformQueryStatusToRiseStatus} from 'app/utils/utilFunctions';
import {useQuery} from '@tanstack/react-query';

import {TokenResponse} from '../../useCryptoTokens';

/**
 * Get the rates of a token and refetch every 5 mins
 * @param symbol  token symbol
 **/
export function useCurrency(symbol: string) {
  const {status, data, ...query} = useQuery<TokenResponse[]>(
    'tokenRate',
    () =>
      getConfigSetting<TokenResponse[], 'symbol'>('currency', 'symbol', symbol),
    {
      refetchInterval: 5000 * 60,
      staleTime: 5000 * 60,
    },
  );

  const tokenData = (data?.[0] || {}) as TokenResponse | undefined;

  return {
    ...query,
    requestStatus: transformQueryStatusToRiseStatus(status),
    status,
    tokenData,
  };
}
