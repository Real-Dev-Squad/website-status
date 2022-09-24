import { FC, useState, useEffect, useCallback } from 'react';
import Head from '@/components/head';
import Section from '@/components/idleMembers/section';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import { getAllUsersCloudinaryImageURLLink } from '@/helperFunctions/getCloudinaryImageUrl';

const IDLE_MEMBERS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;

interface userNameImage  {
  name: string,
  imageURL: string
}
const CLOUDINARY_IMAGE_CONFIGS = 'w_160,h_160'

const IdleMembers: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<userNameImage[]>([]);

  const {
    response,
    error,
    isLoading,
  } = useFetch(IDLE_MEMBERS_URL);

  const memoizeFetchIdleMemberDetails = useCallback(async ()=>{
    if ('idleMemberUserNames' in response) {
      const sortedIdleMembers:string[] = response.idleMemberUserNames
        .sort((a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase()));
        if (sortedIdleMembers.length > 0) {
          const lstUsersCldLinks = getAllUsersCloudinaryImageURLLink(sortedIdleMembers,CLOUDINARY_IMAGE_CONFIGS)
          Promise.all(lstUsersCldLinks)
            .then((lstStrUsersCldLinks) => {
              const lstUserNameImage = lstStrUsersCldLinks.map((userCloudinaryLink,index)=>{
                return {name:sortedIdleMembers[index],imageURL:userCloudinaryLink}
              })
              setIdleMembersList(lstUserNameImage);
            }).catch((e)=>{
              console.error(e)   
            })
        }
    }
  },[isLoading, response])

  useEffect(() => {
    memoizeFetchIdleMemberDetails()
  }, [memoizeFetchIdleMemberDetails]);

  return (
    <Layout>
      <Head title="Idle Members | Status Real Dev Squad" />

      <div className="container">
        <Section heading="Idle Members" content={idleMembersList} error={error} isLoading={isLoading} />
      </div>

    </Layout>
  );
};

export default IdleMembers;
