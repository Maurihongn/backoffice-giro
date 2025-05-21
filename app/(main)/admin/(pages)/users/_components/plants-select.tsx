import MultiSelectCombobox from "@/components/ui-customs/multi-select-combobox";
import { getSAPCeCo } from "@/lib/api/admin/sapceco";
import { GetSapCeCoResponse } from "@/types/sapceco";
import { useSuspenseQuery } from "@tanstack/react-query";

type Props = {
  plants: GetSapCeCoResponse;
};
export default function PlantsSelect({ plants }: Props) {
  const formattedData: {
    value: string;
    label: string;
  }[] = plants.map((item) => ({
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
