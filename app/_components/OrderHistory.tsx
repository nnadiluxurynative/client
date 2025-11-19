"use client";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState } from "react";
import { useOrdersStore } from "../_stores/orderStore";
import { formatNaira } from "../_utils/helpers";

function OrderHistory() {
  const { orders } = useOrdersStore();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <React.Fragment>
      {orders.length > 0 ? (
        <div>
          <div className="overflow-x-auto border border-grey">
            <table className="min-w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b bg-gray-50 border-b-grey text-left text-xs uppercase tracking-wide ">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((o, i) => (
                  <tr key={i} className="border-b-grey not-last:border-b">
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/account/orders/${Number(i + 1001)}`}
                        className="hover:underline"
                      >
                        #{Number(i + 1001)}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {format(new Date(o.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-4 py-3">{o.status}</td>
                    <td className="px-4 py-3 text-right">
                      {formatNaira(Number(o.total))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <p className="">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, orders.length)} of{" "}
              {orders.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="text-foreground hover:border-gray-400 border disabled:pointer-events-none disabled:hover:border-gray-300 border-gray-300 px-3 cursor-pointer py-1 disabled:opacity-80"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="text-foreground hover:border-gray-400 border disabled:pointer-events-none disabled:hover:border-gray-300 border-gray-300 px-3 cursor-pointer py-1 disabled:opacity-80"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>You haven't placed any orders yet.</p>
      )}
    </React.Fragment>
  );
}

export default OrderHistory;
