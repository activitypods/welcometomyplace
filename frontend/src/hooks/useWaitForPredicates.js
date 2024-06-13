import { useCallback } from "react";
import { useDataProvider } from "react-admin";

const delay = t => new Promise(resolve => setTimeout(resolve, t));
const hasAllPredicates = (record, predicates) => predicates.every(p => record[p]);

const useWaitForPredicates = () => {
  const dataProvider = useDataProvider();

  const waitForPredicates = useCallback(async(resource, record, predicates) => {
    let i = 0;
    while(!hasAllPredicates(record, predicates)) {
      i++;
      await delay(1000);
      ({ data: record } = await dataProvider.getOne(resource, { id: record.id }));
      if (i > 30) throw new Error(`Unable to find predicates ${predicates.join(', ')} in ${record.id} after 30s`);
    }
    return record;
  }, [dataProvider]);

  return waitForPredicates;
};

export default useWaitForPredicates;
