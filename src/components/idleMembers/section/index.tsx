import { FC } from 'react';
import Card from '@/components/idleMembers/card';
import classNames from '@/components/idleMembers/section/section.module.scss';

type Props = {
  heading: string
  content: Array<string>
  error: string | null
  isLoading: boolean,
  darkMode: boolean,
}

function renderCards(content: Array<string>, toggleDarkMode: boolean) {
  return content.map((idleMember) => (
    <Card idleMemberUserName={idleMember} key={idleMember} darkMode={toggleDarkMode} />
  ));
}

const Section: FC<Props> = ({
  heading, content, error, isLoading, darkMode
}) => (
  <div className={darkMode ? classNames.darkTheme : classNames.lightTheme}>
    <div className={classNames.section}>
      <div className={classNames.heading}>{heading}</div>
      {
        (!!error) && (
          <span className={classNames.statusMessage}>
            Something went wrong, please contact admin!
          </span>
        )
      }
      {
        (isLoading)
          ? (
            <span className={classNames.statusMessage}>Loading...</span>
          )
          : (
            <div className={classNames.cardContainer}>{renderCards(content, darkMode)}</div>
          )
      }
    </div>
  </div>
);

export default Section;
