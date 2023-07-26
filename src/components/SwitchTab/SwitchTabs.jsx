import "./style.scss";
import { useState } from "react";

export default function SwitchTabs ({ data, onTabChange }) {
  const [isleft, setLeft] = useState(0);
  const [selectedTab, setTab] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 100);
    setTimeout(() => {
      setTab(index);
    }, 300);
    onTabChange(tab, index);
  };

  return (
    <div className="switchingTabs">
      <div className="tabItems">
        {data.map((tab, index) => (
          <span
          key={index}
            className={`tabItem ${selectedTab === index ?"active":''}`}
            onClick={() => {
              activeTab(tab, index);
            }}
          >
            {tab}
          </span>
        ))}
        <span className="movingBg" style={{ left: isleft }} />
      </div>
    </div>
  );
};
