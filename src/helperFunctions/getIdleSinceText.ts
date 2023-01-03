import { TOTAL_MILLISECONDS_IN_A_DAY, TOTAL_MILLISECONDS_IN_A_HOUR } from '@/components/constants/date';

const getIdleSinceText = (idleSince: string) => {
  const presentDate = new Date();
  const differenceInDay = Math.round(
    (presentDate.getTime() - parseInt(idleSince)) / TOTAL_MILLISECONDS_IN_A_DAY,
  );

  const differenceInHours = Math.abs(Math.round((presentDate.getTime() - parseInt(idleSince)) / 3600000));

  if(differenceInDay > 1){
    return `${differenceInDay} days ago`;
  } else {
    return `${differenceInHours} hours ago`;
  }
}

export default getIdleSinceText;