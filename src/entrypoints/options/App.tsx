import Form from "./components/Form.tsx";
import View from "./components/View.tsx";
import {
  optionsAtom,
  OptionsKeyType,
  optionsReducer,
  OptionStorageType,
} from "@/store/options.ts";
import { useAtom } from "jotai";
import { useCallback } from "react";

const App = () => {
  const [options, setOptions] = useAtom(optionsAtom);
  const dispatch = useCallback(
    <T extends OptionsKeyType>(key: T, value: OptionStorageType[T]["value"]) =>
      setOptions((prev) => optionsReducer(prev, { key, value })),
    [setOptions],
  );

  return (
    <View>
      <h1 className="text-base">Options</h1>
      <Form.Root>
        <Form.Switch option={options.showDisabledExtensions} dispatch={dispatch} />
        <Form.Select options={["Github"]} option={options.syncService} dispatch={dispatch} />
      </Form.Root>
    </View>
  );
};

export default App;
