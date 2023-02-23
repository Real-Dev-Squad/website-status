import styles from '@/components/Tabs/Tabs.module.scss';

type TabsProps = {
  tabs: string[];
  onSelect : (tab:string)=> void;
  activeTab: string
};

export default function Tabs({ tabs, onSelect, activeTab }: TabsProps) {

  const tabButtons = tabs.map((tab: string, index: number) => (
    <button
    key={tab}
    onClick={() => onSelect(tab)}
    className={`${styles.tabButton} ${activeTab === tab ? styles.active : "" }`}
    >
      {tab}
    </button>
  ))

  return (
      <div>
        {tabButtons}
      </div>
  )
}