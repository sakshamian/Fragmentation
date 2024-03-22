import * as React from 'react';
import { BurnPage } from './components/Burn.tsx';
import TransactionTable from './components/TransactionTable.tsx';
import Dashboard from './components/Dashboard.tsx';

function App() {
  const [burnTransactions, setBurnTransactions] = useState<any[]>([]);
  const [coinData, setCoinData] = useState<any>({});

  const { toastMsg, toastSev, showToast } = useAppToast();
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();
  const { chains: receiveChains } = useWallet();

  const {
    setSuppliesChain,
    suppliesChain,
  } = useAppSupplies(true);


  const refetchTransactions = () => {
    Promise.all(
      ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
    )
      .then((results: any) => {
        //console.log(res);
        let res = results.flat();
        res = ChainScanner.sortOnlyBurnTransactions(res);
        res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
        setBurnTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        //console.log("coin stats", data);
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Dashboard />
      <TransactionTable burnTransactions={burnTransactions} coinData={coinData} />
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
}

export default App;
