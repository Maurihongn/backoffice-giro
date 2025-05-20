import MultiSelectCombobox from "@/components/ui-customs/multi-select-combobox";
import { getSAPCeCo } from "@/lib/api/admin/sapceco";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

type Props = {};
export default function PlantsSelect({}: Props) {
  const getSAPCeCoQuery = useSuspenseQuery({
    queryKey: ["SAPCeCos"],
    queryFn: getSAPCeCo,
    staleTime: 1000 * 60 * 5,
  });

  const formattedData: {
    value: string;
    label: string;
  }[] = getSAPCeCoQuery.data!.map((item) => ({
    value: item.nroPlanta,
    label: item.planta,
  }));

  return (
    <MultiSelectCombobox
      label="Plantas"
      noResultsMessage="No se encontraron plantas"
      placeholder=""
      selectedMessage="Plantas seleccionadas"
      data={formattedData}
      onChange={(selectedValues) => {
        console.log("Selected values:", selectedValues);
      }}
    />
  );
}
