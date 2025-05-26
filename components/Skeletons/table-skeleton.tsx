import { Skeleton } from "../ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="flex flex-col flex-1 gap-4 w-full py-4 overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between p-4rounded-md">
        <Skeleton className="h-6 w-1/4" />
      </div>
      {/* table */}
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="p-4">
                <Skeleton className="h-6 w-1/2" />
              </th>
              <th className="p-4">
                <Skeleton className="h-6 w-1/2" />
              </th>
              <th className="p-4">
                <Skeleton className="h-6 w-1/2" />
              </th>
              <th className="p-4">
                <Skeleton className="h-6 w-1/2" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-6 w-full" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div className="flex justify-between p-4">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    </div>
  );
}
