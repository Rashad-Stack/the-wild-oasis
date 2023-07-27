import Filter from "../../ui/Filter";
import TableOperations from "../../ui/Tableoperations";

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
    </TableOperations>
  );
}
