import {useQuery} from '@tanstack/react-query';
import {getUserProfile} from 'app/api/auth';

const useUser = () =>
  useQuery({
    queryKey: ['get-user'],
    queryFn: getUserProfile,
  });
export default useUser;
