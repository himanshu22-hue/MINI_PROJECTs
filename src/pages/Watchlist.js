import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";

function Watchlist() {
  const [coins, setCoins] = useState([]);
  const [watchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  const getData = useCallback(async () => {
    if (watchlist.length > 0) {
      const allCoins = await get100Coins();
      if (allCoins) {
        setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
      }
    }
  }, [watchlist]);

  useEffect(() => {
    getData();
  }, [getData, watchlist]);

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
