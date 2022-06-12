import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { LogBox } from "react-native";

import Providers from "./navigation";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  //remove yellow box warnings
  LogBox.ignoreLogs(["EventEmitter.removeListener('change', ...)"]);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Providers />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
